import '@/styles/globals.css';
import '@/styles/global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '../src/lib/fontawesome';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper-custom.css';
import '../styles/serviceDetail.css'; // Added service detail styles globally
import feather from 'feather-icons';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { CartProvider } from '@/context/SaleorCartContext';
import { UnifiedCartProvider } from '@/context/UnifiedCartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/SaleorAuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../src/lib/apollo';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

// إنشاء كائن QueryClient لإدارة التخزين المؤقت للاستعلامات
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 دقائق
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      feather.replace();
    }
  }, []);

  useEffect(() => {
    // إضافة مستمعي أحداث التنقل لعرض وإخفاء الـ Spinner
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>عيادة إيليت البيطرية</title>
        <meta name="description" content="عيادة إيليت البيطرية - شريكك الموثوق في رعاية حيوانك الأليف" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <UnifiedCartProvider>
                <LanguageProvider>
                  <LoadingSpinner isLoading={loading} />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </LanguageProvider>
              </UnifiedCartProvider>
            </CartProvider>
          </AuthProvider>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
