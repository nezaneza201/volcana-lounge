/* ============================================================================
   VOLCANA LOUNGE — MASTER CONTENT FILE
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE THE RESTAURANT NEEDS TO EDIT.

   Change a phone number, an opening hour, a menu item, a photo or a review
   here and it updates everywhere on the website (navigation, footer, buttons,
   WhatsApp messages, Google structured data, mobile action bar...).

   Rules kept in place on purpose:
   - No invented prices. Leave `price: ''` empty until real prices are confirmed.
   - No invented reviews or awards. Placeholder text is labelled as demo.
   - No invented claims about views, chefs or facilities.

   After editing, save the file and refresh the website. That is all.
   ========================================================================== */
window.VOLCANA = {

  /* ---------------------------------------------------------------- FLAGS -- */
  flags: {
    // Shows small "DEMO CONTENT" markers on anything not yet verified.
    // Set to false once the owner has replaced all placeholders.
    markDemoContent: false,
    // Subtle ember particles in selected sections. Set false for max speed.
    emberParticles: true
  },

  /* ---------------------------------------------------------------- BRAND -- */
  brand: {
    name: 'Volcana Lounge',
    tagline: 'Taste the Spirit of Musanze',
    locationLabel: 'Musanze, Rwanda \u2022 Near Volcanoes National Park',
    signatureLine: 'Wood-fired flavors, warm hospitality and unforgettable moments beneath the volcanoes.'
  },

  /* ------------------------------------------------------------- BUSINESS -- */
  business: {
    legalName: 'Volcana Lounge',
    addressLine1: 'FJXM+2FX, Ruhengeri-Gisenyi Rd',
    addressLocality: 'Musanze',
    addressRegion: 'Northern Province',
    addressCountry: 'RW',
    addressFull: 'FJXM+2FX, Ruhengeri-Gisenyi Rd, Musanze, Rwanda',
    phoneDisplay: '+250 785 818 501',
    phoneRaw: '+250785818501',      // used for tel: links
    whatsappRaw: '250785818501',    // used for wa.me links (no +)
    hoursSummary: 'Every day: 11:30 AM \u2013 11:00 PM',
    hoursShort: '11:30 AM \u2013 11:00 PM Daily',
    openingHours: { opens: '11:30', closes: '23:00' },
    currency: 'RWF',
    rating: {
      value: 4.2,
      reviewCount: 102,
      source: 'Tripadvisor',
      sourceNote: 'Rating as published on Tripadvisor'
    }
  },

  /* ---------------------------------------------------------------- LINKS -- */
  links: {
    directions: 'https://www.google.com/maps/search/?api=1&query=Volcana+Lounge+FJXM%2B2FX+Ruhengeri-Gisenyi+Rd+Musanze',
    mapEmbed: 'https://www.google.com/maps?q=Volcana%20Lounge%20FJXM%2B2FX%20Ruhengeri-Gisenyi%20Rd%20Musanze&output=embed',
    // A Tripadvisor search link is used because the exact listing URL was not
    // supplied. Replace it with the direct listing URL when available.
    tripadvisor: 'https://www.tripadvisor.ie/Restaurant_Review-g317075-d3295986-Reviews-Volcana_Lounge-Ruhengeri_Musanze_District_Northern_Province.html',
    facebook: 'https://facebook.com/108353272676161',
    instagram: '',
    // Official full menu PDF: drop the file into assets/docs/ and paste the
    // path here, e.g. 'assets/docs/volcana-lounge-menu.pdf'. Leave empty to
    // show the built-in menu viewer instead of a PDF.
    menuPdf: ''
  },

  /* -------------------------------------------------- WHATSAPP MESSAGES ---- */
  whatsapp: {
    reservation: 'Hello Volcana Lounge, I would like to make a reservation.',
    menuQuestion: 'Hello Volcana Lounge, could you please share today\'s menu and prices?',
    general: 'Hello Volcana Lounge, I would like to know more about your restaurant.'
  },
/* ----------------------------------------------------------------- HERO -- */
  hero: {
    kicker: 'Volcana Lounge',
    headline: 'Taste the Spirit of Musanze',
    sub: 'Wood-fired flavors, warm hospitality and unforgettable moments beneath the volcanoes.',
    ctaPrimary: 'Reserve a Table',
    ctaSecondary: 'Explore the Menu',
    scrollLabel: 'Discover Volcana',
    // Cinematic crossfade slides — each value is a key from `media` below.
    slides: ['heroVolcano', 'heroInterior', 'heroTerrace']
  },

  /* -------------------------------------------------- QUICK ACTION BAR ----- */
  quickActions: [
    { id: 'directions', icon: 'pin',   label: 'Get Directions',  sub: 'Ruhengeri-Gisenyi Rd' },
    { id: 'call',       icon: 'phone', label: 'Call Us',         sub: '+250 785 818 501' },
    { id: 'whatsapp',   icon: 'chat',  label: 'WhatsApp',        sub: 'Fast reply' },
    { id: 'reserve',    icon: 'table', label: 'Reserve a Table', sub: 'Open daily' }
  ],

  /* ---------------------------------------------------------------- STORY -- */
  story: {
    label: 'Our Story',
    heading: 'Where Fire Meets Flavor',
    paragraphs: [
      'Volcana Lounge is a bar, restaurant and lounge in Musanze, Rwanda, on the Ruhengeri-Gisenyi road. Public guest reviews describe a relaxed place for good food, friendly service and time with friends or family.',
      'Guests mention wood-baked pizza, spinach lasagna, brochettes, falafel, hummus and chocolate mousse, with African tea also appearing in guest feedback. The setting includes indoor seating, an indoor fireplace and covered outdoor terrace or rooftop seating.',
      'Close to the Volcanoes region, Volcana makes a natural stop before or after exploring Musanze. Come for a meal, settle into the lounge and enjoy the easy pace of an evening in town.'
    ],
    details: [
      { icon: 'pin',   title: 'Musanze, Rwanda',         text: 'On the Ruhengeri \u2013 Gisenyi road' },
      { icon: 'fire',  title: 'Wood-Fired Kitchen',      text: 'Pizza and grilled favorites' },
      { icon: 'leaf',  title: 'Indoor & Outdoor Dining', text: 'Balcony and terrace seating' },
      { icon: 'plate', title: 'Local & International',   text: 'Vegetarian options available' }
    ],
    note: 'Description based on the public Volcana Lounge listing and Tripadvisor guest feedback.'
  },

  /* -------------------------------------------------------- FIRE / FOOD ---- */
  fire: {
    label: 'Signature Food',
    heading: 'Made Over Fire',
    sub: 'Simple ingredients. Serious flavor.',
    // The first item is treated as the visual hero (wood-fired pizza).
    items: [
      { icon: 'pizza',     title: 'Wood-fired pizza',   text: 'Baked in the oven, made to share.' },
      { icon: 'pot',       title: 'Local favorites',    text: 'Comforting Rwandan-inspired plates.' },
      { icon: 'salad',     title: 'Vegetarian options', text: 'Fresh, considered, generous.' },
      { icon: 'pasta',     title: 'Pasta',              text: 'Slow, warm and satisfying.' },
      { icon: 'skewer',    title: 'Brochettes',         text: 'Grilled over open flame.' },
      { icon: 'chocolate', title: 'Chocolate mousse',   text: 'A soft, rich finish.' }
    ]
  },
/* ---------------------------------------------------------------- MENU --- */
  menu: {
    label: 'The Menu',
    heading: 'A Table for Every Evening',
    intro: 'A considered selection of wood-fired, local and international dishes. The online listing below is a helpful lead, not a confirmed restaurant menu.',
    disclaimer: 'Menu prices and availability may change. Online listing items and prices must be confirmed with Volcana Lounge before publishing.',
    // `items` are FEATURED HIGHLIGHTS, not a full priced menu.
    categories: [
      {
        id: 'starters',
        name: 'Starters',
          note: 'Public listing highlights',
        items: [
            { name: 'Akabenz', desc: 'Listed as deep-fried pork bites with spicy Rwandan chili sauce.', tags: ['Listed'], price: '3,500 RWF' },
            { name: 'Samosas', desc: 'Listed as crisp pastry filled with spiced vegetables.', tags: ['Listed'], price: '2,500 RWF' },
            { name: 'Igitoki Fries', desc: 'Listed as fried plantain with garlic mayo.', tags: ['Listed'], price: '3,000 RWF' }
        ],
        verifyNote: 'Dish descriptions and prices are from the public FoodInRwanda listing. Contact Volcana Lounge for the current menu.'
      },
      {
        id: 'pizza',
        name: 'Pizza',
        note: 'From the wood-fired oven',
        items: [
          { name: 'Wood-fired pizza', desc: 'Baked on stone in the wood-fired oven.', tags: ['Signature'], price: '' },
          { name: 'Vegetarian pizza', desc: 'A meat-free build with fresh vegetables.', tags: ['Vegetarian'], price: '' }
        ]
      },
      {
        id: 'mains',
        name: 'Main Dishes',
        note: 'Local inspiration, international comfort',
        items: [
          { name: 'Brochettes',             desc: 'Skewered and grilled over open flame.', tags: [], price: '' },
          { name: 'Spinach lasagna',        desc: 'Layered, baked and served hot.', tags: ['Vegetarian'], price: '' },
          { name: 'Tilapia Rwandan Style',  desc: 'Listed as grilled tilapia with spicy tomato sauce and steamed vegetables.', tags: ['Listed'], price: '9,000 RWF' },
          { name: 'Tilapia Rwandan Style',  desc: 'Listed as grilled tilapia with spicy tomato sauce and steamed vegetables.', tags: ['Listed'], price: '9,000 RWF' },
          { name: 'Ubunyobwa & Isombe',     desc: 'Listed as cassava leaves cooked with groundnuts and fried cassava.', tags: ['Listed'], price: '7,000 RWF' },
          { name: 'Local-inspired dishes',  desc: 'Rwandan flavor, cooked with care.', tags: ['Local'], price: '' },
          { name: 'International favorites', desc: 'Familiar plates, done properly.', tags: [], price: '' }
        ]
      },
      {
        id: 'vegetarian',
        name: 'Vegetarian',
        note: 'Meat-free choices available',
        items: [
          { name: 'Vegetarian pizza', desc: 'Wood-fired, vegetable-forward.', tags: ['Vegetarian'], price: '' },
          { name: 'Vegetarian-friendly selections', desc: 'Ask our team for today\u2019s vegetarian options.', tags: ['Ask'], price: '' }
        ]
      },
      {
        id: 'dessert',
        name: 'Dessert',
        note: 'A quiet finish',
        items: [
          { name: 'Chocolate mousse', desc: 'Light, rich and chilled.', tags: ['Sweet'], price: '' },
          { name: 'Amasaka', desc: 'Listed as a traditional Rwandan sweet served with honey.', tags: ['Listed'], price: '2,000 RWF' },
          { name: 'Amasaka', desc: 'Listed as a traditional Rwandan sweet served with honey.', tags: ['Listed'], price: '2,000 RWF' },
          { name: 'Fruit salad', desc: 'Listed as fresh local fruits served chilled with honey.', tags: ['Listed'], price: '2,500 RWF' }
        ]
      },
      {
        id: 'drinks',
        name: 'Drinks',
        note: 'Hot, cold and everything in between',
        // Shown as a general range only — no invented brands or prices.
        items: [
          { name: 'Soft drinks & juices', desc: 'Ask for today\u2019s availability.', tags: [], price: '' },
          { name: 'Hot drinks',           desc: 'Coffee and tea service.', tags: [], price: '' },
          { name: 'Beer & wine',          desc: 'Selection available at the bar.', tags: [], price: '' },
          { name: 'Cocktails & spirits',  desc: 'A short list served in the lounge.', tags: [], price: '' },
          { name: 'Ikivuguto',            desc: 'Listed as a traditional fermented milk drink.', tags: ['Listed'], price: '1,500 RWF' },
          { name: 'Ikivuguto',            desc: 'Listed as a traditional fermented milk drink.', tags: ['Listed'], price: '1,500 RWF' },
          { name: 'Passion fruit juice',  desc: 'Listed as freshly squeezed and served chilled.', tags: ['Listed'], price: '3,000 RWF' }
        ],
        verifyNote: 'Beverage details are from the public FoodInRwanda listing. Contact Volcana Lounge for current availability.'
      }
    ],
    ctaPrimary: 'Ask About Today\u2019s Menu',
    pdfLabel: 'View Full Menu PDF'
  },

  /* ----------------------------------------------------- SIGNATURE DISH ---- */
  signature: {
    label: 'Signature',
    heading: 'The Volcana Signature',
    dish: 'Wood-fired pizza',
    copy: 'Blistered crust, quiet smoke, generous toppings \u2014 pulled from the oven and brought straight to your table.',
    marks: ['Wood-Fired', 'Freshly Prepared', 'Made to Share'],
    cta: 'Explore Our Menu'
  },
/* ----------------------------------------------------------- EXPERIENCE -- */
  experience: {
    label: 'The Experience',
    heading: 'More Than a Meal',
    intro: 'Four ways to spend an evening at Volcana.',
    cards: [
      { id: 'dine',    title: 'Dine',    text: 'Relax in a warm and welcoming environment.', media: 'experienceDine' },
      { id: 'explore', title: 'Explore', text: 'Enjoy Volcana as part of your Musanze adventure.', media: 'experienceExplore' },
      { id: 'gather',  title: 'Gather',  text: 'A comfortable place for friends, couples and groups.', media: 'experienceGather' },
      { id: 'unwind',  title: 'Unwind',  text: 'Slow down, enjoy good food and take in the atmosphere.', media: 'experienceUnwind' }
    ]
  },

  /* -------------------------------------------------------------- GALLERY -- */
  gallery: {
    label: 'Gallery',
    heading: 'Inside Volcana',
    intro: 'Restaurant atmosphere, seating, food and the landscape around Musanze.',
    note: 'Photos sourced from the public Volcana Lounge gallery on FoodInRwanda.',
    // `media` keys point at the `media` map below. Swap to your own files there.
    items: [
      { media: 'heroVolcano',   caption: 'Volcano landscape around Musanze',        alt: 'Volcanic hills at dusk near Musanze, Rwanda' },
      { media: 'galleryInterior', caption: 'Volcana Lounge interior',                alt: 'Warm restaurant interior with pendant lighting' },
      { media: 'pizza',         caption: 'Wood-fired pizza from the oven',          alt: 'Wood-fired pizza served on a dark stone plate' },
      { media: 'galleryTerrace', caption: 'Balcony and terrace seating',            alt: 'Balcony seating area with a view over the hills' },
      { media: 'galleryGuests', caption: 'Guests enjoying the atmosphere',          alt: 'Guests seated around a candlelit table' },
      { media: 'galleryDetails', caption: 'Restaurant details',                     alt: 'Volcanic stone wall and brass details inside the lounge' },
      { media: 'grill',         caption: 'Brochettes over the fire',                alt: 'Skewers grilling over glowing embers' },
      { media: 'gallerySeating', caption: 'Indoor seating area',                    alt: 'Indoor dining room with wooden tables' },
      { media: 'dessert',       caption: 'Chocolate mousse',                        alt: 'Chocolate mousse served in a glass' },
      { media: 'galleryExterior', caption: 'Exterior and restaurant atmosphere',    alt: 'Restaurant exterior with warm evening lighting' }
    ]
  },

  /* ------------------------------------------------------- VOLCANO STORY -- */
  volcano: {
    label: 'Musanze',
    heading: 'At the Foot of the Volcanoes',
    copy: 'From the energy of the volcanic landscape to the warmth of the kitchen, Volcana is part of the unforgettable Musanze experience.',
    // Neutral, verified-safe facts (not claims about the restaurant).
    facts: [
      { title: 'Volcanoes National Park', text: 'Home to the mountain gorilla and Rwanda\u2019s volcanic peaks \u2014 a short drive from town.' },
      { title: 'Musanze', text: 'The main town of Rwanda\u2019s Northern Province, known as Ruhengeri historically.' },
      { title: 'Five Volcanoes', text: 'The Virunga chain includes Karisimbi, Bisoke, Muhabura, Gahinga and Sabinyo.' }
    ],
    cta: 'Discover Musanze',
    ctaHref: 'https://www.google.com/maps/search/?api=1&query=Volcanoes+National+Park+Rwanda',
    note: 'Landscape information is general to the Musanze area.'
  },
/* -------------------------------------------------------------- REVIEWS -- */
  reviews: {
    label: 'Reviews',
    heading: 'What Guests Say',
    // Excerpts below are drawn from publicly visible Tripadvisor reviews.
    sourceNote: 'Guest excerpts from Tripadvisor. Read the full listing for context.',
    readMore: 'Read More Reviews',
    items: [
      { theme: 'Pizza', quote: 'Pizza at this place is sooo yummy, if you really like pizza don\'t hesitate to visit this place on your way to volcanoes.', author: 'Holly D · Tripadvisor, September 2019' },
      { theme: 'Atmosphere', quote: 'Equally a bar/restaurant and lounge with a laid-back feel. A second home to all who spend any length of time in Ruhengeri.', author: 'lovepatx · Tripadvisor, December 2020' },
      { theme: 'Food', quote: 'Food was great. I ordered the Falafel and Chocolate Mousse for dessert. LOVED the dessert for sure.', author: 'ritajeff · Tripadvisor, July 2023' },
      { theme: 'Setting', quote: 'Great views and good food. We enjoyed it! The African tea was new for us: hot tea and milk with spices.', author: 'Mariamart92 · Tripadvisor, September 2019' }
    ]
  },

  /* ---------------------------------------------------------- RESERVATION -- */
  reservation: {
    label: 'Reservations',
    heading: 'Reserve Your Table',
    intro: 'Send us your details and we will confirm your table on WhatsApp. For same-day bookings, a quick call is fastest.',
    note: 'Requests are sent through WhatsApp \u2014 no account or payment needed.',
    successNote: 'WhatsApp should now be open with your request. If it did not open, please call us.',
    callLabel: 'Call to Reserve',
    submitLabel: 'Request a Reservation',
    fields: {
      name: 'Name',
      phone: 'Phone',
      date: 'Date',
      time: 'Time',
      guests: 'Number of guests',
      request: 'Special request'
    }
  },

  /* --------------------------------------------------------------- SOCIAL -- */
  social: {
    label: 'Social',
    heading: 'Follow the Volcana Experience',
    intro: 'New dishes, evening light and life in Musanze.',
    // Cards reuse gallery media — no external social feed is embedded.
    tiles: ['heroVolcano', 'pizza', 'galleryInterior', 'galleryTerrace', 'galleryGuests', 'grill']
  },

  /* ------------------------------------------------------------------ SEO -- */
  seo: {
    title: 'Volcana Lounge | Restaurant & Lounge in Musanze, Rwanda',
    description: 'Volcana Lounge is a restaurant and lounge on the Ruhengeri-Gisenyi road in Musanze, Rwanda. Wood-fired pizza, local and international dishes, indoor and outdoor seating. Open daily 11:30 AM - 11:00 PM. Call +250 785 818 501.',
    keywords: 'Volcana Lounge Musanze, restaurants in Musanze, pizza in Musanze, restaurants near Volcanoes National Park, Volcana Lounge Rwanda, Musanze lounge',
    // Social preview card. Generated (and re-generated) by tools/export-images.ps1
    // from assets/img/og-source.svg — 1200 x 630 px.
    ogImage: 'assets/img/og-volcana-lounge.png',
    // Update to the live domain before launch (used in sitemap + canonical).
    siteUrl: 'https://volcanalounge.rw',
    themeColor: '#0B0A09'
  },

  /* ---------------------------------------------------------------- NAV --- */
  nav: [
    { label: 'Home',       href: '#home' },
    { label: 'Our Story',  href: '#story' },
    { label: 'Menu',       href: '#menu' },
    { label: 'Gallery',    href: '#gallery' },
    { label: 'Experience', href: '#experience' },
    { label: 'Reviews',    href: '#reviews' },
    { label: 'Contact',    href: '#contact' }
  ],

  /* --------------------------------------------------------------- MEDIA -- */
  /* Replace the `art` value with your own photograph to swap an image:
       { art: 'assets/img/hero-volcano.svg',
         avif: 'assets/img/hero-volcano.avif',
         webp: 'assets/img/hero-volcano.webp',
         jpg:  'assets/img/hero-volcano.jpg' }
     The site automatically prefers avif -> webp -> jpg, and falls back to the
     `art` file if the others are missing, so it never shows a broken image.
     Keep the `alt` text meaningful for accessibility and SEO.                */
  media: {
    heroVolcano: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      avif: 'assets/img/hero-volcano.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      width: 1920, height: 1080, focal: '50% 55%',
      alt: 'Volcanic hills silhouetted at dusk near Musanze, Rwanda'
    },
    heroInterior: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp',
      avif: 'assets/img/interior-warm.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp',
      width: 1920, height: 1080, focal: '50% 50%',
      alt: 'Warm restaurant interior with hanging pendant lights'
    },
    heroTerrace: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp',
      avif: 'assets/img/terrace-balcony.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp',
      width: 1920, height: 1080, focal: '50% 50%',
      alt: 'Balcony and terrace seating at a lounge in Musanze'
    },
    storyInterior: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp',
      avif: 'assets/img/story-interior.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp',
      width: 1400, height: 1750, focal: '50% 45%',
      alt: 'Dining room of Volcana Lounge with warm evening lighting'
    },
    pizza: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(3).webp',
      avif: 'assets/img/pizza-fire.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(3).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(3).webp',
      width: 1400, height: 1400, focal: '50% 50%',
      alt: 'Wood-fired pizza served on a dark stone plate'
    },
    grill: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(10).webp',
      avif: 'assets/img/grill-skewers.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(10).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(10).webp',
      width: 1600, height: 1200, focal: '50% 50%',
      alt: 'Brochettes grilling over glowing embers'
    },
    dessert: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(9).webp',
      avif: 'assets/img/dessert-mousse.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(9).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(9).webp',
      width: 1200, height: 1200, focal: '50% 50%',
      alt: 'Chocolate mousse served in a glass'
    },
    guestsTable: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp',
      avif: 'assets/img/guests-table.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp',
      width: 1600, height: 1100, focal: '50% 50%',
      alt: 'Guests seated around a candlelit table'
    },
    stoneDetails: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp',
      avif: 'assets/img/stone-details.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp',
      width: 1400, height: 1400, focal: '50% 50%',
      alt: 'Volcanic stone wall and brass detail inside the lounge'
    },
    volcanoRidge: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      avif: 'assets/img/volcano-ridge.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      width: 1920, height: 900, focal: '50% 60%',
      alt: 'Wide view of the Virunga volcano chain near Musanze'
    },
