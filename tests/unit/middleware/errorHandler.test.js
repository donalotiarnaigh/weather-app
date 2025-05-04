/**
 * Error Handler Middleware Tests
 */

const { errorHandler } = require('../../../middleware');
const { ApiError, AppError } = require('../../../utils');
const { mockRequest, mockResponse } = require('../../testUtils');

describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = jest.fn();
  });

  it('should handle generic errors with 500 status code', () => {
    const error = new Error('Something went wrong');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.render).toHaveBeenCalledWith(
      'error',
      expect.objectContaining({
        title: 'Server Error',
        message: 'Something went wrong',
        statusCode: 500,
      })
    );
  });

  it('should handle AppError with custom status code', () => {
    const error = new AppError('Bad request', 400);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.render).toHaveBeenCalledWith(
      'error',
      expect.objectContaining({
        message: 'Bad request',
        statusCode: 400,
      })
    );
  });

  it('should handle ApiError with service information', () => {
    const error = new ApiError('Service unavailable', 503, 'WeatherAPI');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.render).toHaveBeenCalledWith(
      'error',
      expect.objectContaining({
        title: 'Service Error (WeatherAPI)',
        message: 'Service error with WeatherAPI: Service unavailable',
        statusCode: 503,
      })
    );
  });

  it('should sanitize error message in production environment', () => {
    // Save original environment
    const originalNodeEnv = process.env.NODE_ENV;

    // Set production environment
    process.env.NODE_ENV = 'production';

    const error = new Error('Internal server details that should be hidden');

    errorHandler(error, req, res, next);

    expect(res.render).toHaveBeenCalledWith(
      'error',
      expect.objectContaining({
        message: 'An unexpected error occurred. Please try again later.',
      })
    );

    // Restore original environment
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('should log errors for debugging', () => {
    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const error = new Error('Test error');

    errorHandler(error, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalled();

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});
