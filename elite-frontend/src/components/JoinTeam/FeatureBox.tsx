import React from "react";
import styles from "./JoinTeam.module.css";

export interface FeatureBoxProps {
  icon: string;
  title: string;
  description: string;
  delay: string;
}

export default function FeatureBox({ icon, title, description, delay }: FeatureBoxProps) {
  return (
    <div className={`${styles.featureCol} ${styles.fadeInUp}`} style={{ animationDelay: delay }}>
      <div className={styles.iconBox}>
        <div className={styles.iconWrapper}>
          <span className={styles.iconCell}>
            <i className={`fas ${icon}`} />
          </span>
        </div>
        <div className={styles.iconContent}>
          <h4 className={styles.featureTitle}>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
