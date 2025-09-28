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
  }[] | any; 
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
  specialties = [], 
  socialLinks,
}) => {
  const specialtiesArray = Array.isArray(specialties) ? specialties : [];
  
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
              
            </h3>
            <span className={styles.teamPosition}>{position}</span>
          </div>
          <Link href="#" className={styles.detailButton}>
            <i className="feather icon-arrow-right" />
          </Link>
        </div>
        <ul className={styles.socialLinks}>
          {socialLinks.map((link, index) => {
            // إزالة http://localhost:3000/ من بداية الرابط إذا كان موجودًا
            const cleanUrl = link.url && link.url.startsWith('http://localhost:3000/') 
              ? link.url.replace('http://localhost:3000/', '') 
              : link.url;
              
            return (
              <li key={index}>
                <a href={cleanUrl} target="_blank" rel="noopener noreferrer">
                  <i className={link.icon} />
                </a>
              </li>
            );
          })}
        </ul>
        <div className={styles.teamInfo}>
          <ul>
            {specialtiesArray.length > 0 ? (
              specialtiesArray.map((specialty, index) => (
                <li key={index}>
                  <i className={specialty.icon} /> {specialty.text}
                </li>
              ))
            ) : (
              <li>
                <i className="fas fa-check" /> General Veterinary Care
              </li>
            )}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default TeamMember;
