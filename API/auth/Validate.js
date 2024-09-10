import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

function verifyJWT(req, res, next) {
  const token = req.query.token; // Extract token from query parameters

  if (!token) {
    console.log('Token not provided');
    return res.status(400).json({
      isLogged: false,
      message: 'Token not provided',
    });
  }

  jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).json({
        isLogged: false,
        message: 'Failed to authenticate',
      });
    }

    res.json({
      isLogged: true,
      message: 'Logged In',
      email: decoded.email, // Use decoded.email instead of req.email
    });
  });
}

router.get('/validate', verifyJWT); // Change the route to expect token as a query parameter

export default router;
