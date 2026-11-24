/* SITESPEC shared script: product catalogue, cart (localStorage), header/footer, cart drawer.
   Edit PRODUCTS below to change names, prices (pence) and images. price:null shows "Price TBC" and disables Add to cart. */
(function () {
  'use strict';

  // ---- Config (placeholders to confirm with the team) ----
  var FREE_DELIVERY_THRESHOLD_PENCE = null; // e.g. 7500 for £75. null hides the progress bar.
  // Supabase (SITESPEC project). The anon/publishable key is safe in the browser ONLY because
  // RLS limits it to inserting contact messages and newsletter sign-ups. Never put the service_role key here.
  var SUPABASE_URL = 'https://tlopsgfqsbctoqaanlti.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_VBlNHYWQKmuJhJBe5bgshg_-ql7smz9'; // paste the publishable/anon key from Supabase > Project Settings > API
  var CLOTHING_SIZES =['S', 'M', 'L', 'XL', '2XL', '3XL'];
  var ONE = ['One size'];
  var SIZES5 = ['S', 'M', 'L', 'XL', '2XL'];
  var CERT_TBC = 'EN ISO 20471 & RIS-3279-TOM [certification to be confirmed before launch]';
  var REFL_NOTE = 'Enhanced-visibility reflective workwear, not certified to EN ISO 20471 or RIS-3279-TOM';

  var CATS = {
    liners: 'PPE liners',
    jackets: 'Jackets & bodywarmers',
    tops: 'Hi-vis tops',
    joggers: 'Joggers',
    reflective: 'Black reflective',
    hats: 'Hats'
  };

  var JOGGER_COPY = '4-way stretch joggers with reinforced knees, zipped hip pockets and tapered ankle cuffs. Built to move on a harness and stand up to a full shift.';
  var JOGGER_FEATURES = '4-way stretch fabric\nZipped hip pockets\nReinforced knees\nTapered ankle cuffs\nSITESPEC woven side-seam label';
  var SPEC_PLACEHOLDER = '[Fabric composition, weight and certification details go here.]\n[Care instructions go here.]';

  var PRODUCTS = [
    { slug: 'skullcap-liner', name: 'SITESPEC Skullcap Liner', cat: 'liners', price: 1800, sizes: ONE,
      imgs: ['sitespec-skullcap-liner.png'],
      desc: 'A skullcap liner made to sit under a helmet and keep you working in UK weather.',
      features: 'Made to sit under a helmet\nWinter warmth without bulk\n[More features to be confirmed]' },
    { slug: 'neck-gaiter', name: 'Contoured Anti-Fog Neck Gaiter', cat: 'liners', price: 1500, sizes: ONE,
      imgs: ['sitespec-neck-gaiter.png'],
      desc: 'A contoured neck gaiter designed to keep specs fog-free and your neck warm under a helmet.',
      features: 'Contoured, anti-fog design\nSits under a helmet\n[More features to be confirmed]' },
    { slug: 'polo-hi-vis-orange', name: 'Short-Sleeve Hi-Vis Orange Polo', cat: 'tops', price: 2800, sizes: CLOTHING_SIZES,
      imgs: ['sitespec-polo-hi-vis-orange.png'],
      desc: 'Hi-vis orange polo engineered for harness work: zero-pinch comfort and full range of movement.',
      features: '4-way stretch fabric\nZero-pinch seams\nHi-vis orange\n[More features to be confirmed]' },
    { slug: 'long-sleeve-hi-vis-orange', name: 'Long-Sleeve Hi-Vis Top', cat: 'tops', price: null, sizes: CLOTHING_SIZES,
      imgs: ['sitespec-long-sleeve-hi-vis-orange.png'],
      desc: 'Long-sleeve hi-vis top engineered for harness work: zero-pinch comfort and full range of movement.',
      features: '4-way stretch fabric\nZero-pinch seams\nHi-vis orange\n[More features to be confirmed]' },
    { slug: 'quarter-zip-hi-vis-orange', name: 'Quarter-Zip Hi-Vis Top', cat: 'tops', price: null, sizes: CLOTHING_SIZES,
      imgs: ['sitespec-quarter-zip-hi-vis-orange.png'],
      desc: 'Quarter-zip hi-vis top engineered for harness work: zero-pinch comfort and full range of movement.',
      features: '4-way stretch fabric\nZero-pinch seams\nQuarter-zip neck\nHi-vis orange\n[More features to be confirmed]' },
    { slug: 'joggers-charcoal', name: 'Charcoal / Hi-Vis Accent Joggers', cat: 'joggers', price: 4500, sizes: CLOTHING_SIZES,
      group: 'joggers', colour: 'Charcoal / hi-vis accent', hex: '#2B3340',
      imgs: ['sitespec-joggers-charcoal-front.png'], desc: JOGGER_COPY, features: JOGGER_FEATURES },
    { slug: 'joggers-hi-vis-orange', name: 'Hi-Vis Orange Joggers', cat: 'joggers', price: null, sizes: CLOTHING_SIZES,
      group: 'joggers', colour: 'Full hi-vis orange', hex: '#F96A1B',
      imgs: ['sitespec-joggers-hi-vis-orange.png'], desc: JOGGER_COPY, features: JOGGER_FEATURES },
    { slug: 'bobble-hat-orange', name: 'Bobble Hat, Hi-Vis Orange', cat: 'hats', price: null, sizes: ONE,
      group: 'bobble-hat', colour: 'Hi-vis orange', hex: '#F96A1B',
      imgs: ['sitespec-bobble-hat-orange.png'],
      desc: 'A warm bobble hat in hi-vis orange for cold days on site.', features: '[Features to be confirmed]' },
    { slug: 'bobble-hat-charcoal', name: 'Bobble Hat, Charcoal', cat: 'hats', price: null, sizes: ONE,
      group: 'bobble-hat', colour: 'Charcoal', hex: '#2B3340',
      imgs: ['sitespec-bobble-hat-charcoal.png'],
      desc: 'A warm bobble hat in charcoal for cold days on site.', features: '[Features to be confirmed]' },
    { slug: 'winter-duo-kit', name: 'Winter Duo Kit (Skullcap + Neck Gaiter)', cat: 'liners', price: null, sizes: ONE,
      imgs: ['sitespec-skullcap-liner.png', 'sitespec-neck-gaiter.png'],
      desc: 'The SITESPEC skullcap liner and contoured anti-fog neck gaiter together. Helmet-compatible thermal essentials for cold-weather site work.',
      features: 'Skullcap liner + contoured anti-fog neck gaiter\nHelmet-compatible\nCold-weather site protection\n[Bundle price to be confirmed]' },
    { slug: 'oilskin-jacket', name: 'Oilskin Jacket, Hi-Vis Orange', cat: 'jackets', price: null, sizes: SIZES5,
      imgs: ['sitespec-oilskin-jacket.png'],
      desc: 'Heavy-duty oilskin weather protection engineered in Scotland for civil engineering and demanding site conditions.',
      features: 'Heavy-duty oilskin outer\nHi-vis orange with reflective bands\nZipped chest pocket\nAlso available in hi-vis yellow\nSizes S to XXL\n' + CERT_TBC },
    { slug: 'oilskin-bodywarmer', name: 'Oilskin Bodywarmer, Hi-Vis Orange', cat: 'jackets', price: null, sizes: SIZES5,
      imgs: ['sitespec-oilskin-bodywarmer.png'],
      desc: 'Heavy-duty oilskin bodywarmer engineered in Scotland: core warmth with full arm movement for demanding site conditions.',
      features: 'Heavy-duty oilskin outer\nFleece-lined collar\nHi-vis orange with reflective bands\nZipped chest pocket\nAlso available in hi-vis yellow\nSizes S to XXL\n' + CERT_TBC },
    { slug: 'hi-vis-vest', name: 'Hi-Vis Vest, Orange', cat: 'tops', price: null, sizes: SIZES5,
      imgs: ['sitespec-hi-vis-vest.png'],
      desc: 'Lightweight hi-vis vest engineered in Scotland for supervisors, engineers and site teams.',
      features: 'Full-length zip\nID card window\nZipped pockets\nHi-vis orange with reflective bands\nAlso available in hi-vis yellow\nSizes S to XXL\n' + CERT_TBC },
    { slug: 'executive-shirt', name: 'Executive Shirt, Hi-Vis Orange', cat: 'tops', price: null, sizes: SIZES5,
      imgs: ['sitespec-executive-shirt.png'],
      desc: 'Smart site tailoring in hi-vis: a button-down shirt engineered in Scotland for supervisors, engineers and site teams.',
      features: 'Button-down collar\nContrast cuffs\nHi-vis orange with reflective bands\nAlso available in hi-vis yellow\nSizes S to XXL\n' + CERT_TBC },
    { slug: 'black-half-zip-hoodie', name: 'Half-Zip Fleece Hoodie, Black Reflective', cat: 'reflective', price: null, sizes: SIZES5,
      imgs: ['sitespec-black-half-zip-hoodie.png'],
      desc: 'Stealth look, high-vis performance when the headlights hit. Heavyweight fleece warmth for builders, groundworkers, scaffolders and warehouse crews.',
      features: 'Heavyweight fleece\nSecure zipped chest pocket\nDeep hand pockets\n50mm segmented reflective bands\nSizes S to XXL\n' + REFL_NOTE },
    { slug: 'black-crew-top', name: 'Thumbhole Long-Sleeve Crew Top, Black Reflective', cat: 'reflective', price: null, sizes: SIZES5,
      imgs: ['sitespec-black-crew-top.png'],
      desc: 'A breathable crew top with reflective shoulder and sleeve stripes that flex as you graft.',
      features: 'Breathable, moisture-wicking side panels\nThumbholes\nReflective shoulder and sleeve stripes\nSizes S to XXL\n' + REFL_NOTE },
    { slug: 'black-cargo-joggers', name: 'Slim-Fit Zipped Cargo Joggers, Black Reflective', cat: 'reflective', price: null, sizes: SIZES5,
      imgs: ['sitespec-black-joggers.png'],
      desc: 'Slim-fit 4-way stretch cargo joggers with reflective ankle bands, for shifts where standard orange PPE is not required.',
      features: '4-way stretch fabric\nReinforced knees\nAll-zipped pockets so your phone and tools never fall out\nReflective ankle bands\nSizes S to XXL\n' + REFL_NOTE }
  ];
  // Order shown in the home-page carousel
  var FEATURED = ['oilskin-jacket', 'oilskin-bodywarmer', 'skullcap-liner', 'neck-gaiter', 'polo-hi-vis-orange', 'joggers-charcoal',
    'black-half-zip-hoodie', 'bobble-hat-orange'];

  // Load products from Supabase (edited in /admins). Falls back to the built-in list above if unreachable.
  function loadProducts() {
    if (!SUPABASE_ANON_KEY) return Promise.resolve();
    var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 2500) : null;
    return fetch(SUPABASE_URL + '/rest/v1/products?select=*&active=eq.true&order=sort.asc,name.asc', {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY }, signal: ctl ? ctl.signal : undefined
    }).then(function (r) { return r.ok ? r.json() : null; }).then(function (rows) {
      if (timer) clearTimeout(timer);
      if (!Array.isArray(rows) || !rows.length) return;
      PRODUCTS.length = 0;
      rows.forEach(function (d) {
        PRODUCTS.push({ slug: d.slug, name: d.name, cat: d.cat, price: d.price_pence, sizes: d.sizes && d.sizes.length ? d.sizes : ONE,
          group: d.group_key || undefined, colour: d.colour || undefined, hex: d.hex || undefined, imgs: d.images, desc: d.description || '',
          features: d.features || '', stock: d.stock || null });
      });
      var keep = FEATURED.filter(function (sl) { return find(sl); });
      PRODUCTS.forEach(function (p) { if (keep.length < 8 && keep.indexOf(p.slug) < 0) keep.push(p.slug); });
      FEATURED.length = 0; keep.forEach(function (sl) { FEATURED.push(sl); });
      cart = load();
    }).catch(function () { if (timer) clearTimeout(timer); });
  }

  // ---- Helpers ----
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(p) { return '£' + (p / 100).toFixed(2); }
  function find(slug) { return PRODUCTS.filter(function (p) { return p.slug === slug; })[0]; }
  function img(p, i) { return 'img/' + p.imgs[i || 0]; }
  function priceHTML(p) { return p.price == null ? '<div class="pp tbc">Price coming soon</div>' : '<div class="pp">' + money(p.price) + '</div>'; }
  function href(p) { return 'product.html?p=' + encodeURIComponent(p.slug); }

  // ---- Cart store ----
  var KEY = 'sitespec-cart-v1';
  function load() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(v) ? v.filter(function (l) { return find(l.slug) && l.qty > 0; }) : [];
    } catch (e) { return []; }
  }
  var cart = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} render(); }
  function count() { return cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function subtotal() { return cart.reduce(function (n, l) { return n + find(l.slug).price * l.qty; }, 0); }

  function addToCart(slug, size, qty) {
    var p = find(slug);
    if (!p || p.price == null) return false;
    size = size || p.sizes[0];
    var ex = cart.filter(function (l) { return l.slug === slug && l.size === size; })[0];
    if (ex) ex.qty = Math.min(99, ex.qty + qty); else cart.push({ slug: slug, size: size, qty: Math.min(99, qty) });
    save();
    return true;
  }
  function setQty(i, q) { if (q <= 0) cart.splice(i, 1); else cart[i].qty = Math.min(99, q); save(); }

  // Stripe hook: owner wires this to a server endpoint that creates a Checkout Session.
  // Items: name, price in pence, quantity, image (absolute URL), size, colour.
  function createStripeCheckoutSession(cartItems) {
    console.log('createStripeCheckoutSession items:', cartItems);
    alert('Checkout is not connected yet. Stripe keys still need to be added.');
  }
  window.createStripeCheckoutSession = createStripeCheckoutSession;
  function cartItems() {
    return cart.map(function (l) {
      var p = find(l.slug);
      return { name: p.name, price: p.price, quantity: l.qty, image: new URL(img(p), location.href).href, size: l.size, colour: p.colour || null };
    });
  }

  // ---- Header / footer / drawer ----
  var ICON = {
    search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    cart: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 4h2l2.4 11h10.2L20 7H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>',
    menu: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    lock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
  };

  function mountChrome() {
    var q = new URLSearchParams(location.search);
    var cur = location.pathname.split('/').pop();
    var activeCat = cur === 'shop.html' ? (q.get('cat') || 'all') : '';
    if (cur === 'product.html') { var pp = find(q.get('p')); activeCat = pp ? pp.cat : ''; }
    function nl(label, url, key) { return '<a href="' + url + '"' + (activeCat === key ? ' class="on"' : '') + '>' + label + '</a>'; }
    var qv = esc(q.get('q') || '');
    var searchForm = function (cls) {
      return '<form class="search ' + cls + '" role="search" action="shop.html"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><label class="sr" for="q-' + cls + '">Search</label><input id="q-' + cls + '" type="search" name="q" placeholder="Search gear" value="' + qv + '"></form>';
    };
    var h = $('#site-header');
    if (h) h.innerHTML =
      '<div class="topbar">Zero-pinch · 4-way stretch · RIS-3279-TOM &amp; EN ISO 20471 spec · Free UK delivery over £[threshold]</div>' +
      '<header class="hdr">' +
      '<button class="icon-btn menu-btn show" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mpanel">' + ICON.menu + '</button>' +
      '<a class="logo" href="index.html" aria-label="SITESPEC home"><img src="img/sitespec-logo-horizontal.png" alt="SITESPEC technical workwear, headliners and PPE liners"></a>' +
      '<nav class="nav" id="mainNav" aria-label="Main">' +
      nl('Shop all', 'shop.html', 'all') + '<a href="build.html" class="nav-build">Build your kit</a><a href="our-story.html">Our story</a><a href="team.html">Meet the team</a><a href="contact.html">Contact us</a><a href="faq.html">FAQ</a></nav>' +
      '<div class="hdr-actions">' + searchForm('d') +
      '<button class="icon-btn search-btn" id="searchBtn" aria-label="Search" aria-expanded="false">' + ICON.search + '</button>' +
      '<button class="icon-btn show" id="cartBtn" aria-label="Open cart">' + ICON.cart + '<span class="badge" id="badge" hidden>0</span></button>' +
      '</div></header><div class="mob-search" id="mobSearch">' + searchForm('m') + '</div>';

    var f = $('#site-footer');
    if (f) f.innerHTML =
      '<footer class="ftr"><div class="ftr-top"><div class="ftr-brand"><img src="img/sitespec-logo-horizontal-white-transparent.png" alt="SITESPEC"><p>Technical workwear, headliners &amp; PPE liners. Designed in Scotland.</p></div>' +
      '<div class="ftr-col"><b>Shop</b><a href="build.html">Build your kit</a><a href="shop.html?cat=liners">PPE liners</a><a href="shop.html?cat=jackets">Jackets &amp; bodywarmers</a><a href="shop.html?cat=tops">Hi-vis tops</a><a href="shop.html?cat=joggers">Joggers</a><a href="shop.html?cat=reflective">Black reflective</a><a href="shop.html?cat=hats">Hats</a></div>' +
      '<div class="ftr-col"><b>Help</b><a href="delivery.html">Delivery</a><a href="returns.html">Returns</a><a href="size-guide.html">Size guide</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div>' +
      '<div class="ftr-col"><b>SITESPEC</b><a href="our-story.html">Our story</a><a href="team.html">Meet the team</a><a href="newsletter.html">Newsletter</a><a href="https://www.instagram.com/sitespecworkwear/" target="_blank" rel="noopener">Instagram</a><a href="terms.html">Terms</a></div></div>' +
      '<div class="ftr-bot"><span>© SITESPEC. All rights reserved. &nbsp;<a href="privacy.html">Privacy</a> · <a href="cookies.html">Cookies</a> · <a href="terms.html">Terms</a></span><span>@sitespecworkwear</span></div></footer>';

    var mp = function (t, list) { return '<div class="mp-sec"><b>' + t + '</b>' + list.map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</div>'; };
    var catLinks = [['Shop all', 'shop.html']].concat(Object.keys(CATS).map(function (k) { return [CATS[k], 'shop.html?cat=' + k]; }));
    var d = document.createElement('div');
    d.innerHTML = '<div class="ov" id="mov"></div><aside class="mpanel" id="mpanel" aria-label="Menu" aria-hidden="true"><div class="mp-head"><img src="img/sitespec-logo-horizontal-white-transparent.png" alt="SITESPEC"><button class="mp-x" id="mpClose" aria-label="Close menu">&times;</button></div>' +
      '<div class="mp-feature"><a href="build.html"><i>New</i><b>Build your kit</b><small>Dress the mannequin, spin it, add it all to your cart</small></a></div>' +
      mp('Shop', catLinks) +
      mp('SITESPEC', [['Our story', 'our-story.html'], ['Meet the team', 'team.html'], ['Contact us', 'contact.html'], ['Newsletter', 'newsletter.html']]) +
      mp('Help', [['Delivery', 'delivery.html'], ['Returns', 'returns.html'], ['Size guide', 'size-guide.html'], ['FAQ', 'faq.html']]) +
      '<div class="mp-foot"><a href="https://www.instagram.com/sitespecworkwear/" target="_blank" rel="noopener">Instagram @sitespecworkwear</a><span><a href="privacy.html">Privacy</a> · <a href="cookies.html">Cookies</a> · <a href="terms.html">Terms</a></span></div></aside>' +
      '<div class="ov" id="ov"></div><aside class="drawer" id="drawer" role="dialog" aria-label="Shopping cart" aria-hidden="true"></aside><div class="toast" id="toast" role="status"></div>';
    while (d.firstChild) document.body.appendChild(d.firstChild);

    function setMenu(o) { $('#mpanel').classList.toggle('open', o); $('#mov').classList.toggle('open', o); $('#mpanel').setAttribute('aria-hidden', !o); $('#menuBtn').setAttribute('aria-expanded', o); }
    $('#menuBtn').onclick = function () { setMenu(!$('#mpanel').classList.contains('open')); };
    $('#mpClose').onclick = function () { setMenu(false); };
    $('#mov').onclick = function () { setMenu(false); };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    $('#searchBtn').onclick = function () { var o = $('#mobSearch').classList.toggle('open'); this.setAttribute('aria-expanded', o); if (o) $('#q-m').focus(); };
    $('#cartBtn').onclick = openCart;
    $('#ov').onclick = closeCart;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });
  }

  var lastFocus = null;
  function openCart() { lastFocus = document.activeElement; $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); $('#ov').classList.add('open'); var c = $('#closeCart'); if (c) c.focus(); }
  function closeCart() { var d = $('#drawer'); if (!d || !d.classList.contains('open')) return; d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); $('#ov').classList.remove('open'); if (lastFocus) lastFocus.focus(); }
  function toast(msg) { var t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('show'); }, 2200); }

  function render() {
    var n = count(), b = $('#badge'), btn = $('#cartBtn');
    if (b) { b.textContent = n; b.hidden = n === 0; }
    if (btn) btn.setAttribute('aria-label', 'Open cart, ' + n + (n === 1 ? ' item' : ' items'));
    var d = $('#drawer'); if (!d) return;
    var lines = cart.map(function (l, i) {
      var p = find(l.slug);
      return '<div class="line"><img src="' + img(p) + '" alt="' + esc(p.name) + '"><div class="li"><div class="nm">' + esc(p.name) + '</div>' +
        '<div class="mt">' + (p.colour ? esc(p.colour) + ' · ' : '') + esc(l.size === 'One size' ? 'One size' : 'Size ' + l.size) + '</div>' +
        '<button class="rm" data-rm="' + i + '">Remove</button>' +
        '<div class="lr"><div class="qty"><button aria-label="Decrease quantity" data-dec="' + i + '">−</button><span aria-live="polite">' + l.qty + '</span><button aria-label="Increase quantity" data-inc="' + i + '">+</button></div>' +
        '<span class="lp">' + money(p.price * l.qty) + '</span></div></div></div>';
    }).join('');
    var ship = '';
    if (FREE_DELIVERY_THRESHOLD_PENCE && n) {
      var left = FREE_DELIVERY_THRESHOLD_PENCE - subtotal(), pct = Math.min(100, Math.round(subtotal() / FREE_DELIVERY_THRESHOLD_PENCE * 100));
      ship = '<div class="d-ship">' + (left > 0 ? '<strong>' + money(left) + ' to go</strong> for free UK delivery' : '<strong>You\'ve unlocked free UK delivery</strong>') + '<i><b style="width:' + pct + '%"></b></i></div>';
    }
    d.innerHTML = '<div class="d-head"><h2>Your cart <span>(' + n + ')</span></h2><button class="icon-btn show" id="closeCart" aria-label="Close cart">' + ICON.close + '</button></div>' + ship +
      '<div class="d-body">' + (n ? lines : '<div class="d-empty">Your cart is empty.</div>') + '</div>' +
      '<div class="d-foot">' + (n ? '<div class="sub"><span>Subtotal</span><span>' + money(subtotal()) + '</span></div><small>Delivery and any discount codes are calculated at checkout.</small>' +
        '<button class="btn" id="checkoutBtn">' + ICON.lock + 'Checkout securely</button>' : '') +
      '<button class="cont" id="contBtn">Continue shopping</button></div>';
    $('#closeCart').onclick = closeCart; $('#contBtn').onclick = closeCart;
    var co = $('#checkoutBtn'); if (co) co.onclick = function () { createStripeCheckoutSession(cartItems()); };
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-rm],[data-inc],[data-dec],[data-add]'); if (!t) return;
    if (t.dataset.rm !== undefined) setQty(+t.dataset.rm, 0);
    else if (t.dataset.inc !== undefined) setQty(+t.dataset.inc, cart[+t.dataset.inc].qty + 1);
    else if (t.dataset.dec !== undefined) setQty(+t.dataset.dec, cart[+t.dataset.dec].qty - 1);
    else if (t.dataset.add !== undefined) {
      var p = find(t.dataset.add);
      if (p.sizes.length > 1) { location.href = href(p); return; } // needs a size choice
      if (addToCart(p.slug, p.sizes[0], 1)) { openCart(); }
    }
  });
  window.addEventListener('storage', function (e) { if (e.key === KEY) { cart = load(); render(); } });

  // Insert one row into a public insert-only table. Resolves {ok, duplicate, notConfigured}.
  function supabaseInsert(table, row) {
    if (!SUPABASE_ANON_KEY) return Promise.resolve({ ok: false, notConfigured: true });
    return fetch(SUPABASE_URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY, Prefer: 'return=minimal' },
      body: JSON.stringify(row)
    }).then(function (r) { return { ok: r.ok, duplicate: r.status === 409 }; })
      .catch(function () { return { ok: false }; });
  }

  // ---- Product card (used on home, shop, product page) ----
  function card(p) {
    var buy = p.price == null
      ? '<a class="btn btn-dark" href="' + href(p) + '">View details</a>'
      : (p.sizes.length > 1 ? '<a class="btn btn-dark" href="' + href(p) + '">Choose size</a>' : '<button class="btn btn-dark" data-add="' + p.slug + '">Add to cart</button>');
    return '<article class="pcard"><a class="pim" href="' + href(p) + '"><img src="' + img(p) + '" alt="' + esc(p.name) + '" loading="lazy"></a><div class="pb">' +
      '<div class="pc">' + esc(CATS[p.cat]) + '</div><h3><a href="' + href(p) + '">' + esc(p.name) + '</a></h3>' + priceHTML(p) + buy + '</div></article>';
  }

  window.SITESPEC = { PRODUCTS: PRODUCTS, FEATURED: FEATURED, CATS: CATS, find: find, card: card, href: href, img: img, money: money, esc: esc,
    addToCart: addToCart, openCart: openCart, toast: toast, supabaseInsert: supabaseInsert };

  function init() { mountChrome(); render(); loadProducts().then(function () { render(); document.dispatchEvent(new Event('sitespec:ready')); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
