import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashboard.css'; // Custom CSS for additional styling

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear authentication data)
    alert('You have logged out.');

    // Optionally clear user session data (e.g., tokens or user state)
    // localStorage.removeItem('authToken');
    // sessionStorage.removeItem('authToken');

    // Redirect to homepage after logout
    navigate('/'); // Redirects to the home page ("/")
  };

  return (
    <div className="user-dashboard-bg">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-primary text-light">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/edit-profile">Edit Profile</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-white">Welcome to Your Dashboard</h2>

        {/* Action Buttons */}
        <div className="card shadow-lg border-0 rounded-4 custom-card">
          <div className="card-body bg-light">
            <h5 className="card-title text-center text-dark mb-4">Choose an Action</h5>
            <div className="row">
              <div className="col-md-6 text-center mb-3">
                <Link to="/grocery-list-view">
                  <button className="btn btn-success btn-lg w-100 custom-btn">Update Purchased Items</button>
                </Link>
              </div>
             
              <div className="col-md-6 text-center mb-3">
                <Link to="/purchased-items">
                  <button className="btn btn-info btn-lg w-100 custom-btn">View Purchased Items</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
