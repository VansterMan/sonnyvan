import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import LandingPage from './LandingPage';
import './App.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcIAQkmyyW7xFkdlZuBB1cABqqcZPmyzk",
  authDomain: "sonnyvan-4f12e.firebaseapp.com",
  projectId: "sonnyvan-4f12e",
  storageBucket: "sonnyvan-4f12e.firebasestorage.app",
  messagingSenderId: "234434414407",
  appId: "1:234434414407:web:0cb66bf043c5eb61e92e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [guestCode, setGuestCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [formData, setFormData] = useState({
    // Atlanta Reception
    atlantaAttending: '',
    atlantaGuest1Name: '',
    atlantaGuest1Email: '',
    atlantaGuest1DietaryRestrictions: '',
    atlantaGuest2Name: '',
    atlantaGuest2Email: '',
    atlantaGuest2DietaryRestrictions: '',
    
    // DC Reception
    dcAttending: '',
    dcGuest1Name: '',
    dcGuest1Email: '',
    dcGuest1DietaryRestrictions: '',
    dcGuest2Name: '',
    dcGuest2Email: '',
    dcGuest2DietaryRestrictions: '',
    
    // Additional info
    additionalComments: ''
  });

  useEffect(() => {
    // Get guest code from URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code) {
      setGuestCode(code);
      loadGuestData(code);
    } else {
      setLoading(false);
    }
  }, []);

  const loadGuestData = async (code) => {
    try {
      const docRef = doc(db, 'rsvps', code);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setFormData(docSnap.data());
        setInvalidCode(false);
      } else {
        // Code doesn't exist in database
        setInvalidCode(true);
      }
    } catch (error) {
      console.error('Error loading guest data:', error);
      setInvalidCode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!guestCode) {
      alert('Invalid invitation link. Please use the link provided in your invitation.');
      return;
    }

    try {
      const docRef = doc(db, 'rsvps', guestCode);
      await setDoc(docRef, {
        ...formData,
        lastUpdated: new Date().toISOString()
      });
      
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error saving RSVP:', error);
      alert('There was an error saving your response. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container loading">
        <div className="spinner"></div>
        <p>Loading your invitation...</p>
      </div>
    );
  }

  if (!guestCode) {
    return <LandingPage />;
  }

  if (invalidCode) {
    return (
      <div className="container error">
        <h1>Invalid Invitation Code</h1>
        <p>The invitation code in your link is not valid. Please check your link and try again, or contact your preferred groom if you believe this is an error.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container confirmation">
        <div className="confirmation-box">
          <h1>✓ We got your response!!</h1>
          <p className="confirmation-message">
            RSVP received!
          </p>
          <p className="confirmation-message">
            <b>You will not receive an automatic confirmation email</b>, but the grooms will contact
            contact you separately with additional details as needed.
          </p>
          <p className="confirmation-message">
            Use your private URL to make any updates if needed.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-secondary">
            Edit Your Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Sonny & Van's Wedding Reception</h1>
        <p className="subtitle">Join us for a fun celebration</p>
        <img src="/wedding-sign.jpg" alt="Wedding" className="header-image" />
      </header>

      <div className="intro-text">
        <p>
          We are having two wedding receptions in two cities (Atlanta and DC) and would love 
          for you to join us at one (or both)!
        </p>
	  Please RSVP for either/both receptions below.
	<p>
	</p>
      </div>

      <form onSubmit={handleSubmit} className="rsvp-form">
        {/* Atlanta Reception */}
        <section className="reception-section">
          <h2 className="reception-title">Atlanta Reception</h2>
          <p className="reception-details">
            <strong>Location:</strong> Atlanta, GA (within the perimeter)<br />
            <strong>Date & Time:</strong> Sunday, June 7th, 2026, late afternoon / early evening<br />
            <em>Specific location and start/end times TBA soon, and you'll get an email.</em>
          </p>

          <div className="form-group">
            <label>Will you be attending the Atlanta reception? *</label>
            <select 
              name="atlantaAttending" 
              value={formData.atlantaAttending}
              onChange={handleChange}
              required
            >
              <option value="">Please select</option>
              <option value="yes">Yes, I/we will attend</option>
              <option value="maybe">Maybe</option>
              <option value="no">No, I/we cannot attend</option>
            </select>
          </div>

          {(formData.atlantaAttending === 'yes' || formData.atlantaAttending === 'maybe') && (
            <>
              <h3 className="guest-subtitle">Guest 1 Information</h3>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="atlantaGuest1Name"
                  value={formData.atlantaGuest1Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="atlantaGuest1Email"
                  value={formData.atlantaGuest1Email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dietary Restrictions or Allergies</label>
                <textarea
                  name="atlantaGuest1DietaryRestrictions"
                  value={formData.atlantaGuest1DietaryRestrictions}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Please let us know of any dietary restrictions or allergies"
                />
              </div>

              <h3 className="guest-subtitle">Guest 2 Information (Optional)</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="atlantaGuest2Name"
                  value={formData.atlantaGuest2Name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="atlantaGuest2Email"
                  value={formData.atlantaGuest2Email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Dietary Restrictions or Allergies</label>
                <textarea
                  name="atlantaGuest2DietaryRestrictions"
                  value={formData.atlantaGuest2DietaryRestrictions}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Please let us know of any dietary restrictions or allergies"
                />
              </div>
            </>
          )}
        </section>

        {/* DC Reception */}
        <section className="reception-section">
          <h2 className="reception-title">Washington, DC Reception</h2>
          <p className="reception-details">
            <strong>Location:</strong> DC, NW quadrant<br />
            <strong>Date & Time:</strong> Sunday, August 2nd, 2026, late afternoon / early evening<br />
            <em>Specific location and start/end times TBA soon, and you'll get an email.</em>
          </p>

          <div className="form-group">
            <label>Will you be attending the DC reception? *</label>
            <select 
              name="dcAttending" 
              value={formData.dcAttending}
              onChange={handleChange}
              required
            >
              <option value="">Please select</option>
              <option value="yes">Yes, I/we will attend</option>
              <option value="maybe">Maybe</option>
              <option value="no">No, I/we cannot attend</option>
            </select>
          </div>

          {(formData.dcAttending === 'yes' || formData.dcAttending === 'maybe') && (
            <>
              <h3 className="guest-subtitle">Guest 1 Information</h3>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="dcGuest1Name"
                  value={formData.dcGuest1Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="dcGuest1Email"
                  value={formData.dcGuest1Email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dietary Restrictions or Allergies</label>
                <textarea
                  name="dcGuest1DietaryRestrictions"
                  value={formData.dcGuest1DietaryRestrictions}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Please let us know of any dietary restrictions or allergies"
                />
              </div>

              <h3 className="guest-subtitle">Guest 2 Information (Optional)</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="dcGuest2Name"
                  value={formData.dcGuest2Name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="dcGuest2Email"
                  value={formData.dcGuest2Email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Dietary Restrictions or Allergies</label>
                <textarea
                  name="dcGuest2DietaryRestrictions"
                  value={formData.dcGuest2DietaryRestrictions}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Please let us know of any dietary restrictions or allergies"
                />
              </div>
            </>
          )}
        </section>

        {/* Additional Information */}
        <section className="reception-section">
          <h2 className="reception-title">Additional Information</h2>
          <p>
            <b>Format:</b> This is an informal celebration with our friends. At both receptions we’ll have an open bar with heavy hors' d'oeuvres. There are no formal announcements or ceremonies planned.
          </p>
          <p>
            <b>Dress:</b> Cocktail attire
          </p>
          <p>
            <b>Kids:</b> This is a 21+ event. While we love kids, this isn’t a healthy environment for little ones.
          </p>
          <p>
            <b>Gifts:</b> Please, no gifts. Consider these amazing institutions instead: 
          <p>
            &nbsp;<a href="https://www.thetrevorproject.org/be-the-one/">The Trevor Project</a><br />
            &nbsp;<a href="https://donate.wikimedia.org/">Wikimedia Foundation</a>
          </p>
          </p>
          <p>
            We’ll provide additional venue-specific details (address, parking, pet policy, etc.) closer to the time for those who accepted.
          </p>

          <div className="form-group">
            <label>Additional Comments or Questions</label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              rows="3"
              placeholder="Anything else you'd like us to know?"
            />
          </div>
        </section>

        <button type="submit" className="btn-primary">
          Submit RSVP
        </button>
      </form>
    </div>
  );
}

export default App;
