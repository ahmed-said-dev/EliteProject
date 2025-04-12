import React from "react";
import styles from './EliteVetAboutSection.module.css';
import { FaCircle, FaBriefcaseMedical } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

export default function EliteVetAboutSection() {
  return (
    <section className={styles.contentInner} dir="rtl">
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colRight}>
            <div className={styles.imageWrapper}>
              <img
                src="/AboutUs/img8.webp"
                alt="Elite Veterinary Care Facility"
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.colLeft}>
            <div className={styles.sectionHead}>
              <h2 className={styles.title}>
                Elite Veterinary Care
                <br />
                Setting New Standards in Pet Healthcare
              </h2>
              <p className={styles.description}>
                At Elite Vet, we understand that pets are family. Our state-of-the-art facility 
                combines cutting-edge veterinary technology with compassionate care, ensuring 
                your pets receive the highest quality medical attention in a warm and welcoming 
                environment.
              </p>
            </div>
            
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <FaCircle className={styles.iconSvg} />
              </div>
              <div className={styles.iconContent}>
                <h3 className={styles.iconTitle}>Our Vision</h3>
                <p className={styles.iconText}>
                  To be recognized as the leading veterinary care provider in Saudi Arabia 
                  and the Gulf region, setting the gold standard in pet healthcare through 
                  innovation, expertise, and compassionate service. We aspire to create a 
                  future where every pet has access to world-class medical care.
                </p>
              </div>
            </div>

            <div className={`${styles.iconBox} ${styles.right}`}>
              <div className={styles.icon}>
                <FaBriefcaseMedical className={styles.iconSvg} />
              </div>
              <div className={styles.iconContent}>
                <h3 className={styles.iconTitle}>Our Mission</h3>
                <p className={styles.iconText}>
                  To deliver exceptional veterinary care through our team of highly skilled 
                  professionals, utilizing advanced medical technology and evidence-based 
                  practices. We are committed to:
                </p>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <BsCheckCircleFill className={styles.checkIcon} />
                    <span>Providing comprehensive medical care for all types of pets</span>
                  </li>
                  <li className={styles.listItem}>
                    <BsCheckCircleFill className={styles.checkIcon} />
                    <span>Offering 24/7 emergency veterinary services</span>
                  </li>
                  <li className={styles.listItem}>
                    <BsCheckCircleFill className={styles.checkIcon} />
                    <span>Educating pet owners about preventive care</span>
                  </li>
                  <li className={styles.listItem}>
                    <BsCheckCircleFill className={styles.checkIcon} />
                    <span>Maintaining the highest standards of veterinary medicine</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
