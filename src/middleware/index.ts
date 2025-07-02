import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { contactFormSchema } from '../validation/schemas';
import { ApiResponse } from '../types/email.types';

// Rate limiting middleware
export const emailRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'), // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many email requests. Please try again later.',
    error: 'Rate limit exceeded'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation middleware
export const validateContactForm = (req: Request, res: Response, next: NextFunction) => {
  const { error } = contactFormSchema.validate(req.body);
  
  if (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Validation failed',
      error: error.details[0].message
    };
    
    return res.status(400).json(response);
  }
  
  next();
};

// Error handling middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  
  const response: ApiResponse = {
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  };
  
  res.status(500).json(response);
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.path}`
  };
  
  res.status(404).json(response);
};