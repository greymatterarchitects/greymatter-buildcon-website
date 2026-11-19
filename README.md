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

## SEO

Optimised for "best architects in Hyderabad" and "best architects near Hyderabad":

- Keyword-focused title, meta description, headings, image alt text and a visible FAQ section.
- `ProfessionalService`, `WebSite` and `FAQPage` JSON-LD structured data with Hyderabad/Telangana location and service areas.
- `robots.txt` and `sitemap.xml`; consistent name, address and email across the page and structured data.
- Lighthouse on the local preview: SEO 100, Accessibility 100, Best Practices 100.

**Before deploying to a custom domain**, update the canonical URL and Open Graph URL in `index.html`, plus the URLs in `sitemap.xml` and `robots.txt` (currently set to the GitHub Pages URL).

No one can guarantee a number-one Google ranking. Rankings depend on factors outside this code, including a verified Google Business Profile, customer reviews, local citations/backlinks, crawlability after deployment and ongoing content. Submit the sitemap in Google Search Console once the site is live.

## Note on the enquiry form

The form validates input and prepares a prefilled email to `greymatterarchitects@gmail.com`. It does not send data to a server or store anything, so no backend configuration is required.
