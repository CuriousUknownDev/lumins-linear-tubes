# Lumins Lighting — Project Memory
*Last updated: April 1, 2026*

---

## Who You Are
- **Name:** Michael
- **Email:** aguirremichael2745@gmail.com
- **GitHub account:** CuriousUknownDev

---

## What We Built

### 1. Main Site — `lumins-lighting` (template repo)
- **GitHub:** https://github.com/CuriousUknownDev/lumins-lighting
- **Purpose:** Full commercial LED shop — all 38 products (bay lights, parking, canopy, office, accessories, linear tubes)
- **Status:** Template repo (used to spin up new sites)
- **Key feature:** 2ft, 3ft, 4ft T8 linear tubes are **case-only** orders (25 tubes/case). Price shown is case price (price × 25). Qty label says "Cases:".

### 2. Linear Tubes Site — `lumins-linear-tubes` (active store)
- **GitHub:** https://github.com/CuriousUknownDev/lumins-linear-tubes
- **Live URL:** https://lumins-linear-tubes.vercel.app
- **Vercel project:** lumins-linear-tubes (under UknownDev’s projects team)
- **Purpose:** Tubes-only storefront — shows ONLY the 12 T8 linear tube products (IDs 27–38)
- **Stripe checkout:** LIVE and working (test mode)

---

## Site Architecture

- **Single-file vanilla HTML/JS/CSS** — everything is in `index.html`
- **Hosted:** GitHub → Vercel (auto-deploys on every commit, ~30 sec)
- **Serverless function:** `api/checkout.js` — handles Stripe checkout session creation
- **No build step, no framework** — plain HTML file

### Repo structure:
```
lumins-linear-tubes/
├── index.html               (the entire storefront)
├── privacy.html             (Privacy Policy page — added April 1, 2026)
├── terms.html               (Terms & Conditions page — added April 1, 2026)
├── LUMINS_PROJECT_MEMORY.md (this file)
└── api/
    └── checkout.js            (Stripe serverless function)
```

---

## Products

- **Total:** 12 T8 linear tube products (IDs 27–38)
- **Categories:** all `category:'linear'`
- **Lengths:** 2ft (4 products), 3ft (4 products), 4ft (4 products)
- **Wattages:** 7W, 9W, 11W, 12W, 14W
- **Case pricing:** all tubes are `caseOnly:true, caseQty:25`
  - Example: $9.00/tube × 25 = **$225.00/case**
- **Sidebar filters:** Nominal Length (2ft/3ft/4ft), Wattage (Under 10W / 10W–12W / 13W+), Color Temperature, Price Range
- **Category nav:** "All T8 Linear Tubes" (only button, no other categories)

---

## Stripe Integration

- **Mode:** Test mode (ready to switch to live)
- **Publishable key (test):** `pk_test_51TFKFOKROu4j7SEZkZI00jNybtSxYLcy87hH5WG1IOhjHZrDg1HRgMdHkPFML50sGpqCohSjVNcA4M3k6NZbbTeW00es3O85TD`
- **Secret key:** Stored in Vercel env var as `STRIPE_SECRET_KEY` (never in code)
- **Stripe account ID:** acct_1TFKFDQTklHGab26

### Checkout flow:
1. Customer adds cases to cart
2. Clicks "Proceed to Checkout →"
3. Button shows "⏳ Redirecting to Checkout…" while API call happens
4. `POST /api/checkout` → creates Stripe Checkout Session
5. Customer redirected to Stripe hosted payment page
6. After payment → redirected to `/?order=success`
7. Green success banner appears: "✅ Order placed! Check your email…"

### To go live (when ready):
1. In Stripe: toggle Test → Live mode
2. Copy `sk_live_...` secret key
3. In Vercel: lumins-linear-tubes → Settings → Environment Variables → update `STRIPE_SECRET_KEY` with live key
4. No code changes needed

### Test card: `4242 4242 4242 4242`, any future date, any CVC

---

## How to Edit the Site

We edit `index.html` directly via the **GitHub web editor**:

1. Go to: https://github.com/CuriousUknownDev/lumins-linear-tubes/edit/main/index.html
2. Wait for CodeMirror editor to load
3. Use browser JavaScript to read/write content:
   ```javascript
   // Read current content:
   const view = document.querySelector('.cm-content').cmTile.view;
   const content = view.state.doc.toString();

   // Write new content:
   view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: newContent } });
   ```
4. Click "Commit changes…" → fill message → "Commit changes"
5. Vercel auto-deploys in ~30 seconds

