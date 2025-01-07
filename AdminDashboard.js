import { Link } from 'react-router-dom'; // Add this import for Link

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

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
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white min-vh-100 p-4">
          <h3 className="text-center mb-4">Admin Panel</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <a href="#overview" className="nav-link text-white">
                <i className="fas fa-chart-line me-2"></i> Overview
              </a>
            </li>
            <li className="nav-item mb-3">
            <Link to="/manage-users">
                <i className="fas fa-users me-2"></i> Manage Users
              </Link>
            </li>
            <li className="nav-item mb-3">
            <Link to="/grocery-list-view">
                <i className="fas fa-list-alt me-2"></i> Grocery Lists
              </Link>
            </li>
            {/* Logout Button */}
            <li className="nav-item mb-3">
              <button className="nav-link text-white bg-danger border-0" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="py-4 border-bottom">
            <h2>Admin Dashboard</h2>
            <p className="text-muted">Welcome, Admin! Here's a quick overview of your platform's performance.</p>
          </div>

          {/* Overview Section */}
          
          {/* Manage Users Section */}
          <section id="manage-users" className="my-4">
            <h4>Manage Users</h4>
            <div className="card">
              <div className="card-body">
                <p>View and manage registered users on the platform.</p>
                <Link to="/manage-users">
                  <button className="btn btn-primary">View Users</button>
                </Link>
              </div>
            </div>
          </section>

          {/* Grocery Details Section */}
          <section id="grocery-list" className="my-4">
            <h4>Grocery Details</h4>
            <div className="card">
              <div className="card-body">
                <p>Manage and monitor grocery-related activities:</p>
                <div className="d-flex gap-3">
                  {/* View Grocery Lists Button */}
                  <Link to="/grocery-list-view">
                    <button className="btn btn-success">View List</button>
                  </Link>

                  {/* Add Grocery Items Button */}
                  <Link to="/grocery-list">
                    <button className="btn btn-secondary">Add Items</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
