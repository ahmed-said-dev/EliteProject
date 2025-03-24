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
      <section className={`content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden ${styles.contentInner}`}> 
        <div className={styles.overlay} />
        <div className={`container ${styles.container}`}>
          <div className={`row content-wrapper style-7 align-items-center ${styles.contentWrapper}`}>
            <div className={`col-lg-6 m-b30 wow fadeInUp ${styles.column} ${styles.fadeInUp}`}> 
              <div className={`section-head style-1 m-b30 ${styles.sectionHead}`}>
                <h2 className={`title text-white m-b0 wow fadeInUp ${styles.title}`}>
                  Why Choose Elite Vet?
                  <br />
                  Your Pet's Well-being, Our Priority
                </h2>
              </div>
              <div className={`row row-wrapper g-5 ${styles.rowWrapper}`}> 
                {benefits.map((item, index) => (
                  <div key={index} className={`col-sm-6 ${styles.column}`}> 
                    <div 
                      className={`icon-bx-wraper style-4 text-center text-white wow fadeInUp ${styles.iconBxWrapper}`} 
                      style={{ animationDelay: item.delay }}
                    > 
                      <div className={`icon-bx bg-primary ${styles.iconBx}`}>
                        <span className="icon-cell">
                          <i className={`fas fa-${item.icon} fa-2x`} />
                        </span>
                      </div>
                      <div className={`icon-content ${styles.iconContent}`}>
                        <h3 className={`dz-title ${styles.dzTitle}`}>
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
            <div className={`col-lg-6 m-b30 wow fadeInUp ${styles.column} ${styles.fadeInUp}`}> 
              <div className={`content-media ${styles.contentMedia}`}>
                <div className={`dz-media ${styles.dzMedia}`}>
                  <img 
                    src="/images/About-us/img5.webp" 
                    alt="Elite Vet Experience" 
                    className={styles.image} 
                  />
                </div>
                <div className={`item1 ${styles.item1}`}>
                  <div className={`info-widget style-11 bg-primary text-center ${styles.infoWidget}`}>
                    <span className={`content-text text-white ${styles.contentText}`}>
                      <span className="counter">20</span>
                      <span className={styles.counterSpan}>+</span> 
                    </span>
                    <h3 className={`title m-b0 text-white ${styles.title}`}>
                      Years
                      <br />
                      Experienced
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Remove the inline <style> tag */}
    </>
  );
}
