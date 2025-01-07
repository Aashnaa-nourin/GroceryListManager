import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // Track the row being edited
  const [editedUser, setEditedUser] = useState({}); // Track the edited user data

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/users/all'); // Replace with your API endpoint
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle edit button click
  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditedUser({ ...user }); // Copy the user data to the editing state
  };

  // Handle input changes for the editable row
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save button click
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/admin/users/update/${editingId}`, editedUser); // Replace with your API endpoint
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingId ? { ...user, ...editedUser } : user
        )
      );
      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setEditingId(null); // Exit edit mode
    setEditedUser({}); // Clear editing state
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Users</h2>
      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    {editingId === user.id ? (
                      <>
                        <td>{user.id}</td>
                        <td>
                          <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="phone_number"
                            value={editedUser.phone_number}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="role"
                            value={editedUser.role}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <button className="btn btn-sm btn-success me-2" onClick={handleSave}>
                            Save
                          </button>
                          <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
