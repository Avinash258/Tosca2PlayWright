# Tosca → Playwright Converter

Parses **Tricentis Tosca** test assets and emits a **page-object Playwright** project — migration by tooling, not manual rewrite.

> Documented outcome on delivery programs: ~**60%** reduction in migration effort · [Portfolio](https://avinash258.github.io/Protfolio/)

## Overview

Enterprise teams often hold large Tosca estates. This toolkit extracts structured test data from Tosca packages (`.tsu` / JSON / XML paths) and scaffolds Playwright tests using a Page Object Model so engineers review generated specs instead of rebuilding suites from scratch.

## Features

- Extract and inspect Tosca package contents
- Convert Tosca assets toward JSON / XML intermediate forms
- Generate Playwright page objects and sample specs
- POM scaffold (`base` · `home` · `login` pages) ready for extension

## Stack

- Python (conversion utilities)
- JavaScript · Playwright (generated project)
- Node.js tooling for JSON / XML paths

## Getting started

```bash
# 1. Install Playwright project deps
npm install
npx playwright install

# 2. Place Tosca assets (e.g. .tsu) in the repo root / input path

# 3. Run conversion helpers (examples)
python extract_tosca.py
python convert_tosca.py
# or JSON / gzip variants:
# python convert_tosca_json.py
# python convert_tosca_gzip.py

# 4. Execute generated tests
npx playwright test
```

## Key files

| Path | Purpose |
|---|---|
| `extract_tosca.py` / `convert_tosca*.py` | Extraction and conversion entry points |
| `tsu_to_json.js` / `tsu_to_xml*.py` | Format bridges |
| `create_playwright_test.py` | Spec generation helper |
| `src/pages/` | Generated / scaffolded page objects |
| `tests/converted_test.spec.js` | Sample converted test |

## Author

**Pushanshu Avinash Sharma** — QA Automation Architect / Lead SDET  
[GitHub](https://github.com/Avinash258) · [LinkedIn](https://www.linkedin.com/in/p-avinash-sharma-8b0203b9/) · [Portfolio](https://avinash258.github.io/Protfolio/)
