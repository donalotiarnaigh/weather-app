/**
 * Config Module Tests
 */

describe('Config Module', () => {
  // Save original environment and process.exit
  const originalEnv = process.env;
  const originalExit = process.exit;

  // Mock console.error to suppress expected error messages during tests
  const originalConsoleError = console.error;

  beforeEach(() => {
    // Clear cache to reload the module with new environment
    jest.resetModules();

    // Create a fresh process.env for each test
    process.env = { ...originalEnv };

    // Mock process.exit
    process.exit = jest.fn();

    // Silence console.error during tests
    console.error = jest.fn();
  });

  afterEach(() => {
    // Restore original environment and process.exit
    process.env = originalEnv;
    process.exit = originalExit;
    console.error = originalConsoleError;
  });

  it('should load dotenv if OPENWEATHER_API_KEY is not set', () => {
    // Ensure API key is not set
    delete process.env.OPENWEATHER_API_KEY;

    // Mock dotenv.config()
    jest.mock('dotenv', () => ({
      config: jest.fn(),
    }));

    // This should trigger dotenv.config()
    const dotenv = require('dotenv');
    require('../../../config');

    expect(dotenv.config).toHaveBeenCalled();
  });

  it('should not load dotenv if OPENWEATHER_API_KEY is already set', () => {
    // Set API key
    process.env.OPENWEATHER_API_KEY = 'test-api-key';

    // Mock dotenv.config()
    jest.mock('dotenv', () => ({
      config: jest.fn(),
    }));

    const dotenv = require('dotenv');
    require('../../../config');

    expect(dotenv.config).not.toHaveBeenCalled();
  });

  it('should use environment variables when available', () => {
    // Set custom environment values
    process.env.PORT = '4000';
    process.env.NODE_ENV = 'test';
    process.env.OPENWEATHER_API_KEY = 'custom-api-key';
    process.env.RATE_LIMIT_GLOBAL = '200';
    process.env.RATE_LIMIT_WEATHER_API = '50';

    // Import config module
    const config = require('../../../config');

    // Verify environment values were used
    // Note: PORT is not converted to a number in the implementation
    expect(config.port).toBe('4000'); // PORT is directly assigned from process.env
    expect(config.nodeEnv).toBe('test');
    expect(config.openWeatherApiKey).toBe('custom-api-key');
    expect(config.rateLimit.global).toBe(200); // This is parsed to a number
    expect(config.rateLimit.weatherApi).toBe(50); // This is parsed to a number
  });

  it('should use default values when environment variables are not available', () => {
    // Ensure environment variables are not set
    delete process.env.PORT;
    delete process.env.NODE_ENV;
    delete process.env.RATE_LIMIT_GLOBAL;
    delete process.env.RATE_LIMIT_WEATHER_API;
    // API key must be set or the module will exit
    process.env.OPENWEATHER_API_KEY = 'test-key';

    // Import config module
    const config = require('../../../config');

    // Verify default values were used
    expect(config.port).toBe(3000);
    expect(config.nodeEnv).toBe('development');
    expect(config.rateLimit.global).toBe(100);
    expect(config.rateLimit.weatherApi).toBe(30);
  });

  it('should exit process if required environment variables are missing', () => {
    // Remove required API key
    delete process.env.OPENWEATHER_API_KEY;

    // Try to import config module, which should validate and exit
    require('../../../config');

    // Verify process.exit was called
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalled();
  });
});
