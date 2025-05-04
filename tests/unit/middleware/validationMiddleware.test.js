/**
 * Validation Middleware Tests
 */

const { validationMiddleware } = require('../../../middleware');

// We'll test at a higher level without mocking express-validator internals
describe('Validation Middleware', () => {
  describe('validateWeatherSearch', () => {
    it('should be an array with at least one validator', () => {
      expect(validationMiddleware.validateWeatherSearch).toBeInstanceOf(Array);
      expect(validationMiddleware.validateWeatherSearch.length).toBeGreaterThan(0);
    });
  });

  describe('validateCityParam', () => {
    it('should be an array with at least one validator', () => {
      expect(validationMiddleware.validateCityParam).toBeInstanceOf(Array);
      expect(validationMiddleware.validateCityParam.length).toBeGreaterThan(0);
    });
  });
}); 