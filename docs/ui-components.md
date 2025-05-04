# UI Components and Design Patterns

## Overview

The Weather App's UI is built using a combination of Bootstrap 5, custom CSS with variables, and Bootstrap Icons. This document describes the key UI components, design patterns, and visual elements used throughout the application.

## Design System

### Colors

The application uses a CSS variables system with the following color palette:

```css
:root {
  /* Primary colors */
  --primary: #2b5797;
  --primary-dark: #1e3c6a;
  --primary-light: #3a6bb8;
  
  /* Secondary colors */
  --secondary: #f3f3f3;
  --secondary-dark: #e0e0e0;
  
  /* Text colors */
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-light: #ffffff;
  
  /* Status colors */
  --success: #28a745;
  --danger: #dc3545;
  --warning: #ffc107;
  --info: #17a2b8;
  
  /* Weather-specific colors */
  --sunny: #f9d71c;
  --cloudy: #b5bdc4;
  --rainy: #4e8fca;
  --snowy: #e0e0e0;
}
```

### Typography

The application uses Bootstrap's typography system with the following customizations:

- **Primary Font**: System font stack (Bootstrap default)
- **Headings**: Slightly more weight and adjusted line-height
- **Body Text**: 16px base size with 1.5 line-height
- **Special Elements**: Weather descriptions use title case

### Spacing

The application follows Bootstrap's spacing system:

- **Base unit**: 1rem (16px)
- **Scale**: 0.25rem, 0.5rem, 1rem, 1.5rem, 3rem
- **Custom classes**: Additional margin and padding utility classes

## Components

### 1. Card Components

#### Weather Search Card

A card-based container for the search form on the home page.

**Usage:**
```html
<div class="weather-search-card">
  <!-- Content goes here -->
</div>
```

**Properties:**
- Centered on the page
- Soft shadow
- Rounded corners
- Padding: 2rem
- Background: White
- Responsive width

#### Weather Result Card

A card-based container for displaying weather information.

**Usage:**
```html
<div class="weather-result">
  <!-- Weather details go here -->
</div>
```

**Properties:**
- Clear visual hierarchy
- Centered weather icon
- Large temperature display
- Text-capitalized weather description

### 2. Navigation

The application uses a fixed-top navbar with the following features:

- Bootstrap navbar-dark theme
- Primary background color
- Collapsible on mobile
- App brand/logo in navbar

**Usage:**
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
  <!-- Navbar content goes here -->
</nav>
```

### 3. Form Elements

#### Search Input

The main search form adheres to the following design:

- Large input field
- Clear placeholder text
- Validation states
- Responsive layout
- Primary-colored submit button

**Usage:**
```html
<form action="/" method="post">
  <div class="input-group input-group-lg">
    <input
      type="text"
      name="cityName"
      class="form-control"
      placeholder="Enter city name..."
      required
    />
    <button type="submit" class="btn btn-primary">
      <i class="bi bi-search me-1"></i> Search
    </button>
  </div>
</form>
```

### 4. Weather Display

The weather information display includes:

- Weather icon from OpenWeatherMap
- City name as title
- Temperature in large font
- Weather description in title case

**Usage:**
```html
<div class="weather-icon-container mb-3">
  <img src="<%= imageURL %>" alt="Weather icon" class="weather-icon">
</div>
<h1 class="result-title mb-3"><%= location %></h1>
<div class="temperature-display mb-4">
  <span class="display-4 fw-bold"><%= temp %>°C</span>
</div>
<h2 class="weather-description text-capitalize mb-4">
  <%= description %>
</h2>
```

### 5. Error Pages

Error pages follow a consistent pattern:

- Clear error icon (Bootstrap Icons)
- Error title
- Error message
- Status code (if applicable)
- Return to home button

**Usage:**
```html
<div class="text-center mb-4">
  <i class="bi bi-exclamation-triangle-fill text-danger display-1 mb-3"></i>
  <h1 class="error-title"><%= title %></h1>
  <div class="error-message">
    <p><%= message %></p>
  </div>
  <% if (statusCode) { %>
    <p class="error-code">Status code: <%= statusCode %></p>
  <% } %>
  <div class="error-actions mt-4">
    <a href="/" class="btn btn-primary btn-lg">
      <i class="bi bi-house-door me-2"></i> Return to Home
    </a>
  </div>
</div>
```

## Layout Patterns

### 1. Page Layout

All pages follow a consistent layout structure:

- Fixed header
- Main content area with top margin to account for fixed header
- Sticky footer
- Responsive container

**Usage:**
```html
<body class="d-flex flex-column min-vh-100">
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <!-- ... -->
  </nav>
  <main class="container py-5 mt-5 flex-grow-1">
    <!-- Page content -->
  </main>
  <footer class="footer mt-auto py-3 bg-primary">
    <!-- ... -->
  </footer>
</body>
```

### 2. Responsive Behavior

The application is fully responsive with the following breakpoints:

- **Extra small** (< 576px): Stacked components, full-width
- **Small** (≥ 576px): Slightly constrained width
- **Medium** (≥ 768px): More horizontal layout
- **Large** (≥ 992px): Full desktop layout
- **Extra large** (≥ 1200px): Wider container

## Icons

The application uses Bootstrap Icons throughout:

- Weather-related icons (cloud, sun, etc.)
- UI action icons (search, home)
- Status icons (error, warning)

**Usage:**
```html
<i class="bi bi-cloud-sun"></i> <!-- Weather icon -->
<i class="bi bi-search"></i> <!-- Search icon -->
<i class="bi bi-house-door"></i> <!-- Home icon -->
<i class="bi bi-exclamation-triangle-fill"></i> <!-- Error icon -->
```

## Accessibility Features

The UI implements several accessibility features:

- ARIA labels on interactive elements
- Sufficient color contrast
- Keyboard navigation support
- Screen reader-friendly form labels
- Semantic HTML structure

## Best Practices for UI Updates

When updating the UI:

1. Always use the color variables instead of hardcoding colors
2. Maintain consistent spacing using Bootstrap classes
3. Ensure responsive behavior works on all screen sizes
4. Follow accessibility guidelines for new components
5. Test with a variety of browsers and devices 