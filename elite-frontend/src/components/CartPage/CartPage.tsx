import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import CartItems from './components/CartItems';
import CartSummary from './components/CartSummary';
import styles from './CartPage.module.css';

const CartPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { cartItems, cartCount } = useCart();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Function to get the appropriate count text based on language and quantity
  const getCartCountText = () => {
    if (cartCount === 0) return '';
    
    if (isRTL) {
      // Arabic pluralization rules
      if (cartCount === 0) return t('cart.productCount.zero');
      if (cartCount === 1) return t('cart.productCount.one');
      if (cartCount === 2) return t('cart.productCount.two');
      if (cartCount >= 3 && cartCount <= 10) return t('cart.productCount.few').replace('%count%', cartCount.toString());
      if (cartCount >= 11) return t('cart.productCount.many').replace('%count%', cartCount.toString());
      return t('cart.productCount.other').replace('%count%', cartCount.toString());
    } else {
      // English pluralization
      return cartCount === 1 
        ? t('cart.productCount.singular') 
        : t('cart.productCount.plural').replace('%count%', cartCount.toString());
    }
  };

  return (
    <section className={styles.cartPage} dir={dir}>
      <div className={styles.container}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <h2 className={styles.emptyCartMessage}>{t('cart.emptyCart.message')}</h2>
            <p className={styles.emptyCartDescription}>{t('cart.emptyCart.description')}</p>
            <Link href="/products" className={styles.browseButton}>
              {t('cart.emptyCart.browseButton')}
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartHeader}>
              <h1 className={styles.cartTitle}>{t('cart.title')}</h1>
              <div className={styles.cartCount}>{getCartCountText()}</div>
            </div>
            
            <div className={styles.cartContent}>
              <div>
                <CartItems />
                <div className={styles.actionButtons}>
                  <Link href="/products" className={`${styles.button} ${styles.secondaryButton}`}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              </div>
              <CartSummary />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
