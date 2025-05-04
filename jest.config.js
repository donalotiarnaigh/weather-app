/**
 * Jest configuration
 */

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'routes/**/*.js',
    'services/**/*.js',
    'middleware/**/*.js',
    'utils/**/*.js',
    'config/**/*.js',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  clearMocks: true,
  testTimeout: 10000,
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 70,
      functions: 75,
      lines: 75,
    },
  },
};
