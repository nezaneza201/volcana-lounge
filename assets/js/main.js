/* ============================================================================
   VOLCANA LOUNGE — SITE BEHAVIOUR
   ----------------------------------------------------------------------------
   Vanilla JavaScript only. No frameworks, no dependencies.
   Every feature is progressive enhancement: the page works without this file.

   Contents
     1. Config access + tiny helpers
     2. Content binding (business info, links, WhatsApp, structured data)
     3. Section rendering (nav, menu, gallery, reviews, social, ...)
     4. Media upgrade (avif -> webp -> jpg, with art fallback)
     5. Interface behaviour (loader, header, reveals, mobile nav, carousel)
     6. Hero slideshow + ember particles
     7. Dialogs (lightbox, reservation modal, menu viewer) + WhatsApp forms
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.VOLCANA || {};
  var doc = document;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function qs(sel, root) { return (root || doc).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
  function on(target, type, handler, opts) { if (target) target.addEventListener(type, handler, opts); }

  /** Safe path read: read('business.phoneDisplay') */
  function read(path, fallback) {
    var parts = String(path).split('.');
    var value = CFG;
    for (var i = 0; i < parts.length; i++) {
      if (value == null) return fallback;
      value = value[parts[i]];
    }
    return value == null || value === '' ? fallback : value;
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#icon-' + name + '"></use></svg>';
  }

  /** Build a wa.me link with a pre-written message */
  function wa(message) {
    var number = read('business.whatsappRaw', '250785818501');
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message || '');
  }

  function tel() { return 'tel:' + read('business.phoneRaw', '+250785818501'); }

  /** Runs each feature independently so one failure cannot break the page */
  function safe(label, fn) {
    try { fn(); } catch (err) {
      if (window.console && console.warn) console.warn('[volcana] ' + label + ' failed:', err);
    }
  }

  /** Fires `fn` once the user has scrolled near the element */
  function whenNear(el, fn, margin) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { io.disconnect(); fn(); }
      });
    }, { rootMargin: (margin || '250px') + ' 0px' });
    io.observe(el);
  }
/* ---------------------------------------------------------------------------
   2. CONTENT BINDING — one place (site.config.js) feeds the whole page
   ------------------------------------------------------------------------ */
function bindContent() {
  qsa('[data-bind]').forEach(function (node) {
    var value = read(node.getAttribute('data-bind'), null);
    if (value != null) node.textContent = value;
  });

  qsa('[data-bind-href]').forEach(function (link) {
    var key = link.getAttribute('data-bind-href');
    if (key === 'tel') { link.setAttribute('href', tel()); return; }
    var value = read(key, null);
    if (value) link.setAttribute('href', value);
  });

  qsa('[data-wa]').forEach(function (link) {
    var kind = link.getAttribute('data-wa');
    var message = read('whatsapp.' + kind, read('whatsapp.general', 'Hello Volcana Lounge.'));
    link.setAttribute('href', wa(message));
    if (!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }
  });

  qsa('[data-year]').forEach(function (node) { node.textContent = String(new Date().getFullYear()); });

  // Instagram/social links only appear when the owner has added them
  if (!read('links.instagram', '')) {
    qsa('[data-social-instagram]').forEach(function (node) { node.remove(); });
  }

  // Demo markers can be switched off in site.config.js once content is verified
  if (CFG.flags && CFG.flags.markDemoContent === false) {
    qsa('.tag-demo').forEach(function (n) { n.remove(); });
    qsa('.note--demo').forEach(function (n) { n.remove(); });
  }
}

/* Keep <head> in step with site.config.js (title, description, social cards) */
function syncHead() {
  var title = read('seo.title', doc.title);
  var description = read('seo.description', '');

  if (title) {
    doc.title = title;
    qsa('meta[property="og:title"], meta[name="twitter:title"]').forEach(function (m) { m.setAttribute('content', title); });
  }
  if (description) {
    qsa('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')
      .forEach(function (m) { m.setAttribute('content', description); });
  }

  var ogImage = read('seo.ogImage', '');
  var siteUrl = read('seo.siteUrl', '');
  if (ogImage) {
    qsa('meta[property="og:image"], meta[name="twitter:image"]').forEach(function (m) {
      m.setAttribute('content', /^https?:/.test(ogImage) ? ogImage : siteUrl + '/' + ogImage.replace(/^\//, ''));
    });
  }
  if (siteUrl) {
    var canonical = qs('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', siteUrl.replace(/\/$/, '') + '/');
  }
}

/* Structured data: Restaurant + LocalBusiness details, generated from config */
function injectStructuredData() {
  var node = qs('#ldLocalBusiness');
  if (!node) return;

  var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  var rating = CFG.business && CFG.business.rating;

  var data = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    '@id': read('seo.siteUrl', 'https://volcanalounge.rw') + '/#restaurant',
    name: read('brand.name', 'Volcana Lounge'),
    description: read('seo.description', ''),
    slogan: read('brand.tagline', ''),
    url: read('seo.siteUrl', ''),
    image: read('seo.ogImage', ''),
    telephone: read('business.phoneRaw', ''),
    priceRange: '$$',
    currenciesAccepted: read('business.currency', 'RWF'),
    servesCuisine: ['Pizza', 'Grill', 'Rwandan', 'International', 'Vegetarian'],
    acceptsReservations: 'True',
    address: {
      '@type': 'PostalAddress',
      streetAddress: read('business.addressLine1', ''),
      addressLocality: read('business.addressLocality', 'Musanze'),
      addressRegion: read('business.addressRegion', 'Northern Province'),
      addressCountry: read('business.addressCountry', 'RW')
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens: read('business.openingHours.opens', '11:30'),
      closes: read('business.openingHours.closes', '23:00')
    }],
    hasMap: read('links.directions', ''),
    sameAs: [read('links.facebook', ''), read('links.instagram', '')].filter(Boolean),
    areaServed: { '@type': 'Place', name: 'Musanze, Rwanda' },
    potentialAction: [{
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: wa(read('whatsapp.reservation', '')), actionPlatform: 'https://schema.org/MobileWebPlatform' }
    }]
  };

  if (rating && rating.value) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(rating.value),
      reviewCount: String(rating.reviewCount || ''),
      bestRating: '5',
      worstRating: '1',
      // The rating is displayed on this page as published on Tripadvisor
      url: read('links.tripadvisor', '')
    };
  }

  node.textContent = JSON.stringify(data, null, 2);
}
/* ---------------------------------------------------------------------------
   3. SECTION RENDERING — navigation and all list content from site.config.js
   ------------------------------------------------------------------------ */
