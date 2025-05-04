/**
 * Application configuration
 * Centralizes all configuration variables and provides defaults
 */

// Load environment variables if not already loaded
if (!process.env.OPENWEATHER_API_KEY) {
  require('dotenv').config();
}

// Initialize configuration object with defaults
const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // API Keys
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,

  // API URLs
  openWeatherApiUrl: 'https://api.openweathermap.org/data/2.5',

  // Weather API settings
  defaultUnit: 'metric',

  // Rate limiting
  rateLimit: {
    global: parseInt(process.env.RATE_LIMIT_GLOBAL || '100'),
    weatherApi: parseInt(process.env.RATE_LIMIT_WEATHER_API || '30'),
  },
};

// Helper function to validate configuration
function validateConfig() {
  const requiredVars = ['openWeatherApiKey'];

  // Check for required variables
  const missing = requiredVars.filter(name => !config[name]);

  if (missing.length > 0) {
    console.error(`Error: Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  return true;
}

// Validate configuration
validateConfig();

module.exports = config;
