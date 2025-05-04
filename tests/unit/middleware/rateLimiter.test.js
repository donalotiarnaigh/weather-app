/**
 * Rate Limiter Middleware Tests
 */

// Mock express-rate-limit BEFORE requiring the middleware
jest.mock('express-rate-limit', () => {
  // Create a mock function that returns a middleware function with options attached
  const rateLimitMock = jest.fn().mockImplementation(options => {
    const middleware = (req, res, next) => next();
    middleware.options = options;
    return middleware;
  });

  return rateLimitMock;
});

// Now we can require the modules that depend on the mocked module
const { rateLimitMiddleware } = require('../../../middleware');
const config = require('../../../config');

describe('Rate Limiter Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('globalLimiter', () => {
    it('should be configured with correct rate limits', () => {
      expect(rateLimitMiddleware.globalLimiter).toBeDefined();

      // Check that the options were passed correctly
      const options = rateLimitMiddleware.globalLimiter.options;
      expect(options.windowMs).toBe(15 * 60 * 1000); // 15 minutes
      expect(options.limit).toBe(config.rateLimit.global);
    });

    it('should include JSON response handler for API requests', () => {
      const handler = rateLimitMiddleware.globalLimiter.options.handler;
      expect(handler).toBeDefined();

      // Create mock request and response for JSON
      const mockJsonResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockRequest = {
        accepts: jest.fn().mockImplementation(type => type === 'json'),
      };

      // Call the handler
      handler(mockRequest, mockJsonResponse, jest.fn(), {
        statusCode: 429,
        message: 'Rate limit exceeded',
      });

      // Verify correct JSON response
      expect(mockJsonResponse.status).toHaveBeenCalledWith(429);
      expect(mockJsonResponse.json).toHaveBeenCalledWith({
        error: 'Rate limit exceeded',
        message: 'Rate limit exceeded',
      });
    });

    it('should include HTML response handler for web requests', () => {
      const handler = rateLimitMiddleware.globalLimiter.options.handler;
      expect(handler).toBeDefined();

      // Create mock request and response for HTML
      const mockHtmlResponse = {
        status: jest.fn().mockReturnThis(),
        render: jest.fn(),
      };

      const mockRequest = {
        accepts: jest.fn().mockImplementation(type => type === 'html'),
      };

      // Call the handler
      handler(mockRequest, mockHtmlResponse, jest.fn(), {
        statusCode: 429,
        message: 'Rate limit exceeded',
      });

      // Verify correct HTML response
      expect(mockHtmlResponse.status).toHaveBeenCalledWith(429);
      expect(mockHtmlResponse.render).toHaveBeenCalledWith('error', {
        title: 'Too Many Requests',
        message: 'Rate limit exceeded',
        statusCode: 429,
      });
    });
  });

  describe('weatherApiLimiter', () => {
    it('should be configured with correct rate limits', () => {
      expect(rateLimitMiddleware.weatherApiLimiter).toBeDefined();

      // Check that the options were passed correctly
      const options = rateLimitMiddleware.weatherApiLimiter.options;
      expect(options.windowMs).toBe(15 * 60 * 1000); // 15 minutes
      expect(options.limit).toBe(config.rateLimit.weatherApi);
    });

    it('should use more restrictive settings than global limiter', () => {
      expect(config.rateLimit.weatherApi).toBeLessThan(config.rateLimit.global);
    });

    it('should have a custom error message for weather endpoints', () => {
      const options = rateLimitMiddleware.weatherApiLimiter.options;
      expect(options.message).toContain('weather');
    });
  });
});
