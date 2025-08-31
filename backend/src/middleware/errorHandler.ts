import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http';
import { z } from 'zod';
import AppError from '../utils/AppError';
import { REFRESH_PATH, clearAuthCookies } from '../utils/cookies';

// Generate request ID for tracking
const generateRequestId = () => Math.random().toString(36).substring(2, 15);

const handleZodError = (res: Response, error: z.ZodError): void => {
  const errors = error.issues.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));

  res.status(BAD_REQUEST).json({
    success: false,
    message: 'Validation failed',
    errors,
    timestamp: new Date().toISOString(),
  });
};

const handleAppError = (res: Response, error: AppError): void => {
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errorCode: error.errorCode,
    timestamp: new Date().toISOString(),
  });
};

const handleMongoError = (res: Response, error: any): void => {
  let statusCode = INTERNAL_SERVER_ERROR;
  let message = 'Database error occurred';

  if (error.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
  } else if (error.name === 'ValidationError') {
    statusCode = BAD_REQUEST;
    message = 'Validation failed';
  }

  res.status(statusCode).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next): void => {
  const requestId = generateRequestId();
  
  // Log error with request context
  console.error(`[${requestId}] Error on ${req.method} ${req.path}:`, {
    error: error.message,
    stack: error.stack,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  // Clear auth cookies for refresh path errors
  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  // Handle different error types
  if (error instanceof z.ZodError) {
    return void handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return void handleAppError(res, error);
  }

  // Handle MongoDB errors
  if (error.name === 'MongoError' || error.name === 'ValidationError') {
    return void handleMongoError(res, error);
  }

  // Default error response
  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal server error',
    requestId,
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;
