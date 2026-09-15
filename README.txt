VOLCANA LOUNGE — FULL MENU PDF
==============================

Put the restaurant's official menu PDF in THIS folder, then tell the website
where it is.

How to enable the "View Full Menu PDF" button:

1. Save the PDF here, for example:

     assets/docs/volcana-lounge-menu.pdf

2. Open:  content/site.config.js

3. Find the `links` section and set the path:

     menuPdf: 'assets/docs/volcana-lounge-menu.pdf',

4. Save the file and refresh the website.

What happens then:
  - The "View Full Menu PDF" button stops opening the on-page menu viewer.
  - It becomes a direct link to your PDF (opens in a new tab).
  - The small "owner note" text under the menu disappears automatically.

If you leave `menuPdf` empty, the website shows the built-in on-page menu
viewer instead, built from the menu items in site.config.js. Nothing breaks.

Recommended: keep the PDF under about 3 MB so it opens quickly on a phone.
If your designer can supply it, an A4 portrait PDF exported at "web quality"
is ideal.

Note: this folder is excluded in robots.txt (Disallow: /assets/docs/internal/)
for any internal documents you do not want indexed.