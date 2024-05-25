// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function saveHackerNewsArticles() {
  // launch browser
 const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  const titleElement = await page.waitForSelector(".titleline");

  const title = await page.evaluate((element) => {
    // Select all elements with class 'sitestr' within the element
    const sitestrElements = element.querySelectorAll(".sitestr");
    // Exclude the text content of 'sitestr' elements from the parent element's textContent
    sitestrElements.forEach((sitestrElement) => {
      sitestrElement.remove();
    });
    // Return the text content after trimming leading and trailing whitespace and remove the '()' 
    return element.textContent.trim().replace(/\s\(\)$/, ''); 
  }, titleElement);

  

  console.log(title);

  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
