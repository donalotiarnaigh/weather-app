/**
 * Weather Service
 * Handles interactions with the OpenWeatherMap API
 */

const config = require('../config');
const { httpsGet, ApiError, ValidationError } = require('../utils');

/**
 * Gets current weather for a specific city
 * @param {string} city - City name
 * @param {string} unit - Unit of temperature (metric or imperial)
 * @returns {Promise<Object>} Weather data
 * @throws {ValidationError} If city is not provided or invalid
 * @throws {ApiError} If there's an error with the OpenWeatherMap API
 */
async function getCurrentWeather(city, unit = config.defaultUnit) {
  // Validate inputs
  if (!city || typeof city !== 'string' || city.trim() === '') {
    throw new ValidationError('City name is required', { city: 'City name is required' });
  }

  try {
    // Build the API URL
    const apiUrl = `${config.openWeatherApiUrl}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${config.openWeatherApiKey}`;
    
    // Make the API request
    const weatherData = await httpsGet(apiUrl);
    
    // Process and return the data
    return {
      location: city.charAt(0).toUpperCase() + city.slice(1),
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      pressure: weatherData.main.pressure,
      imageURL: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    };
  } catch (error) {
    // Handle API errors
    if (error.message && error.message.includes('HTTP status code 404')) {
      throw new ValidationError(`City not found: ${city}`, { city: 'City not found' });
    }
    
    // Re-throw API errors with proper context
    throw new ApiError(
      error.message || 'Error fetching weather data',
      error.statusCode || 500,
      'OpenWeatherMap'
    );
  }
}

/**
 * Validates if a city name exists
 * @param {string} city - City name to validate
 * @returns {Promise<boolean>} True if city exists, false otherwise
 */
async function validateCity(city) {
  try {
    await getCurrentWeather(city);
    return true;
  } catch (error) {
    if (error instanceof ValidationError) {
      return false;
    }
    throw error;
  }
}

module.exports = {
  getCurrentWeather,
  validateCity
}; 