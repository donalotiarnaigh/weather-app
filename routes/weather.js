/**
 * Weather routes
 * Handles all weather-related routes
 */

const express = require('express');
const router = express.Router();
const { weatherService } = require('../services');
const { ValidationError, ApiError } = require('../utils');

/**
 * GET / - Home page with weather search form
 */
router.get('/', (req, res) => {
  res.render('home');
});

/**
 * POST / - Handle weather search form submission
 */
router.post('/', async (req, res, next) => {
  try {
    const cityName = req.body.cityName;
    
    // Validate city name
    if (!cityName || cityName.trim() === '') {
      return res.render('error', {
        title: 'Invalid Input',
        message: 'Please enter a city name',
        statusCode: 400
      });
    }
    
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
        statusCode: 400
      });
    }
    
    // Pass other errors to error handler
    next(error);
  }
});

/**
 * GET /weather/:city - Direct access to weather data for a city
 */
router.get('/weather/:city', async (req, res, next) => {
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
        statusCode: 400
      });
    }
    
    // Pass other errors to error handler
    next(error);
  }
});

module.exports = router; 