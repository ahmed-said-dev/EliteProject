import React from 'react';
import PageBanner from '@/components/PageBanner/PageBanner';
import UnifiedCartPage from '@/components/CartPage/UnifiedCartPage';
import { useLanguage } from '@/context/LanguageContext';

const Cart = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div dir={dir}>
      <PageBanner
        breadcrumbs={[
          { label: t('pageBanner.home'), url: '/' },
          { label: t('cart.title') || 'سلة التسوق', url: '/cart' }
        ]}
        title={t('cart.title') || 'سلة التسوق'}
        backgroundImage="https://images.pexels.com/photos/4498651/pexels-photo-4498651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <UnifiedCartPage />
    </div>
  );
};

export default Cart;
