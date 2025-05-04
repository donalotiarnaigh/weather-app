/**
 * Middleware registry
 * Central export point for all middleware
 */

const errorHandler = require('./errorHandler');
const validationMiddleware = require('./validationMiddleware');
const rateLimitMiddleware = require('./rateLimitMiddleware');

module.exports = {
  errorHandler,
  validationMiddleware,
  rateLimitMiddleware,
};
