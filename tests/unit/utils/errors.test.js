/**
 * Error Classes Tests
 */

const { AppError, ValidationError, ApiError } = require('../../../utils');

describe('Error Classes', () => {
  describe('AppError', () => {
    it('should create an instance with correct properties', () => {
      const error = new AppError('Test error', 400);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('AppError');
    });

    it('should default to 500 status code if not provided', () => {
      const error = new AppError('Test error');

      expect(error.statusCode).toBe(500);
    });
  });

  describe('ValidationError', () => {
    it('should create an instance with correct properties', () => {
      const validationErrors = { field: 'Field is required' };
      const error = new ValidationError('Validation failed', validationErrors);

      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(400);
      expect(error.validationErrors).toEqual(validationErrors);
    });

    it('should default to empty object for validationErrors if not provided', () => {
      const error = new ValidationError('Validation failed');

      expect(error.validationErrors).toEqual({});
    });
  });

  describe('ApiError', () => {
    it('should create an instance with correct properties', () => {
      const error = new ApiError('API error', 503, 'TestService');

      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toBe('API error');
      expect(error.statusCode).toBe(503);
      expect(error.service).toBe('TestService');
    });

    it('should generate user-friendly message', () => {
      const error = new ApiError('API error', 503, 'TestService');

      expect(error.getUserMessage()).toBe('Service error with TestService: API error');
    });

    it('should default to Unknown service if not provided', () => {
      const error = new ApiError('API error', 503);

      expect(error.service).toBe('Unknown');
    });
  });
});
