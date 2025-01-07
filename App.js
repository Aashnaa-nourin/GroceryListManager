import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

// src/App.js
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import GroceryListViewPage from './components/GroceryListViewPage';
import GroceryListPage from './components/GroceryListPage';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import UserDashboard from './components/UserDashboard';
import EditProfile from './components/EditProfile';
import UpdatePurchasedItems from './components/UpdatePurchasedItems';
import PurchasedItems from './components/PurchasedItems';
functio n App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/grocery-list" element={<GroceryListPage />} />
        <Route path="/grocery-list-view" element={<GroceryListViewPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin */}
        <Route path="/user-dashboard" element={<UserDashboard />} /> {/* User */}
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/purchased-items" element={<PurchasedItems />} />
        
        <Route path="/update-purchased-items" element={<UpdatePurchasedItems />} />
      </Routes>
    </Router>
  );
}

export default App;
