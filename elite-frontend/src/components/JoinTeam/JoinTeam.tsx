import React from "react";
import styles from "./JoinTeam.module.css";
import CareerForm from "./CareerForm";
import FeatureBox, { FeatureBoxProps } from "./FeatureBox";

export default function JoinTeam() {
  // Feature boxes data
  const features: FeatureBoxProps[] = [
    {
      icon: "fa-heartbeat",
      title: "Passionate Care",
      description: "Join a team that puts pet care first",
      delay: "0.2s"
    },
    {
      icon: "fa-graduation-cap",
      title: "Growth Opportunities",
      description: "Continuous learning & development",
      delay: "0.4s"
    },
    {
      icon: "fa-users",
      title: "Supportive Team",
      description: "Work with experienced professionals",
      delay: "0.6s"
    },
    {
      icon: "fa-medal",
      title: "Excellence",
      description: "State-of-the-art facilities & equipment",
      delay: "0.8s"
    }
  ];

  return (
    <section id="join-veterinary-team" className={styles.sectionWrapper}>
      <div className={styles.sectionShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}>
          <i className={`fas fa-paw ${styles.floatingPaw}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape2}`}>
          <i className={`fas fa-stethoscope ${styles.floatingPlus}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape3}`}>
          <i className={`fas fa-bone ${styles.floatingPaw}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape4}`}>
          <i className={`fas fa-heart ${styles.floatingHeart}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape5}`}>
          <i className={`fas fa-fish ${styles.floatingPlus}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape6}`}>
          <i className={`fas fa-cat ${styles.floatingPaw}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape7}`}>
          <i className={`fas fa-clinic-medical ${styles.floatingPlus}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape8}`}>
          <i className={`fas fa-dog ${styles.floatingPaw}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape9}`}>
          <i className={`fas fa-microscope ${styles.floatingPlus}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape10}`}>
          <i className={`fas fa-pills ${styles.floatingHeart}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape11}`}>
          <i className={`fas fa-syringe ${styles.floatingPlus}`} />
        </div>
        <div className={`${styles.shape} ${styles.shape12}`}>
          <i className={`fas fa-user-md ${styles.floatingPaw}`} />
        </div>
        <div className={styles.wavyLine} />
        <div className={styles.dottedPattern} />
        <div className={styles.crossPattern} />
        <div className={`${styles.floatingCircle} ${styles.circle1}`} />
        <div className={`${styles.floatingCircle} ${styles.circle2}`} />
        <div className={`${styles.floatingCircle} ${styles.circle3}`} />
        <div className={`${styles.floatingCircle} ${styles.circle4}`} />
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <div className={styles.sectionHead}>
              <h2 className={styles.title}>
                Join Our Veterinary Team
                <br />
                <span className={styles.textPrimary}>Make a Difference</span>
              </h2>
              <p className={styles.small}>
                As a leading pet clinic, we're always seeking compassionate and skilled individuals to join our dedicated team of veterinary professionals.
              </p>
            </div>
            <div className={styles.featuresRow}>
              {features.map((feature, index) => (
                <FeatureBox
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={feature.delay}
                />
              ))}
            </div>
          </div>
          <div className={styles.rightColumn}>
            <CareerForm />
          </div>
        </div>
      </div>
    </section>
  );
}
