import React from 'react';
import Image from 'next/image';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  return (
    <section
      className={styles.whyChooseSection}
      style={{
        backgroundImage: 'url(/images/background/bg1.webp)',
      }}
    >
      <div className="container">
        <div className={`row ${styles.contentWrapper}`}>
          <div className={`col-lg-6 ${styles.mediaColumn}`}>
            <div className={`wow fadeInUp ${styles.contentMedia}`} data-wow-delay="0.2s" data-wow-duration="0.7s">
              <div className={styles.mediaWrapper}>
                <Image 
                  src="/images/about/img5.webp" 
                  alt="Elite Vet Experience"
                  width={540}
                  height={405}
                  className={styles.mainImage}
                />
              </div>
              <div className={styles.experienceBox}>
                <div className={`${styles.infoWidget} text-center`}>
                  <span className={styles.counterText}>
                    <span className={styles.counter}>20</span>+
                  </span>
                  <h3 className={styles.title}>
                    Years <br />
                    Experienced
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles.sectionHead}>
              <h2 className={`wow fadeInUp ${styles.title}`} data-wow-delay="0.2s" data-wow-duration="0.7s">
                Why Choose Elite Vet?<br/>
                Your Pet&apos;s Well-being, Our Priority
              </h2>
            </div>
            <div className={`row g-5 ${styles.featuresGrid}`}>
              {[
                {
                  icon: 'fas fa-paw',
                  title: 'Personalized Care',
                  description: 'We develop tailored treatment plans that consider your pet&apos;s unique needs, health history, and lifestyle.',
                  delay: '0.4s'
                },
                {
                  icon: 'fas fa-microscope',
                  title: 'Latest Technology',
                  description: 'Our clinic is equipped with cutting-edge diagnostic and treatment equipment for accurate and efficient pet care.',
                  delay: '0.6s'
                },
                {
                  icon: 'fas fa-user-md',
                  title: 'Compassionate Staff',
                  description: 'Our dedicated team of veterinary professionals treats each pet with love, care, and respect.',
                  delay: '0.8s'
                },
                {
                  icon: 'fas fa-hospital-symbol',
                  title: 'Emergency Care',
                  description: 'Available 24/7 for your pet&apos;s urgent medical needs with quick response times and expert care.',
                  delay: '1.0s'
                }
              ].map((feature, index) => (
                <div key={index} className="col-sm-6">
                  <div 
                    className={`wow fadeInUp ${styles.iconBox}`}
                    data-wow-delay={feature.delay}
                    data-wow-duration="0.7s"
                  >
                    <div className={styles.iconWrapper}>
                      <span className={styles.iconCell}>
                        <i className={`${feature.icon} fa-2x`}></i>
                      </span>
                    </div>
                    <div className={styles.iconContent}>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
