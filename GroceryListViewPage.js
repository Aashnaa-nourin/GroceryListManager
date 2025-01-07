import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroceryListViewPage = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch items from the backend
  useEffect(() => {
    const fetchGroceryList = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/items/all'); // Update endpoint
        setGroceryList(response.data.data);
      } catch (err) {
        setError('Failed to load grocery list.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroceryList();
  }, []);

  // Handle toggle of purchased status
  const handleTogglePurchased = async (index) => {
    const updatedList = [...groceryList];
    const currentItem = updatedList[index];
    const newStatus = currentItem.status === 'added' ? 'purchased' : 'added';

    try {
      await axios.put(`http://localhost:5000/admin/items/update/${currentItem.id}`, {
        status: newStatus,
      });
      updatedList[index].status = newStatus;
      setGroceryList(updatedList);
    } catch (err) {
      setError('Failed to update item status.');
    }
  };

  // Handle item deletion
  const handleRemoveItem = async (index) => {
    const currentItem = groceryList[index];

    try {
      await axios.delete(`http://localhost:5000/item/delete/${currentItem.id}`);
      const updatedList = groceryList.filter((_, i) => i !== index);
      setGroceryList(updatedList);
    } catch (err) {
      setError('Failed to remove item.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-light mb-4">
        <div className="card-body">
          <h2 className="text-center mb-4">
            <i className="fas fa-shopping-cart"></i> Grocery List
          </h2>

          {error && <div className="alert alert-danger">{error}</div>}

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <p>Loading your grocery list...</p>
            </div>
          ) : (
            <>
              {groceryList.length > 0 ? (
                <ul className="list-group">
                  {groceryList.map((item, index) => (
                    <li
                      key={item.id}
                      className={`list-group-item d-flex justify-content-between align-items-center ${
                        item.status === 'purchased' ? 'list-group-item-success' : ''
                      }`}
                    >
                      <span
                        className={`mr-3 ${
                          item.status === 'purchased' ? 'text-decoration-line-through text-muted' : ''
                        }`}
                      >
                        <strong>{item.name}</strong> - {''}
                        <span className="badge bg-info text-dark">{item.category}</span> - {''}
                        <span className="badge bg-secondary">{item.quantity}</span> {''}
                        <small>Quantity</small>
                      </span>

                      <div className="d-flex align-items-center">
                        {/* Purchased toggle */}
                        <div className="form-check form-switch mr-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={item.status === 'purchased'}
                            onChange={() => handleTogglePurchased(index)}
                          />
                          <label className="form-check-label">
                            {item.status === 'purchased' ? 'Purchased' : 'Mark as Purchased'}
                          </label>
                        </div>

                        {/* Remove button */}
                        <button
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="tooltip"
                          title="Remove this item"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="alert alert-info text-center">
                  <i className="fas fa-info-circle"></i> No items in your grocery list.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryListViewPage;
