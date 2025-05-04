/**
 * Utility functions registry
 * Centralizes all utility functions for easy access
 */

const { validateConfig } = require('./validateConfig');
const { httpsGet } = require('./httpUtils');
const { AppError, ApiError, ValidationError } = require('./errors');
const { renderErrorPage } = require('./responseUtils');

module.exports = {
  // Utility functions
  validateConfig,
  httpsGet,
  renderErrorPage,

  // Error classes
  AppError,
  ApiError,
  ValidationError,
};
