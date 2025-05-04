/**
 * Weather routes
 * Handles all weather-related routes
 */

const express = require('express');
const router = express.Router();
const { weatherService } = require('../services');
const { ValidationError, renderErrorPage } = require('../utils');
const { validationMiddleware, rateLimitMiddleware } = require('../middleware');

/**
 * Creates a route handler for weather data requests
 * @param {Function} getParam - Function to extract city name from request
 * @returns {Function} Express route handler
 */
function createWeatherHandler(getParam) {
  return async (req, res, next) => {
    try {
      const cityName = getParam(req);

      // Get weather data
      const weatherData = await weatherService.getCurrentWeather(cityName);

      // Render weather data
      res.render('weather', weatherData);
    } catch (error) {
      // Handle specific errors
      if (error instanceof ValidationError) {
        return renderErrorPage(res, error);
      }

      // Pass other errors to error handler
      next(error);
    }
  };
}

/**
 * GET / - Home page with weather search form
 */
router.get('/', (req, res) => {
  res.render('home');
});

/**
 * POST / - Handle weather search form submission
 */
router.post(
  '/',
  rateLimitMiddleware.weatherApiLimiter,
  validationMiddleware.validateWeatherSearch,
  createWeatherHandler(req => req.body.cityName)
);

/**
 * GET /weather/:city - Direct access to weather data for a city
 */
router.get(
  '/weather/:city',
  rateLimitMiddleware.weatherApiLimiter,
  validationMiddleware.validateCityParam,
  createWeatherHandler(req => req.params.city)
);

module.exports = router;
