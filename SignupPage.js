import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  // Initialize useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(confirmPassword);
    console.log(password);
    // Check if passwords match
    if (password !== confirmPassword) {
      console.log("Password not match");
      setMessage("Passwords do not match!");
      return;
    }

    const userData = {
      name,
      email,
      password,
      phone_number: phoneNumber,
      confirmPassword,
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', userData);
      setMessage('User registered successfully!');
      console.log('User registered:', response.data);

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // If the server responded with an error
        console.error('Error Response:', error.response);
        setMessage(`Error: ${error.response.data.message || 'Something went wrong!'}`);
      } else if (error.request) {
        // If the request was made but no response was received
        console.error('Error Request:', error.request);
        setMessage('Server did not respond. Please try again later.');
      } else {
        // If an error occurred in setting up the request
        console.error('General Error:', error.message);
        setMessage('There was an error registering the user!');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a strong password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegisterForm;
