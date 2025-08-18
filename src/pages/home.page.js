const BasePage = require('./base.page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Inferred from Tosca JSON: 'Signup / Login' link
  // Prefer Playwright text selector; fallback to href CSS selector if needed
  this.signupLoginLink = 'text=Signup / Login';
  }

  async gotoHome() {
    await this.goto('https://automationexercise.com');
  }

  async openSignupLogin() {
    await this.click(this.signupLoginLink);
  }
}

module.exports = HomePage;
