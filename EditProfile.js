import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        setError('User token is not available. Please log in.');
        setLoading(false);
        return;
      }
      console.log('token :',token);
      try {
        const response = await axios.get('http://localhost:5000/admin/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        });

        setUserInfo({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone_number,
        });

        setError(null);
      } catch (err) {
        setError('Failed to fetch profile details. Please try again later.');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token'); // Get token from local storage or another secure place
        const response = await axios.post('http://localhost:5000/admin/user/update', {
            // Add the data you want to update here
            userInfo
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        alert('Profile updated successfully');
        console.log('Update result:', response.data);
    } catch (error) {
        console.error('Error updating profile:', error.response?.data?.message || error.message);
        alert(`Error updating profile: ${error.response?.data?.message || error.message}`);
    }
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded p-4">
            <h3 className="text-center mb-4">Edit Your Profile</h3>

            {/* Loading and Error States */}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {!loading && !error && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Button Styles */}
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Update Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
