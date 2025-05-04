/**
 * HTTP Utilities Tests
 */

const { httpsGet } = require('../../../utils');
const https = require('https');

// Mock the https module
jest.mock('https', () => ({
  get: jest.fn(),
}));

describe('HTTP Utilities', () => {
  describe('httpsGet', () => {
    let mockResponse;
    let mockRequest;

    beforeEach(() => {
      // Reset mocks
      jest.clearAllMocks();

      // Create mock response
      mockResponse = {
        statusCode: 200,
        on: jest.fn(),
      };

      // Create mock request
      mockRequest = {
        on: jest.fn(),
      };

      // Set up https.get mock
      https.get.mockImplementation((url, callback) => {
        callback(mockResponse);
        return mockRequest;
      });
    });

    it('should make an HTTPS request to the provided URL', async () => {
      const testUrl = 'https://api.example.com/data';

      // Setup mock response events
      mockResponse.on.mockImplementation((_event, _handler) => {
        return mockResponse;
      });

      // Call function (don't await yet)
      const resultPromise = httpsGet(testUrl);

      // Verify URL was passed to https.get
      expect(https.get).toHaveBeenCalledWith(testUrl, expect.any(Function));

      // Simulate data events
      const jsonData = { result: 'success' };
      const dataChunks = [Buffer.from(JSON.stringify(jsonData))];

      // Call the data handler with chunks
      dataChunks.forEach(chunk => {
        mockResponse.on.mock.calls.find(call => call[0] === 'data')[1](chunk);
      });

      // Call the end handler
      mockResponse.on.mock.calls.find(call => call[0] === 'end')[1]();

      // Now await the result
      const result = await resultPromise;

      // Verify result
      expect(result).toEqual(jsonData);
    });

    it('should reject promise if HTTP status is not 2xx', async () => {
      mockResponse.statusCode = 404;

      const promise = httpsGet('https://api.example.com/notfound');

      await expect(promise).rejects.toThrow('HTTP status code 404');
    });

    it('should reject promise if there is a request error', async () => {
      // Setup request error event
      mockRequest.on.mockImplementation((event, handler) => {
        if (event === 'error') {
          // Immediately call the error handler
          handler(new Error('Connection refused'));
        }
        return mockRequest;
      });

      const promise = httpsGet('https://api.example.com/error');

      await expect(promise).rejects.toThrow('Request error: Connection refused');
    });

    it('should reject promise if JSON parsing fails', async () => {
      // Setup response event handlers to return invalid JSON
      mockResponse.on.mockImplementation((event, handler) => {
        if (event === 'data') {
          // Call with invalid JSON
          handler(Buffer.from('{ invalid json ]'));
        } else if (event === 'end') {
          // Call end handler
          handler();
        }
        return mockResponse;
      });

      const promise = httpsGet('https://api.example.com/invalid');

      await expect(promise).rejects.toThrow('Error parsing response');
    });
  });
});
