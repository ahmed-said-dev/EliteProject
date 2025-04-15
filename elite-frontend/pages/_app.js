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
import feather from 'feather-icons';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      feather.replace();
    }
  }, []);

  return (
    <>
      <Head>
        <title>عيادة إيليت البيطرية</title>
        <meta name="description" content="عيادة إيليت البيطرية - شريكك الموثوق في رعاية حيوانك الأليف" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
        <LanguageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LanguageProvider>
      </CartProvider>
    </>
  );
}

export default MyApp;
