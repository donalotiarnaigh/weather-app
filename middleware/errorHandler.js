/**
 * Error handling middleware
 */

const { ApiError, renderErrorPage } = require('../utils');

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

  // Special handling for API errors to provide better context
  if (err instanceof ApiError) {
    const apiError = err;

    // Create a more user-friendly error
    apiError.message = apiError.getUserMessage();

    // Use custom title for the error page
    return renderErrorPage(res, apiError, {
      defaultTitle: `Service Error (${apiError.service})`,
    });
  }

  // For 500 errors in production, mask the details
  if ((err.statusCode === 500 || !err.statusCode) && process.env.NODE_ENV === 'production') {
    const maskedError = new Error('An unexpected error occurred. Please try again later.');
    maskedError.statusCode = 500;

    return renderErrorPage(res, maskedError, {
      defaultTitle: 'Server Error',
    });
  }

  // For all other errors, use the standard error page renderer
  return renderErrorPage(res, err);
}

module.exports = errorHandler;
