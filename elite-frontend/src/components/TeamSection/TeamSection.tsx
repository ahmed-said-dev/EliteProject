import React from "react";
import styles from "./TeamSection.module.css";
import Image from "next/image";
import Link from "next/link";

export default function TeamSection() {
  return (
    <section className={styles.sectionTeam}>
      <div className={styles.backgroundShapes}>
        <i className={`fas fa-paw ${styles.petShape} ${styles.pawPrint1}`} />
        <i className={`fas fa-paw ${styles.petShape} ${styles.pawPrint2}`} />
        <i className={`fas fa-paw ${styles.petShape} ${styles.pawPrint3}`} />
        <i className={`fas fa-heart ${styles.petShape} ${styles.heartShape}`} />
        <i className={`fas fa-stethoscope ${styles.petShape} ${styles.stethoscopeShape}`} />
      </div>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className={`${styles.col12} ${styles.fadeInUp}`}>
            <h2 className={styles.title}>Meet Our Expert Veterinary Team</h2>
            <div className={styles.teamIntro}>
              <i className={`fas fa-paw ${styles.introIcon}`} />
              <p className={styles.introText}>
                Our pet clinic has a team of highly skilled veterinarians
                committed to providing top-notch care for your furry
                companions. Our consultants hold advanced degrees from
                renowned international universities and bring years of
                experience to the table.
              </p>
              <p className={styles.introText2}>
                They're passionate about animal health and dedicated to
                providing the best possible medical services.
              </p>
              <div className={styles.expertiseHighlight}>
                <i className={`fas fa-medal ${styles.medalIcon}`} />
                <span>
                  Our expert surgeons are skilled in handling a wide range of
                  cases, ensuring that your pet receives the highest quality
                  care.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.teamRow}>
          {/* Team Member 1 */}
          <div className={`${styles.teamCol} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
            <div className={`${styles.teamCard} ${styles.active}`}>
              <div className={styles.teamMedia}>
                <Image
                  src="/images/team/img1.webp"
                  alt="Chief Veterinarian"
                  width={500}
                  height={650}
                  className={styles.teamImage}
                />
                <Link href="/appointment" className={styles.appointmentButton}>
                  <i className="feather icon-calendar mr-2" />
                  Book Appointment
                </Link>
              </div>
              <div className={styles.teamContent}>
                <div className={styles.clearfix}>
                  <h3 className={styles.teamName}>
                    <Link href="/team-detail">Dr. Doctor Name</Link>
                  </h3>
                  <span className={styles.teamPosition}>Chief Veterinarian</span>
                </div>
                <Link href="/team-detail" className={styles.detailButton}>
                  <i className="feather icon-arrow-right" />
                </Link>
              </div>
              <ul className={styles.socialLinks}>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
              </ul>
              <div className={styles.teamInfo}>
                <ul>
                  <li>
                    <i className="fas fa-paw" /> Pet Internal Medicine Specialist
                  </li>
                  <li>
                    <i className="fas fa-heartbeat" /> Advanced Pet Diagnostics
                  </li>
                  <li>
                    <i className="fas fa-certificate" /> Certified in Pet Nutrition
                  </li>
                </ul>
                <Link href="/doctor-details" className={styles.readMoreButton}>
                  Read More
                </Link>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className={`${styles.teamCol} ${styles.fadeInUp}`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.teamCard}>
              <div className={styles.teamMedia}>
                <Image
                  src="/images/team/img2.webp"
                  alt="Pet Surgeon"
                  width={500}
                  height={650}
                  className={styles.teamImage}
                />
                <Link href="/appointment" className={styles.appointmentButton}>
                  <i className="feather icon-calendar mr-2" />
                  Book Appointment
                </Link>
              </div>
              <div className={styles.teamContent}>
                <div className={styles.clearfix}>
                  <h3 className={styles.teamName}>
                    <Link href="/team-detail">Dr. Doctor Name</Link>
                  </h3>
                  <span className={styles.teamPosition}>Pet Surgeon</span>
                </div>
                <Link href="/team-detail" className={styles.detailButton}>
                  <i className="feather icon-arrow-right" />
                </Link>
              </div>
              <ul className={styles.socialLinks}>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
              </ul>
              <div className={styles.teamInfo}>
                <ul>
                  <li>
                    <i className="fas fa-bone" /> Orthopedic Surgery Expert
                  </li>
                  <li>
                    <i className="fas fa-microscope" /> Advanced Pet Surgery
                  </li>
                  <li>
                    <i className="fas fa-hospital" /> Emergency Pet Care
                  </li>
                </ul>
                <Link href="/doctor-details" className={styles.readMoreButton}>
                  Read More
                </Link>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className={`${styles.teamCol} ${styles.fadeInUp}`} style={{ animationDelay: '0.6s' }}>
            <div className={styles.teamCard}>
              <div className={styles.teamMedia}>
                <Image
                  src="/images/team/img3.webp"
                  alt="Pet Dermatologist"
                  width={500}
                  height={650}
                  className={styles.teamImage}
                />
                <Link href="/appointment" className={styles.appointmentButton}>
                  <i className="feather icon-calendar mr-2" />
                  Book Appointment
                </Link>
              </div>
              <div className={styles.teamContent}>
                <div className={styles.clearfix}>
                  <h3 className={styles.teamName}>
                    <Link href="/team-detail">Dr. Doctor Name</Link>
                  </h3>
                  <span className={styles.teamPosition}>Pet Dermatologist</span>
                </div>
                <Link href="/team-detail" className={styles.detailButton}>
                  <i className="feather icon-arrow-right" />
                </Link>
              </div>
              <ul className={styles.socialLinks}>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
              </ul>
              <div className={styles.teamInfo}>
                <ul>
                  <li>
                    <i className="fas fa-allergies" /> Pet Dermatology Expert
                  </li>
                  <li>
                    <i className="fas fa-shield-alt" /> Pet Allergy Treatment
                  </li>
                  <li>
                    <i className="fas fa-pills" /> Advanced Skin Therapy
                  </li>
                </ul>
                <Link href="/doctor-details" className={styles.readMoreButton}>
                  Read More
                </Link>
              </div>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className={`${styles.teamCol} ${styles.fadeInUp}`} style={{ animationDelay: '0.8s' }}>
            <div className={styles.teamCard}>
              <div className={styles.teamMedia}>
                <Image
                  src="/images/team/img4.webp"
                  alt="Pet Nutritionist"
                  width={500}
                  height={650}
                  className={styles.teamImage}
                />
                <Link href="/appointment" className={styles.appointmentButton}>
                  <i className="feather icon-calendar mr-2" />
                  Book Appointment
                </Link>
              </div>
              <div className={styles.teamContent}>
                <div className={styles.clearfix}>
                  <h3 className={styles.teamName}>
                    <Link href="/team-detail">Dr. Doctor Name</Link>
                  </h3>
                  <span className={styles.teamPosition}>Pet Nutritionist</span>
                </div>
                <Link href="/team-detail" className={styles.detailButton}>
                  <i className="feather icon-arrow-right" />
                </Link>
              </div>
              <ul className={styles.socialLinks}>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
              </ul>
              <div className={styles.teamInfo}>
                <ul>
                  <li>
                    <i className="fas fa-utensils" /> Pet Nutrition Expert
                  </li>
                  <li>
                    <i className="fas fa-weight" /> Pet Weight Management
                  </li>
                  <li>
                    <i className="fas fa-carrot" /> Special Diet Formulations
                  </li>
                </ul>
                <Link href="/doctor-details" className={styles.readMoreButton}>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
