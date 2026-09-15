# Volcana Lounge — website

Premium one-page website for **Volcana Lounge**, a restaurant and lounge on the
Ruhengeri–Gisenyi road in Musanze, Rwanda.

- **Address:** FJXM+2FX, Ruhengeri-Gisenyi Rd, Musanze, Rwanda
- **Phone / WhatsApp:** +250 785 818 501
- **Hours:** every day, 11:30 AM – 11:00 PM
- **Rating shown:** 4.2 / 5 from 102 Tripadvisor reviews

It is a static site: plain HTML, one CSS file and one JavaScript file. No build
step, no framework, no database, no monthly platform fee. It can be hosted on
any web host, or even opened directly from a USB stick.

---

## 1. What is in the project

```
volcana-lounge/
├─ index.html                  the whole page (semantic HTML, all sections)
├─ content/
│  └─ site.config.js           ← THE ONLY FILE THE OWNER NEEDS TO EDIT
├─ assets/
│  ├─ css/main.css             all styling (design system + responsive rules)
│  ├─ js/main.js               all behaviour (vanilla JS, no libraries)
│  ├─ img/                     artwork + demo imagery (see IMAGE-GUIDE.md)
│  └─ docs/                    put the official menu PDF here
├─ tools/
│  ├─ export-images.ps1        exports the social card + app icon bitmaps
│  ├─ og-card.html             export frame for the social share card
│  └─ app-icon.html            export frame for the iPhone home-screen icon
├─ robots.txt                  search engine rules (update the domain)
├─ sitemap.xml                 single-page sitemap (update the domain)
├─ site.webmanifest            name, colours and icon for "add to home screen"
├─ README.md                   this file
└─ IMAGE-GUIDE.md              how to replace the demo photos with real ones
```

Nothing in the page is hard-coded twice. Business details, menu items, gallery,
reviews, opening hours and links all come from `content/site.config.js` and are
rendered into the page by `assets/js/main.js`.

---

## 2. Previewing it on this computer

**Easiest:** open `index.html` in a browser. Everything works, including the
menu tabs, lightbox and reservation form.

**Best (matches the live server exactly):** run a tiny local web server from
the project folder, then visit <http://localhost:8000/>.

```powershell
# if Python is installed
python -m http.server 8000

# or with Node.js installed
npx --yes serve -l 8000 .
```

In VS Code you can also install the **Live Server** extension and click
*Go Live*.

---

## 3. Editing the website

Open **`content/site.config.js`** in any text editor. It is commented in plain
English and grouped so you can find things quickly.

| What you want to change | Where it lives in `site.config.js` |
| --- | --- |
| Phone, WhatsApp, address, hours, currency | `business` |
| Tripadvisor rating and review count | `business.rating` |
| Google Maps, Facebook, Instagram, Tripadvisor, menu PDF links | `links` |
| Pre-written WhatsApp messages | `whatsapp` |
| Hero headline, subheadline, CTA labels, hero slides | `hero` |
| The four quick actions under the hero | `quickActions` |
| "Where Fire Meets Flavor" story text | `story` |
| "Made Over Fire" dish highlights | `fire` |
| Menu categories, dishes, notes, disclaimer | `menu` |
| Signature dish section | `signature` |
| The four experience cards (Dine / Explore / Gather / Unwind) | `experience` |
| Gallery images and captions | `gallery` |
| Volcano section text | `volcano` |
| Reviews carousel entries | `reviews` |
| Reservation form labels and success message | `reservation` |
| Social section heading and tile wall | `social` |
| Footer navigation and contact details | `nav` plus `business` |
| Navigation labels | `nav` |
| Page title, meta description, keywords, social image | `seo` |
| Demo badges and ember particles | `flags` |

Save the file, refresh the page. That is the whole workflow.

### Turning off the "DEMO CONTENT" labels

Parts of the copy are intentionally marked as demo content, because the facts
were not verified. Once the owner has replaced that text with real information,
open `content/site.config.js` and set:

