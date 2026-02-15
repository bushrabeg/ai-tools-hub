import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// User registration
router.post('/register', async (req, res) => {
    try {
          const { email, password, username } = req.body;

      // TODO: Validate input
      // TODO: Check if user exists in database
      // TODO: Hash password
      // TODO: Save to database

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = {
              id: Date.now(),
              email,
              username,
              password: hashedPassword,
              created_at: new Date()
      };

      res.status(201).json({
              success: true,
              message: 'User registered successfully',
              user: {
                        id: newUser.id,
                        email: newUser.email,
                        username: newUser.username
              }
      });
    } catch (error) {
          res.status(500).json({
                  success: false,
                  error: error.message
          });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
          const { email, password } = req.body;

      // TODO: Validate input
      // TODO: Find user in database
      // TODO: Compare password

      const user = {
              id: 1,
              email: email,
              username: 'user'
      };

      const token = jwt.sign(
        { userId: user.id, email: user.email },
              JWT_SECRET,
        { expiresIn: '7d' }
            );

      res.status(200).json({
              success: true,
              message: 'Login successful',
              token,
              user: {
                        id: user.id,
                        email: user.email,
                        username: user.username
              }
      });
    } catch (error) {
          res.status(500).json({
                  success: false,
                  error: error.message
          });
    }
});

// Get current user profile
router.get('/me', (req, res) => {
    try {
          // TODO: Verify JWT token from headers
      // TODO: Get user from database

      const user = {
              id: 1,
              email: 'user@example.com',
              username: 'username',
              created_at: new Date()
      };

      res.status(200).json({
              success: true,
              data: user
      });
    } catch (error) {
          res.status(500).json({
                  success: false,
                  error: error.message
          });
    }
});

// Update profile
router.put('/profile', (req, res) => {
    try {
          // TODO: Verify JWT token
      // TODO: Validate input
      // TODO: Update in database

      const { username, bio } = req.body;

      const updatedUser = {
              id: 1,
              username,
              bio,
              updated_at: new Date()
      };

      res.status(200).json({
              success: true,
              message: 'Profile updated successfully',
              data: updatedUser
      });
    } catch (error) {
          res.status(500).json({
                  success: false,
                  error: error.message
          });
    }
});

// Change password
router.post('/change-password', async (req, res) => {
    try {
          const { oldPassword, newPassword } = req.body;

      // TODO: Verify JWT token
      // TODO: Verify old password
      // TODO: Hash new password
      // TODO: Update in database

      res.status(200).json({
              success: true,
              message: 'Password changed successfully'
      });
    } catch (error) {
          res.status(500).json({
                  success: false,
                  error: error.message
          });
    }
});

// Logout
router.post('/logout', (req, res) => {
    try {
          // TODO: Invalidate token (optional - depends on frontend)

      res.status(200).json({
              success: true,
              message: 'Logged out successfully'
      });
    } catch (error) {
          res.status(500).json({
                  success: false,
                  error: error.message
          });
    }
});

// Verify token
router.post('/verify-token', (req, res) => {
    try {
          const { token } = req.body;

      if (!token) {
              return res.status(401).json({
                        success: false,
                        error: 'No token provided'
              });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      res.status(200).json({
              success: true,
              message: 'Token is valid',
              decoded
      });
    } catch (error) {
          res.status(401).json({
                  success: false,
                  error: 'Invalid or expired token'
          });
    }
});

export default router;