function actionHref(id) {
  if (id === 'call') return tel();
  if (id === 'whatsapp') return wa(read('whatsapp.reservation', ''));
  if (id === 'directions') return read('links.directions', '#contact');
  if (id === 'reserve') return '#reserve';
  return '#contact';
}

function renderNav() {
  var items = Array.isArray(CFG.nav) ? CFG.nav : null;

  if (items && items.length) {
    var nav = qs('[data-render="nav"]');
    if (nav) {
      nav.innerHTML = '<ul class="nav__list">' + items.map(function (item) {
        return '<li><a class="nav__link" href="' + esc(item.href) + '">' + esc(item.label) + '</a></li>';
      }).join('') + '</ul>';
    }

    var footerNav = qs('[data-footer-nav]');
    if (footerNav) {
      footerNav.innerHTML = items.map(function (item) {
        return '<li><a href="' + esc(item.href) + '">' + esc(item.label) + '</a></li>';
      }).join('');
    }

    var drawerList = qs('[data-mobile-nav-list]');
    if (drawerList) {
      drawerList.innerHTML = items.map(function (item, index) {
        return '<a class="mobile-nav__link" href="' + esc(item.href) + '">' +
          '<span data-index aria-hidden="true">' + pad(index + 1) + '</span>' +
          '<span>' + esc(item.label) + '</span></a>';
      }).join('');
    }
  }

  // Contact shortcuts at the bottom of the mobile drawer
  var meta = qs('[data-mobile-nav-meta]');
  if (meta) {
    meta.innerHTML =
      '<a href="' + esc(tel()) + '">' + icon('phone') + '<span>' + esc(read('business.phoneDisplay', '')) + '</span></a>' +
      '<a href="' + esc(read('links.directions', '#')) + '" target="_blank" rel="noopener">' + icon('pin') +
        '<span>' + esc(read('business.addressFull', '')) + '</span></a>' +
      '<span>' + icon('clock') + esc(read('business.hoursSummary', '')) + '</span>';
  }
}

function renderQuickActions() {
  var grid = qs('[data-quick-actions]');
  var items = Array.isArray(CFG.quickActions) ? CFG.quickActions : null;
  if (!grid || !items || !items.length) return;

  grid.innerHTML = items.map(function (action) {
    var href = actionHref(action.id);
    var external = action.id === 'whatsapp' || action.id === 'directions';
    var attrs = 'href="' + esc(href) + '"' +
      (external ? ' target="_blank" rel="noopener"' : '') +
      (action.id === 'reserve' ? ' data-reserve-open' : '') +
      (action.id === 'call' ? ' data-bind-href="tel"' : '');
    var jsKind = action.id === 'call' ? 'phone' : action.icon;
    var waFlag = action.id === 'whatsapp' ? ' data-wa="reservation"' : '';
    return '<li><a class="quickbar__item' + (action.id === 'reserve' ? ' quickbar__item--accent' : '') + '" ' + attrs + waFlag + '>' +
      '<span class="quickbar__icon' + (action.id === 'whatsapp' ? ' quickbar__icon--wa' : '') + '" aria-hidden="true">' + icon(jsKind) + '</span>' +
      '<span class="quickbar__text"><strong>' + esc(action.label) + '</strong><span>' + esc(action.sub || '') + '</span></span>' +
      '</a></li>';
  }).join('');
}

function renderStoryDetails() {
  var list = qs('[data-story-details]');
  var details = read('story.details', null);
  if (!list || !Array.isArray(details) || !details.length) return;

  list.innerHTML = details.map(function (detail) {
    return '<li class="detail">' + icon(detail.icon) +
      '<span class="detail__text"><strong>' + esc(detail.title) + '</strong><span>' + esc(detail.text) + '</span></span></li>';
  }).join('');
}

function renderFireItems() {
  var list = qs('[data-fire-items]');
  var items = read('fire.items', null);
  if (!list || !Array.isArray(items) || !items.length) return;

  list.innerHTML = items.map(function (item) {
    return '<li class="fire__item">' +
      '<span class="fire__item-icon" aria-hidden="true">' + icon(item.icon) + '</span>' +
      '<span class="fire__item-text"><strong>' + esc(item.title) + '</strong><span>' + esc(item.text) + '</span></span></li>';
  }).join('');
}

