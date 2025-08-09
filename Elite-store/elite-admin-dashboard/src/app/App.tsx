import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import LoginPage from '../features/auth/LoginPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import ProductsPage from '../features/products/ProductsPage';
import UsersPage from '../features/users/UsersPage';
import OrdersPage from '../features/orders/OrdersPage';
import CategoriesPage from '../features/categories/CategoriesPage';
import AppointmentsPage from '../features/appointments/AppointmentsPage';
import TeamPage from '../features/team/TeamPage';
import BlogPage from '../features/blog/BlogPage';
import SettingsPage from '../features/settings/SettingsPage';
import { useAuth } from '../hooks/useAuth';
import { setGlobalNavigateHandler } from '../services/api';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Elite Veterinary Dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

// Navigation Wrapper to set up global navigation handler
const NavigationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up global navigation handler for API service
    setGlobalNavigateHandler((path: string) => {
      navigate(path, { replace: true });
    });
  }, [navigate]);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationWrapper>
        <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/appointments" element={<AppointmentsPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
        </Routes>
      </NavigationWrapper>
    </AuthProvider>
  );
};

export default App;
 