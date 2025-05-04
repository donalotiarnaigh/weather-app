const puppeteer = require('puppeteer');
const now = require('performance-now');

(async () => {
  console.time('Total Test Time');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load home page
  await page.goto('http://localhost:3000');
  console.log('Home page loaded');

  // Fill out the search form
  await page.type('#cityInput', 'London');
  console.log('Entered city: London');

  // Click search button
  const searchStart = now();
  await Promise.all([page.waitForNavigation(), page.click('.search-button')]);
  const searchEnd = now();

  console.log('Search completed in: ' + (searchEnd - searchStart).toFixed(2) + 'ms');
  console.log('Current URL:', page.url());

  // Get the weather information
  const weatherText = await page.evaluate(() => {
    const resultTitle = document.querySelector('.result-title');
    const weatherDescription = document.querySelector('h2');
    return {
      title: resultTitle ? resultTitle.textContent.trim() : 'No result title found',
      description: weatherDescription
        ? weatherDescription.textContent.trim()
        : 'No weather description found',
    };
  });

  console.log('Weather information:');
  console.log('- Title:', weatherText.title);
  console.log('- Description:', weatherText.description);

  // Check for weather icon
  const hasWeatherIcon = await page.evaluate(() => {
    const weatherIcon = document.querySelector('.weather-icon');
    return weatherIcon ? true : false;
  });

  console.log('Weather icon displayed:', hasWeatherIcon);

  console.timeEnd('Total Test Time');
  await browser.close();
})().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
