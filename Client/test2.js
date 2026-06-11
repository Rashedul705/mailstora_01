const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', error => errors.push(error.message));

  console.log("Navigating to http://localhost:3000...");
  try {
    const response = await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    console.log(`Status code: ${response.status()}`);
    
    await page.screenshot({ path: '/Users/rashedulislam/Desktop/mailstora_program/mailstora_01/homepage_screenshot.png', fullPage: true });
    console.log("Screenshot saved.");
    
    if (errors.length > 0) {
      console.log("Found console errors:");
      console.log(errors.join("\n"));
    } else {
      console.log("No console errors found!");
    }
  } catch (err) {
    console.error("Navigation failed:", err);
  } finally {
    await browser.close();
  }
})();