function renderExperienceCards() {
  var grid = qs('[data-experience-cards]');
  var cards = read('experience.cards', null);
  if (!grid || !Array.isArray(cards) || !cards.length) return;

  grid.innerHTML = cards.map(function (card, index) {
    var entry = mediaEntry(card.media) || {};
    var src = entry.art || '';
    return '<article class="xp' + (index % 2 ? ' xp--offset' : '') + '" data-reveal="up">' +
      '<div class="xp__media">' +
        '<img src="' + esc(src) + '" data-media="' + esc(card.media) + '"' +
        ' alt="' + esc(entry.alt || card.title) + '" width="900" height="1200" loading="lazy" decoding="async">' +
      '</div>' +
      '<div class="xp__body">' +
        '<span class="xp__index" aria-hidden="true">' + pad(index + 1) + '</span>' +
        '<h3 class="xp__title">' + esc(card.title) + '</h3>' +
        '<p class="xp__text">' + esc(card.text) + '</p>' +
      '</div></article>';
  }).join('');
}
/* --------------------------------------------------------------- MENU ----- */
function menuTagHTML(tag) {
  var slug = String(tag).toLowerCase();
  var modifier = '';
  if (slug === 'vegetarian' || slug === 'veg') modifier = ' menu__tag--veg';
  else if (slug === 'signature') modifier = ' menu__tag--sig';
  return '<span class="menu__tag' + modifier + '">' + esc(tag) + '</span>';
}

function renderMenu() {
  var tabs = qs('[data-menu-tabs]');
  var panels = qs('[data-menu-panels]');
  var categories = read('menu.categories', null);
  if (!tabs || !panels || !Array.isArray(categories) || !categories.length) return;

  tabs.innerHTML = categories.map(function (cat, index) {
    return '<button class="menu__tab" type="button" role="tab" id="menuTab-' + esc(cat.id) + '"' +
      ' aria-controls="menuPanel-' + esc(cat.id) + '"' +
      ' aria-selected="' + (index === 0 ? 'true' : 'false') + '"' +
      ' tabindex="' + (index === 0 ? '0' : '-1') + '">' + esc(cat.name) + '</button>';
  }).join('');

  panels.innerHTML = categories.map(function (cat, index) {
    var items = (cat.items || []).map(function (item) {
      return '<li class="menu__item">' +
        '<div class="menu__item-top">' +
          '<span class="menu__item-name">' + esc(item.name) + '</span>' +
          '<span class="menu__item-leader" aria-hidden="true"></span>' +
          (item.price ? '<span class="menu__item-price">' + esc(item.price) + '</span>' : '') +
        '</div>' +
        (item.desc ? '<p class="menu__item-desc">' + esc(item.desc) + '</p>' : '') +
        (item.tags && item.tags.length ? '<div class="menu__item-tags">' + item.tags.map(menuTagHTML).join('') + '</div>' : '') +
        '</li>';
    }).join('');

    return '<div class="menu__panel' + (index === 0 ? ' is-active' : '') + '" id="menuPanel-' + esc(cat.id) + '"' +
      ' role="tabpanel" aria-labelledby="menuTab-' + esc(cat.id) + '"' + (index === 0 ? '' : ' hidden') + '>' +
      '<div class="menu__panel-head">' +
        '<h3 class="menu__panel-title">' + esc(cat.name) + '</h3>' +
        (cat.note ? '<p class="menu__panel-note">' + esc(cat.note) + '</p>' : '') +
      '</div>' +
      '<ul class="menu__items">' + items + '</ul>' +
      (cat.verifyNote ? '<p class="note menu__panel-verify">' + esc(cat.verifyNote) + '</p>' : '') +
      '</div>';
  }).join('');

  var buttons = qsa('.menu__tab', tabs);
  var panelList = qsa('.menu__panel', panels);

  function select(index) {
    buttons.forEach(function (button, i) {
      var active = i === index;
      button.setAttribute('aria-selected', active ? 'true' : 'false');
      button.setAttribute('tabindex', active ? '0' : '-1');
    });
    panelList.forEach(function (panel, i) {
      var active = i === index;
      panel.classList.toggle('is-active', active);
      if (active) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
    });
  }

  on(tabs, 'click', function (event) {
    var button = event.target.closest('.menu__tab');
    if (!button) return;
    select(buttons.indexOf(button));
  });

  on(tabs, 'keydown', function (event) {
    var current = buttons.indexOf(doc.activeElement);
    if (current < 0) return;
    var next = null;
    if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    if (next === null) return;
    event.preventDefault();
    select(next);
    buttons[next].focus();
  });
}

/** Simple, printable menu used inside the viewer modal when no PDF is set */
function buildMenuViewerHTML() {
  var categories = read('menu.categories', null);
  if (!Array.isArray(categories) || !categories.length) return '';

  var groups = categories.map(function (cat) {
    var rows = (cat.items || []).map(function (item) {
      return '<div class="menu-viewer__item">' +
        '<div class="menu-viewer__item-top">' +
          '<span class="menu-viewer__name">' + esc(item.name) + '</span>' +
          '<span class="menu-viewer__leader" aria-hidden="true"></span>' +
          (item.price ? '<span class="menu-viewer__price">' + esc(item.price) + '</span>' : '') +
        '</div>' +
        (item.desc ? '<p class="menu-viewer__desc">' + esc(item.desc) + '</p>' : '') +
        '</div>';
    }).join('');

    return '<section class="menu-viewer__group">' +
      '<h3 class="menu-viewer__title">' + esc(cat.name) + '</h3>' +
      '<div class="menu-viewer__items">' + rows + '</div>' +
      '</section>';
  }).join('');

  return groups;
}
/* ------------------------------------------------------------- GALLERY ---- */
function renderGallery() {
  var grid = qs('[data-gallery]');
  var items = read('gallery.items', null);
  if (!grid || !Array.isArray(items) || !items.length) return;

  grid.innerHTML = items.map(function (item, index) {
    var entry = mediaEntry(item.media) || {};
    var cls = 'masonry__item';
    if (index % 7 === 0) cls += ' masonry__item--tall';
    else if (index % 5 === 3) cls += ' masonry__item--wide';

    return '<button class="' + cls + '" type="button"' +
      ' data-key="' + esc(item.media) + '"' +
      ' data-caption="' + esc(item.caption || '') + '"' +
      ' aria-label="Open larger photo: ' + esc(item.caption || item.alt || 'Volcana Lounge') + '">' +
      '<img src="' + esc(entry.art || '') + '" data-media="' + esc(item.media) + '"' +
        ' alt="' + esc(item.alt || item.caption || 'Volcana Lounge') + '"' +
        ' width="1400" height="1050" loading="lazy" decoding="async">' +
      '<span class="masonry__label" aria-hidden="true">' +
        '<span>' + esc(item.caption || '') + '</span>' +
        '<span class="masonry__zoom">' + icon('expand') + '</span>' +
      '</span></button>';
  }).join('');
}

