const puppeteer = require('puppeteer');
const now = require('performance-now');

(async () => {
  console.time('Load Time');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const start = now();
  await page.goto('http://localhost:3000');
  const end = now();

  console.log('Navigation time: ' + (end - start).toFixed(2) + 'ms');

  const imgCount = await page.$$eval('img', imgs => imgs.length);
  const cssCount = await page.$$eval('link[rel="stylesheet"]', links => links.length);

  console.log('Images: ' + imgCount + ', CSS files: ' + cssCount);
  console.timeEnd('Load Time');

  await browser.close();
})();
