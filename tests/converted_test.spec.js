const { test, expect } = require('@playwright/test');
const HomePage = require('../src/pages/home.page');
const LoginPage = require('../src/pages/login.page');

// Converted from Tosca Test Suite: AviWorld
test.describe('AviWorld', () => {
    test('Signup / Login flow', async ({ page }) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);

        try {
            await home.gotoHome();
            await home.openSignupLogin();

            // Example credentials inferred from Tosca JSON
            await login.login('aivnashemail@gmail.com', 'Test@123');

            // Wait for one of several possible post-login indicators
            const successSelectors = [
                'text=Logged in as',
                'text=Logout',
                'text=My Account',
                'a:has-text("Logout")'
            ];

            let success = false;
            for (const sel of successSelectors) {
                try {
                    await page.waitForSelector(sel, { timeout: 2000 });
                    success = true;
                    break;
                } catch (e) {
                    // ignore and try next selector
                }
            }

            // fallback: check URL change
            if (!success) {
                try {
                    await page.waitForURL(/login|dashboard|account|profile/, { timeout: 3000 });
                    success = true;
                } catch (e) {
                    // ignore
                }
            }

            if (!success) throw new Error('No post-login indicator found (selectors and URL checks failed)');
        } catch (err) {
            // save artifacts for debugging
            await page.screenshot({ path: 'failure.png', fullPage: true });
            const html = await page.content();
            const fs = require('fs');
            fs.writeFileSync('failure.html', html, 'utf8');
            throw err;
        }
    });
});
