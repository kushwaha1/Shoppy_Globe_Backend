import jwt from 'jsonwebtoken'; // Import JWT for token verification

// Authentication middleware
export default async function (req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization || '';  
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // If no token, deny access
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = { id: decoded.id, email: decoded.email };

    next(); // Proceed to next middleware/route
  } catch (err) {
    // If token invalid, deny access
    return res.status(401).json({ message: 'Token is not valid' });
  }
}