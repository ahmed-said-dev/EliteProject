import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useLanguage } from '@/context/LanguageContext';


const Layout = ({ children }) => {
  const { isRTL } = useLanguage();
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="layout-wrapper">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