/* ------------------------------------------------------------- REVIEWS ---- */
function renderReviews() {
  var track = qs('[data-reviews-carousel]');
  var items = read('reviews.items', null);
  if (!track || !Array.isArray(items) || !items.length) return;

  track.innerHTML = items.map(function (review) {
    return '<article class="review">' +
      '<p class="review__theme">' + esc(review.theme || '') + '</p>' +
      '<blockquote class="review__quote">' + esc(review.quote || '') + '</blockquote>' +
      '<footer class="review__foot">' +
        '<span class="review__author">' + esc(review.author || '') + '</span>' +
        (review.placeholder ? '<span class="review__flag">Placeholder</span>' : '') +
      '</footer>' +
    '</article>';
  }).join('');
}

/* -------------------------------------------------------------- SOCIAL ---- */
function renderSocialTiles() {
  var wrap = qs('[data-social-tiles]');
  var tiles = read('social.tiles', null);
  if (!wrap || !Array.isArray(tiles) || !tiles.length) return;

  var facebook = read('links.facebook', '#social');

  wrap.innerHTML = tiles.map(function (key) {
    var entry = mediaEntry(key) || {};
    return '<a class="social__tile" href="' + esc(facebook) + '" target="_blank" rel="noopener"' +
      ' aria-label="Volcana Lounge on Facebook">' +
      '<img src="' + esc(entry.art || '') + '" data-media="' + esc(key) + '"' +
        ' alt="' + esc(entry.alt || 'Volcana Lounge') + '" width="1200" height="1200" loading="lazy" decoding="async">' +
      '<span class="social__tile-icon" aria-hidden="true">' + icon('facebook') + '</span></a>';
  }).join('');
}

/* ---------------------------------------------------------------- INIT ---- */
function init() {
  // Content first: everything else builds on the rendered DOM
  safe('content binding', bindContent);
  safe('head sync', syncHead);
  safe('structured data', injectStructuredData);
  safe('navigation', renderNav);
  safe('quick actions', renderQuickActions);
  safe('story details', renderStoryDetails);
  safe('fire items', renderFireItems);
  safe('experience cards', renderExperienceCards);
  safe('menu', renderMenu);
  safe('gallery', renderGallery);
  safe('reviews', renderReviews);
  safe('social tiles', renderSocialTiles);

  // Behaviour
  safe('loader', initLoader);
  safe('header', initHeader);
  safe('reveals', initReveals);
  safe('scroll spy', initScrollSpy);
  safe('mobile navigation', initMobileNav);
  safe('scroll buttons', initScrollButtons);
  safe('anchors', initAnchors);
  safe('carousel', initCarousel);
  safe('parallax', initParallax);
  safe('hero slides', initHeroSlides);
  safe('embers', initEmbers);

  // Dialogs and forms after their content exists
  safe('dialog basics', initDialogBasics);
  safe('reserve modal', initReserveModal);
  safe('lightbox', initLightbox);
  safe('gallery openers', initGalleryOpeners);
  safe('menu viewer', initMenuViewer);
  safe('time selects', initTimeSelects);
  safe('date inputs', initDateInputs);
  safe('forms', initForms);

  // Photography upgrade comes last so newly rendered images are included
  safe('media upgrade', upgradeAllMedia);
}

if (doc.readyState === 'loading') on(doc, 'DOMContentLoaded', init);
else init();
/* ---------------------------------------------------------------------------
   4. MEDIA — prefer avif, then webp, then jpg; keep the vector art if none exist
   ------------------------------------------------------------------------ */
function mediaEntry(key) {
  return CFG.media && CFG.media[key] ? CFG.media[key] : null;
}

/** Best available source for a media key (used by the lightbox) */
function bestSrcFor(key, done) {
  var m = mediaEntry(key);
  if (!m) { done(''); return; }
  var list = candidateSources(m);
  var i = 0;
  (function probe() {
    if (i >= list.length) { done(m.art || ''); return; }
    var test = new Image();
    test.onload = function () { done(list[i].src); };
    test.onerror = function () { i += 1; probe(); };
    test.src = list[i].src;
  })();
}

function candidateSources(m) {
  var list = [];
  if (m.avif) list.push({ src: m.avif, type: 'image/avif' });
  if (m.webp) list.push({ src: m.webp, type: 'image/webp' });
  if (m.jpg) list.push({ src: m.jpg, type: 'image/jpeg' });
  return list;
}