### To add a new file to the repo:
1. Go to: https://github.com/CuriousUknownDev/lumins-linear-tubes/new/main
2. Set filename via JS: `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input, 'filename.ext'); input.dispatchEvent(new Event('input',{bubbles:true}))`
3. Write content into the CodeMirror editor (same JS approach)
4. Click "Commit changes…" → confirm → "Commit changes"

---

## Key Code Patterns

### Case pricing logic (in addToCart):
```javascript
var _cp = product.caseOnly ? product.price * product.caseQty : product.price;
cart.push({...product, qty, price: _cp});
```

### Cart display (shows case count + tube count):
```javascript
${i.caseOnly ? `<div>${i.qty} case${i.qty>1?"s":""} · ${i.qty*i.caseQty} tubes</div>` : ``}
```

### Checkout button calls:
```javascript
function openCheckout(){
  fetch('/api/checkout', { method:'POST', ... cart data ... })
  .then(r => r.json())
  .then(data => { window.location.href = data.url; })
}
```

---

## Vercel

- **Team:** UknownDev’s projects (Hobby plan)
- **Project:** lumins-linear-tubes
- **Settings URL:** https://vercel.com/uknowndevs-projects/lumins-linear-tubes/settings
- **Env vars URL:** https://vercel.com/uknowndevs-projects/lumins-linear-tubes/settings/environment-variables

---

## Legal Pages (added April 1, 2026)

Both pages match the site’s dark theme (gold `#F5C842` accents, `#0F0F0F` background) and are standalone HTML files.
Contact email for both: **info@luminslighting.com**

### Privacy Policy — `/privacy.html`
- **Live URL:** https://lumins-linear-tubes.vercel.app/privacy.html
- **Jurisdiction:** United States / California (CCPA/CPRA compliant)
- **13 sections:** Overview, Information We Collect, How We Use, How We Share, Third-Party Services (Stripe + Vercel), Cookies & Tracking, Data Retention, Security, Children’s Privacy, California Rights (CCPA/CPRA), Do Not Sell, Changes, Contact
- **Key points:**
  - No analytics cookies, no ad tracking — only strictly necessary + Stripe cookies
  - Order records retained 7 years (tax compliance)
  - We do NOT sell or share personal information
  - Full 6-card CCPA rights grid (Know, Delete, Correct, Non-Discrimination, Opt-Out, Limit Use)
  - Effective date: April 1, 2026

### Terms & Conditions — `/terms.html`
- **Live URL:** https://lumins-linear-tubes.vercel.app/terms.html
- **14 sections:** Acceptance, Eligibility, Products & Ordering, Pricing & Payment, Shipping, All Sales Final, 5-Year Warranty, Intellectual Property, Disclaimers, Limitation of Liability, Indemnification, Governing Law, Changes, Contact
- **Key policies baked in:**
  - **All sales final** — no returns or exchanges (red-bordered callout box)
  - **Case-only ordering** — 25 tubes/case explicitly stated; customer acknowledges at purchase
  - **5-year limited warranty** — covers defects in materials/workmanship; excludes misuse, surges, physical damage, lumen depreciation; remedy is replacement only (not refund); non-transferable
  - **Shipping:** California only (no other states, no P.O. boxes, no international)
  - **Governing law:** State of California, venue in Los Angeles County
  - **Incorrect orders:** Contact within 7 days, we’ll ship the right product at no charge
  - Effective date: April 1, 2026

### Footer link order (in index.html Company column):
```html
<li><a href="#">About Us</a></li>
<li><a href="#">Projects</a></li>
<li><a href="#">Contact</a></li>
<li><a href="/privacy.html">Privacy Policy</a></li>
<li><a href="/terms.html">Terms &amp; Conditions</a></li>
```

---

## CSS Design System (from index.html :root)

```css
--gold: #F5C842;
--gold-light: #FDE98A;
--gold-dark: #C9A010;
--dark: #0F0F0F;
--dark2: #1A1A1A;
--dark3: #222;
--gray: #6B6B6B;
--gray-light: #E8E8E8;
--gray-lighter: #F4F4F4;
--white: #FFFFFF;
--text: #1C1C1C;
--green: #22C55E;
--red: #EF4444;
--blue: #3B82F6;
--font: 'Segoe UI', system-ui, -apple-system, sans-serif;
```

---

## To-Do / Future Ideas
- [ ] Switch Stripe from test mode to live mode when ready to accept real payments
- [ ] Set up Stripe email notifications (Settings → Emails in Stripe dashboard)
- [ ] Consider adding webhook to push order data into Close CRM or a spreadsheet
- [ ] Potentially create more product-specific sites from the `lumins-lighting` template
- [ ] Update legal page URLs once a custom domain is set up (currently on vercel.app subdomain)
- [ ] Update legal pages’ effective dates if policies change before launch
