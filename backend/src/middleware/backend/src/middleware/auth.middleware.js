import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Verify JWT token middleware
 * Checks if user is authenticated
 */
export const verifyToken = (req, res, next) => {
    try {
          // Get token from header
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
              return res.status(401).json({
                        success: false,
                        error: 'No token provided',
                        message: 'Authorization token is required'
              });
      }

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
          req.user = decoded;
          next();
    } catch (error) {
          return res.status(401).json({
                  success: false,
                  error: 'Invalid or expired token',
                  message: error.message
          });
    }
};

/**
 * Optional token verification
 * Doesn't require token but sets user if provided
 */
export const optionalAuth = (req, res, next) => {
    try {
          const token = req.headers.authorization?.split(' ')[1];

      if (token) {
              const decoded = jwt.verify(token, JWT_SECRET);
              req.user = decoded;
      }
          next();
    } catch (error) {
          // Token is invalid but optional, so continue
      next();
    }
};

/**
 * Admin role verification middleware
 * Requires user to be admin
 */
export const requireAdmin = (req, res, next) => {
    try {
          if (!req.user || req.user.role !== 'admin') {
                  return res.status(403).json({
                            success: false,
                            error: 'Forbidden',
                            message: 'Admin access required'
                  });
          }
          next();
    } catch (error) {
          return res.status(403).json({
                  success: false,
                  error: 'Access denied'
          });
    }
};

/**
 * Error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
          success: false,
          error: message,
          timestamp: new Date().toISOString()
    });
};

/**
 * Request logging middleware
 */
export const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
          const duration = Date.now() - start;
          console.log(`📝 ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });

    next();
};

export default {
    verifyToken,
    optionalAuth,
    requireAdmin,
    errorHandler,
    requestLogger
};
