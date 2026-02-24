import React from 'react';
import ImageCarousel from './ImageCarousel';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Sonny and Van Got Married!</h1>
        <p className="landing-text">
          On March 5, 2025, Sonny and Van eloped in the gleaming LA county high-rise courthouse.
        </p>

        {/* Image Carousel */}
        <ImageCarousel />

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
          Coming soon!
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
