import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        alert('Login successful');
        localStorage.setItem('token', data.token); // Save token to localStorage
  
        // Check if the email is admin's email
        if (email === 'admin@gmail.com') {
          navigate('/admin-dashboard'); // Redirect to Admin Dashboard
        } else {
          navigate('/user-dashboard'); // Redirect to User Dashboard
        }
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,technology')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="card shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Welcome Back</h2>
          <p className="text-muted text-center">Please login to continue</p>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            className="btn btn-primary w-100 mb-3"
            style={{ borderRadius: '25px' }}
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="text-center">
            <p className="text-muted">
              Don't have an account?{' '}
              <a href="/signup" className="text-primary">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