experienceDine: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp',
      avif: 'assets/img/experience-dine.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp',
      width: 900, height: 1200, focal: '50% 50%',
      alt: 'Set table laid for dinner in warm light'
    },
    experienceExplore: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      avif: 'assets/img/experience-explore.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      width: 900, height: 1200, focal: '50% 45%',
      alt: 'Volcanic landscape near Musanze at golden hour'
    },
    experienceGather: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(10).webp',
      avif: 'assets/img/experience-gather.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(10).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(10).webp',
      width: 900, height: 1200, focal: '50% 50%',
      alt: 'Food being cooked over fire to share'
    },
    experienceUnwind: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp',
      avif: 'assets/img/experience-unwind.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp',
      width: 900, height: 1200, focal: '50% 55%',
      alt: 'Quiet terrace seating in the evening'
    },
    galleryInterior: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp',
      avif: 'assets/img/gallery-interior.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp',
      width: 1400, height: 1050, focal: '50% 50%',
      alt: 'Volcana Lounge interior with pendant lighting'
    },
    galleryTerrace: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp',
      avif: 'assets/img/gallery-terrace.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(1).webp',
      width: 1400, height: 1050, focal: '50% 50%',
      alt: 'Balcony seating area overlooking the hills'
    },
    galleryGuests: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp',
      avif: 'assets/img/gallery-guests.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(7).webp',
      width: 1400, height: 1050, focal: '50% 50%',
      alt: 'Guests enjoying the atmosphere at Volcana Lounge'
    },
    galleryDetails: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp',
      avif: 'assets/img/gallery-details.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(4).webp',
      width: 1400, height: 1050, focal: '50% 50%',
      alt: 'Stone and brass detail in the lounge'
    },
    gallerySeating: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp',
      avif: 'assets/img/gallery-seating.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(8).webp',
      width: 1400, height: 1050, focal: '40% 55%',
      alt: 'Indoor seating area with wooden tables'
    },
    galleryExterior: {
      art: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      avif: 'assets/img/gallery-exterior.avif', webp: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp', jpg: 'https://foodinrwanda.com/public/uploads/gallery/1770625044_unnamed%20(5).webp',
      width: 1920, height: 1080, focal: '50% 60%',
      alt: 'Restaurant exterior and evening atmosphere'
    }
  },
};
