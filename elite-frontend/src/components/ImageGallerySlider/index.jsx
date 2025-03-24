import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import styles from './ImageGallerySlider.module.css';

const ImageGallerySlider = () => {
  const images = [
    { id: 1, src: '/portfolio/pic1.png', alt: 'Veterinary Services 1' },
    { id: 2, src: '/portfolio/pic2.png', alt: 'Veterinary Services 2' },
    { id: 3, src: '/portfolio/pic3.png', alt: 'Veterinary Services 3' },
    { id: 4, src: '/portfolio/pic4.png', alt: 'Veterinary Services 4' },
    { id: 5, src: '/portfolio/pic5.png', alt: 'Veterinary Services 5' },
    { id: 6, src: '/portfolio/pic6.png', alt: 'Veterinary Services 6' },
  ];

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className={styles.swiper}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className={styles.swiperSlide}>
            <div className={styles.imageWrapper}>
              <img
                src={image.src}
                alt={image.alt}
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallerySlider;
