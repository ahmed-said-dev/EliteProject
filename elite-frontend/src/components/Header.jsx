import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header_section}>
      <div className={styles.header_top}>
        <div className={styles.topContainer + " container"}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              <Image 
                src="/images/elite-vet-logo.svg" 
                alt="Elite Vet" 
                width={140} 
                height={45}
                priority
              />
            </Link>
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
      </div>
      <div className={styles.header_bottom}>
        <div className={styles.bottomContainer + " container"}>
          <div className={styles.navContainer}>
            <nav className={styles.mainNav}>
              <ul className={styles.nav}>
                <li><Link href="/" className={styles.active}>الرئيسية</Link></li>
                <li><Link href="/about">من نحن</Link></li>
                <li><Link href="/services">خدماتنا</Link></li>
                <li><Link href="/products">منتجاتنا</Link></li>
                <li><Link href="/media">الوسائط</Link></li>
                <li><Link href="/memberships">العضويات</Link></li>
                <li><Link href="/contact">اتصل بنا</Link></li>
              </ul>
            </nav>
            <Link href="/book-an-appointment" className={styles.btnPrimary}>
              حجز موعد
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