/**
 * Upgrades an <img data-media="key"> to real photography when the files exist.
 * Until then the hand-drawn placeholder art stays, so nothing ever looks broken.
 */
function upgradeImage(img) {
  var key = img.getAttribute('data-media');
  var m = mediaEntry(key);
  if (!m) return;

  if (m.focal) img.style.objectPosition = m.focal;
  if (!img.getAttribute('alt') && m.alt) img.setAttribute('alt', m.alt);

  var list = candidateSources(m);
  if (!list.length) return;

  var i = 0;
  (function probe() {
    if (i >= list.length) return; // no photography yet — keep the art
    var test = new Image();
    test.onload = function () { swap(list.slice(i)); };
    test.onerror = function () { i += 1; probe(); };
    test.src = list[i].src;
  })();

  function swap(available) {
    if (!img.parentNode) return;
    var picture = doc.createElement('picture');

    available.forEach(function (cand, index) {
      if (index === available.length - 1) return; // last one goes on <img>
      var source = doc.createElement('source');
      source.type = cand.type;
      source.setAttribute('srcset', cand.src);
      picture.appendChild(source);
    });

    var replacement = img.cloneNode(false);
    replacement.removeAttribute('data-media');
    replacement.removeAttribute('srcset');
    replacement.setAttribute('src', available[available.length - 1].src);

    replacement.addEventListener('load', function () { picture.classList.add('is-loaded'); });
    picture.appendChild(replacement);

    img.style.transition = 'opacity .5s ease';
    img.style.opacity = '0';
    window.setTimeout(function () { if (img.parentNode) img.parentNode.replaceChild(picture, img); }, 220);
  }
}

/** Queue every marked image, upgrading gallery/off-screen images lazily */
function upgradeAllMedia() {
  qsa('img[data-media]').forEach(function (img) {
    var lazy = img.getAttribute('loading') === 'lazy';
    if (lazy) whenNear(img, function () { upgradeImage(img); }, '320px');
    else upgradeImage(img);
  });
}
/* ---------------------------------------------------------------------------
   5. INTERFACE — loader, sticky header, reveals, mobile nav, carousel
   ------------------------------------------------------------------------ */
function initLoader() {
  var loader = qs('#loader');
  if (!loader) return;
  function done() {
    loader.classList.add('is-done');
    window.setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 700);
  }
  if (doc.readyState === 'complete') done();
  else on(window, 'load', done);
  window.setTimeout(done, 2500); // never trap the visitor behind the loader
}

function initHeader() {
  var header = qs('[data-header]');
  if (!header) return;
  var progress = qs('[data-scroll-progress]');
  var lastY = window.pageYOffset || 0;
  var ticking = false;

  function update() {
    var y = window.pageYOffset || 0;
    var max = Math.max(1, doc.documentElement.scrollHeight - window.innerHeight);
    header.classList.toggle('is-solid', y > 40);
    if (y > 420 && y > lastY) header.classList.add('is-hidden');
    else header.classList.remove('is-hidden');
    if (progress) progress.style.transform = 'scaleX(' + Math.min(1, y / max) + ')';
    lastY = y;
    ticking = false;
  }
  on(window, 'scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

function initReveals() {
  var items = qsa('[data-reveal]');
  var decor = qsa('.ridge, .volcano, .signature');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    decor.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var siblings = Array.prototype.slice.call(entry.target.parentNode.children)
        .filter(function (n) { return n.hasAttribute('data-reveal'); });
      var index = Math.max(0, siblings.indexOf(entry.target));
      entry.target.style.transitionDelay = (index % 4) * 80 + 'ms';
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach(function (el) { io.observe(el); });

  var decorObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); decorObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.22 });
  decor.forEach(function (el) { decorObserver.observe(el); });
}

