import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import 'bootstrap/dist/css/bootstrap.min.css';

const PurchasedItems = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show feedback while fetching data
  const [error, setError] = useState(null); // Error state for handling issues during fetch

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await axios.get('http://localhost:5000/items/purchased');
        setPurchasedItems(response.data.data); // Assuming the API returns an array of items
      } catch (error) {
        setError('Failed to fetch purchased items. Please try again later.');
        console.error('Error fetching purchased items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedItems();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Purchased Items</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-center">Purchased Items</h5>

          {/* Loading and Error Handling */}
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {/* Purchased Items Table */}
          {!loading && !error && (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  {/* <th>Date of Purchase</th> */}
                </tr>
              </thead>
              <tbody>
                {purchasedItems.length > 0 ? (
                  purchasedItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      {/* <td>{new Date(item.dateOfPurchase).toLocaleDateString()}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasedItems;
