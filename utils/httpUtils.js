/**
 * HTTP Utilities
 * Helper functions for making HTTP requests
 */

const https = require('https');

/**
 * Makes an HTTPS GET request and returns a promise
 * @param {string} url - The URL to request
 * @returns {Promise<Object>} - Promise that resolves with the parsed JSON response
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        // Check for successful status code
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return reject(new Error(`HTTP status code ${response.statusCode}`));
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
            reject(new Error(`Error parsing response: ${error.message}`));
          }
        });
      })
      .on('error', error => {
        reject(new Error(`Request error: ${error.message}`));
      });
  });
}

module.exports = {
  httpsGet,
};
