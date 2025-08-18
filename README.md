Playwright POM scaffold

Files created:
- `src/pages/base.page.js` - Base page wrapper
- `src/pages/home.page.js` - Home page methods
- `src/pages/login.page.js` - Login page methods
- `tests/converted_test.spec.js` - Test using POM and credentials from Tosca JSON

Run tests:

```powershell
npm install
npx playwright install
npm test
```

Adjust selectors in `src/pages/*` as needed to match the AUT.
