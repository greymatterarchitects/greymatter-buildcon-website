# Greymatter Buildcon LLP — redesigned site

A self-contained static website (HTML + CSS + vanilla JS). No build step, no dependencies.

Open `index.html` directly, or serve this folder with any static file server:

```powershell
cd "C:\Users\ADMIN\Documents\Default Project\greymatter-site"
npx serve -l 4173
```

## Contents

- All 10 projects, all 4 team members, all 6 services, the 7-step journey, vision/mission and contact details are preserved from the original site.
- All 17 original image assets are copied into `assets/` unchanged.
- New UI: editorial architecture-studio art direction, improved hero, sticky responsive header with mobile menu, project category filters, project detail dialog, expandable services, scroll reveals, active navigation, accessible enquiry form and back-to-top control.

## Verification performed

- Original live site: all 17 assets returned HTTP 200, no console errors; Lighthouse found form-label and list-markup accessibility issues (fixed here).
- Original site had conflicting statistics ("50+ / 1678 / 2 states" vs "60+ / 2016 / 3 states"); this site uses the consistent 60+ / 2016 / 3 figures.
- New site: JS syntax checked, all local references and ARIA/label targets resolved, tags and CSS balanced.
- Rendered in Chromium: zero console errors, 18/18 images loaded, no horizontal overflow, all form inputs labeled, filters/modal/accordion/form validation exercised successfully.

## Note on the enquiry form

The form validates input and prepares a prefilled email to `greymatterarchitects@gmail.com`. It does not send data to a server or store anything, so no backend configuration is required.
