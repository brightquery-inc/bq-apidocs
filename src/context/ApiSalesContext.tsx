import React, { createContext, useContext, useState, useEffect } from "react";
import { get } from "../api/axios";

interface ApiSale {
  id: string;
  apiName: string;
  revenue: number;
  calls: number;
  date: string;
  status: "active" | "inactive";
}

interface ApiSalesStats {
  totalRevenue: number;
  totalCalls: number;
  activeApis: number;
}

interface ApiSalesContextType {
  sales: ApiSale[];
  stats: ApiSalesStats;
  loading: boolean;
  error: string | null;
  fetchSales: () => Promise<void>;
}

const ApiSalesContext = createContext<ApiSalesContextType | undefined>(
  undefined
);

export const ApiSalesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sales, setSales] = useState<ApiSale[]>([]);
  const [stats, setStats] = useState<ApiSalesStats>({
    totalRevenue: 0,
    totalCalls: 0,
    activeApis: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // const response = await get<ApiSale[]>('/api/sales');
      // For demo purposes, using mock data
      const mockSales: ApiSale[] = [
        {
          id: "1",
          apiName: "Payment API",
          revenue: 5000,
          calls: 10000,
          date: "2024-03-15",
          status: "active",
        },
        {
          id: "2",
          apiName: "Authentication API",
          revenue: 3000,
          calls: 8000,
          date: "2024-03-15",
          status: "active",
        },
        {
          id: "3",
          apiName: "Data Analytics API",
          revenue: 7000,
          calls: 15000,
          date: "2024-03-15",
          status: "active",
        },
        {
          id: "4",
          apiName: "Legacy API",
          revenue: 1000,
          calls: 2000,
          date: "2024-03-15",
          status: "inactive",
        },
      ];

      setSales(mockSales);

      // Calculate stats
      const newStats = mockSales.reduce(
        (acc, sale) => ({
          totalRevenue: acc.totalRevenue + sale.revenue,
          totalCalls: acc.totalCalls + sale.calls,
          activeApis: acc.activeApis + (sale.status === "active" ? 1 : 0),
        }),
        { totalRevenue: 0, totalCalls: 0, activeApis: 0 }
      );

      setStats(newStats);
      setError(null);
    } catch (err) {
      setError("Failed to fetch sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <ApiSalesContext.Provider
      value={{ sales, stats, loading, error, fetchSales }}
    >
      {children}
    </ApiSalesContext.Provider>
  );
};

// export const useApiSales = () => {
//   const context = useContext(ApiSalesContext);
//   if (context === undefined) {
//     throw new Error('useApiSales must be used within an ApiSalesProvider');
//   }
//   return context;
// };
