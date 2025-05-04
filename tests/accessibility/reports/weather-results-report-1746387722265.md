# Accessibility Test Report

## Summary

- URL: http://localhost:3000/weather/london
- Timestamp: 2025-05-04T19:42:02.265Z
- Total violations: 1
- Passing checks: 30
- Incomplete checks: 0
- Inapplicable checks: 59

## Violations

### 1. region: moderate impact

- Description: Ensure all page content is contained by landmarks
- Help: All page content should be contained by landmarks
- Help URL: https://dequeuniversity.com/rules/axe/4.10/region?application=axe-puppeteer
- Affected nodes: 1

#### Example Nodes:

##### Node 1
```html
<div class="home-container">
```

Failure Summary:
```
Fix any of the following:
  Some page content is not contained by landmarks
```

