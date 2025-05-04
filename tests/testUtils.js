/**
 * Test utilities and helpers
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/**
 * Creates a test Express app with minimal configuration
 * @returns {express.Application} Configured Express application for testing
 */
function createTestApp() {
  const app = express();

  // Configure middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Configure view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'views'));

  return app;
}

/**
 * Creates a test Express app with the given route handler
 * @param {Function} routeHandler - Route handler to test
 * @returns {express.Application} Configured Express application with route handler
 */
function createTestAppWithRoutes(routeHandler) {
  const app = createTestApp();
  routeHandler(app);
  return app;
}

/**
 * Mock response object for unit testing middleware
 * @returns {Object} Mock response object
 */
function mockResponse() {
  const res = {};

  // Mock status method
  res.status = jest.fn().mockReturnValue(res);

  // Mock json method
  res.json = jest.fn().mockReturnValue(res);

  // Mock render method
  res.render = jest.fn().mockReturnValue(res);

  // Mock send method
  res.send = jest.fn().mockReturnValue(res);

  // Mock header method
  res.header = jest.fn().mockReturnValue(res);

  return res;
}

/**
 * Mock request object for unit testing middleware
 * @param {Object} options - Request options
 * @returns {Object} Mock request object
 */
function mockRequest(options = {}) {
  return {
    body: options.body || {},
    params: options.params || {},
    query: options.query || {},
    headers: options.headers || {},
    accepts: jest.fn(type => options.accepts === type),
    ...options,
  };
}

/**
 * Mock next function for unit testing middleware
 * @returns {Function} Mock next function
 */
function mockNext() {
  return jest.fn();
}

module.exports = {
  createTestApp,
  createTestAppWithRoutes,
  mockResponse,
  mockRequest,
  mockNext,
};
