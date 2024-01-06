import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

// Handles errors in a development environment, providing detailed error information.
const sendErrorDev = (err: any, req: Request, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Placeholder function for handling errors in a production environment.
const sendErrorProd = (err: any, req: Request, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// Global error-handling middleware for an Express application.
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default values for status code and status if not provided in the error object.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Choose appropriate error-handling logic based on the environment (development or production).
  if (process.env.NODE_ENV === "development") {
    // Handle error in development environment.
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    // Create a shallow copy of the error object to avoid exposing sensitive information.
    let error = { ...err };
    error.message = err.message;

    // Handle error in production environment.
    sendErrorProd(error, req, res);
  }
};

export default globalErrorHandler;
