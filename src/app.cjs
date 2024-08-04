const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = require('./middleware/auth.cjs');
const adminAuth = require('./middleware/adminAuth.cjs');

const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.use(cors());
app.use(bodyParser.json());

// Handle user registration
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, email, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle user login and JWT generation
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle admin login and JWT generation
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const query = 'SELECT * FROM admins WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const admin = results[0];
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Admin login successful', token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle admin addition
app.post('/api/admin/add', authenticateToken, adminAuth, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO admins (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, email, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Admin added successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
