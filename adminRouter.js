const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../db"); // Import the database connection
const moment = require("moment");
const { log } = require("console");
const jwt = require('jsonwebtoken');

// Fetch all students
router.get("/users/all", async (req, res) => {
  console.log("called Studentall ");
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE role = 'user'");
    // console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get('/user', async (req, res) => {
  console.log("Fetching user details...");
  console.log(req.headers.authorization);
  // Extract the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('if');
    return res.status(401).json({
      success: false,
      message: 'Authorization header missing or malformed',
    });
  }

  const token = authHeader.split(' ')[1]; // Extract the token
  console.log('token : ',token);
  try {
    console.log("try",);
    // Verify the token (replace 'your_secret_key' with your actual secret key)
    const decoded = jwt.verify(token, "yourSecretKey");
    console.log('user Id :',decoded);

    // Assume `decoded` contains the user ID
    const userId = decoded.userId;
    // Fetch user details from the database
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    console.log(rows)
    res.status(200).json({
      success: true,
      data: rows[0], // Assuming you only want one user's data
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    // Log other errors for debugging
    console.error("Error fetching user details:", error.message);

    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving user details. Please try again later.',
    });
  }
});

router.post('/user/update', async (req, res) => {
  console.log("Updating user details...");

  // Extract the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authorization header missing or malformed',
    });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    // Verify the token (replace 'your_secret_key' with your actual secret key)
    const decoded = jwt.verify(token, "yourSecretKey");

    // Assume `decoded` contains the user ID
    const userId = decoded.userId;
    console.log(req.body);
    // Extract user data from the request body
    const { name, email, phone } = req.body.userInfo;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    // Update user details in the database
    const [result] = await db.query('UPDATE users SET name = ?, email = ?,phone_number = ? WHERE id = ?', [name, email, phone,userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    // Log other errors for debugging
    console.error("Error updating user details:", error.message);

    res.status(500).json({
      success: false,
      message: 'An error occurred while updating user details. Please try again later.',
    });
  }
});


router.get("/assignments/all", async (req, res) => {
  console.log("called assignment all ");
  try {
    const [rows] = await db.query("SELECT * FROM assignment");
    // console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get("/assignments/submissions/:id", async (req, res) => {
  console.log("called assignment fetch");
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
        SELECT submitted.*, user.*
        FROM 
            submitted
        INNER JOIN 
            user
        ON 
            submitted.userid = user.id
        WHERE 
            submitted.itemId = ?;
      `, [id]);
    // console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get("/assignments/:id", async (req, res) => {
    console.log("called assignment fetch");
    const { id } = req.params;
    try {
      const [rows] = await db.query(`
          SELECT * FROM assignment
          WHERE id = ?;
        `, [id]);
      // console.log(rows);
  
      res.status(200).json({
        success: true,
        data: rows,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Database query failed" });
    }
  });

// Add a new assignment
router.post("/items/add", async (req, res) => {
  console.log("called items add");
  console.log(req.body);
  
  const { items } = req.body; // Expecting an array of items in the request body
  console.log(items);
  
  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Items array is required and cannot be empty" });
  }

  try {
    // Map to a list of [name, category, quantity, status]
    const values = items.map((item) => [item.name, item.category, item.quantity, item.status]); 

    const sql = `
      INSERT INTO grocerylist (name, category, quantity, status) 
      VALUES ?
    `;

    // Use MySQL bulk insert feature
    const [result] = await db.query(sql, [values]); 

    res.status(200).json({
      success: true,
      message: "Items added successfully",
      affectedRows: result.affectedRows, // Number of rows inserted
    });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add items" });
  }
});



router.delete('/item/delete/:itemId', async (req, res) => {
  console.log("called delete");
  const itemId = req.params.itemId;

  try {
    // Delete the item from the database
    const [result] = await db.query("DELETE FROM grocerylist WHERE id = ?", [itemId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ success: false, message: 'Failed to delete item' });
  }
});


router.put("/items/update/:id", async (req, res) => {
  console.log("Called update assignment");
  const { id } = req.params; // Assignment ID from the route parameter
  const {status} = req.body
  console.log(req.body);

  try {
    // Update the assignment in the database
    const [result] = await db.query(
      `UPDATE grocerylist 
         SET status = ?
         WHERE id = ?;`,
      [status, id]
    );
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "item updated successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the assignment",
    });
  }
});

// Update a student
router.put("/users/update/:userId", async (req, res) => {
  console.log("called Studentupdate");
  const { userId } = req.params; // Extract userId from the URL
  const { name, email,phone_number } = req.body; // Extract updated fields from the request body
  console.log(req.body);
  try {
    // Validate the input
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Email are required" });
    }

    // Update the student in the database
    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?,phone_number = ? WHERE id = ? AND role = 'user'",
      [name, email, phone_number, userId]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ success: true, message: "Student updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update student" });
  }
});

module.exports = router;

//   // Define where to store the uploaded files (e.g., 'uploads' directory)
//   const uploadDirectory = path.join(__dirname, 'uploads');

//   // Make sure the upload directory exists
//   if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory);
//   }

//   // Middleware to handle file upload
//   const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory temporarily

//   router.post('/upload/:itemId', async (req, res) => {
//     console.log("called upload");
//     console.log(req.body);
//     const itemId = req.params.itemId;
//     const file = req.body.fileContent;
//     const userId = req.body.userId; // Make sure the frontend sends userId in the request body

//     if (userId) {
//       console.log("Entered If");
//       try {

//         const fileData = {
//           itemId: itemId,
//           userId: userId,
//           status: 'submitted',
//           submittedDate :  moment().format('YYYY-MM-DD'),
//           fileContent : file,
//         };

//         // Save file metadata and file path in the database
//         const [result1] = await db.query(
//           'SELECT * FROM `submitted` WHERE userId=? AND itemId=?',
//           [fileData.userId, fileData.itemId]
//         );
//         let f = true;
//         result1.forEach(element => {
//           if (element.status === 'submitted'){
//             res.status(200).json({ success: true, message:'Already Submitted' });
//             f=false;
//           }
//         });
//         if (f){
//           const [result] = await db.query(
//             'INSERT INTO `submitted` (`userId`, `itemId`, `content`, `status`, `submittedDate`) VALUES (?, ?, ?, ?, ?)',
//             [fileData.userId, fileData.itemId, fileData.fileContent, fileData.status, fileData.submittedDate]
//           );
//           console.log(result);
//           res.status(200).json({ success: true, fileId: result.insertId });
//         }
//         // Respond with success
//       } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ success: false, message: 'Failed to save file data' });
//       }
//     } else {
//       res.status(400).json({ success: false, message: 'No file uploaded or userId missing' });
//     }
//   });

// module.exports = router;
