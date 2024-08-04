const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Token in authenticateToken:', token); // Debug log

  if (!token) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Error in authenticateToken:', err); // Debug log
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user; // Attach user to request object
    next(); // Proceed to next middleware or route handler
  });
};

module.exports = authenticateToken;