function initScrollSpy() {
  var links = qsa('.nav__link');
  if (!links.length || !('IntersectionObserver' in window)) return;
  var map = {};
  links.forEach(function (link) {
    var id = (link.getAttribute('href') || '').replace('#', '');
    if (id) map[id] = link;
  });
  if (!Object.keys(map).length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove('is-active'); });
      if (map[entry.target.id]) map[entry.target.id].classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  Object.keys(map).forEach(function (id) {
    var section = doc.getElementById(id);
    if (section) io.observe(section);
  });
}
function initMobileNav() {
  var drawer = qs('[data-mobile-nav]');
  var toggle = qs('[data-menu-toggle]');
  if (!drawer || !toggle) return;
  var panel = qs('.mobile-nav__panel', drawer);
  var lastFocus = null;

  function open() {
    lastFocus = doc.activeElement;
    drawer.hidden = false;
    window.requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    doc.body.classList.add('is-locked');
    var first = qs('a, button', panel);
    if (first) first.focus({ preventScroll: true });
  }

  function close() {
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    doc.body.classList.remove('is-locked');
    window.setTimeout(function () { drawer.hidden = true; }, 450);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  on(toggle, 'click', function () {
    if (toggle.getAttribute('aria-expanded') === 'true') close(); else open();
  });
  on(drawer, 'click', function (event) {
    if (event.target === drawer || event.target.hasAttribute('data-mobile-close')) close();
  });
  on(doc, 'keydown', function (event) {
    if (event.key === 'Escape' && !drawer.hidden) close();
  });
  // Keep keyboard focus inside the drawer while it is open
  on(drawer, 'keydown', function (event) {
    if (event.key !== 'Tab' || drawer.hidden) return;
    var focusables = qsa('a[href], button:not([disabled])', panel);
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  qsa('a[href^="#"]', panel).forEach(function (link) {
    on(link, 'click', function () { close(); });
  });
  on(window, 'resize', function () {
    if (window.innerWidth >= 1024 && !drawer.hidden) close();
  });
}

function initScrollButtons() {
  var toTop = qs('[data-to-top]');
  var bar = qs('.mobile-bar');
  var hero = qs('.hero');

  function update() {
    var y = window.pageYOffset || 0;
    var trigger = hero ? Math.max(320, hero.offsetHeight * 0.62) : 600;
    if (toTop) toTop.hidden = y < 700;
    if (bar) bar.classList.toggle('is-visible', y > trigger);
  }
  on(window, 'scroll', update, { passive: true });
  on(toTop, 'click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  update();
}

function initAnchors() {
  qsa('[data-scroll-to]').forEach(function (link) {
    on(link, 'click', function (event) {
      var target = doc.querySelector(link.getAttribute('data-scroll-to'));
      if (!target) return;
      event.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
}

function initCarousel() {
  var track = qs('[data-reviews-carousel]');
  if (!track) return;
  var prev = qs('[data-carousel-prev]');
  var next = qs('[data-carousel-next]');

  function step(direction) {
    var card = qs('.review', track);
    var gap = parseFloat(getComputedStyle(track).columnGap || '24') || 24;
    var amount = card ? (card.offsetWidth + gap) : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  on(prev, 'click', function () { step(-1); });
  on(next, 'click', function () { step(1); });

  var startX = null;
  on(track, 'touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  on(track, 'touchend', function (e) {
    if (startX === null) return;
    var delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
    startX = null;
  });
}

function initParallax() {
  if (reduceMotion) return;
  var layers = qsa('[data-parallax]');
  if (!layers.length) return;
  var ticking = false;

  function update() {
    var viewport = window.innerHeight;
    layers.forEach(function (layer) {
      var rect = layer.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > viewport + 200) return;
      var progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      var shift = Math.max(-1, Math.min(1, progress)) * 26;
      var img = layer.tagName === 'IMG' ? layer : qs('img', layer);
      if (img) img.style.transform = 'translate3d(0,' + shift.toFixed(2) + 'px,0)';
    });
    ticking = false;
  }
  on(window, 'scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  on(window, 'resize', update, { passive: true });
  update();
}
/* ---------------------------------------------------------------------------
   6. HERO — cinematic crossfade slideshow + subtle ember particles
   ------------------------------------------------------------------------ */
function initHeroSlides() {
  var media = qs('[data-hero-media]');
  if (!media) return;
  var keys = (CFG.hero && CFG.hero.slides) || [];
  var existing = qs('[data-hero-slide]', media);
  if (!existing || keys.length < 2) return;

  // Build any extra slides from the configured media keys (art first,
  // real photography is swapped in afterwards by the media upgrader)
  keys.slice(1).forEach(function (key) {
    var entry = mediaEntry(key);
    var src = (entry && entry.art) || '';
    if (!src) return;
    var slide = doc.createElement('div');
    slide.className = 'hero__slide';
    slide.setAttribute('data-hero-slide', '');
    slide.innerHTML = '<img src="' + esc(src) + '" data-media="' + esc(key) + '" alt="" width="1920" height="1080" loading="lazy" decoding="async">';
    media.appendChild(slide);
  });

  var slides = qsa('[data-hero-slide]', media);
  if (slides.length < 2) return;
  var index = 0;
  var timer = null;

  function show(next) {
    slides[index].classList.remove('is-active', 'is-kenburns');
    index = (next + slides.length) % slides.length;
    var current = slides[index];
    current.classList.add('is-active');
    if (!reduceMotion) current.classList.add('is-kenburns');
  }

  function start() {
    if (reduceMotion) { slides[0].classList.add('is-active'); return; }
    stop();
    timer = window.setInterval(function () { show(index + 1); }, 7000);
  }
  function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

  slides[0].classList.add('is-active');
  start();

  // Save battery: only animate while the hero is on screen and the tab is visible
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) start(); else stop(); });
    }, { threshold: 0.12 }).observe(media);
  }
  on(doc, 'visibilitychange', function () { if (doc.hidden) stop(); else start(); });
}

/** Soft ember particles: warm, slow, restrained. Never distracting. */
function initEmbers() {
  if (reduceMotion) return;
  if (CFG.flags && CFG.flags.emberParticles === false) return;
  var canvases = qsa('canvas[data-embers]');
  if (!canvases.length) return;

  canvases.forEach(function (canvas) {
    var ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;

    var host = canvas.parentElement || canvas;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 0, h = 0, particles = [], frame = null;
    var palette = ['226,139,59', '200,161,90', '226,139,59'];

    function make() {
      return {
        x: Math.random() * w,
        y: h * (0.55 + Math.random() * 0.55),
        r: 0.5 + Math.random() * 1.5,
        vy: 0.1 + Math.random() * 0.28,
        vx: (Math.random() - 0.5) * 0.14,
        a: 0.12 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        tint: palette[Math.floor(Math.random() * palette.length)]
      };
    }

    function resize() {
      var rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(10, Math.min(30, Math.round(w / 52)));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(make());
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y -= p.vy;
        p.x += p.vx + Math.sin((p.y + p.phase) / 60) * 0.09;
        if (p.y < -12 || p.x < -12 || p.x > w + 12) { particles[i] = make(); continue; }
        var fade = Math.min(1, Math.max(0, p.y / (h * 0.35)) );
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + p.tint + ',' + (p.a * fade).toFixed(3) + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = window.requestAnimationFrame(draw);
    }

    function start() { if (!frame) { resize(); frame = window.requestAnimationFrame(draw); } }
    function stop() { if (frame) { window.cancelAnimationFrame(frame); frame = null; } }

    window.addEventListener('resize', function () { resize(); }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) start(); else stop(); });
      }, { threshold: 0.05 }).observe(host);
    } else {
      start();
    }
    on(doc, 'visibilitychange', function () { if (doc.hidden) stop(); else start(); });
  });
}
/* ---------------------------------------------------------------------------
   7. DIALOGS — shared modal behaviour, gallery lightbox
   ------------------------------------------------------------------------ */
