import React from "react";
import styles from "./TeamSection.module.css";
import Image from "next/image";
import Link from "next/link";

export interface TeamMemberProps {
  name: string;
  position: string;
  imageSrc: string;
  isActive?: boolean;
  animationDelay?: string;
  specialties: {
    icon: string;
    text: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  position,
  imageSrc,
  isActive = false,
  animationDelay = "0.2s",
  specialties,
  socialLinks,
}) => {
  return (
    <div 
      className={`${styles.teamCol} ${styles.fadeInUp}`} 
      style={{ animationDelay }}
    >
      <div className={`${styles.teamCard} ${isActive ? styles.active : ""}`}>
        <div className={styles.teamMedia}>
          <Image
            src={imageSrc}
            alt={position}
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
              <Link href="/team-detail">{name}</Link>
            </h3>
            <span className={styles.teamPosition}>{position}</span>
          </div>
          <Link href="/team-detail" className={styles.detailButton}>
            <i className="feather icon-arrow-right" />
          </Link>
        </div>
        <ul className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <i className={link.icon} />
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.teamInfo}>
          <ul>
            {specialties.map((specialty, index) => (
              <li key={index}>
                <i className={specialty.icon} /> {specialty.text}
              </li>
            ))}
          </ul>
          <Link href="/doctor-details" className={styles.readMoreButton}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
