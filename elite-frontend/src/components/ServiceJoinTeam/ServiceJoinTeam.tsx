import React from "react";
import styles from "./ServiceJoinTeam.module.css";

export default function ServiceJoinTeam() {
  return (
    <section
      className={styles.sectionWrapper}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <section className={styles.contentInner}>
            <div className={styles.container}>
              <div className={styles.sectionHead}>
                <div className={styles.circleAnimation}>
                  <div className={styles.circle1}>
                    <span />
                  </div>
                  <div className={styles.circle2}>
                    <span />
                  </div>
                </div>
                <div className={styles.subTitle}>
                  <span className={styles.titleBadge}>
                    <i className="fas fa-stethoscope me-2" />
                    Elite Care
                  </span>
                </div>
                <h2 className={styles.title}>
                  Our Services
                </h2>
                <div className={styles.descriptionWrapper}>
                  <p className={styles.subText}>
                    At Elite Vet, your pet's health is our top priority. 
                    
                    As a leading Riyadh veterinary clinic, we offer a comprehensive range of veterinary services to keep your furry companions happy and healthy. 
                    
                    From routine check-ups to advanced surgical procedures, our experienced team is dedicated to providing the highest quality care.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className={styles.sectionFull}>
          <div className={styles.container}>
            <div className={styles.row}>
              {/* Medical Services Box */}
              <div className={styles.serviceCol}>
                <div className={styles.iconBxWrapper}>
                  <div className={styles.iconContent}>
                    <div className={styles.iconGroup}>
                      <span className={styles.iconCell}>
                        <i className="fas fa-microscope" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-allergies" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-heartbeat" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-shield-virus" />
                      </span>
                    </div>
                    <div className={styles.cardImageWrapper}>
                      <img
                        className={styles.cardImage}
                        alt="Veterinary Care"
                        src="https://i.pinimg.com/736x/25/27/a6/2527a62d7918216e5e81b37c7c280fa3.jpg"
                      />
                      <div className={styles.cardImageOverlay} />
                    </div>
                    <h3 className={styles.dzTitle}>
                      Our Medical Services
                    </h3>
                    <ul className={styles.serviceList}>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Internal Medicine: Expert diagnosis and treatment of internal diseases
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Skin & Immune Care: Advanced treatments for skin and immune disorders
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Heart Disease: State-of-the-art cardiac care and procedures
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Isolation Care: Safe environment for infectious disease treatment
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Bird Care: Specialized avian healthcare services
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Respiratory Care: Treatment for breathing conditions
                      </li>
                    </ul>
                    <div className={styles.specialtyTags}>
                      <span className={styles.textBadge}>
                        <i className="fa fa-circle text-primary" /> Elite Care
                      </span>
                    </div>
                  </div>
                  <div className={styles.iconBxFooter}>
                    <a
                      className={styles.readMoreBtn}
                      href="#"
                    >
                      Read More
                    </a>
                    <a
                      className={styles.btnPrimary}
                      href="#"
                    >
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hygiene & Appearance Care Box */}
              <div className={styles.serviceCol}>
                <div className={styles.iconBxWrapper}>
                  <div className={styles.iconContent}>
                    <div className={styles.iconGroup}>
                      <span className={styles.iconCell}>
                        <i className="fas fa-cut" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-tooth" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-shower" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-paw" />
                      </span>
                    </div>
                    <div className={styles.cardImageWrapper}>
                      <img
                        className={styles.cardImage}
                        alt="Pet Grooming Services"
                        src="https://i.pinimg.com/736x/47/4c/e3/474ce366e734558eeb16343879554f44.jpg"
                      />
                      <div className={styles.cardImageOverlay} />
                    </div>
                    <h3 className={styles.dzTitle}>
                      Hygiene & Appearance Care
                    </h3>
                    <ul className={styles.serviceList}>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Teeth Cleaning: Professional dental care for optimal oral health
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Nail Clipping: Safe and precise nail trimming services
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Ear Cleaning: Thorough cleaning to prevent infections
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Bathing & Drying: Premium grooming with quality products
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Hair Combing: Professional detangling and mat removal
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Hair Cutting: Breed-specific and custom styling options
                      </li>
                    </ul>
                    <div className={styles.specialtyTags}>
                      <span className={styles.textBadge}>
                        <i className="fa fa-circle text-primary" /> Premium Care
                      </span>
                    </div>
                  </div>
                  <div className={styles.iconBxFooter}>
                    <a
                      className={styles.readMoreBtn}
                      href="#"
                    >
                      Read More
                    </a>
                    <a
                      className={styles.btnPrimary}
                      href="#"
                    >
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Diagnostics Box */}
              <div className={styles.serviceCol}>
                <div className={`${styles.iconBxWrapper} ${styles.active}`}>
                  <div className={styles.iconContent}>
                    <div className={styles.iconGroup}>
                      <span className={styles.iconCell}>
                        <i className="fas fa-microscope" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-x-ray" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-vial" />
                      </span>
                      <span className={styles.iconCell}>
                        <i className="fas fa-laptop-medical" />
                      </span>
                    </div>
                    <div className={styles.cardImageWrapper}>
                      <img
                        className={styles.cardImage}
                        alt="Veterinary Diagnostics"
                        src="https://i.pinimg.com/736x/9c/d5/2b/9cd52b4ce0a7902864145dab137576f1.jpg"
                      />
                      <div className={styles.cardImageOverlay} />
                    </div>
                    <h3 className={styles.dzTitle}>
                      Advanced Diagnostics
                    </h3>
                    <ul className={styles.serviceList}>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Laboratory Testing: Comprehensive blood and urine analysis
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Digital X-Ray: High-resolution imaging for accurate diagnosis
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Ultrasound: Non-invasive internal organ examination
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Endoscopy: Minimally invasive internal visualization
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        MRI & CT Scans: Advanced imaging for complex cases
                      </li>
                      <li>
                        <i className="fas fa-check-circle text-primary me-2" />
                        Immediate Results: Quick diagnosis for faster treatment
                      </li>
                    </ul>
                    <div className={styles.specialtyTags}>
                      <span className={styles.textBadge}>
                        <i className="fa fa-circle text-primary" /> Advanced Technology
                      </span>
                    </div>
                  </div>
                  <div className={styles.iconBxFooter}>
                    <a
                      className={styles.readMoreBtn}
                      href="#"
                    >
                      Read More
                    </a>
                    <a
                      className={styles.btnPrimary}
                      href="#"
                    >
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
