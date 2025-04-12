import React from "react";
import styles from "./CorporateSocialResponsibility.module.css";

export default function CorporateSocialResponsibility() {
  return (
    <>
      <section className={`${styles.sectionWrapper} ${styles.clearfix}`} dir="ltr">
        <div className={styles.container}>
          <div className={`${styles.contentWrapper}`}>
            <div className={styles.mediaColumn}>
              <div className={styles.contentMedia}>
                <div className={styles.dzMedia}>
                  <img
                    src="/AboutUs/img1.png"
                    alt="Corporate Social Responsibility"
                    className={styles.mediaImage}
                  />
                </div>
                <div className={styles.item1}>
                  <div className={styles.infoWidget}>
                    <span className={`${styles.contentText}`}>
                      <span className={styles.counter}>20</span>+
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
            <div className={styles.textColumn}>
              <div className={styles.sectionHead}>
                <h2 className={`${styles.mainTitle} ${styles.wow}`}>
                  Corporate Social Responsibility
                </h2>
                <p className={`${styles.description} ${styles.wow}`}>
                  As a leading pet clinic specializing in veterinary medicine, we recognize our responsibility to the community. We actively contribute to the well-being of animals through various initiatives:
                </p>
              </div>
              <h3 className={`${styles.initiativesTitle} ${styles.wow}`}>
                Our Initiatives
              </h3>
              <ul className={`${styles.listCheckCircle} ${styles.wow}`}>
                <li className={styles.listItem}>
                  <i className="fas fa-bullhorn" /> Awareness Campaigns: We use our social media platforms to educate pet owners about responsible pet care, health issues, and preventive measures.
                </li>
                <li className={styles.listItem}>
                  <i className="fas fa-hand-holding-heart" /> Pro Bono Services: We provide free veterinary care to animals in need, particularly those belonging to underprivileged families or abandoned animals. To date, we've successfully treated hundreds of cases.
                </li>
                <li className={styles.listItem}>
                  <i className="fas fa-home" /> Animal Adoption: We're committed to finding loving homes for abandoned animals. We provide necessary veterinary care and rehabilitation before placing them up for adoption.
                </li>
              </ul>
              <p className={`${styles.conclusion} ${styles.wow}`}>
                By prioritizing these initiatives, we strive to make a positive impact on the lives of animals and their owners.
              </p>
            </div>
          </div>
        </div>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes move3 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(8px, 5px);
  }
}

.overlay-primary-dark:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #4a2d71;
  opacity: 0.95;
  z-index: 0;
}

.title-dashed-separator:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background-color: rgb(124, 88, 211);
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.wow {
  visibility: visible;
}
`,
        }}
      />
    </>
  );
}
