import React from 'react';
import { Link } from 'react-router-dom';  // For navigation to login/signup

const Homepage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          {/* Hero Section */}
          <div className="jumbotron" style={{
            backgroundColor: "#FFDEE9",  // Pastel pink
            color: "#4A4A4A",           // Neutral dark gray for text
            padding: "3rem",
            borderRadius: "15px",
          }}>
            <h1 className="display-4">Grocery List Organiser</h1>
            <p className="lead">Welcome to the ultimate grocery list organizer. Simplify your shopping experience!</p>

            {/* Buttons */}
            <div className="mt-4">
              <Link 
                to="/login" 
                className="btn btn-lg m-2 shadow-lg" 
                style={{
                  backgroundColor: "#A8E6CF",  // Pastel green
                  color: "#4A4A4A",           // Neutral dark gray text
                  border: "none",
                  borderRadius: "10px"
                }}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-lg m-2 shadow-lg" 
                style={{
                  backgroundColor: "#FFD3B6",  // Pastel peach
                  color: "#4A4A4A",           // Neutral dark gray text
                  border: "none",
                  borderRadius: "10px"
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Additional Section (Optional) */}
          <div className="mt-5">
            <h3 style={{ color: "#4A4A4A" }}>Why use Grocery List Organiser?</h3>
            <p className="lead" style={{ color: "#4A4A4A" }}>
              Organize your grocery lists efficiently, share them with friends, and shop smarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