```js
flags: {
  markDemoContent: false,   // hides every "demo content" badge
  emberParticles: true      // set to false for maximum performance
}
```

### Removing the developer credit

The footer contains one small credit line:

> Website designed & built by **Your Studio Name** · remove this line before launch

Open `index.html`, search for `DEVELOPER CREDIT`, and delete that whole marked
block (four lines, including the comment above it). Nothing else references it,
so the footer simply closes up.

The copyright year in the footer updates itself every January — it is never
hard-coded and never needs editing.

---

## 4. Menu and prices

The online menu shows **featured highlights**, not a priced menu, because no
official price list was supplied. This is deliberate:

> Menu prices and availability may change. Please contact Volcana Lounge for
> today's menu.

That line is stored in `menu.disclaimer` and is shown under the menu.

**Adding real prices:** open `content/site.config.js`, find the `menu.categories`
list and fill in the empty `price` field for each dish, for example:

```js
{ name: 'Wood-fired pizza', desc: 'Baked on stone in the wood-fired oven.', tags: ['Signature'], price: 'RWF 9,000' }
```

An empty `price: ''` simply renders nothing — so you can add prices one dish at
a time without ever showing a wrong figure.

**Removing a dish you no longer serve:** delete its `{ ... },` line. Adding a
dish is the same in reverse. `tags` are the small labels on each row
(`Signature`, `Vegetarian`, `Local`, …) — leave it as `[]` for none.

**Adding a drinks list:** the `drinks` category currently shows a general range
only. Replace those `items` with your real list once confirmed.

### The "View Full Menu PDF" button

The menu section includes a *View Full Menu PDF* button.

- **As delivered:** it opens a clean, printable on-page version of the menu,
  built automatically from `site.config.js`. Nothing is missing if you have no
  PDF yet.
- **With your PDF:** save the file as `assets/docs/volcana-lounge-menu.pdf`,
  then set `links.menuPdf: 'assets/docs/volcana-lounge-menu.pdf'` in
  `content/site.config.js`. The button turns into a direct link that opens your
  PDF in a new tab, and the small owner note under the menu disappears.

Details are also in `assets/docs/README.txt`.

---

## 5. Photos

All imagery ships as original vector artwork so the site never shows a broken
image, a grey placeholder or a watermarked stock photo. Every image is
replaceable by dropping in a real photograph — no code changes.

**See `IMAGE-GUIDE.md`** for the file names, sizes and a step-by-step walkthrough.

Two bitmap files referenced by the site are generated from that artwork:

```powershell
powershell -ExecutionPolicy Bypass -File tools/export-images.ps1
```

That writes `assets/img/og-volcana-lounge.png` (the preview card shown when the
link is shared on WhatsApp or Facebook) and `assets/img/apple-touch-icon.png`
(the icon if someone adds the site to an iPhone home screen). Re-run it after
editing `assets/img/og-source.svg` or `assets/img/favicon.svg`.

---

## 6. How reservations work

There is **no booking database**, and the site never pretends the request is
"confirmed". Instead the reservation form composes a complete, tidy message and
hands it to WhatsApp, where staff reply personally:

```
Hello Volcana Lounge. I would like to request a reservation.

Name:
Date:
Time:
Guests:
Special request:
```

- The visitor can change the text before sending — exactly like a normal chat.
- Every WhatsApp link on the site opens in a new tab and works on desktop
  (WhatsApp Web) and mobile (WhatsApp app).
- The wording of these messages lives in `whatsapp` in `site.config.js`.
- A **Call to Reserve** button is always next to the form, because a phone call
  is still the fastest way to reach the restaurant.

When the restaurant is ready to accept bookings automatically, the architecture
is ready for it: see *Where this can grow* at the end of this file.

---

## 7. Reviews and rating

- **4.2 / 5** and **102 Tripadvisor reviews** are displayed exactly as published,
  and are labelled *Tripadvisor* on the page.
