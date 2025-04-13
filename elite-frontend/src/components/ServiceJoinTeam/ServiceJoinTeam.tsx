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

      </div>
    </section>
  );
}
