# Weather App API Documentation

## Overview

This document provides information about the Weather App's API endpoints, their parameters, and responses. While the Weather App is primarily a web application with a user interface, it includes API-like endpoints that can be accessed directly.

## Base URL

In development: `http://localhost:3000`

## Endpoints

### 1. Get Weather by City

Retrieves current weather information for a specified city.

#### HTTP Request

```
GET /weather/:city
```

#### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| city | string | **Required**. The name of the city to get weather information for. |

#### Response Format

HTML page with weather information.

#### Example Request

```
GET /weather/london
```

#### Response Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success. Returns weather information as HTML. |
| 400 | Bad Request. City not found or invalid parameter. |
| 429 | Too Many Requests. Rate limit exceeded. |
| 500 | Server Error. Problem with OpenWeatherMap API or internal error. |

### 2. Submit Weather Search

Submits a search request for weather information.

#### HTTP Request

```
POST /
```

#### Form Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cityName | string | **Required**. The name of the city to get weather information for. |

#### Response Format

HTML page with weather information.

#### Example Request

```
POST /
Content-Type: application/x-www-form-urlencoded

cityName=london
```

#### Response Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success. Returns weather information as HTML. |
| 400 | Bad Request. City not found or invalid parameter. |
| 429 | Too Many Requests. Rate limit exceeded. |
| 500 | Server Error. Problem with OpenWeatherMap API or internal error. |

## Rate Limiting

The API implements rate limiting to prevent abuse:

- Global rate limit: 100 requests per 15 minutes per IP
- Weather API endpoints: 30 requests per 15 minutes per IP

When a rate limit is exceeded, the API returns a 429 Too Many Requests response.

## Error Responses

Error responses are returned as HTML pages with appropriate HTTP status codes. The error page includes:

- Error title
- Error message
- HTTP status code

Example error scenarios:

- City not found
- Invalid city name format
- Rate limit exceeded
- OpenWeatherMap API unavailable

## Authentication

This API does not require authentication for its endpoints. The OpenWeatherMap API key is managed server-side.

## OpenWeatherMap Integration

The Weather App uses the OpenWeatherMap API to retrieve weather data. The integration is managed through the `weatherService.js` service, which handles:

- API requests to OpenWeatherMap
- Error handling and validation
- Data transformation for display

For more information about the OpenWeatherMap API, visit [OpenWeatherMap API Documentation](https://openweathermap.org/api). 