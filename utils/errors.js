/**
 * Custom error classes
 */

/**
 * Base application error class
 */
class AppError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * API error for external service failures
 */
class ApiError extends AppError {
  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {string} service - Name of the failed service
   */
  constructor(message, statusCode = 500, service = 'Unknown') {
    super(message, statusCode);
    this.service = service;
  }

  /**
   * User-friendly error message
   * @returns {string} Formatted error message
   */
  getUserMessage() {
    return `Service error with ${this.service}: ${this.message}`;
  }
}

/**
 * Validation error for invalid input
 */
class ValidationError extends AppError {
  /**
   * @param {string} message - Error message
   * @param {Object} validationErrors - Detailed validation errors
   */
  constructor(message, validationErrors = {}) {
    super(message, 400);
    this.validationErrors = validationErrors;
  }
}

module.exports = {
  AppError,
  ApiError,
  ValidationError,
};
