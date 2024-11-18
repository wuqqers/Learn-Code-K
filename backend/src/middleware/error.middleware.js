import { AppError } from '../utils/appError.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // AppError instance'larını işle
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Mongoose validation hatalarını işle
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message
    });
  }

  // Mongoose duplicate key hatasını işle
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }

  // JWT hatalarını işle
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Diğer tüm hataları işle
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
}; 