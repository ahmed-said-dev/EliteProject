import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { t, isRTL } = useLanguage();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef(null);

  const isActive = (path) => {
    if (!pathname) return false; // Protección contra pathname null durante SSR
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header_section}>
      <div className={styles.header_top}>
        <div className={styles.topContainer + " container"}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              <Image 
                src="/images/logo.png" 
                alt="Elite Vet" 
                width={140} 
                height={45}
                priority
              />
            </Link>
          </div>
          <div className={styles.socialLinks}>
            <Link href="https://facebook.com" aria-label="Facebook" className={styles.socialIcon}>
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter" className={styles.socialIcon}>
              <i className="fa-brands fa-twitter"></i>
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram" className={styles.socialIcon}>
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link href="https://tiktok.com" aria-label="TikTok" className={styles.socialIcon}>
              <i className="fa-brands fa-tiktok"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <div className={`${styles.bottomContainer} container`}>
          <nav className={styles.mainNav}>
            <ul className={styles.nav}>
              <li><Link href="/" className={isActive('/') ? styles.active : ''}>{t('header.home')}</Link></li>
              <li><Link href="/about" className={isActive('/about') ? styles.active : ''}>{t('header.aboutUs')}</Link></li>
              <li><Link href="/services" className={isActive('/services') ? styles.active : ''}>{t('header.services')}</Link></li>
              <li><Link href="/products" className={isActive('/products') ? styles.active : ''}>{t('header.products')}</Link></li>
              <li><Link href="/media" className={isActive('/media') ? styles.active : ''}>{t('header.media')}</Link></li>
              <li><Link href="/memberships" className={isActive('/memberships') ? styles.active : ''}>{t('header.memberships')}</Link></li>
              <li><Link href="/contact" className={isActive('/contact') ? styles.active : ''}>{t('header.contact')}</Link></li>
            </ul>
          </nav>
          <div className={styles.actionButtons}>
            <LanguageSwitcher />
            <Link href="/cart" className={styles.cartButton}>
              <div className={styles.cartIcon}>
                <i className="fa-solid fa-shopping-cart"></i>
                {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
              </div>
            </Link>
            <div className={styles.accountContainer} ref={accountMenuRef}>
              <button 
                className={styles.btnPrimary} 
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                aria-expanded={showAccountMenu}
                aria-haspopup="true"
              >
                <i className="fa-solid fa-user"></i>
                <span>{t('header.account')}</span>
                <i className={`fa-solid fa-chevron-down ${showAccountMenu ? styles.rotateIcon : ''}`}></i>
              </button>
              {showAccountMenu && (
                <div className={styles.accountDropdown}>
                  <Link href="/login" className={styles.dropdownItem}>
                    <i className="fa-solid fa-sign-in-alt"></i>
                    <span>{t('header.login')}</span>
                  </Link>
                  <Link href="/register" className={styles.dropdownItem}>
                    <i className="fa-solid fa-user-plus"></i>
                    <span>{t('header.register')}</span>
                  </Link>
                </div>
              )}
            </div>
            <Link href="/appointment" className={styles.btnPrimary}>
              <i className="fa-solid fa-calendar-check"></i>
              <span>{t('header.bookAppointment')}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
