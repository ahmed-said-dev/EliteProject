import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/SaleorAuthContext';
import CustomerDashboard from '@/components/Dashboard/CustomerDashboard';
import PageBanner from '@/components/PageBanner/PageBanner';

const Dashboard = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}></div>
        <p>جاري التحميل...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <>
      <PageBanner 
        title="لوحة التحكم" 
        backgroundImage="/images/banner/bnr1.webp" 
      />
      <CustomerDashboard />
    </>
  );
};

export default Dashboard;