- Review quotes in the carousel are **labelled placeholders** until the owner
  supplies verified Tripadvisor excerpts. The page never invents a review, a
  reviewer name or an award.
- The *Read More Reviews* button points to the Tripadvisor listing. The URL was
  not supplied, so `links.tripadvisor` currently points to a Tripadvisor search
  for "Volcana Lounge Musanze Rwanda". **Replace it with the direct listing URL**
  when you have it — one line in `site.config.js`.
- To add real quotes: edit `reviews.items` and delete the `placeholder: true`
  flag from each verified entry. The small "Placeholder" badge disappears on its
  own.

---

## 8. Search engines and sharing

The site is built to be found for exactly the searches that matter to a
restaurant in Musanze:

> Volcana Lounge Musanze · restaurants in Musanze · pizza in Musanze ·
> restaurants near Volcanoes National Park · Volcana Lounge Rwanda

Included as standard:

- A precise page title and meta description (both editable in `seo`).
- **Open Graph and Twitter Card tags**, so a shared link shows a proper branded
  preview card instead of a bare URL.
- **Restaurant + LocalBusiness structured data** (`JSON-LD`) containing the
  name, address, phone, opening hours, cuisine types, price range (in RWF), the
  published Tripadvisor rating, the Facebook link, and a **ReserveAction** that
  points at the restaurant's WhatsApp. This is what allows Google to show hours,
  a rating and a reserve button directly in search results.
- Semantic HTML, one `h1`, ordered headings, descriptive `alt` text, plus
  `sitemap.xml` and `robots.txt`.

**Before launch, update the domain.** `https://volcanalounge.rw/` appears in
`seo.siteUrl` (which drives the canonical URL and the structured data) and in
`robots.txt` and `sitemap.xml`. Replace all three with the real address.

**No unsupported claims.** The site does not say "best restaurant in Rwanda",
and does not claim awards, a chef, a view from the tables, or facilities that
were not confirmed. Please keep it that way — it protects the restaurant and
builds more trust than exaggeration does.

**The most valuable SEO link on the page** is `links.tripadvisor`. Point it at
the real Tripadvisor listing as soon as that URL is available.

---

## 9. Speed and accessibility

Performance and accessibility were treated as design features, not afterthoughts.

**Speed**

- One HTML file, one CSS file, one JavaScript file. **No frameworks, no jQuery,
  no icon libraries** — every icon is inline SVG, so there are no extra requests.
- Images below the fold are lazy-loaded, and the hero image is marked
  `fetchpriority="high"` so the first thing a visitor sees arrives first.
- AVIF → WebP → JPG with automatic fallback: modern phones get the smallest
  file, and nothing ever breaks on an older device.
- Fonts load with `display=swap` and a `preconnect` hint, so text appears
  immediately instead of waiting for the font.
- Animations use `IntersectionObserver` and GPU-friendly transforms only. Scroll
  handlers are passive and batched with `requestAnimationFrame`.
- The grain texture and the volcanic ridge shapes are CSS and SVG, not images.

**Accessibility**

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip link,
  and a logical heading order.
- Full keyboard support: the mobile drawer, gallery lightbox, menu tabs and the
  reservation modal all manage focus properly, close on `Escape`, and return
  focus to where it came from.
- Visible focus outlines on every interactive element.
- `aria-label`, `aria-expanded`, `aria-controls` and `role` where the meaning is
  not already carried by visible text.
- Contrast checked against the dark background — body text is warm cream, not
  grey-on-black.
- **`prefers-reduced-motion` is respected**: parallax, ember particles, hero
  crossfades and reveal animations are all switched off for visitors who ask for
  that in their system settings.

---

## 10. Before you go live — a short checklist

- [ ] Replace `https://volcanalounge.rw/` with the real domain in
      `content/site.config.js` (`seo.siteUrl`), `robots.txt` and `sitemap.xml`.
