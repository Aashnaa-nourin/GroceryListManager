const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Database connection

const router = express.Router();

// Student login route
router.post('/login', async (req, res) => {
  console.log("Called Login");
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    // console.log(req.body);
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log(user);
    if (user.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user[0].id, userType: user[0].type }, // Payload
      process.env.JWT_SECRET || "yourSecretKey", // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Create a response object with user details and token
    const response = {
      success: true,
      message: 'Login successful',
      userId: user[0].id,  // Assuming the user table has an 'id' column
      userType: user[0].type, // Assuming the user table has a 'type' column (student or teacher)
      token, // Return the generated token
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword, phone_number} = req.body;
    console.log("called signup",req.body);
    // Basic validation
    // if (!name || !email || !password || !confirmPassword) {
    //   return res.status(400).json({ success: false, message: 'All fields are required' });
    // }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    try {
      // Check if name or email already exists
      const [existingUsers] = await db.query(
        'SELECT * FROM users WHERE name = ? OR email = ?',
        [name, email]
      );
      if (existingUsers.length > 0) {
        return res
          .status(409)
          .json({ success: false, message: 'Name or email already exists' });
      }
      const type = "user"; // Example type; adjust based on your requirements 
      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insert new student into the database
      const [result] = await db.query(
        'INSERT INTO `users` (`name`, `email`, `password`,`phone_number`,`role`) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, phone_number, type]
      );
      // Retrieve the last inserted ID
      const userId = result.insertId; // `insertId` gives the last auto-increment ID
      console.log('Inserted user ID:', userId);
      res.status(201).json({
        success: true,
        message: 'Signup successful',
        user: { userId, name, email },
      });
    } catch (error) {
      console.error('Database error during signup:', error);
      res.status(500).json({ success: false, message: 'Signup failed due to a server error' });
    }
  }); 
  router.post("/logout", (req, res) => {
    console.log("Called logout");
    try {
      // Clear session or token as per your authentication system
      res.clearCookie("token"); // Example: clearing an authentication token
      res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ success: false, message: "Logout failed" });
    }
  });
module.exports = router;





// router.post('/login', async (req, res) => {
//   console.log("Called Login");
//   const { name, password } = req.body;

//   try {
//     // Check if the user exists in the database
//     console.log(name);
//     const [user] = await db.query('SELECT * FROM user WHERE email = ?', [name]);
//     console.log(user);
//     if (user.length === 0) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Compare the entered password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user[0].password);
//     console.log(isPasswordValid);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Create a response object with user details
//     const response = {
//       success: true,
//       message: 'Login successful',
//       userId: user[0].id,  // Assuming the user table has an 'id' column
//       userType: user[0].type, // Assuming the user table has a 'type' column (student or teacher)
//     };

//     // Send the response with user details
//     res.status(200).json(response);

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ success: false, message: 'Server error during login' });
//   }
// });