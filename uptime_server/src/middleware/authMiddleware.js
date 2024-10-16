import { verifyToken } from "../utility/jwtHelper.js";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);
    
    // Corrected: Use `id` instead of `userId`
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(403).json({ error: 'Token does not contain a user ID' });
    }

    if (req.body.userId && req.body.userId !== userId) {
      return res.status(403).json({ error: 'Invalid user ID' });
    } else {
      req.userId = userId; // Attach userId to request object
      next();
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      error: 'Invalid request!',
      details: error.message || 'Authorization failed'
    });
  }
};
