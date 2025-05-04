/**
 * Jest setup file
 * Sets up the test environment with mock environment variables
 */

// Mock environment variables for testing
process.env.OPENWEATHER_API_KEY = 'mock-api-key-for-testing';
process.env.PORT = '3000';
process.env.NODE_ENV = 'test';
process.env.RATE_LIMIT_GLOBAL = '100';
process.env.RATE_LIMIT_WEATHER_API = '30';

// This prevents process.exit calls from stopping the test runner
const originalExit = process.exit;
process.exit = code => {
  console.warn(`Test tried to call process.exit(${code})`);
  // Return instead of actually exiting
  return undefined;
};

// Restore the original process.exit after tests
afterAll(() => {
  process.exit = originalExit;
});
