// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function saveHackerNewsArticles() {
  // launch browser
 const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  const element = await page.waitForSelector(".titleline");

  const labelText = await page.evaluate((element) => {
    // Select all elements with class 'sitestr' within the element
    const sitestrElements = element.querySelectorAll(".sitestr");
    // Exclude the text content of 'sitestr' elements from the parent element's textContent
    sitestrElements.forEach((sitestrElement) => {
      sitestrElement.remove();
    });
    return element.textContent.trim(); // Return the text content after trimming leading and trailing whitespace
  }, element);

  console.log(labelText.replace(/\s\(\)$/, ''));

  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
