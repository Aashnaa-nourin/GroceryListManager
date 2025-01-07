const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authentication = require('./routes/auth');
const studentRoutes = require('./routes/studentRouter'); // Import the student router
const db = require('./db'); // Import the database connection
const itemsRoutes = require('./routes/itemsRouter');
const adminRoutes = require('./routes/adminRouter');
const app = express();
const PORT = 5000;
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Database connection check
async function checkDatabaseConnection() {
  try {
    await db.query('SELECT 1'); // Simple query to test the connection
    console.log('Database connection is OK.');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
}
// Call the function to check the database connection
checkDatabaseConnection();
// Routes
app.use('/auth', authentication);
app.use('/items', itemsRoutes); // Use the authentication routes // Use the authentication routes
app.use('/student', studentRoutes); // Use the student routes
app.use('/admin', adminRoutes); // Use the student routes
// Test route
app.use('/', (req, res) => {
  res.send('Server is running!');
  // console.log("Server Running");
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=
// DB_NAME=student_portal