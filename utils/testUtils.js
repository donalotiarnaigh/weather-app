/**
 * Test utilities
 * Helper functions to assist with automated testing
 */

/**
 * A simple function to check if a value is defined
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is defined
 */
function isDefined(value) {
  return value !== undefined && value !== null;
}

module.exports = { isDefined };
