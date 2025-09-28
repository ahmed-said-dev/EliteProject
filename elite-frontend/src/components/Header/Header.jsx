import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useCart } from '@/context/SaleorCartContext';
import { useUnifiedCart } from '@/context/UnifiedCartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/SaleorAuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import useHomeServices from '@/hooks/useHomeServices';

const Header = () => {
  const pathname = usePathname();
  const { cartCount: saleorCartCount } = useCart();
  const { getCartCount: getUnifiedCartCount } = useUnifiedCart();
  const totalCartCount = saleorCartCount + getUnifiedCartCount();
  const { t, isRTL } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const accountMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  
  // Fetch services data
  const { services, pages, isLoading: servicesLoading, error: servicesError } = useHomeServices();

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
      
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setShowServicesDropdown(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest(`.${styles.burgerMenuBtn}`)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when window resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={styles.header_section} dir={isRTL ? 'rtl' : 'ltr'}>
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
            <Link href="https://www.facebook.com/EliteVetKsa/?locale=ar_AR" aria-label="Facebook" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
            <Link href="https://x.com/elitevetksa" aria-label="X" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </Link>
            <Link href="https://www.instagram.com/elitevetsa/" aria-label="Instagram" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link href="https://www.tiktok.com/@elitevetksa" aria-label="TikTok" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-tiktok"></i>
            </Link>
            <Link href="https://www.snapchat.com/@elitevetksa" aria-label="Snapchat" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-snapchat-ghost"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <div className={`${styles.bottomContainer} container`}>
          {/* Burger Menu Button (Mobile Only) */}
          <button 
            className={styles.burgerMenuBtn} 
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          {/* Desktop Nav & Mobile Nav */}
          <nav className={`${styles.mainNav} ${mobileMenuOpen ? styles.mobileNavActive : ''}`} ref={mobileMenuRef}>
            <ul className={styles.nav}>
              <li><Link href="/" className={isActive('/') ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>{t('header.home')}</Link></li>
              <li><Link href="/about" className={isActive('/about') ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>{t('header.aboutUs')}</Link></li>
              <li 
                className={styles.servicesDropdownContainer}
                ref={servicesDropdownRef}
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <Link href="/services" className={isActive('/services') ? styles.active : ''}>
                  {t('header.services')}
                  <i className={`fa-solid fa-chevron-down ${styles.dropdownIcon}`}></i>
                </Link>
                {showServicesDropdown && (
                  <div className={styles.servicesDropdown}>
                    {servicesLoading ? (
                      <div className={styles.dropdownLoading}>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Loading services...</span>
                      </div>
                    ) : servicesError ? (
                      <div className={styles.dropdownError}>
                        <span>Error loading services</span>
                      </div>
                    ) : pages && pages.length > 0 ? (
                      pages.map((service) => (
                        <Link 
                          key={service.id}
                          href={`/service-detail/${service.documentId || service.id}`}
                          className={styles.dropdownItem}
                          onClick={() => {
                            setShowServicesDropdown(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <i className={`fa-solid fa-paw ${styles.serviceIcon}`} ></i>
                          <span>{service.title}</span>
                        </Link>
                      ))
                    ) : (
                      <div className={styles.dropdownEmpty}>
                        <span>No services available</span>
                      </div>
                    )}
                  </div>
                )}
              </li>
              <li><Link href="/products" className={isActive('/products') ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>{t('header.products')}</Link></li>
              <li><Link href="/media" className={isActive('/media') ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>{t('header.media')}</Link></li>
              <li><Link href="/memberships" className={isActive('/memberships') ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>{t('header.memberships')}</Link></li>
              <li><Link href="/contact" className={isActive('/contact') ? styles.active : ''} onClick={() => setMobileMenuOpen(false)}>{t('header.contact')}</Link></li>
              <li className={styles.mobileAppointmentBtn}>
                <Link href="/appointment" className={styles.btnPrimary} onClick={() => setMobileMenuOpen(false)}>
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>{t('header.bookAppointment')}</span>
                </Link>
              </li>
            </ul>
            {/* Close button for mobile menu */}
            <button className={styles.mobileMenuClose} onClick={() => setMobileMenuOpen(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
          </nav>
          
          {/* Always visible action buttons */}
          <div className={styles.actionButtons}>
            <LanguageSwitcher />
            <Link href="/cart" className={styles.cartButton}>
              <div className={styles.cartIcon}>
                <i className="fa-solid fa-shopping-cart"></i>
                {totalCartCount > 0 && (
                  <span className={styles.cartCount}>
                    {totalCartCount > 99 ? '99+' : totalCartCount}
                  </span>
                )}
              </div>
            </Link>
            {/* <div className={styles.accountContainer} ref={accountMenuRef}>
              <button 
                className={styles.btnPrimary} 
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                aria-expanded={showAccountMenu}
                aria-haspopup="true"
              >
                <i className="fa-solid fa-user"></i>
                <span className={styles.accountText}>
                  {isAuthenticated ? `مرحباً، ${user?.firstName}` : t('header.account')}
                </span>
                <i className={`fa-solid fa-chevron-down ${showAccountMenu ? styles.rotateIcon : ''}`}></i>
              </button>
              {showAccountMenu && (
                <div className={styles.accountDropdown}>
                  {isAuthenticated ? (
                    <>
                      <Link href="/dashboard" className={styles.dropdownItem}>
                        <i className="fa-solid fa-chart-line"></i>
                        <span>لوحة التحكم</span>
                      </Link>
                      <Link href="/dashboard" className={styles.dropdownItem}>
                        <i className="fa-solid fa-shopping-bag"></i>
                        <span>طلباتي</span>
                      </Link>
                      <Link href="/dashboard" className={styles.dropdownItem}>
                        <i className="fa-solid fa-user-cog"></i>
                        <span>الملف الشخصي</span>
                      </Link>
                      <button 
                        onClick={logout} 
                        className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                      >
                        <i className="fa-solid fa-sign-out-alt"></i>
                        <span>تسجيل الخروج</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className={styles.dropdownItem}>
                        <i className="fa-solid fa-sign-in-alt"></i>
                        <span>{t('header.login')}</span>
                      </Link>
                      <Link href="/register" className={styles.dropdownItem}>
                        <i className="fa-solid fa-user-plus"></i>
                        <span>{t('header.register')}</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div> */}
            <Link href="/appointment" className={`${styles.btnPrimary} ${styles.desktopAppointmentBtn}`}>
              <i className="fa-solid fa-calendar-check"></i>
              <span>{t('header.bookAppointment')}</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && <div className={styles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;
