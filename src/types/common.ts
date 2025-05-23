// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// Authentication related types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Route related types
export interface ProtectedRouteProps {
  children: React.ReactNode;
} 