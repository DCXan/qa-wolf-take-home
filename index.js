// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function saveHackerNewsArticles() {
  // launch browser
 const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  const titleElements = await page.$$('.titleline');

  for (let i = 0; i < 10; i++){

    currentElement = titleElements[i];

    const title = await page.evaluate((element) => {
      // Select all elements with class 'sitestr' within the element
      const sitestrElements = element.querySelectorAll(".sitestr");
      // Exclude the text content of 'sitestr' elements from the parent element's textContent
      sitestrElements.forEach((sitestrElement) => {
        sitestrElement.remove();
      });
      // Return the text content after trimming leading and trailing whitespace and remove the '()' 
      return element.textContent.trim().replace(/\s\(\)$/, ''); 
    }, currentElement);
  
      // Find the <a> tag within the titleline element
      const link = await currentElement.$('a');
      
      // Get the href attribute value
      const url = await link.getAttribute('href');
  
    
  
    console.log(title);
    console.log(url);

  }
  

  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
