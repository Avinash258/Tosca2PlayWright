const BasePage = require('./base.page');

class NewVisionPage extends BasePage {
  constructor(page) {
    super(page);
    // URL and selectors inferred from the converted XML
    this.homeUrl = 'https://newvision-software.com/';
    // Prefer text selector (InnerText = CAREERS) and fallback to href
    this.careersLocator = 'text=CAREERS';
    this.careersHrefLocator = 'a[href="https://newvision-software.com/careers/"]';
  }

  async openHome() {
    await this.goto(this.homeUrl);
  }

  async openCareers() {
    // Try text-based locator first, then href
    try {
      await this.page.locator(this.careersLocator).first().click();
    } catch (e) {
      await this.page.locator(this.careersHrefLocator).first().click();
    }
  }
}

module.exports = NewVisionPage;
