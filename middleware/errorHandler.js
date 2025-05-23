/**
 * Error handling middleware
 */

const { ApiError } = require('../utils');

/**
 * Global error handler middleware
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} _next - Express next function (unused but required for middleware signature)
 */
function errorHandler(err, req, res, _next) {
  // Log the error for debugging
  console.error('Error:', err);

  // Set default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let title = 'Error';

  // Handle API errors
  if (err instanceof ApiError) {
    title = `Service Error (${err.service})`;
    message = err.getUserMessage();
  }

  // Handle other types of errors
  if (statusCode === 500) {
    title = 'Server Error';

    // In production, don't expose detailed error messages
    if (process.env.NODE_ENV === 'production') {
      message = 'An unexpected error occurred. Please try again later.';
    }
  }

  // Render the error page
  res.status(statusCode).render('error', {
    title,
    message,
    statusCode,
  });
}

module.exports = errorHandler;
