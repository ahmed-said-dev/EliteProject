import '@/styles/globals.css';
import Head from 'next/head';
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>عيادة إيليت البيطرية</title>
        <meta name="description" content="عيادة إيليت البيطرية - شريكك الموثوق في رعاية حيوانك الأليف" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div dir="rtl">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </>
  );
}

export default MyApp;
