import '@/styles/globals.css';
import Head from 'next/head';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Elite Vet</title>
        <meta name="description" content="Elite Vet - Your Trusted Veterinary Care" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </Head>
      <div dir="rtl">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
