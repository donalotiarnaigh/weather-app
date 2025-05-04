/**
 * Validation Middleware
 * Handles input validation for routes
 */

const { body, param, validationResult } = require('express-validator');

/**
 * Middleware to process validation results
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationErrors = {};
    const errorMessages = [];

    errors.array().forEach(error => {
      validationErrors[error.path] = error.msg;
      errorMessages.push(error.msg);
    });

    // For API endpoints (if needed in the future)
    if (req.accepts('json') && !req.accepts('html')) {
      return res.status(400).json({
        error: 'Validation Error',
        details: validationErrors,
      });
    }

    // For web interface
    return res.status(400).render('error', {
      title: 'Invalid Input',
      message: errorMessages.join(', '),
      statusCode: 400,
    });
  }

  next();
};

/**
 * Validation rules for weather search by city name (form submission)
 */
const validateWeatherSearch = [
  body('cityName')
    .trim()
    .notEmpty()
    .withMessage('City name is required')
    .isLength({ min: 2 })
    .withMessage('City name must be at least 2 characters')
    .isLength({ max: 50 })
    .withMessage('City name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s,.-]+$/)
    .withMessage('City name can only contain letters, spaces, commas, periods, and hyphens'),
  validateRequest,
];

/**
 * Validation rules for city parameter in URL
 */
const validateCityParam = [
  param('city')
    .trim()
    .notEmpty()
    .withMessage('City name is required')
    .isLength({ min: 2 })
    .withMessage('City name must be at least 2 characters')
    .isLength({ max: 50 })
    .withMessage('City name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s,.-]+$/)
    .withMessage('City name can only contain letters, spaces, commas, periods, and hyphens'),
  validateRequest,
];

module.exports = {
  validateWeatherSearch,
  validateCityParam,
};
