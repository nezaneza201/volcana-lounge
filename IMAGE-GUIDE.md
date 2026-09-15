# IMAGE GUIDE — replacing the demo artwork with real photographs

Everything visual on the site is **replaceable in one line of configuration**.
This file explains exactly how, and what to shoot.

---

## 1. Why the site ships with vector artwork

The site was built without access to Volcana Lounge's own photo library, and a
premium restaurant website must never show a broken image, a grey box, a
watermarked stock photo, or an AI illustration pretending to be the restaurant.

So every image currently on the site is **original artwork drawn for this
project** — volcanic silhouettes, warm interior light, fire, stone, plates.
They are deliberately atmospheric rather than photorealistic, they look
intentional, they load instantly (2–6 KB each), and they are pixel-perfect on
every screen size.

They are placeholders of the highest reasonable quality, and the client should
replace them with real photography before launch.

**Rule for whoever replaces them:** never publish an image the restaurant does
not own or have a licence for. If it has a stock watermark, a "Getty Images" or
"Shutterstock" band, or came from a Google image search, it cannot go live.

---

## 2. How images work

Every image on the site is declared once, in `content/site.config.js`, inside the
`media` block. One entry looks like this:

```js
pizza: {
  art:  'assets/img/pizza-fire.svg',     // always shown if nothing better exists
  avif: 'assets/img/pizza-fire.avif',    // best quality + smallest
  webp: 'assets/img/pizza-fire.webp',    // broad support
  jpg:  'assets/img/pizza-fire.jpg',     // universal fallback
  width: 1400, height: 1400,             // real pixel size (prevents layout shift)
  focal: '50% 50%',                      // which part stays visible when cropped
  alt: 'Wood-fired pizza served on a dark stone plate'
}
```

What happens at runtime:

1. The page loads the tiny `art` file first — so there is never an empty space.
2. Then it quietly tests whether the `.avif` exists; if it does, it swaps it in.
   If not, it tries `.webp`, then `.jpg`.
3. **If none of them exist, nothing breaks** — the artwork simply stays.

That means you can add real photos one at a time, in any order, without ever
pushing a broken page live.

- **`focal`** sets `object-position`. Change `'50% 50%'` to `'50% 25%'` if the
  subject sits high in your photo and the crop is cutting it off.
- **`alt`** is the image description used by screen readers and Google Images.
  Rewrite it to describe the real photograph once you replace it.
- **`width` / `height`** must match the real file so the layout never jumps.

---

## 3. The complete image list

Replace the files in the last column with your own, keeping the same names.
"Recommended export" is the ideal size for that slot on a retina screen.

| # | Where it appears | Key in `site.config.js` | Recommended export | Current file |
| --- | --- | --- | --- | --- |
| 1 | Hero, slide 1 | `heroVolcano` | 1920 × 1080 (16:9) | `hero-volcano.*` |
| 2 | Hero, slide 2 | `heroInterior` | 1920 × 1080 | `interior-warm.*` |
| 3 | Hero, slide 3 | `heroTerrace` | 1920 × 1080 | `terrace-balcony.*` |
| 4 | Our Story, tall photo | `storyInterior` | 1400 × 1750 (4:5 portrait) | `story-interior.*` |
| 5 | Made Over Fire, hero dish | `pizza` | 1400 × 1400 (square) | `pizza-fire.*` |
| 6 | Made Over Fire, list | `grill` | 1600 × 1200 | `grill-skewers.*` |
| 7 | Made Over Fire, list | `dessert` | 1200 × 1200 | `dessert-mousse.*` |
| 8 | Made Over Fire, list | `guestsTable` | 1600 × 1100 | `guests-table.*` |
| 9 | Made Over Fire, list | `stoneDetails` | 1400 × 1400 | `stone-details.*` |
| 10 | Volcano section, wide | `volcanoRidge` | 1920 × 900 (wide) | `volcano-ridge.*` |
| 11 | Experience — Dine | `experienceDine` | 900 × 1200 (portrait) | `experience-dine.*` |
| 12 | Experience — Explore | `experienceExplore` | 900 × 1200 | `experience-explore.*` |
| 13 | Experience — Gather | `experienceGather` | 900 × 1200 | `experience-gather.*` |
| 14 | Experience — Unwind | `experienceUnwind` | 900 × 1200 | `experience-unwind.*` |
| 15 | Gallery — interior | `galleryInterior` | 1400 × 1050 | `gallery-interior.*` |
| 16 | Gallery — balcony / terrace | `galleryTerrace` | 1400 × 1050 | `gallery-terrace.*` |
| 17 | Gallery — guests | `galleryGuests` | 1400 × 1050 | `gallery-guests.*` |
| 18 | Gallery — details | `galleryDetails` | 1400 × 1050 | `gallery-details.*` |
| 19 | Gallery — seating | `gallerySeating` | 1400 × 1050 | `gallery-seating.*` |
| 20 | Gallery — exterior / evening | `galleryExterior` | 1920 × 1080 | `gallery-exterior.*` |

