/* ═══════════════════════════════════════════════════════════
   Midnight Ballerinas · Cart Utility
   Included on every page. Manages localStorage cart state
   and keeps the nav badge in sync.
   ═══════════════════════════════════════════════════════════ */

const MB_CART_KEY = 'mb_cart';

/* ── Catalog ─────────────────────────────────────────────── */
const MB_CATALOG = {
  retatrutide: {
    name: 'Stage Lean',
    spec: 'Retatrutide · 30mg · Lyophilised Powder',
    price: 248, cat: 'lean', dot: '#F72585',
  },
  ghkcu: {
    name: 'Velvet Skin',
    spec: 'GHK-Cu Glow Blend · 50mg · Lyophilised Powder',
    price: 95, cat: 'glow', dot: '#C77DFF',
  },
  mt2: {
    name: 'Skin Glow MT-2',
    spec: 'Melanotan II · 10mg · Nasal Spray Solution',
    price: 89, cat: 'glow', dot: '#C77DFF', pill: 'Nasal Spray',
  },
  encore: {
    name: 'Encore',
    spec: 'BPC-157 / TB-500 · 5mg / 5mg · Lyophilised Powder',
    price: 89, cat: 'recovery', dot: '#D4AF37', pill: 'Dual Compound',
  },
  glutathione: {
    name: 'Crystal Bright',
    spec: 'L-Glutathione · 1500mg · Lyophilised Powder',
    price: 78, cat: 'glow', dot: '#9b59b6',
  },
  pins: {
    name: 'Stage Pins',
    spec: 'Insulin Syringes 29g · 10-pack',
    price: 18, cat: 'supply', dot: '#6a6a70',
  },
  swabs: {
    name: 'Prep Swabs',
    spec: 'IPA Alcohol Pads · 50-pack',
    price: 14, cat: 'supply', dot: '#6a6a70',
  },
  draw: {
    name: 'Draw Set',
    spec: '21g Blunt Draw Needles · 5-pack',
    price: 16, cat: 'supply', dot: '#6a6a70',
  },
  sharps: {
    name: 'Stage Safe',
    spec: 'Travel Sharps Container · Matte Black',
    price: 22, cat: 'supply', dot: '#6a6a70',
  },
  pouch: {
    name: 'Night Kit',
    spec: 'Insulated Peptide Travel Pouch',
    price: 35, cat: 'supply', dot: '#6a6a70',
  },
};

/* ── Storage helpers ─────────────────────────────────────── */
function mbGetCart() {
  try { return JSON.parse(localStorage.getItem(MB_CART_KEY) || '{}'); }
  catch (e) { return {}; }
}

function mbSaveCart(cart) {
  localStorage.setItem(MB_CART_KEY, JSON.stringify(cart));
  mbUpdateBadge();
}

function mbAddItem(key, qty) {
  qty = qty || 1;
  if (!MB_CATALOG[key]) return;
  var cart = mbGetCart();
  cart[key] = (cart[key] || 0) + qty;
  mbSaveCart(cart);
}

function mbSetQty(key, qty) {
  var cart = mbGetCart();
  if (qty <= 0) { delete cart[key]; }
  else { cart[key] = qty; }
  mbSaveCart(cart);
}

function mbRemoveItem(key) {
  var cart = mbGetCart();
  delete cart[key];
  mbSaveCart(cart);
}

function mbClearCart() {
  localStorage.removeItem(MB_CART_KEY);
  mbUpdateBadge();
}

/* ── Totals ──────────────────────────────────────────────── */
function mbCartCount() {
  var cart = mbGetCart();
  return Object.values(cart).reduce(function(s, q) { return s + q; }, 0);
}

function mbCartTotal() {
  var cart = mbGetCart();
  var total = 0;
  Object.keys(cart).forEach(function(k) {
    if (MB_CATALOG[k]) total += MB_CATALOG[k].price * cart[k];
  });
  return total;
}

/* ── Nav badge ───────────────────────────────────────────── */
function mbUpdateBadge() {
  var count = mbCartCount();
  document.querySelectorAll('.nav-cart-badge').forEach(function(el) {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', mbUpdateBadge);
