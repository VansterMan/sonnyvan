import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/carousel-1.jpg',
    '/carousel-2.jpg',
    '/carousel-3.jpg',
    '/carousel-4.jpg',
    '/carousel-5.jpg',
    '/carousel-6.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>
        ‹
      </button>
      
      <div className="carousel-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Sonny and Van ${index + 1}`}
            className={`carousel-image ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>

      <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
        ›
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
