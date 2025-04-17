import React from 'react';
import PageBanner from '@/components/PageBanner/PageBanner';
import CartPage from '@/components/CartPage';
import { useLanguage } from '@/context/LanguageContext';

const Cart = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <PageBanner
        breadcrumbs={[
          { label: t('pageBanner.home'), url: '/' },
          { label: t('cart.title'), url: '/cart' }
        ]}
        title={t('cart.title')}
      />
      <CartPage />
    </>
  );
};

export default Cart;
