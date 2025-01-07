import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UpdatePurchasedItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch items from the API when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/items/topurchase'); // Update with your API endpoint
        setItems(response.data.data); // Set the items from the API response
      } catch (err) {
        setError('Failed to load items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle toggle of purchased status
  const handleTogglePurchased = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Purchased items updated successfully');
    // Add your update logic here (e.g., API call to save updates)
  };

  if (loading) {
    return <div>Loading items...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Update Purchased Items</h2>
      <form onSubmit={handleSubmit}>
        <div className="list-group">
          {items.map((item) => (
            <div
              key={item.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                item.purchased ? 'bg-success text-white' : ''
              }`}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={() => handleTogglePurchased(item.id)}
                  className="me-2"
                />
                <span className={item.purchased ? 'text-decoration-line-through' : ''}>
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Items
        </button>
      </form>
    </div>
  );
};

export default UpdatePurchasedItems;