var openDialog = null;
var reserveOrigin = null;

function showDialog(node, focusTarget) {
  if (!node) return;
  openDialog = node;
  node.hidden = false;
  doc.body.classList.add('is-locked');
  var target = focusTarget || qs('[data-modal-close], [data-lightbox-close], button, a[href]', node);
  if (target) window.setTimeout(function () { target.focus({ preventScroll: true }); }, 40);
}

function hideDialog(node) {
  var dialog = node || openDialog;
  if (!dialog) return;
  dialog.hidden = true;
  if (openDialog === dialog) openDialog = null;
  if (!qs('.modal:not([hidden]), .lightbox:not([hidden])')) doc.body.classList.remove('is-locked');
  // Send keyboard focus back where the visitor came from
  if (reserveOrigin && reserveOrigin.focus && dialog.id === 'reserveModal') {
    var remote = reserveOrigin;
    reserveOrigin = null;
    window.setTimeout(function () { remote.focus({ preventScroll: true }); }, 60);
  }
}

function initDialogBasics() {
  qsa('.modal, .lightbox').forEach(function (dialog) {
    on(dialog, 'click', function (event) {
      if (event.target.hasAttribute('data-modal-close') || event.target.hasAttribute('data-lightbox-close')) hideDialog(dialog);
    });
    on(dialog, 'keydown', function (event) {
      if (event.key !== 'Tab') return;
      var focusables = qsa('a[href], button:not([disabled]), input, select, textarea', dialog).filter(function (el) { return el.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  });
  on(doc, 'keydown', function (event) {
    if (event.key !== 'Escape' || !openDialog) return;
    if (openDialog.id === 'lightbox') closeLightbox(); else hideDialog(openDialog);
  });
}

/* ------------------------------------------------------ Reservation modal -- */
function initReserveModal() {
  var modal = qs('#reserveModal');
  if (!modal) return;

  // Delegated so it keeps working even if sections are re-rendered from config
  on(doc, 'click', function (event) {
    var opener = event.target.closest && event.target.closest('[data-reserve-open]');
    if (!opener) return;
    event.preventDefault();
    markReserveOrigin(opener);
    showDialog(modal, qs('#qName', modal));
  });
}

/** Remember which CTA opened the modal so focus can return there on close */
function markReserveOrigin(opener) {
  reserveOrigin = opener;
}

/* --------------------------------------------------------------- Lightbox -- */
var lightboxState = { index: 0, items: [] };

function collectGalleryItems() {
  return qsa('.masonry__item').map(function (item) {
    var img = qs('img', item);
    return {
      key: item.getAttribute('data-key') || '',
      src: (img && (img.currentSrc || img.getAttribute('src'))) || '',
      alt: (img && img.getAttribute('alt')) || '',
      caption: item.getAttribute('data-caption') || ''
    };
  });
}

function renderLightbox() {
  var box = qs('#lightbox');
  if (!box) return;
  var item = lightboxState.items[lightboxState.index];
  if (!item) return;

  var img = qs('[data-lightbox-img]', box);
  var caption = qs('[data-lightbox-caption]', box);
  var counter = qs('[data-lightbox-counter]', box);

  // Prefer real photography for the full-screen view when it exists
  if (item.key) {
    bestSrcFor(item.key, function (src) { if (src) img.setAttribute('src', src); });
  } else if (item.src) {
    img.setAttribute('src', item.src);
  }
  img.setAttribute('alt', item.alt);
  if (caption) caption.textContent = item.caption || item.alt;
  if (counter) counter.textContent = (lightboxState.index + 1) + ' / ' + lightboxState.items.length;
}

function openLightbox(index) {
  var box = qs('#lightbox');
  if (!box) return;
  lightboxState.items = collectGalleryItems();
  if (!lightboxState.items.length) return;
  lightboxState.index = (index + lightboxState.items.length) % lightboxState.items.length;
  renderLightbox();
  showDialog(box, qs('[data-lightbox-close]', box));
}

function stepLightbox(direction) {
  if (!lightboxState.items.length) return;
  lightboxState.index = (lightboxState.index + direction + lightboxState.items.length) % lightboxState.items.length;
  renderLightbox();
}

function closeLightbox() { hideDialog(qs('#lightbox')); }

function initLightbox() {
  var box = qs('#lightbox');
  var grid = qs('[data-gallery]');
  if (!box || !grid) return;

  on(box, 'click', function (event) {
    if (event.target.closest('[data-lightbox-prev]')) stepLightbox(-1);
    else if (event.target.closest('[data-lightbox-next]')) stepLightbox(1);
  });

  on(doc, 'keydown', function (event) {
    if (box.hidden) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); stepLightbox(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); stepLightbox(1); }
  });

  // Swipe between photos on touch screens
  var startX = null;
  on(box, 'touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  on(box, 'touchend', function (e) {
    if (startX === null) return;
    var delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) stepLightbox(delta < 0 ? 1 : -1);
    startX = null;
  });
}

