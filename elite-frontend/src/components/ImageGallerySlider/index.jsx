import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useLanguage } from '@/context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import styles from './ImageGallerySlider.module.css';

const ImageGallerySlider = () => {
  const { images, isLoading, error } = useGalleryImages();
  const { isRTL } = useLanguage();

  // صور افتراضية في حالة عدم وجود صور من API
  const fallbackImages = [
    { id: 1, src: '/portfolio/pic1.png', alt: 'Veterinary Services 1', title: 'خدمة بيطرية 1' },
    { id: 2, src: '/portfolio/pic2.png', alt: 'Veterinary Services 2', title: 'خدمة بيطرية 2' },
    { id: 3, src: '/portfolio/pic3.png', alt: 'Veterinary Services 3', title: 'خدمة بيطرية 3' },
    { id: 4, src: '/portfolio/pic4.png', alt: 'Veterinary Services 4', title: 'خدمة بيطرية 4' },
    { id: 5, src: '/portfolio/pic5.png', alt: 'Veterinary Services 5', title: 'خدمة بيطرية 5' },
    { id: 6, src: '/portfolio/pic6.png', alt: 'Veterinary Services 6', title: 'خدمة بيطرية 6' },
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.sliderContainer}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>{isRTL ? 'جاري تحميل الصور...' : 'Loading images...'}</p>
        </div>
      </div>
    );
  }

  // Error state with fallback
  if (error) {
    console.warn('Gallery images API error:', error);
  }

  return (
    <div className={styles.sliderContainer} dir={isRTL ? 'rtl' : 'ltr'}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={30}
        initialSlide={Math.floor(displayImages.length / 2)}
        loop={displayImages.length > 1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          el: `.${styles.swiperPagination}`,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          // Mobile
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
            effect: 'slide',
          },
          // Tablet
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
            effect: 'coverflow',
          },
          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            effect: 'coverflow',
          },
        }}
        className={styles.swiper}
      >
        {displayImages.map((image) => (
          <SwiperSlide key={image.id} className={styles.swiperSlide}>
            <div className={styles.imageWrapper}>
              <img
                src={image.src}
                alt={image.altText || image.alt || image.title}
                className={styles.image}
                loading="lazy"
              />
              {image.title && (
                <div className={styles.imageOverlay}>
                  <h3 className={styles.imageTitle}>{image.title}</h3>
                  {image.description && (
                    <p className={styles.imageDescription}>{image.description}</p>
                  )}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className={`${styles.swiperButtonPrev} ${styles.customNavButton}`}>
          <i className={`fas ${isRTL ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </div>
        <div className={`${styles.swiperButtonNext} ${styles.customNavButton}`}>
          <i className={`fas ${isRTL ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </div>
        
        {/* Custom Pagination */}
        <div className={styles.swiperPagination}></div>
      </Swiper>
    </div>
  );
};

export default ImageGallerySlider;
