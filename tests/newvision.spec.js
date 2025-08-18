const { test, expect } = require('@playwright/test');
const NewVisionPage = require('../src/pages/newvision.page');

test.describe('NewVision site', () => {
  test('Open home and go to Careers', async ({ page }) => {
    const nv = new NewVisionPage(page);
    await nv.openHome();
    await nv.openCareers();
    // Assert navigation to careers page
    await expect(page).toHaveURL(/careers/);
  });
});
