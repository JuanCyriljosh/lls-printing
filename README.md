# LLS Printing Services Inc. — Website

Static marketing site for **LLS Printing Services Inc.** — Quezon City, Philippines.
Custom offset printing, diecutting, foil stamping, embossing and packaging development.

Built with plain HTML + CSS + vanilla JS. No build step. Deploys directly to **GitHub Pages**.

---

## 1. Project structure

```
lls-printing-site/
├── index.html          Home
├── about.html          About / mission / story
├── services.html       Services + how-we-work process
├── products.html       Product range (3 categories)
├── portfolio.html      Project gallery with lightbox
├── contact.html        Quote form (with file upload) + map
├── shop.html           Shop catalog — 16 sample boxes w/ tier pricing
├── faqs.html           Frequently asked questions (accordion)
├── 404.html            Custom not-found page (CMYK theme)
├── assets/
│   ├── css/style.css   Full design system
│   ├── js/main.js      Nav, reveal-on-scroll, lightbox, form
│   └── img/
│       ├── logo.png
│       ├── projects/   p1.jpg … p8.jpg
│       └── clients/    clients1.jpg, clients2.jpg
└── README.md
```

---

## 2. Before you deploy — 2 small things to set up

### a) Set the Web3Forms access key (for the contact form)

The contact form posts to **Web3Forms** (free, no backend needed). To make it work:

1. Go to https://web3forms.com/
2. Enter `llsprintinginc@gmail.com` and click **Create Access Key** — they email you the key.
3. Open `contact.html`, find this line:

   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```

4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the real key.

Until you do this, the form will fail. Until then, the page still tells visitors to email `llsprintinginc@gmail.com` directly.

### b) (Optional) Improve the Google Maps pin

`contact.html` embeds a Google Maps iframe for "Santa Monica St, Quezon City". If you want a precise pin (with a specific number / building):

1. Open Google Maps, find the exact location.
2. Click **Share → Embed a map → Copy HTML**.
3. Paste the new iframe over the existing `<iframe>` in `contact.html`.

---

## 3. Deploy to GitHub Pages

### One-time setup

```powershell
# In PowerShell, from the project folder:
cd C:\Users\r0jos\Desktop\lls-printing-site

git init
git branch -M main
git add .
git commit -m "Initial site"