- [ ] Replace `links.tripadvisor` with the direct Tripadvisor listing URL.
- [ ] Add real photos (see `IMAGE-GUIDE.md`) and rewrite the `alt` text.
- [ ] Add today's prices to `menu.categories`, or leave them off the site — both
      are fine. Never guess a price.
- [ ] Drop the official menu PDF into `assets/docs/` and set `links.menuPdf`.
- [ ] Tap both the call button and the WhatsApp button on a real phone.
- [ ] Submit the reservation form and confirm the WhatsApp message arrives.
- [ ] Replace the placeholder review quotes with verified ones, or leave the
      "Placeholder" labels in place.
- [ ] Re-generate the social card if you have a better image
      (`tools/export-images.ps1`).
- [ ] Set `flags.markDemoContent: false` once every demo badge is resolved.
- [ ] Delete the marked developer-credit block in `index.html` if it is not wanted.
- [ ] Test on a real phone, on mobile data, not just on office Wi-Fi.
- [ ] Share the live link in WhatsApp and check the preview card.

---

## 11. Where this can grow

Nothing here is over-built, but the structure was chosen so that a second phase
is additive rather than a rewrite. The steps most restaurants take next:

1. **A real table-booking database.** The reservation form is isolated in one
   function in `main.js` and builds a clearly structured request (name, phone,
   date, time, guests, special request). Swapping WhatsApp for email, a Google
   Sheet or a booking provider means changing that one function.
2. **Online ordering or delivery.** Add a section linking to the platform the
   restaurant already uses; the menu data it needs is already structured.
3. **A digital menu with daily availability.** The menu is data, so marking an
   item as unavailable is one flag away.
4. **Events, offers and gift cards.** Each is a list rendered with the same
   pattern the gallery and experience sections already use.
5. **Analytics.** One snippet before `</body>`; nothing else changes.
6. **Google Business Profile.** The structured data is already correct — the
   biggest local-search gain now comes from keeping the Google profile's hours,
   phone and photos identical to this site.
7. **Newsletter and loyalty programme.** Needs a service or a small backend; the
   site already has a clean place to put the form and a message pattern to reuse.

Because every piece of business information lives in exactly one file, none of
this requires touching the design.

---

## 12. Content honesty rules (please keep)

No verified prices, no supplied photo library, no confirmed dish list beyond the
highlights provided, and no confirmed chef, awards or facilities. Rather than
invent those, the site is explicit about what it does not know:

- Prices are **not published**; the menu shows featured highlights.
- Review quotes are **labelled placeholders** until real ones are supplied.
- Beverage details are shown as a **general range**, with a note to confirm.
- The volcano imagery is presented as **regional scenery**, not a view from a
  table.
- Any remaining unverified copy carries a small, unobtrusive **"demo content"**
  badge, which disappears on its own once `flags.markDemoContent` is `false`.

Replacing a placeholder with a verified fact is always an improvement.
Guessing never is.

---

## 13. Hosting and browser support

**Hosting.** Any static host works: Netlify, Cloudflare Pages, GitHub Pages,
Vercel, or ordinary shared hosting over FTP. Upload the folder as it is — there
is no build step.

Recommended settings:

- Serve over HTTPS (every modern host does this automatically).
- Enable gzip or Brotli compression, and long cache lifetimes for `assets/`.
- Point the domain at the folder containing `index.html`.

**Browser support.** Built for current Chrome, Edge, Safari, Firefox, iOS Safari
and Android Chrome. On older browsers the site degrades gracefully: the layout,
text, menu and links all work, and the scroll animations simply appear already
completed. The page never depends on JavaScript to be usable — every section is
real HTML in `index.html`, and the JavaScript only re-renders it from the
configuration file.

**Slow connections and offline.** Images are lazy and light, the artwork is a few
kilobytes, and the site can be added to a phone home screen with its own icon and
dark theme colour.

---

*Prepared for Volcana Lounge, Musanze, Rwanda — Taste the Spirit of Musanze.*
