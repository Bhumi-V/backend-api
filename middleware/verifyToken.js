// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
  // Read Authorization header: "Bearer <token>" or just "<token>"
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Remove "Bearer " if present
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  try {
    // Secret MUST match what you used in userRoutes.js for jwt.sign(...)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded: { id, role, iat, exp }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verify error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};