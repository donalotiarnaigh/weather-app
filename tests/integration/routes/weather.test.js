/**
 * Weather Routes Integration Tests
 */

const request = require('supertest');
const { createTestAppWithRoutes } = require('../../testUtils');
const registerRoutes = require('../../../routes');
const { weatherService } = require('../../../services');
const { ValidationError } = require('../../../utils');

// Mock the weather service
jest.mock('../../../services', () => ({
  weatherService: {
    getCurrentWeather: jest.fn(),
  },
}));

describe('Weather Routes', () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    app = createTestAppWithRoutes(registerRoutes);
  });

  describe('GET /', () => {
    it('should render the home page', async () => {
      const res = await request(app).get('/');

      expect(res.statusCode).toBe(200);
      // In a real test, we would check the response body for expected content
    });
  });

  describe('POST /', () => {
    it('should validate city name is required', async () => {
      const res = await request(app).post('/').type('form').send({});

      expect(res.statusCode).toBe(400);
      // In a real test, we would check the response body for the error message
    });

    it('should validate city name is valid', async () => {
      const res = await request(app).post('/').type('form').send({ cityName: '1234' });

      expect(res.statusCode).toBe(400);
      // In a real test, we would check the response body for the error message
    });

    it('should get weather data and render weather page on success', async () => {
      // Mock the weather service to return fake data
      weatherService.getCurrentWeather.mockResolvedValue({
        location: 'London',
        temp: 15,
        description: 'cloudy',
        humidity: 80,
        windSpeed: 5,
        pressure: 1010,
        imageURL: 'http://openweathermap.org/img/wn/04d@2x.png',
      });

      const res = await request(app).post('/').type('form').send({ cityName: 'London' });

      expect(res.statusCode).toBe(200);
      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith('London');
      // In a real test, we would check the response body for the weather data
    });

    it('should handle validation errors from the service', async () => {
      // Mock the weather service to throw a validation error
      const validationError = new ValidationError('City not found');
      weatherService.getCurrentWeather.mockRejectedValue(validationError);

      const res = await request(app).post('/').type('form').send({ cityName: 'NonExistentCity' });

      expect(res.statusCode).toBe(400);
      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith('NonExistentCity');
    });

    it('should handle API errors from the service', async () => {
      // Mock the weather service to throw an API error
      const error = new Error('API Error');
      weatherService.getCurrentWeather.mockRejectedValue(error);

      const res = await request(app).post('/').type('form').send({ cityName: 'London' });

      expect(res.statusCode).toBe(500);
      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith('London');
    });
  });

  describe('GET /weather/:city', () => {
    it('should validate city parameter', async () => {
      const res = await request(app).get('/weather/1');

      expect(res.statusCode).toBe(400);
    });

    it('should get weather data and render weather page on success', async () => {
      // Mock the weather service to return fake data
      weatherService.getCurrentWeather.mockResolvedValue({
        location: 'Paris',
        temp: 20,
        description: 'sunny',
        humidity: 60,
        windSpeed: 3,
        pressure: 1015,
        imageURL: 'http://openweathermap.org/img/wn/01d@2x.png',
      });

      const res = await request(app).get('/weather/Paris');

      expect(res.statusCode).toBe(200);
      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith('Paris');
    });
  });
});
