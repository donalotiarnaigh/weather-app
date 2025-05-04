/**
 * Weather Service Tests
 */

const { weatherService } = require('../../../services');
const { httpsGet, ValidationError, ApiError } = require('../../../utils');
const config = require('../../../config');

// Mock the httpsGet utility
jest.mock('../../../utils', () => {
  const originalModule = jest.requireActual('../../../utils');
  return {
    ...originalModule,
    httpsGet: jest.fn(),
  };
});

describe('Weather Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    it('should throw ValidationError when city is not provided', async () => {
      await expect(weatherService.getCurrentWeather(null)).rejects.toThrow(ValidationError);
      await expect(weatherService.getCurrentWeather('')).rejects.toThrow(ValidationError);
      await expect(weatherService.getCurrentWeather('  ')).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when city is not found', async () => {
      httpsGet.mockRejectedValue(new Error('HTTP status code 404'));

      await expect(weatherService.getCurrentWeather('NonexistentCity')).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ApiError when API request fails', async () => {
      httpsGet.mockRejectedValue(new Error('Connection error'));

      await expect(weatherService.getCurrentWeather('London')).rejects.toThrow(ApiError);
    });

    it('should return formatted weather data on success', async () => {
      // Mock API response
      const mockWeatherData = {
        main: {
          temp: 20,
          humidity: 75,
          pressure: 1015,
        },
        weather: [
          {
            description: 'sunny',
            icon: '01d',
          },
        ],
        wind: {
          speed: 5.5,
        },
      };

      httpsGet.mockResolvedValue(mockWeatherData);

      const result = await weatherService.getCurrentWeather('london');

      // Check the result structure and values
      expect(result).toEqual({
        location: 'London',
        temp: 20,
        description: 'sunny',
        icon: '01d',
        humidity: 75,
        windSpeed: 5.5,
        pressure: 1015,
        imageURL: 'http://openweathermap.org/img/wn/01d@2x.png',
      });

      // Verify API URL construction
      expect(httpsGet).toHaveBeenCalledWith(
        expect.stringContaining(`${config.openWeatherApiUrl}/weather?q=london&units=metric`)
      );
    });

    it('should use provided unit parameter', async () => {
      httpsGet.mockResolvedValue({
        main: { temp: 68, humidity: 75, pressure: 1015 },
        weather: [{ description: 'sunny', icon: '01d' }],
        wind: { speed: 10 },
      });

      await weatherService.getCurrentWeather('New York', 'imperial');

      expect(httpsGet).toHaveBeenCalledWith(expect.stringContaining('units=imperial'));
    });
  });

  describe('validateCity', () => {
    it('should return true when city exists', async () => {
      httpsGet.mockResolvedValue({
        main: { temp: 20, humidity: 75, pressure: 1015 },
        weather: [{ description: 'cloudy', icon: '03d' }],
        wind: { speed: 5 },
      });

      const result = await weatherService.validateCity('Paris');

      expect(result).toBe(true);
    });

    it('should return false when city does not exist', async () => {
      httpsGet.mockRejectedValue(new Error('HTTP status code 404'));

      const result = await weatherService.validateCity('NonexistentCity');

      expect(result).toBe(false);
    });

    it('should throw error for other API issues', async () => {
      httpsGet.mockRejectedValue(new Error('Network error'));

      await expect(weatherService.validateCity('London')).rejects.toThrow();
    });
  });
});
