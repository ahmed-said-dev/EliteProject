import React from "react";
import styles from "./OurPartners.module.css";

export default function OurPartners() {
  return (
    <>
      <section className={styles.contentInner}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.colLeft}>
              <div className={styles.sectionHead}>
                <h2 className={styles.title}>
                  Our Partners
                </h2>
                <p className={styles.description}>
                  Trusted by leading veterinary institutions and organizations
                </p>
              </div>
            </div>
            <div className={styles.colRight}>
              <div className={styles.swiper}>
                <div className={styles.swiperWrapper}>
                  <div className={styles.swiperSlide}>
                    <div className={styles.clientsLogo}>
                      <img
                        alt="Partner Logo 1"
                        src="/images/logo/logo_placeholder.png"
                        className={styles.logoImage}
                      />
                    </div>
                  </div>
                  <div className={styles.swiperSlide}>
                    <div className={styles.clientsLogo}>
                      <img
                        alt="Partner Logo 2"
                        src="/images/logo/logo_placeholder.png"
                        className={styles.logoImage}
                      />
                    </div>
                  </div>
                  <div className={styles.swiperSlide}>
                    <div className={styles.clientsLogo}>
                      <img
                        alt="Partner Logo 3"
                        src="/images/logo/logo_placeholder.png"
                        className={styles.logoImage}
                      />
                    </div>
                  </div>
                  <div className={styles.swiperSlide}>
                    <div className={styles.clientsLogo}>
                      <img
                        alt="Partner Logo 4"
                        src="/images/logo/logo_placeholder.png"
                        className={styles.logoImage}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.swiperPagination} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
