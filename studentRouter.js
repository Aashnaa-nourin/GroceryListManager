const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Fetch all students
router.get('/submitted/:studentId', async (req, res) => {
  console.log("Called Submitted")
  try {
    const studentId = req.params.studentId;
    const [rows] = await db.query(`SELECT 
                        submitted.*, 
                        assignment.*
                    FROM 
                        submitted
                    INNER JOIN 
                        assignment
                    ON 
                        submitted.assignmentId = assignment.id
                    WHERE 
                        submitted.userId = ${studentId} AND submitted.status = "submitted";`); // Replace `students` with your table name
    console.log(`SELECT 
                        submitted.*, 
                        assignment.*
                    FROM 
                        submitted
                    INNER JOIN 
                        assignment
                    ON 
                        submitted.assignmentId = assignment.id
                    WHERE 
                        submitted.userId = ${studentId} AND submitted.status = "submitted"`);
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: 'Database query failed' });
  }
});
// Mock data for a single student
router.delete('/submitted/delete/:assignmentId', async (req, res) => {
  console.log("called deleted");
  const assignmentId = req.params.assignmentId;
  try {
    // Delete assignment from the database
    const [result] = await db.query("UPDATE `submitted` SET `status` = 'deleted\r\n' WHERE `submitted`.`sId` = ?", [assignmentId]);
    console.log("UPDATE `submitted` SET `status` = 'deleted\r\n' WHERE `submitted`.`id` =", assignmentId);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Assignment not found' });
    }
  } catch (err) {
    console.error('Error deleting assignment:', err);
    res.status(500).json({ success: false, message: 'Failed to delete assignment' });
  }
});


module.exports = router;
