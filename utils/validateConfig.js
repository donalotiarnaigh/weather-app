/**
 * Configuration validation utility
 */

/**
 * Validates that required configuration values are present
 * @param {Object} config - Configuration object
 * @param {Array<string>} requiredKeys - List of required configuration keys
 * @returns {boolean} True if configuration is valid
 * @throws {Error} If any required configuration is missing
 */
function validateConfig(config, requiredKeys) {
  const missingKeys = [];

  for (const key of requiredKeys) {
    if (config[key] === undefined || config[key] === null || config[key] === '') {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    throw new Error(`Missing required configuration: ${missingKeys.join(', ')}`);
  }

  return true;
}

module.exports = { validateConfig };
