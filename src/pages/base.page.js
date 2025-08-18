class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  // Accepts a selector string (including Playwright selector engines like 'text=')
  // or a Locator object. Uses page.locator for robust selector handling.
  async click(selector) {
    if (!selector) throw new Error('Selector is required for click()');
    if (typeof selector === 'string') {
      await this.page.locator(selector).click();
    } else {
      // assume Locator or ElementHandle-like
      await selector.click();
    }
  }

  async fill(selector, value) {
    await this.page.fill(selector, value);
  }

  async waitForSelector(selector, options) {
    await this.page.waitForSelector(selector, options);
  }
}

module.exports = BasePage;
