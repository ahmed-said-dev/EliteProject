import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

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
            <Link href="#" aria-label="Globe" className={styles.socialIcon}>
              <i className="fa-solid fa-globe"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <div className={`${styles.bottomContainer} container`}>
          <nav className={styles.mainNav}>
            <ul className={styles.nav}>
              <li><Link href="/" className={isActive('/') ? styles.active : ''}>Home</Link></li>
              <li><Link href="/about" className={isActive('/about') ? styles.active : ''}>About Us</Link></li>
              <li><Link href="/services" className={isActive('/services') ? styles.active : ''}>Services</Link></li>
              <li><Link href="/products" className={isActive('/products') ? styles.active : ''}>Products</Link></li>
              <li><Link href="/media" className={isActive('/media') ? styles.active : ''}>Media</Link></li>
              <li><Link href="/memberships" className={isActive('/memberships') ? styles.active : ''}>Memberships</Link></li>
              <li><Link href="/contact" className={isActive('/contact') ? styles.active : ''}>Contact</Link></li>
            </ul>
          </nav>
          <div className={styles.actionButtons}>
            <Link href="/login" className={styles.btnPrimary}>
              <i className="fa-solid fa-user"></i>
              <span>Login</span>
            </Link>
            <Link href="/register" className={styles.btnPrimary}>
              <i className="fa-solid fa-user-plus"></i>
              <span>Register</span>
            </Link>
            <Link href="/appointment" className={styles.btnPrimary}>
              <i className="fa-solid fa-calendar-check"></i>
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
