import React from "react";
import styles from "./TeamSection.module.css";
import TeamMember, { TeamMemberProps } from "./TeamMember";

const teamMembers: TeamMemberProps[] = [
  {
    name: "Dr. Doctor Name",
    position: "Chief Veterinarian",
    imageSrc: "/images/team/img1.webp",
    isActive: true,
    animationDelay: "0.2s",
    specialties: [
      { icon: "fas fa-paw", text: "Pet Internal Medicine Specialist" },
      { icon: "fas fa-heartbeat", text: "Advanced Pet Diagnostics" },
      { icon: "fas fa-certificate", text: "Certified in Pet Nutrition" },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/", icon: "fa-brands fa-linkedin" },
      { platform: "Instagram", url: "https://www.instagram.com/", icon: "fa-brands fa-instagram" },
      { platform: "Facebook", url: "https://www.facebook.com/", icon: "fa-brands fa-facebook-f" },
    ],
  },
  {
    name: "Dr. Doctor Name",
    position: "Pet Surgeon",
    imageSrc: "/images/team/img2.webp",
    isActive: false,
    animationDelay: "0.4s",
    specialties: [
      { icon: "fas fa-bone", text: "Orthopedic Surgery Expert" },
      { icon: "fas fa-microscope", text: "Advanced Pet Surgery" },
      { icon: "fas fa-hospital", text: "Emergency Pet Care" },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/", icon: "fa-brands fa-linkedin" },
      { platform: "Instagram", url: "https://www.instagram.com/", icon: "fa-brands fa-instagram" },
      { platform: "Facebook", url: "https://www.facebook.com/", icon: "fa-brands fa-facebook-f" },
    ],
  },
  {
    name: "Dr. Doctor Name",
    position: "Pet Dermatologist",
    imageSrc: "/images/team/img3.webp",
    isActive: false,
    animationDelay: "0.6s",
    specialties: [
      { icon: "fas fa-allergies", text: "Pet Dermatology Expert" },
      { icon: "fas fa-shield-alt", text: "Pet Allergy Treatment" },
      { icon: "fas fa-pills", text: "Advanced Skin Therapy" },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/", icon: "fa-brands fa-linkedin" },
      { platform: "Instagram", url: "https://www.instagram.com/", icon: "fa-brands fa-instagram" },
      { platform: "Facebook", url: "https://www.facebook.com/", icon: "fa-brands fa-facebook-f" },
    ],
  },
  {
    name: "Dr. Doctor Name",
    position: "Pet Nutritionist",
    imageSrc: "/images/team/img4.webp",
    isActive: false,
    animationDelay: "0.8s",
    specialties: [
      { icon: "fas fa-utensils", text: "Pet Nutrition Expert" },
      { icon: "fas fa-weight", text: "Pet Weight Management" },
      { icon: "fas fa-carrot", text: "Special Diet Formulations" },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/", icon: "fa-brands fa-linkedin" },
      { platform: "Instagram", url: "https://www.instagram.com/", icon: "fa-brands fa-instagram" },
      { platform: "Facebook", url: "https://www.facebook.com/", icon: "fa-brands fa-facebook-f" },
    ],
  },
];

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
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