The gallery on the page is built from the `gallery.items` list in
`site.config.js`. Reuse the same keys, add new ones if you shoot more, and edit
each `caption` — the caption appears under the photo and inside the lightbox.

The social tile wall uses `social.tiles`, which simply reuses six of these keys.

---

## 4. Replacing an image, step by step

Worked example: replacing the wood-fired pizza photo.

1. **Export your photo** at 1400 × 1400 (square — see the table in section 3).
2. **Name it** `pizza-fire.jpg` and drop it into `assets/img/`.
3. **Refresh the page.** Done. The site detects the new file and uses it
   automatically — the artwork it was using steps aside.

Optional but recommended for speed:

4. Also export `pizza-fire.webp` and `pizza-fire.avif` with the same base name
   and put them in the same folder. The site prefers AVIF, then WebP, then JPG,
   so the smallest modern format wins on every device.
5. Open `content/site.config.js`, find the `pizza` entry and rewrite `alt` to
   describe the real photograph, e.g.
   `alt: 'Wood-fired margherita pizza fresh from the oven at Volcana Lounge'`.
6. If the crop cuts the top off your pizza, change `focal: '50% 50%'` to
   `focal: '50% 40%'` and check again.

Nothing else is involved — no code, no build step, no developer.

The same three steps work for all 20 images, in any order, one at a time.

---

## 5. Recommended export settings

| Setting | Recommendation |
| --- | --- |
| Colour profile | sRGB (not Adobe RGB, not CMYK) |
| Formats | AVIF + WebP preferred; JPG at quality 78–82 as the fallback |
| Hero and volcano images | 1920 px wide, target under 300 KB |
| Story and experience (portrait) | 900–1400 px wide, under 200 KB |
| Food close-ups | 1200–1600 px, under 180 KB |
| Gallery images | 1400 px, under 180 KB |
| Sharpening | Light. Heavy sharpening looks cheap on retina screens |
| Dark photos | Shoot or grade them slightly warm — the design is dark |

File naming must match the table exactly: **lowercase, hyphens, no spaces**.
`gallery-seating.jpg` works; `Gallery Seating (1).JPG` does not.

Free tools that do this well: **Squoosh** (squoosh.app, browser-based, no
install), Lightroom's export presets, or Photoshop's *Export As*.

**Never upscale.** A 900 px photo stretched to 1920 px will look soft on a large
screen. Crop instead.

---

## 6. What to photograph (a simple shoot list)

One relaxed session, roughly two hours, covers everything on the site.

**Best light:** arrive about 45 minutes before sunset for the exterior and
terrace, then shoot the interior and food after dark with the lamps on — that is
the warm, cinematic mood this design was built around.

| Priority | Shot | Used for |
| --- | --- | --- |
| 1 | Pizza fresh from the wood-fired oven, on a dark plate or board | `pizza-fire` (the visual hero of the site) |
| 2 | Wood-fired oven with visible flame, in action | `grill-skewers`, "Made Over Fire" |
| 3 | Exterior at dusk with the lights on, sign visible | `hero-volcano`, `gallery-exterior` |
| 4 | Interior wide shot, several tables fully set, lights on | `hero-interior`, `gallery-interior`, `gallery-seating` |
| 5 | Balcony or terrace seating in the evening | `hero-terrace`, `gallery-terrace` |
| 6 | Brochettes on the grill, close up | `grill-skewers` |
| 7 | Chocolate mousse (or your signature dessert), styled simply | `dessert-mousse` |
| 8 | Table with two or four guests, laughing, candle lit | `guests-table`, `gallery-guests` |
| 9 | Stone wall, wood, brass, glassware, a candle flame | `stone-details`, texture shots |
| 10 | Volcanoes / Virunga range at golden hour (public viewpoint) | `volcano-ridge` |

Guests must give permission before their faces appear on a public website, and
staff should know which photos will be published.

**Do not claim a view the restaurant does not have.** The volcano photography is
landscape imagery for the region, and the page is worded that way on purpose.
Keep it that way unless there genuinely is a volcano view from a table.

<!-- IMG-6-END -->