const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config(); // Ensure environment variables are loaded

// Set up database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token in adminAuth:', token); // Debug log

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      console.error('JWT Error in adminAuth:', err); // Debug log
      return res.status(403).json({ error: 'Invalid token' });
    }

    const query = 'SELECT * FROM admins WHERE id = ?';
    connection.query(query, [decodedUser.id], (err, results) => {
      if (err) {
        console.error('Database Error in adminAuth:', err); // Debug log
        return res.status(500).json({ error: err.message });
      }

      console.log('Admin Query Results in adminAuth:', results); // Debug log
      if (results.length === 0) {
        return res.status(403).json({ error: 'Not an admin' });
      }

      req.user = decodedUser; // Attach the user info to the request object
      next(); // Proceed to next middleware or route handler
    });
  });
};

module.exports = adminAuth;
