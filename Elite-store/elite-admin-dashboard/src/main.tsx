import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './app/App';
import './styles/theme.css';
import './styles/vet-dashboard.css';
import './styles/login.css';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#7C3AED',
            colorInfo: '#7C3AED',
            borderRadius: 10,
            colorLink: '#7C3AED',
          },
          components: {
            Button: { controlHeight: 36 },
            Modal: { borderRadiusLG: 12 },
            Input: { borderRadius: 10 },
            Select: { borderRadius: 10 },
          },
        }}
      >
        <BrowserRouter>
          <App />
          <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#8b5cf6',
              color: '#fff',
              borderRadius: '12px',
            },
            success: {
              style: {
                background: '#22c55e',
              },
            },
            error: {
              style: {
                background: '#dc2626',
              },
            },
          }}
        />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
 