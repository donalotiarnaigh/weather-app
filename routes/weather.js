/**
 * Weather routes
 * Handles all weather-related routes
 */

const express = require('express');
const router = express.Router();
const { weatherService } = require('../services');
const { ValidationError } = require('../utils');
const { validationMiddleware, rateLimitMiddleware } = require('../middleware');

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
  async (req, res, next) => {
    try {
      const cityName = req.body.cityName;

      // Get weather data
      const weatherData = await weatherService.getCurrentWeather(cityName);

      // Render weather data
      res.render('weather', weatherData);
    } catch (error) {
      // Handle specific errors
      if (error instanceof ValidationError) {
        return res.status(400).render('error', {
          title: 'Invalid Input',
          message: error.message,
          statusCode: 400,
        });
      }

      // Pass other errors to error handler
      next(error);
    }
  }
);

/**
 * GET /weather/:city - Direct access to weather data for a city
 */
router.get(
  '/weather/:city',
  rateLimitMiddleware.weatherApiLimiter,
  validationMiddleware.validateCityParam,
  async (req, res, next) => {
    try {
      const cityName = req.params.city;

      // Get weather data
      const weatherData = await weatherService.getCurrentWeather(cityName);

      // Render weather data
      res.render('weather', weatherData);
    } catch (error) {
      // Handle specific errors
      if (error instanceof ValidationError) {
        return res.status(400).render('error', {
          title: 'Invalid Input',
          message: error.message,
          statusCode: 400,
        });
      }

      // Pass other errors to error handler
      next(error);
    }
  }
);

module.exports = router;
