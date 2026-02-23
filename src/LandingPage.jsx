import React, { useState, useEffect } from 'react';
import './LandingPage.css';

function LandingPage() {
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
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Sonny and Van Got Married!</h1>
        <p className="landing-text">
          On March 5, 2025, Sonny and Van eloped in the gleaming LA county high-rise courthouse.
        </p>

        {/* Image Carousel */}
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

        <h1 className="landing-title">So we did a thing...</h1>
        <p className="landing-text">
          We never had the chance to share the celebration with our friends, so we want to invite you to one (or both) of two parties.
        </p>
        <p className="landing-text">
          <strong>First celebration</strong>: Atlanta, GA (within the perimeter), Sunday, June 7th, 2026, late afternoon / early evening<br />
          <strong>Second celebration</strong>: Washington, DC (NW quadrant), Sunday, August 2nd, 2026, late afternoon / early evening
        </p>

        <h1 className="landing-title">Our Story</h1>
        <p className="landing-text">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </p>

        <h1 className="landing-title">Join Us</h1>
        <p className="landing-text">
          Full celebration details are included in your private RSVP link. If you can't find yours, contact your preferred groom!
        </p>
        <p className="landing-text">
          We hope you can join us.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
