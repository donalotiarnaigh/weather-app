/**
 * Rate Limiting Middleware
 * Protects API endpoints from excessive requests
 */

const rateLimit = require('express-rate-limit');
const config = require('../config');

/**
 * Global rate limiter for all routes
 * Default: 100 requests per 15 minutes
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: config.rateLimit?.global || 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  handler: (req, res, next, options) => {
    // For API endpoints (if needed in the future)
    if (req.accepts('json') && !req.accepts('html')) {
      return res.status(options.statusCode).json({
        error: 'Rate limit exceeded',
        message: options.message,
      });
    }

    // For web interface
    return res.status(options.statusCode).render('error', {
      title: 'Too Many Requests',
      message: options.message,
      statusCode: options.statusCode,
    });
  },
});

/**
 * Stricter rate limiter for weather API endpoints
 * Default: 30 requests per 15 minutes
 */
const weatherApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: config.rateLimit?.weatherApi || 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Too many weather requests, please try again after 15 minutes',
  handler: (req, res, next, options) => {
    // For API endpoints (if needed in the future)
    if (req.accepts('json') && !req.accepts('html')) {
      return res.status(options.statusCode).json({
        error: 'Rate limit exceeded',
        message: options.message,
      });
    }

    // For web interface
    return res.status(options.statusCode).render('error', {
      title: 'Too Many Requests',
      message: options.message,
      statusCode: options.statusCode,
    });
  },
});

module.exports = {
  globalLimiter,
  weatherApiLimiter,
};
