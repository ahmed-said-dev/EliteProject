import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import styles from './CartSummary.module.css';

type ShippingOption = {
  id: string;
  name: string;
  price: number;
};

const CartSummary: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { 
    cartItems, 
    cartTotal, 
    cart, 
    loading, 
    startCheckout,
    createPaymentSessions,
    addShippingMethod
  } = useCart();
  
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponMessage, setCouponMessage] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  const shippingOptions: ShippingOption[] = [
    { id: 'standard', name: t('cart.cartSummary.shippingOptions.standard'), price: 15 },
    { id: 'express', name: t('cart.cartSummary.shippingOptions.express'), price: 30 },
    { id: 'free', name: t('cart.cartSummary.shippingOptions.free'), price: 0 },
  ];

  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping) || shippingOptions[0];
  
  const subtotal = cartTotal;
  const shippingCost = selectedShippingOption.price;
  const taxRate = 0.15; // 15% VAT for Saudi Arabia
  const taxAmount = (subtotal - discount) * taxRate;
  const total = subtotal + shippingCost + taxAmount - discount;

  const formatPrice = (price: number) => {
    return isRTL 
      ? `${Math.round(price)} ر.س` 
      : `SAR ${Math.round(price)}`;
  };

  // طلب خيارات الشحن من API
  const [apiShippingOptions, setApiShippingOptions] = useState<any[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'review'>('cart');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // معالجة تغيير طريقة الشحن
  const handleShippingChange = async (optionId: string) => {
    setSelectedShipping(optionId);
    
    // إذا كانت هناك خيارات شحن من API، قم بتطبيقها
    if (apiShippingOptions.length > 0) {
      try {
        const apiOption = apiShippingOptions.find(opt => opt.id === optionId);
        if (apiOption) {
          await addShippingMethod(apiOption.id);
        }
      } catch (err) {
        console.error('Error applying shipping method:', err);
      }
    }
  };

  // معالجة تطبيق كوبون الخصم
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example coupon: ELITE20 for 20% off
    if (couponCode.toUpperCase() === 'ELITE20') {
      const newDiscount = subtotal * 0.2; // 20% off
      setDiscount(newDiscount);
      setCouponMessage({
        message: t('cart.coupon.success'),
        type: 'success'
      });
    } else {
      setDiscount(0);
      setCouponMessage({
        message: t('cart.coupon.error'),
        type: 'error'
      });
    }
  };
  
  // معالجة عملية الدفع
  const handleCheckout = async () => {
    if (!cart) {
      setCheckoutError(t('cart.error.noCart'));
      return;
    }
    
    try {
      setCheckoutLoading(true);
      setCheckoutError(null);
      
      // 1. إنشاء جلسات الدفع
      await createPaymentSessions();
      
      // 2. بدء عملية الدفع
      const order = await startCheckout();
      
      // 3. توجيه المستخدم إلى صفحة تأكيد الطلب
      if (order && order.id) {
        window.location.href = `/order-confirmation?id=${order.id}`;
      } else {
        setCheckoutError(t('cart.error.checkoutFailed'));
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setCheckoutError(err.message || t('cart.error.checkoutFailed'));
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.summaryTitle}>{t('cart.cartSummary.title')}</h2>
      
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>{t('cart.cartSummary.subtotal')}</span>
        <span className={styles.summaryValue}>{formatPrice(subtotal)}</span>
      </div>
      
      {discount > 0 && (
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Discount</span>
          <span className={styles.summaryValue}>-{formatPrice(discount)}</span>
        </div>
      )}
      
      <div className={styles.shippingOptions}>
        <div className={styles.shippingOptionTitle}>{t('cart.cartSummary.shipping')}</div>
        {shippingOptions.map((option) => (
          <label
            key={option.id}
            className={`${styles.shippingOption} ${selectedShipping === option.id ? styles.shippingOptionSelected : ''}`}
          >
            <input
              type="radio"
              name="shipping"
              className={styles.shippingOptionRadio}
              value={option.id}
              checked={selectedShipping === option.id}
              onChange={() => setSelectedShipping(option.id)}
            />
            <div className={styles.shippingOptionInfo}>
              <div className={styles.shippingOptionName}>{option.name}</div>
            </div>
            <div className={styles.shippingOptionPrice}>
              {option.price === 0 ? (isRTL ? 'مجاني' : 'Free') : formatPrice(option.price)}
            </div>
          </label>
        ))}
      </div>
      
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>{t('cart.cartSummary.tax')}</span>
        <span className={styles.summaryValue}>{formatPrice(taxAmount)}</span>
      </div>
      
      <div className={styles.summaryTotal}>
        <span className={styles.summaryTotalLabel}>{t('cart.cartSummary.total')}</span>
        <span className={styles.summaryTotalValue}>{formatPrice(total)}</span>
      </div>
      
      <div className={styles.couponSection}>
        <h3 className={styles.couponTitle}>{t('cart.coupon.title')}</h3>
        <form className={styles.couponForm} onSubmit={handleApplyCoupon}>
          <input
            type="text"
            className={styles.couponInput}
            placeholder={t('cart.coupon.placeholder')}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button type="submit" className={styles.couponButton}>
            {t('cart.coupon.apply')}
          </button>
        </form>
        {couponMessage && (
          <div className={`${styles.couponMessage} ${styles[`coupon${couponMessage.type === 'success' ? 'Success' : 'Error'}`]}`}>
            {couponMessage.message}
          </div>
        )}
      </div>
      
      {checkoutError && (
        <div className={styles.checkoutError}>
          {checkoutError}
        </div>
      )}
      
      <button 
        className={styles.checkoutButton} 
        onClick={handleCheckout}
        disabled={checkoutLoading || cartItems.length === 0 || loading}
      >
        {checkoutLoading ? t('cart.cartSummary.processing') : t('cart.cartSummary.proceedToCheckout')}
      </button>
    </div>
  );
};

export default CartSummary;
