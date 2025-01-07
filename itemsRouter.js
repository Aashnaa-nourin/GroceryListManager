const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require("../db"); // Import the database connection
const moment = require('moment');

// Fetch all students
router.get("/all", async (req, res) => {
  console.log("called all ");
  try {
    const [rows] = await db.query("SELECT * FROM grocerylist"); 
    console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get("/topurchase", async (req, res) => {
  console.log("called topurchase ");
  try {
    const [rows] = await db.query("SELECT * FROM grocerylist where status = 'added'"); 
    console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get("/purchased", async (req, res) => {
  console.log("purchsed called");
  try {
    const [rows] = await db.query("SELECT * FROM grocerylist where status = 'purchased'"); 
    console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

  

module.exports = router;

