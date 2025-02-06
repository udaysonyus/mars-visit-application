import React, { useState } from 'react';
import './MultiStageForm.css';

function MultiStageForm() {
  // Tracking the step we're on (1, 2, or 3)
  const [step, setStep] = useState(1);

  // Form data state – one object to hold all fields
  const [formData, setFormData] = useState({
    // Stage 1
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phone: '',
    // Stage 2
    departureDate: '',
    returnDate: '',
    accommodation: 'Space Hotel', // default option
    specialRequests: '',
    // Stage 3
    healthDeclaration: '',
    emergencyContact: '',
    medicalConditions: '',
  });

  // To store validation error messages for current stage
  const [errors, setErrors] = useState({});

  // Flag to show the final submission message
  const [isSubmitted, setIsSubmitted] = useState(false);

  // change handler for form inpts
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate fields for the current stage
  const validateStep = () => {
    let currentErrors = {};
    const today = new Date().toISOString().split("T")[0]; // Getting today's date 
  
    if (step === 1) {
      // Validate Full Name
      if (!formData.fullName.trim()) {
        currentErrors.fullName = "Full Name is required";
      }
  
      // Validate Date of Birth (Making sure, no future respponses ar given)
      if (!formData.dateOfBirth) {
        currentErrors.dateOfBirth = "Date of Birth is required";
      } else if (formData.dateOfBirth >= today) {
        currentErrors.dateOfBirth = "Date of Birth cannot be in the future";
      }
  
      // Validate Nationality
      if (!formData.nationality.trim()) {
        currentErrors.nationality = "Nationality is required";
      }
  
      // Validate Email
      if (!formData.email.trim()) {
        currentErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        currentErrors.email = "Email is invalid";
      }
  
      // Validate Phone Number (exactly 10 digits)
      if (!formData.phone.trim()) {
        currentErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) { 
        currentErrors.phone = "Phone number must be exactly 10 digits";
      }
    } else if (step === 2) {
      // Validate Departure & Return Dates
      if (!formData.departureDate) {
        currentErrors.departureDate = "Departure Date is required";
      }
      if (!formData.returnDate) {
        currentErrors.returnDate = "Return Date is required";
      }
    } else if (step === 3) {
      // Validate Health Declaration
      if (!formData.healthDeclaration) {
        currentErrors.healthDeclaration = "Please provide a health declaration";
      }
      // Validate Emergency Contact Number (exactly 10 digits)
      if (!formData.emergencyContact.trim()) {
        currentErrors.emergencyContact = "Emergency contact number is required";
      } else if (!/^\d{10}$/.test(formData.emergencyContact)) {
        currentErrors.emergencyContact = "Emergency contact number must be exactly 10 digits";
      }
    }
  
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0; 
  };
  

  // Handle going to the next step
  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  // Handle going back to the previous step
  const handleBack = (e) => {
    e.preventDefault();
    setStep(prev => prev - 1);
  };

  // Handle final submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form submitted successfully:", formData);
      setIsSubmitted(true);
    }
  };

  // on successfull submission, display a success message.
  if (isSubmitted) {
    return (
      <div className="submission-message">
        <h2>Application Submitted Successfully!</h2>
        <p>
          Thank you for the interest in visiting Mars. We will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={step === 3 ? handleSubmit : handleNext}>
      {step === 1 && (
        <div className="form-stage">
          <h2>Stage 1: Personal Information</h2>
          <div>
            <label>Full Name:</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>
          <div>
            <label>Date of Birth:</label>
            <input 
              type="date" 
              name="dateOfBirth" 
              value={formData.dateOfBirth} 
              onChange={handleChange} 
            />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
          </div>
          <div>
            <label>Nationality:</label>
            <input 
              type="text" 
              name="nationality" 
              value={formData.nationality} 
              onChange={handleChange} 
            />
            {errors.nationality && <span className="error">{errors.nationality}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Phone:</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-stage">
          <h2>Stage 2: Travel Preferences</h2>
          <div>
            <label>Departure Date:</label>
            <input 
              type="date" 
              name="departureDate" 
              value={formData.departureDate} 
              onChange={handleChange} 
            />
            {errors.departureDate && <span className="error">{errors.departureDate}</span>}
          </div>
          <div>
            <label>Return Date:</label>
            <input 
              type="date" 
              name="returnDate" 
              value={formData.returnDate} 
              onChange={handleChange} 
            />
            {errors.returnDate && <span className="error">{errors.returnDate}</span>}
          </div>
          <div>
            <label>Accommodation Preference:</label>
            <select 
              name="accommodation" 
              value={formData.accommodation} 
              onChange={handleChange}
            >
              <option value="Space Hotel">Space Hotel</option>
              <option value="Martian Base">Martian Base</option>
            </select>
          </div>
          <div>
            <label>Special Requests or Preferences:</label>
            <textarea 
              name="specialRequests" 
              value={formData.specialRequests} 
              onChange={handleChange} 
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-stage">
          <h2>Stage 3: Health and Safety</h2>
          <div>
            <label>
              Health Declaration (confirm that you are in good health):
            </label>
            <select 
              name="healthDeclaration" 
              value={formData.healthDeclaration} 
              onChange={handleChange}
            >
              <option value="">--Select--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.healthDeclaration && <span className="error">{errors.healthDeclaration}</span>}
          </div>
          <div>
            <label>Emergency Contact Information:</label>
            <input 
              type="text" 
              name="emergencyContact" 
              value={formData.emergencyContact} 
              onChange={handleChange} 
            />
            {errors.emergencyContact && <span className="error">{errors.emergencyContact}</span>}
          </div>
          <div>
            <label>Any Medical Conditions (if applicable):</label>
            <textarea 
              name="medicalConditions" 
              value={formData.medicalConditions} 
              onChange={handleChange} 
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="navigation-buttons" style={{ marginTop: '20px' }}>
        {step > 1 && (
          <button onClick={handleBack}>Back</button>
        )}
        <button type="submit" style={{ marginLeft: '10px' }}>
          {step === 3 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
}

export default MultiStageForm;
