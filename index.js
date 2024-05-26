// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { createObjectCsvWriter } = require("csv-writer");

// Create articles array to store list of objects with key/values for title and url
let articles = [];

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News (this was already set to the correct URL based on provided project files)
  await page.goto("https://news.ycombinator.com");

  // Find elements on page where class attribute is titleline. (I went to the website and inspected the element I needed)
  const titleElements = await page.$$(".titleline"); // returns an array

  // Look at the first 10 elements (another option would be narrow the results by looking elements whose rank is equal to 1 through 10, but that felt like more code)
  for (let i = 0; i < 10; i++) {
    currentElement = titleElements[i];

    const title = await page.evaluate((element) => {
      // Select all elements with class 'sitestr' within the element (had to do this bc I kept getting the sitestr url appended to the title)
      const sitestrElements = element.querySelectorAll(".sitestr");

      // Exclude the text content of 'sitestr' elements from the parent element's textContent
      sitestrElements.forEach((sitestrElement) => {
        sitestrElement.remove();
      });

      // Return the title after trimming leading and trailing whitespace and remove the '()'
      return element.textContent.trim().replace(/\s\(\)$/, "");
    }, currentElement);

    // Find the <a> tag within the titleline element
    const link = await currentElement.$("a");

    // Get the href attribute value
    const url = await link.getAttribute("href");

    // Store title and url in object and add each object to articles array
    articles.push({ title: title, url: url });
  }

  // Implement csv file creator [npm i csv-writer] (used this version since I saved the title and url in object)
  const csvWriter = createObjectCsvWriter({
    path: "articles.csv",
    header: [
      { id: "title", title: "Title" },
      { id: "url", title: "URL" },
    ],
  });

  // Create the csv file
  csvWriter.writeRecords(articles);

  // Close the browser
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();
