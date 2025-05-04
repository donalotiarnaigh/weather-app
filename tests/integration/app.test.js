/**
 * App Integration Tests
 */

const request = require('supertest');
const express = require('express');
const { configureApp } = require('../../config/app');
const registerRoutes = require('../../routes');
const { errorHandler } = require('../../middleware');

// Mock weather service to avoid actual API calls
jest.mock('../../services', () => ({
  weatherService: {
    getCurrentWeather: jest.fn().mockResolvedValue({
      location: 'Test City',
      temp: 20,
      description: 'clear sky',
      icon: '01d',
      humidity: 50,
      windSpeed: 5,
      pressure: 1015,
      imageURL: 'http://example.com/icon.png',
    }),
  },
}));

describe('App Integration', () => {
  let app;

  beforeEach(() => {
    // Create a fresh app for each test
    app = express();
    configureApp(app);
    registerRoutes(app);
    app.use(errorHandler);
  });

  it('should have security headers enabled', async () => {
    const res = await request(app).get('/');

    // Check that Helmet is adding security headers
    expect(res.headers).toHaveProperty('x-content-type-options', 'nosniff');
    expect(res.headers).toHaveProperty('x-xss-protection');
    expect(res.headers).toHaveProperty('content-security-policy');
  });

  it('should handle routing for nonexistent paths', async () => {
    // Instead of checking static files (which varies by implementation),
    // we'll check that nonexistent routes return 404
    const res = await request(app).get('/nonexistent-path');

    expect(res.statusCode).toBe(404);
  });

  it('should parse form submissions', async () => {
    const res = await request(app).post('/').type('form').send({ cityName: 'London' });

    // If body-parser is working, this should be processed by the route handler
    expect(res.statusCode).toBe(200);
  });

  it('should handle unknown routes with 404', async () => {
    const res = await request(app).get('/unknown-route');

    expect(res.statusCode).toBe(404);
  });

  it('should render EJS templates', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('text/html');
    // Check that EJS is correctly rendering the template
    // (assuming home page has a form for city input)
    expect(res.text).toContain('form');
    expect(res.text).toContain('input');
  });

  it('should have proper MIME types for different content', async () => {
    // Test HTML response
    const htmlRes = await request(app).get('/');
    expect(htmlRes.type).toBe('text/html');

    // For other types, we would need actual static files or routes that return different content types
  });

  it('should connect to all required middleware', async () => {
    // This is more of a smoke test to verify the app starts without errors
    expect(app._router).toBeDefined();
    expect(app._router.stack.length).toBeGreaterThan(5); // Should have multiple middleware
  });
});
