import React from "react";
import styles from './EliteVetBenefits.module.css'; // Assuming the CSS file is named 'EliteVetBenefits.module.css'

const benefits = [
  {
    icon: "paw",
    title: "Personalized Care",
    description: "We develop tailored treatment plans that consider your pet's unique needs, health history, and lifestyle.",
    delay: "0.4s"
  },
  {
    icon: "microscope",
    title: "Latest Technology",
    description: "Our clinic is equipped with cutting-edge diagnostic and treatment equipment for accurate and efficient pet care.",
    delay: "0.6s"
  },
  {
    icon: "user-md",
    title: "Compassionate Staff",
    description: "Our dedicated team of veterinary professionals treats each pet with love, care, and respect.",
    delay: "0.8s"
  },
  {
    icon: "hospital-symbol",
    title: "Emergency Care",
    description: "Available 24/7 for your pet's urgent medical needs with quick response times and expert care.",
    delay: "1s"
  }
];

export default function EliteVetBenefits() {
  return (
    <>
      <section className={styles.contentInner}> 
        <div className={styles.overlay} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {/* Image Column - Now first in order */}
            <div className={`${styles.column} ${styles.imageColumn} wow fadeInUp`}> 
              <div className={styles.contentMedia}>
                <div className={styles.dzMedia}>
                  <img 
                    src="/images/About-us/img5.webp" 
                    alt="Elite Vet Experience" 
                    className={styles.image} 
                  />
                </div>
                <div className={styles.item1}>
                  <div className={styles.infoWidget}>
                    <span className={styles.contentText}>
                      <span className="counter">20</span>
                      <span className={styles.counterSpan}>+</span>
                    </span>
                    <h3 className={styles.title}>
                      Years
                      <br />
                      Experienced
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Column - Now second in order */}
            <div className={`${styles.column} ${styles.contentColumn} wow fadeInUp`}> 
              <div className={styles.sectionHead}>
                <h2 className={styles.title}>
                  Why Choose Elite Vet?
                  <br />
                  Your Pet's Well-being, Our Priority
                </h2>
              </div>
              <div className={styles.rowWrapper}> 
                {benefits.map((item, index) => (
                  <div key={index} className={styles.column}> 
                    <div 
                      className={styles.iconBxWrapper} 
                      style={{ animationDelay: item.delay }}
                    > 
                      <div className={styles.iconBx}>
                        <span className="icon-cell">
                          <i className={`fas fa-${item.icon} fa-2x`} />
                        </span>
                      </div>
                      <div className={styles.iconContent}>
                        <h3 className={styles.dzTitle}>
                          {item.title}
                        </h3>
                        <p className={styles.description}> 
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
