/**
 * Configuration Validation Utility Tests
 */

const { validateConfig } = require('../../../utils');

describe('Configuration Validation Utility', () => {
  it('should return true for valid configuration', () => {
    const config = {
      key1: 'value1',
      key2: 'value2',
      key3: 42,
    };

    const requiredKeys = ['key1', 'key2'];

    const result = validateConfig(config, requiredKeys);

    expect(result).toBe(true);
  });

  it('should throw error when required keys are missing', () => {
    const config = {
      key1: 'value1',
    };

    const requiredKeys = ['key1', 'key2', 'key3'];

    expect(() => {
      validateConfig(config, requiredKeys);
    }).toThrow('Missing required configuration: key2, key3');
  });

  it('should consider empty strings as missing values', () => {
    const config = {
      key1: 'value1',
      key2: '',
    };

    const requiredKeys = ['key1', 'key2'];

    expect(() => {
      validateConfig(config, requiredKeys);
    }).toThrow('Missing required configuration: key2');
  });

  it('should consider null values as missing', () => {
    const config = {
      key1: 'value1',
      key2: null,
    };

    const requiredKeys = ['key1', 'key2'];

    expect(() => {
      validateConfig(config, requiredKeys);
    }).toThrow('Missing required configuration: key2');
  });

  it('should accept numeric and boolean values as valid', () => {
    const config = {
      key1: 42,
      key2: false,
      key3: 0,
    };

    const requiredKeys = ['key1', 'key2', 'key3'];

    const result = validateConfig(config, requiredKeys);

    expect(result).toBe(true);
  });

  it('should handle empty required keys array', () => {
    const config = {};
    const requiredKeys = [];

    const result = validateConfig(config, requiredKeys);

    expect(result).toBe(true);
  });
});
