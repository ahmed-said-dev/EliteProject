import React from 'react';
import styles from '@/styles/components/AppointmentIntro.module.css';
import { FeatureBox } from './FeatureBox';

export const AppointmentIntro = () => {
  return (
    <section className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colLeft}>
            <div className={styles.sectionHead}>
              <div className={styles.subTitle}>
                <span className={styles.textPrimary}>Pet Care Appointments</span>
              </div>
              <h2 className={styles.title}>Schedule Your Pet's Appointment Today</h2>
              <p className={styles.text}>
                At Elite Vet, we believe that timely veterinary care is
                crucial for maintaining your pet's optimal health. Our
                user-friendly online booking system allows you to easily
                schedule appointments that fit your busy lifestyle.
              </p>
              <p className={styles.text}>
                Simply select your preferred date and time, and our system
                will guide you through the booking process.
              </p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.featureRow}>
                <FeatureBox 
                  icon="fas fa-paw" 
                  title="Pet Care Excellence" 
                  description="Professional veterinary services for your pets"
                  delay="0.2s"
                />
                <FeatureBox 
                  icon="fas fa-calendar-check" 
                  title="Easy Booking" 
                  description="Simple online appointment scheduling"
                  delay="0.4s"
                />
              </div>
            </div>
            <div className={styles.cta}>
              <a className={styles.btnPrimary} href="#appointment-form">
                Book Appointment
              </a>
              <p className={styles.ctaText}>
                Don't wait. Schedule your pet's appointment today and ensure
                their continued health and well-being.
              </p>
            </div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.introMedia}>
              <img
                className={styles.image}
                alt="Veterinary Care"
                src="/images/about/img5.webp"
              />
              <div className={styles.experienceCard}>
                <div className={styles.expContent}>
                  <h2 className={styles.expNumber}>20+</h2>
                  <p className={styles.mb0}>Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
