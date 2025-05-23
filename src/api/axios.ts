import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/types/common';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    // Handle 401 Unauthorized error
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 403 Forbidden error
    if (error.response?.status === 403) {
      window.location.href = '/forbidden';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Error handler function
export const handleApiError = (error: AxiosError<ApiResponse<unknown>>): string => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const message = error.response.data?.message || 'An error occurred';
    return message;
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response received from server';
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || 'An unexpected error occurred';
  }
};

// Helper functions for common HTTP methods
export const get = async <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
  const response = await api.get<ApiResponse<T>>(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data?: object): Promise<ApiResponse<T>> => {
  const response = await api.post<ApiResponse<T>>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data?: object): Promise<ApiResponse<T>> => {
  const response = await api.put<ApiResponse<T>>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await api.delete<ApiResponse<T>>(url);
  return response.data;
};

export default api; 