# Create a NEW repo on https://github.com/new called "lls-printing" (public, no README)
git remote add origin https://github.com/JuanCyriljosh/lls-printing.git
git push -u origin main
```

### Enable GitHub Pages

1. Go to https://github.com/JuanCyriljosh/lls-printing/settings/pages
2. Under **Source**, pick **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Wait 1–2 minutes. Site lives at:

   **https://juancyriljosh.github.io/lls-printing/**

### To update later

```powershell
git add .
git commit -m "Update content"
git push
```

GitHub Pages will auto-redeploy within ~1 minute of every push.

---

## 4. Custom domain (later, optional)

When you're ready for a real domain (e.g. `llsprinting.com` or `.ph`):

1. Buy domain from any registrar (Namecheap, GoDaddy, local PH registrar).
2. In the GitHub repo → Settings → Pages → Custom domain → enter the domain.
3. In your registrar's DNS, point an `A` record to GitHub's IPs:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
   - (or a `CNAME` for `www` → `juancyriljosh.github.io`)
4. Enable **Enforce HTTPS** in GitHub once verification completes.

---

## 5. Editing content

- **Text**: open the relevant `.html` file in any editor (VS Code, Notepad) — content is plain HTML.
- **Images**:
  - Logo → `assets/img/logo.png`
  - Project photos → `assets/img/projects/p1.jpg` … `p8.jpg` (any image format, just match filenames or update references).
  - Client logos sheet → `assets/img/clients/clients1.jpg`, `clients2.jpg`.
- **Colors / fonts**: tweak CSS variables at the top of `assets/css/style.css` (`--navy`, `--magenta`, `--cyan`, `--yellow`, etc.).
- **Business hours / address / phone**: search the codebase for `Santa Monica` or `9754709855` and update everywhere.

---

## 6. Tech notes

- **No build step.** Pure HTML/CSS/JS — open `index.html` in a browser to preview locally.
- **Fonts** load from Google Fonts (Inter + Montserrat).
- **Web3Forms** powers the contact form (free up to 250 submissions/month).
- **Mobile responsive** — single breakpoint at 900px, second at 540px.
- **Accessibility**: semantic HTML, ARIA labels on nav toggle and form status, keyboard-closable lightbox (ESC).
- **SEO**: per-page `<title>` and `<meta description>` set. Open Graph tags on home page.

---

## 7. Owner action items (placeholders to replace)

A few spots have placeholder content marked for you to confirm or replace:

1. **Web3Forms access key** in `contact.html` — see §2a above.
2. **MOQs and turnaround times** in `services.html` — verify the numbers (e.g. "MOQ 500 pcs", "7&ndash;10 days") match your real capacity. Edit the `<div class="service-meta">` blocks.
3. **Testimonials** on `index.html` — the 3 quotes near the bottom are placeholders. Ask 2&ndash;3 happy clients (e.g. via WhatsApp) for a 1&ndash;2 sentence quote and replace `[Client Name]` with their real name.
4. **Payment methods** in the footer — currently shows GCash, Maya, BPI, BDO, Bank Transfer. Edit `<div class="payment-methods">` if your accepted methods are different.
5. **FAQs payment terms** in `faqs.html` — verify the "50% downpayment / 50% before delivery" terms match your policy.
6. **Shop pricing** in `shop.html` — 16 sample boxes have indicative prices (₱4.5–₱220/pc tiered by qty). **All must be verified or replaced with real costs** before going live. Each product card has a `<div class="product-tiers">` block with 3 price tiers.
7. **Shop box dimensions/specs** in `shop.html` — verify dimensions, materials and finishes are what you can actually deliver.

## 8. UI/UX features built in

This site is more than a brochure &mdash; it has production-grade UX:

- **Hero collage** &mdash; layered animated product photos w/ floating "25 yrs" badge
- **Social proof carousel** &mdash; auto-scrolling client name strip below hero (pause on hover)
- **Animated count-up** &mdash; stats numbers tick up when scrolled into view
- **SVG icon system** &mdash; consistent Lucide-style line icons (no emoji rendering issues)
- **Mobile sticky CTA bar** &mdash; persistent Call / WhatsApp / Quote buttons on phones
- **Desktop float CTAs** &mdash; WhatsApp + Quote pills bottom-right
- **Lightbox gallery** &mdash; click any portfolio image to zoom (ESC to close)
- **FAQ accordion** &mdash; native `<details>` for accessibility
- **Filter chips** &mdash; product category filter on Products page
- **Custom 404** &mdash; on-brand "This page didn't print" w/ CMYK gradient
- **CMYK brand expression** &mdash; gradient dividers, magenta selection color, registration mark on 404
- **View Transitions** &mdash; smooth cross-fade between pages (modern browsers)
- **Reveal-on-scroll** &mdash; sections animate in as user scrolls
- **WCAG-compliant text contrast** &mdash; magenta darkened for body text accessibility
- **Reduced-motion support** &mdash; respects OS accessibility settings
- **Lazy-loaded images** &mdash; below-fold images defer until needed (faster initial paint)
- **Functional breadcrumbs** &mdash; chevron separators, hoverable links
- **Sticky glass-blur nav** &mdash; backdrop-filter on supporting browsers
- **Mobile-first responsive** &mdash; breakpoints at 720, 900 and 540px

## 9. Suggested next steps

- Create a **Facebook Page** for LLS Printing — add the link to footer (PH market relies on FB Messenger heavily).
- Set up a **Google Business Profile** for "LLS Printing Services Inc., Quezon City" — improves local SEO.
- Buy a custom domain when budget allows (`.com` ≈ ₱600/yr, `.ph` ≈ ₱1500/yr).
- Add more real project photos to `assets/img/projects/` and reference them in `portfolio.html`.
- Consider adding individual case-study pages for top clients (e.g. Yugo, Ricci, Alriver).

---

Built 2026. Maintained by JuanCyriljosh.
