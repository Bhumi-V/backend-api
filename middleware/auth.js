//const jwt = require('jsonwebtoken');

//module.exports = function (req, res, next) {
  //const authHeader = req.header('Authorization');

  //if (!authHeader) {
    //return res.status(401).json({ message: 'Access denied. No token provided.' });
  //}

  //const token = authHeader.replace("Bearer ", "");

  //try {
    //const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //req.user = decoded; 
    //next();
  //} catch (err) {
    //return res.status(401).json({ message: 'Invalid token' });
  //}
//};
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
  const cleaned = token.replace(/^Bearer\s+/i, '').trim(); // handles "Bearer " or "bearer "
  const decoded = jwt.verify(cleaned, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch (err) {
  return res.status(400).json({ message: 'Invalid token' });
}
};