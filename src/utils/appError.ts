/**
 * @description Custom error class for handling application-specific errors.
 */
class AppError extends Error {
  /* The HTTP status code associated with the error.*/
  statusCode: number;

  /* The status type based on the HTTP status code.
   * If the code starts with '4', status is set to 'fail', otherwise 'error'.*/
  status: string;

  /* Indicates whether the error is operational (can be safely handled).*/
  isOperational: boolean;

  /**
   * Creates an instance of AppError.
   * @param {string} message - The error message.
   * @param {string} statusCode - The HTTP status code for the error.
   */
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Capture the stack trace for better error reporting.
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
