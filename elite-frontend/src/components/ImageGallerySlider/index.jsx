import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './ImageGallerySlider.module.css';

const ImageGallerySlider = () => {
  const images = [
    { id: 1, src: './portfolio/pic1.png', alt: 'خدمات العيادة البيطرية ١' },
    { id: 2, src: '/portfolio/pic2.png', alt: 'خدمات العيادة البيطرية ٢' },
    { id: 3, src: '/portfolio/pic3.png', alt: 'خدمات العيادة البيطرية ٣' },
    { id: 4, src: '/portfolio/pic4.png', alt: 'خدمات العيادة البيطرية ٤' },
    { id: 5, src: '/portfolio/pic5.png', alt: 'خدمات العيادة البيطرية ٥' },
    { id: 6, src: '/portfolio/pic6.png', alt: 'خدمات العيادة البيطرية ٦' },
  ];

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
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