/** Called from the gallery markup (delegated so re-rendering stays safe) */
function initGalleryOpeners() {
  var grid = qs('[data-gallery]');
  if (!grid) return;
  on(grid, 'click', function (event) {
    var item = event.target.closest('.masonry__item');
    if (!item) return;
    event.preventDefault();
    var items = qsa('.masonry__item', grid);
    openLightbox(items.indexOf(item));
  });
}
/* ------------------------------------------------------------ Booking forms */
function pad(value) { return value < 10 ? '0' + value : String(value); }

function minutesToLabel(minutes) {
  var hours = Math.floor(minutes / 60) % 24;
  var mins = minutes % 60;
  var suffix = hours >= 12 ? 'PM' : 'AM';
  var display = hours % 12;
  if (display === 0) display = 12;
  return display + ':' + pad(mins) + ' ' + suffix;
}

function timeOptions() {
  var opens = read('business.openingHours.opens', '11:30');
  var closes = read('business.openingHours.closes', '23:00');
  function toMinutes(value) {
    var parts = String(value).split(':');
    return (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0);
  }
  var start = toMinutes(opens);
  var end = Math.max(start + 60, toMinutes(closes) - 60); // last seating one hour before closing
  var list = [];
  for (var m = start; m <= end; m += 30) list.push(minutesToLabel(m));
  return list;
}

function initTimeSelects() {
  var options = timeOptions();
  qsa('[data-time-select]').forEach(function (select) {
    var current = select.value;
    select.innerHTML = '<option value="">Select a time</option>' +
      options.map(function (label) { return '<option value="' + esc(label) + '">' + esc(label) + '</option>'; }).join('');
    if (current) select.value = current;
  });
}

function initDateInputs() {
  var now = new Date();
  var iso = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  qsa('input[type="date"]').forEach(function (input) {
    input.setAttribute('min', iso);
    if (!input.value) input.value = iso;
  });
}

function prettyDate(value) {
  if (!value) return '';
  var parts = String(value).split('-');
  var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  if (isNaN(date.getTime())) return value;
  try {
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } catch (err) { return value; }
}

/** Exact message structure requested by the restaurant */
function buildReservationMessage(data) {
  var lines = ['Hello Volcana Lounge. I would like to request a reservation.', ''];
  lines.push('Name: ' + (data.name || '-'));
  lines.push('Date: ' + (prettyDate(data.date) || '-'));
  lines.push('Time: ' + (data.time || '-'));
  lines.push('Guests: ' + (data.guests || '-'));
  lines.push('Special request: ' + (data.request || 'None'));
  if (data.phone) lines.push('Phone: ' + data.phone);
  return lines.join('\n');
}

function validateForm(form) {
  var valid = true;
  qsa('[required]', form).forEach(function (input) {
    var error = qs('[data-error-for="' + input.name + '"]', form);
    var empty = !String(input.value || '').trim();
    if (empty) {
      input.setAttribute('aria-invalid', 'true');
      if (error) { error.textContent = 'Please complete this field.'; error.hidden = false; }
      valid = false;
    } else {
      input.removeAttribute('aria-invalid');
      if (error) { error.hidden = true; error.textContent = ''; }
    }
  });
  return valid;
}

function initForms() {
  var forms = qsa('[data-reserve-form], [data-quick-form]');
  if (!forms.length) return;

  forms.forEach(function (form) {
    var status = qs('[data-form-status]', form);

    on(form, 'submit', function (event) {
      event.preventDefault();

      if (!validateForm(form)) {
        if (status) status.textContent = 'Please complete the highlighted fields.';
        var invalid = qs('[aria-invalid="true"]', form);
        if (invalid) invalid.focus();
        return;
      }

      var data = {};
      qsa('.field__input', form).forEach(function (input) {
        if (input.name) data[input.name] = String(input.value || '').trim();
      });

      var url = wa(buildReservationMessage(data));
      var opened = window.open(url, '_blank', 'noopener');

      if (status) {
        status.innerHTML = opened
          ? 'WhatsApp should now be open with your request. If it did not open, <a class="link-underline" href="' +
            esc(url) + '" target="_blank" rel="noopener">tap here to send it</a>.'
          : 'Tap to <a class="link-underline" href="' + esc(url) + '" target="_blank" rel="noopener">send your request on WhatsApp</a>.';
      }

      if (opened) {
        form.reset();
        initDateInputs();
        initTimeSelects();
      }
    });

    // Clear the "required" message as soon as the guest fills a field in
    on(form, 'input', function (event) {
      var input = event.target;
      if (!input.name) return;
      var error = qs('[data-error-for="' + input.name + '"]', form);
      if (input.value.trim()) {
        input.removeAttribute('aria-invalid');
        if (error) { error.hidden = true; error.textContent = ''; }
      }
    });
  });
}

/* ---------------------------------------------------- Menu PDF / viewer ---- */
function initMenuViewer() {
  var button = qs('[data-menu-viewer]');
  var modal = qs('#menuModal');
  var body = qs('[data-menu-viewer-body]');
  if (!button || !modal) return;

  var pdf = read('links.menuPdf', '');

  // Once a real PDF is configured, the button becomes a direct download
  if (pdf) {
    var link = doc.createElement('a');
    link.className = button.className;
    link.setAttribute('href', pdf);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    link.innerHTML = button.innerHTML;
    button.parentNode.replaceChild(link, button);
    qsa('[data-menu-pdf-note]').forEach(function (note) { note.remove(); });
    return;
  }

  if (body) body.innerHTML = buildMenuViewerHTML();

  on(button, 'click', function () {
    showDialog(modal, qs('.modal__close', modal));
  });
}
})();
