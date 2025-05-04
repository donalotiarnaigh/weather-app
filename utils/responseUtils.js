/**
 * Response Utilities
 * Helper functions for HTTP responses
 */

/**
 * Renders an error page with consistent formatting
 * @param {Response} res - Express response object
 * @param {Error} error - Error object
 * @param {Object} [options] - Additional options
 * @param {string} [options.defaultTitle='Error'] - Default error title
 * @returns {Response} Express response
 */
function renderErrorPage(res, error, options = {}) {
  const statusCode = error.statusCode || 500;
  const defaultTitle = options.defaultTitle || 'Error';

  // Determine appropriate title based on status code
  let title;
  switch (statusCode) {
    case 400:
      title = 'Invalid Input';
      break;
    case 404:
      title = 'Not Found';
      break;
    case 429:
      title = 'Too Many Requests';
      break;
    default:
      title = defaultTitle;
  }

  return res.status(statusCode).render('error', {
    title,
    message: error.message,
    statusCode,
  });
}

module.exports = {
  renderErrorPage,
};
