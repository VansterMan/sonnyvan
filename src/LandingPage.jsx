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
          Sonny and Van met in DC late summer of 2021. Sonny had just finished graduate school and needed a job. Van was a digital nomad, untethered and ready to move to Los Angeles after 18 years in DC. 
        </p>
        <p className="landing-text">
          The relationship almost never happened. Van went out of town the day after they met. Sonny's future was uncertain. Nothing was binding Van to DC anymore and he was ready to start a new life in LA. Still, they kept in touch as Van traveled the country in the weeks that followed.
        </p>
        <p className="landing-text">
          Three months later, Van invited Sonny to join him for a couple weeks on the West Coast. It was then that he asked Sonny to be his boyfriend, not overlooking the sunset on the beach from the Shangri-La hotel like he had meticulously planned (due to random fog), but at the Abbey in West Hollywood. Sunset or not, Sonny said yes.
        </p>
        <p className="landing-text">
          Sonny's career at the CDC pulled him to Atlanta in April of 2022. Although Van was reluctant to move back to the South, he was ready to have a home base again, and together they moved into a 21st-floor apartment in Atlanta's vibrant gayborhood. They only planned to stay for a year. 
        </p>
        <p className="landing-text">
          As these things go, one year became two, and in April of 2024, they bought a condo a few blocks away, surrounded by a growing community of friends and colleagues. 
        </p>
        <p className="landing-text">
          In the face of an uncertain future for marriage equality, they wanted to take matters into their own hands. On a quiet night in December 2025, Van proposed, and Sonny said yes. Three months later, they eloped in the same city their relationship started, in the Los Angeles County Courthouse.
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
