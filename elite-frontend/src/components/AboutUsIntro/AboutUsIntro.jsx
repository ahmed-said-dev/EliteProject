import React from "react";
import styles from "./AboutUsIntro.module.css";
import { 
  FaPaw, 
  FaStethoscope, 
  FaXRay, 
  FaCapsules, 
  FaUserMd, 
  FaClinicMedical,
  FaPhoneAlt,
  FaArrowRight,
  FaPhone,
  FaMicrophone,
  FaVideo,
  FaComment
} from "react-icons/fa";
import AboutUsInfoCollapse from "./AboutUsInfoCollapse/AboutUsInfoCollapse";

export default function AboutUsIntro() {
  return (
    <>
      <section className={`content-inner ${styles.contentInner}`}>
        <div className={`container ${styles.container}`}>
          <div className={`row ${styles.contentWrapper}`}>

            <div className={`col-xl-6 ${styles.colXl6}`}>
              <div className={styles.contentSection}>
                <h2 className={styles.title}>Who We Are</h2>
                <p className={styles.description}>
                  At Elite Clinic, we're passionate about providing state-of-the-art
                  veterinary care for your beloved pets. Since the establishment of our pet
                  clinic in 2013, we've been dedicated to delivering exceptional medical
                  services and compassionate care, helping more than 200,000,000 pets
                  through the years and earning the trust of pet owners across Saudi
                  Arabia and the Gulf region.
                </p>
                <div className={styles.services}>
                  <div className={styles.serviceItem}>
                    <FaPaw className={styles.icon} />
                    <span>Advanced Pet Care</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaStethoscope className={styles.icon} />
                    <span>Emergency Services</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaXRay className={styles.icon} />
                    <span>Diagnostic Imaging</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaUserMd className={styles.icon} />
                    <span>Expert Veterinarians</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaCapsules className={styles.icon} />
                    <span>Pharmacy Services</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaClinicMedical className={styles.icon} />
                    <span>Surgery Center</span>
                  </div>
                </div>
                <div className={styles.actionArea}>
                  <a href="/appointment" className={styles.appointmentButton}>
                    Book an Appointment
                    <span className={styles.rightIcon}>
                      <FaArrowRight />
                    </span>
                  </a>
                  <div className={styles.emergencyHotline}>
                    <div className={styles.hotlineIcon}>
                      <FaPhoneAlt />
                    </div>
                    <div className={styles.hotlineContent}>
                      <span>Emergency Hotline</span>
                      <strong>+966 123 456 789</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-xl-6 ${styles.colXl6}`}>
              <AboutUsInfoCollapse />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
