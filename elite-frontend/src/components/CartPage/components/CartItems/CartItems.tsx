import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import styles from './CartItems.module.css';

const CartItems: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return isRTL 
      ? `${price.toFixed(2)} ر.س` 
      : `SAR ${price.toFixed(2)}`;
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className={styles.cartItems}>
      <div className={styles.tableContainer}>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>{t('cart.cartItems.product')}</th>
              <th>{t('cart.cartItems.price')}</th>
              <th>{t('cart.cartItems.quantity')}</th>
              <th>{t('cart.cartItems.total')}</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td data-label={t('cart.cartItems.product')}>
                  <div className={styles.productCell}>
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={80} 
                      height={80} 
                      className={styles.productImage}
                    />
                    <div className={styles.productInfo}>
                      <Link href={`/products/${item.id}`} className={styles.productName}>
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td data-label={t('cart.cartItems.price')} className={styles.priceCell}>
                  {item.salePrice ? (
                    <>
                      <span className={styles.salePriceOriginal}>{formatPrice(item.price)}</span>
                      <span className={styles.salePrice}>{formatPrice(item.salePrice)}</span>
                    </>
                  ) : (
                    formatPrice(item.price)
                  )}
                </td>
                <td data-label={t('cart.cartItems.quantity')}>
                  <div className={styles.quantityCell}>
                    <button 
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input 
                      type="number" 
                      className={styles.quantityInput}
                      value={item.quantity}
                      min="1"
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleQuantityChange(item.id, value);
                        }
                      }}
                    />
                    <button 
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </td>
                <td data-label={t('cart.cartItems.total')} className={styles.totalCell}>
                  {formatPrice((item.salePrice || item.price) * item.quantity)}
                </td>
                <td>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className="sr-only">{t('cart.cartItems.remove')}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItems;
