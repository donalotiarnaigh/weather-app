/**
 * HTTP Utilities
 * Helper functions for making HTTP requests
 */

const https = require('https');
const { ApiError } = require('./errors');

/**
 * Default timeout in milliseconds for HTTP requests
 * @type {number}
 */
const DEFAULT_TIMEOUT = 5000; // 5 seconds

/**
 * Makes an HTTPS GET request and returns a promise
 * @param {string} url - The URL to request
 * @param {Object} [options={}] - Request options
 * @param {number} [options.timeout=5000] - Request timeout in milliseconds
 * @returns {Promise<Object>} - Promise that resolves with the parsed JSON response
 * @throws {ApiError} If the request fails, times out, or returns a non-success status code
 */
function httpsGet(url, options = {}) {
  const timeout = options.timeout || DEFAULT_TIMEOUT;

  return new Promise((resolve, reject) => {
    // Create the request
    const request = https
      .get(url, response => {
        // Check for successful status code
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return reject(
            new ApiError(
              `HTTP status code ${response.statusCode}`,
              response.statusCode,
              'External API'
            )
          );
        }

        // Collect data chunks
        const chunks = [];
        response.on('data', chunk => {
          chunks.push(chunk);
        });

        // Concatenate and parse data on end
        response.on('end', () => {
          try {
            const data = Buffer.concat(chunks).toString();
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(new ApiError(`Error parsing response: ${error.message}`, 500, 'JSON Parser'));
          }
        });
      })
      .on('error', error => {
        reject(new ApiError(`Request error: ${error.message}`, 500, 'HTTP Client'));
      });

    // Set request timeout
    request.setTimeout(timeout, () => {
      request.destroy();
      reject(new ApiError(`Request timeout after ${timeout}ms`, 408, 'HTTP Client'));
    });
  });
}

module.exports = {
  httpsGet,
};
