import React, { createContext, useContext, ReactNode } from 'react';
import { useSaleorAuth } from '../hooks/useSaleorAuth';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  avatar?: {
    url: string;
    alt?: string;
  };
  addresses: Array<{
    id: string;
    firstName: string;
    lastName: string;
    streetAddress1: string;
    streetAddress2?: string;
    city: string;
    postalCode: string;
    country: { code: string; country: string };
  }>;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const saleorAuth = useSaleorAuth();

  const contextValue: AuthContextType = {
    user: saleorAuth.user,
    token: saleorAuth.token,
    isAuthenticated: saleorAuth.isAuthenticated,
    loading: saleorAuth.loading,
    error: saleorAuth.error,
    login: saleorAuth.login,
    register: saleorAuth.register,
    logout: saleorAuth.logout,
    clearError: saleorAuth.clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;