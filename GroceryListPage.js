import React, { useState } from 'react';
import axios from 'axios';

const GroceryListPage = () => {
  // State to store grocery list, current input item, category, and quantity
  const [groceryItem, setGroceryItem] = useState('');
  const [category, setCategory] = useState('fruit'); // Default category is 'fruit'
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [groceryList, setGroceryList] = useState([]);
  const [loading, setLoading] = useState(false); // To track if request is in progress
  const [error, setError] = useState(''); // To track errors

  // Handle the form submission to add grocery item to the list
  const handleAddItem = (e) => {
    e.preventDefault();
    if (groceryItem.trim() !== '') {
      // Add the item along with its category and quantity to the grocery list
      setGroceryList([
        ...groceryList,
        { name: groceryItem, category: category, quantity: quantity, status: 'added' },
      ]);
      setGroceryItem(''); // Clear input after adding item
      setCategory('fruit'); // Reset category to default
      setQuantity(1); // Reset quantity to default
    }
  };

  // Handle input change for the grocery item name
  const handleInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Handle remove item from the grocery list
  const handleRemoveItem = (index) => {
    const updatedList = groceryList.filter((item, i) => i !== index);
    setGroceryList(updatedList); // Update the list after removing the item
  };

  // Handle submit to send the grocery list to backend
  const handleSubmit = async () => {
    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      // Replace the URL below with your backend endpoint
      const response = await axios.post('http://localhost:5000/admin/items/add', {
        items: groceryList,
      });

      if (response.status === 200) {
        alert('Grocery list submitted successfully!');
        setGroceryList([]); // Clear the list after successful submission
      }
    } catch (error) {
      setError('An error occurred while submitting the list.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Main Card Container */}
      <div className="card shadow-lg border-light mb-5">
        <div className="card-body">
          <h2 className="text-center mb-4">
            <i className="fas fa-list"></i> Grocery List Organizer
          </h2>

          {/* Form to add grocery item */}
          <form onSubmit={handleAddItem}>
            <div className="form-group mb-3">
              <label htmlFor="groceryItem">Add Grocery Item</label>
              <input
                type="text"
                className="form-control"
                id="groceryItem"
                placeholder="Enter grocery item"
                value={groceryItem}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Quantity input */}
            <div className="form-group mb-3">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="varchar"
                className="form-control"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </div>

            {/* Category selection dropdown */}
            <div className="form-group mb-3">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="meat">Meat</option>
                <option value="stationary">Stationary</option>
                <option value="beverage">Beverage and Liquids</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-3">
              <i className="fas fa-plus-circle"></i> Add Item
            </button>
          </form>
        </div>
      </div>

      {/* Display the grocery list */}
      <div className="card shadow-lg border-light">
        <div className="card-body">
          <h3>Your Grocery List</h3>
          <ul className="list-group">
            {groceryList.length > 0 ? (
              groceryList.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.name} - <strong>{item.category}</strong> - Quantity: {item.quantity}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">No items added yet.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Submit button to send the list to the backend */}
      <div className="mt-4 text-center">
        {error && <div className="alert alert-danger">{error}</div>}

        <button
          onClick={handleSubmit}
          className="btn btn-success btn-block"
          disabled={loading || groceryList.length === 0}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            'Submit List'
          )}
        </button>
      </div>
    </div>
  );
};

export default GroceryListPage;
