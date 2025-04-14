import React, { useState, useRef } from 'react';
// @ts-ignore
import styles from '../styles/ProductGallery.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faSearch, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const zoomRef = useRef<HTMLDivElement>(null);
  
  // Manejar click en thumbnail
  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
  };
  
  // Manejar zoom del mouse
  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  // Manejar toggle de zoom
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  // Manejar toggle de fullscreen
  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
    setIsZoomed(false);
  };
  
  // Navegar a la siguiente imagen
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };
  
  // Navegar a la imagen anterior
  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Placeholder para imágenes que no cargan
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/products/placeholder.jpg';
  };
  
  return (
    <div className={styles.productGallery}>
      {/* Imagen principal */}
      <div 
        className={`${styles.mainImageContainer} ${isZoomed ? styles.zoomActive : ''}`}
        onClick={toggleZoom}
        onMouseMove={handleZoom}
        onMouseLeave={() => setIsZoomed(false)}
        ref={zoomRef}
      >
        <img 
          src={images[activeImage]} 
          alt={`${productName} - Image ${activeImage + 1}`} 
          className={styles.mainImage}
          onError={handleImageError}
        />
        
        {isZoomed && (
          <div 
            className={styles.zoomedImage} 
            style={{ 
              backgroundImage: `url(${images[activeImage]})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
          ></div>
        )}
        
        <div className={styles.imageActions}>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            title="View fullscreen"
          >
            <FontAwesomeIcon icon={faExpand} />
          </button>
          <button
            className={`${styles.actionButton} ${isZoomed ? styles.active : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            title={isZoomed ? "Exit zoom" : "Zoom image"}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button 
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
      
      {/* Miniaturas */}
      {images.length > 1 && (
        <div className={styles.thumbnailsContainer}>
          {images.map((image, index) => (
            <div 
              key={index}
              className={`${styles.thumbnail} ${index === activeImage ? styles.active : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={image} 
                alt={`${productName} - Thumbnail ${index + 1}`} 
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Modal de visualización a pantalla completa */}
      {showFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={toggleFullscreen}>
          <div className={styles.fullscreenContainer} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeFullscreen} onClick={toggleFullscreen}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <div className={styles.fullscreenImageContainer}>
              <img 
                src={images[activeImage]} 
                alt={`${productName} - Fullscreen`}
                className={styles.fullscreenImage} 
                onError={handleImageError}
              />
            </div>
            
            {images.length > 1 && (
              <>
                <button 
                  className={`${styles.fullscreenNav} ${styles.fullscreenPrev}`}
                  onClick={prevImage}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                  className={`${styles.fullscreenNav} ${styles.fullscreenNext}`}
                  onClick={nextImage}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                
                <div className={styles.fullscreenThumbnails}>
                  {images.map((image, index) => (
                    <div 
                      key={index}
                      className={`${styles.fullscreenThumbnail} ${index === activeImage ? styles.active : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${productName} - Thumbnail ${index + 1}`}
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
