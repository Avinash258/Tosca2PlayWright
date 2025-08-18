const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Inferred selectors from Tosca JSON self-healing data
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button:has-text("Login")';
  }

  async login(email, password) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}

module.exports = LoginPage;
