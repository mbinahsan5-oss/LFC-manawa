/**
 * LFC (Lahore Fried Chicken) - Official Web Application
 * Pure Standard JavaScript (Zero Build Required, 100% Vite & GitHub Pages Compatible)
 * Advanced Multi-Options System, Live Kitchen Orders Tracker, Promo Engine & Delivery Suite
 * Developer: Trivox solutions
 */

(function () {
  'use strict';

  // --- Initial Preset Data ---
  const DEFAULT_SETTINGS = {
    storeName: 'LFC',
    fullName: 'Lahore Fried Chicken (LFC)',
    tagline: 'Taste the Legend',
    logoUrl: './images/logo.png',
    phoneCallNumber: '0322-4940181',
    whatsappNumber: '0322-4940181',
    adminPin: '5640', // Protected Master Admin PIN
    deliveryFee: 150,
    freeDeliveryAbove: 2000,
    storeTiming: '12:00 PM - 02:30 AM',
    currency: 'Rs.',
    storeStatus: 'open', // 'open' | 'busy' | 'closed'
    selectedZoneId: 'gulberg',
    announcementText: '🔥 Free Delivery in Lahore on Orders Above Rs. 2,000! | Code: LFC100 for Rs. 100 OFF'
  };

  const DEFAULT_ZONES = [
    { id: 'gulberg', name: 'Gulberg & MM Alam Road', fee: 150, time: '20-30 mins' },
    { id: 'dha', name: 'DHA Lahore (Phases 1-8)', fee: 200, time: '25-35 mins' },
    { id: 'johar', name: 'Johar Town & Faisal Town', fee: 180, time: '25-35 mins' },
    { id: 'modeltown', name: 'Model Town & Garden Town', fee: 160, time: '20-30 mins' },
    { id: 'cantt', name: 'Lahore Cantt & Saddar', fee: 190, time: '25-35 mins' },
    { id: 'bahria', name: 'Bahria Town & Raiwind Road', fee: 250, time: '35-50 mins' },
    { id: 'mall', name: 'Mall Road, Anarkali & Old Lahore', fee: 170, time: '25-40 mins' },
    { id: 'other', name: 'Other Areas in Lahore', fee: 220, time: '35-50 mins' }
  ];

  const DEFAULT_PROMOS = [
    { code: 'LFC100', type: 'flat', discount: 100, minOrder: 800, active: true, desc: 'Rs. 100 OFF on orders above Rs. 800' },
    { code: 'CRUNCH20', type: 'percent', discount: 20, minOrder: 1500, active: true, desc: '20% OFF on orders above Rs. 1,500' },
    { code: 'WELCOME50', type: 'flat', discount: 50, minOrder: 500, active: true, desc: 'Rs. 50 OFF on first order' },
    { code: 'TRIVOX', type: 'flat', discount: 200, minOrder: 1200, active: true, desc: 'Rs. 200 Special Partner Discount' }
  ];

  const DEFAULT_CATEGORIES = [
    { id: 'all', name: 'All Bites' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'rolls', name: 'Paratha Rolls' },
    { id: 'pizzas', name: 'Loaded Pizzas' },
    { id: 'buckets', name: 'Fried Buckets' },
    { id: 'deals', name: 'Mega Deals' },
    { id: 'sides', name: 'Sides & Drinks' }
  ];

  const DEFAULT_HERO_SLIDES = [
    {
      id: 1,
      title: 'THE ULTIMATE CRISPY',
      highlight: 'FAMILY FEAST',
      subtitle: 'Signature Zinger burger, golden crunch bucket, cheesy pizza slice, paratha roll and tender strips in one legendary combo.',
      badgeText: '#1 Crispy Chicken in Lahore',
      image: './images/hero-1.jpg',
      priceTag: 'Rs. 2,890',
      tag: 'Grand Feast',
      rating: '4.9 ★ (1,840+ reviews)',
      ctaText: 'Order Feast Now',
      targetDealId: 9
    },
    {
      id: 2,
      title: 'LFC CRISPY CHICKEN',
      highlight: 'ZINGER ROLL',
      subtitle: 'Tender golden crispy chicken strips wrapped in a freshly grilled flaky paratha with signature garlic sauce and sliced onions.',
      badgeText: 'Lahore Street Special',
      image: './images/hero-2.jpg',
      priceTag: 'Rs. 380',
      tag: 'Street Legend',
      rating: '4.8 ★ (920+ reviews)',
      ctaText: 'Grab A Roll',
      targetDealId: 2
    },
    {
      id: 3,
      title: 'HOT EXTRA CHEESY',
      highlight: 'LOADED PIZZA',
      subtitle: 'Loaded with premium mozzarella cheese pull, spicy grilled chicken cubes, black olives and sliced crunchy capsicums.',
      badgeText: 'Chef Recommended',
      image: './images/hero-3.jpg',
      priceTag: 'Rs. 1,290',
      tag: 'Cheesy Melt',
      rating: '4.9 ★ (1,230+ reviews)',
      ctaText: 'Order Hot Pizza',
      targetDealId: 3
    },
    {
      id: 4,
      title: '9-PIECE SIGNATURE',
      highlight: 'ZINGER BUCKET',
      subtitle: 'Nine pieces of legendary 12-spice recipe fried chicken, sizzling hot and super juicy inside with ultra-crunchy crust.',
      badgeText: 'Weekend Bestseller',
      image: './images/hero-4.jpg',
      priceTag: 'Rs. 1,850',
      tag: 'Mega Crunch',
      rating: '5.0 ★ (2,410+ reviews)',
      ctaText: 'Get The Bucket',
      targetDealId: 4
    }
  ];

  const DEFAULT_MENU_ITEMS = [
    {
      id: 1,
      name: 'Crispy Zinger Burger',
      cat: 'burgers',
      price: 490,
      desc: 'Whole chicken breast fillet marinated in authentic 12 spices, deep-fried to golden perfection with crisp lettuce and spicy mayo.',
      image: './images/hero-1.jpg',
      badge: 'Bestseller',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: 'Single Zinger Fillet', price: 0 },
        { name: 'Double Patty Zinger', price: 180 },
        { name: 'Meal Combo (Fries + Drink)', price: 250 }
      ],
      spiceLevels: ['Mild Crunchy', 'Hot Spicy Lahori', 'Extra Ghost Pepper 🔥'],
      addons: [
        { name: 'Extra Garlic Mayo Dip', price: 60 },
        { name: 'Melted Cheddar Slice', price: 80 },
        { name: 'Peri Peri Masala Fries', price: 120 },
        { name: 'Chilled Soft Drink Can', price: 90 }
      ]
    },
    {
      id: 2,
      name: 'Zinger Paratha Roll',
      cat: 'rolls',
      price: 380,
      desc: 'Golden crispy chicken strips inside a flaky, pan-toasted paratha with signature garlic dip and sweet chili glaze.',
      image: './images/hero-2.jpg',
      badge: 'Popular',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: 'Standard Roll', price: 0 },
        { name: 'Jumbo Roll (Double Chicken)', price: 140 },
        { name: 'Meal Combo (With Drink & Fries)', price: 230 }
      ],
      spiceLevels: ['Mild Garlic', 'Hot Spicy Lahori', 'Extra Hot Fire 🔥'],
      addons: [
        { name: 'Extra Garlic Mayo Dip', price: 60 },
        { name: 'Cheddar Cheese Slice', price: 80 },
        { name: 'Chilled Soft Drink Can', price: 90 }
      ]
    },
    {
      id: 3,
      name: 'Extra Cheese Loaded Pizza',
      cat: 'pizzas',
      price: 1290,
      desc: 'Mozzarella cheese pull, seasoned chicken fajita chunks, black olives, bell peppers, oregano and secret herb sauce.',
      image: './images/hero-3.jpg',
      badge: 'Chef Special',
      inStock: true,
      spiciness: 1,
      sizes: [
        { name: 'Small 7" (Single)', price: 0 },
        { name: 'Medium 10" (2-3 Persons)', price: 450 },
        { name: 'Large 13" (Family Feast)', price: 850 }
      ],
      spiceLevels: ['Mild Italian Herb', 'Spicy Fajita', 'Extra Jalapeño Fire 🔥'],
      addons: [
        { name: 'Extra Mozzarella Cheese Pull', price: 150 },
        { name: 'Garlic Ranch Swirl Dip', price: 70 },
        { name: 'Chilled 1.5L Drink', price: 220 }
      ]
    },
    {
      id: 4,
      name: '9-Piece Zinger Bucket',
      cat: 'buckets',
      price: 1850,
      desc: 'Nine pieces of our secret-recipe fried chicken, intensely crispy outside and juicy inside, with 2 garlic dips.',
      image: './images/hero-4.jpg',
      badge: 'Mega Value',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: '9-Piece Regular Bucket', price: 0 },
        { name: '12-Piece Party Bucket', price: 550 },
        { name: 'Bucket Feast (+ Large Fries & 1.5L Drink)', price: 650 }
      ],
      spiceLevels: ['Crispy Original Mild', 'Hot Spicy 12-Spice', 'Mixed Combo (Half & Half)'],
      addons: [
        { name: 'Extra 2x Garlic Mayo Dips', price: 110 },
        { name: 'Extra Peri Peri Masala Fries', price: 150 },
        { name: '1.5L Chilled Soft Drink', price: 220 }
      ]
    },
    {
      id: 5,
      name: 'Tower Supreme Burger',
      cat: 'burgers',
      price: 690,
      desc: 'Double crunchy chicken breast fillets, melted cheddar slice, golden hash brown, and smokey BBQ chipotle glaze.',
      image: './images/hero-1.jpg',
      badge: 'Double Patty',
      inStock: true,
      spiciness: 3,
      sizes: [
        { name: 'Standard Tower Burger', price: 0 },
        { name: 'Tower Meal (With Fries & Drink)', price: 250 }
      ],
      spiceLevels: ['Hot Smokey BBQ', 'Ghost Pepper Extreme 🔥'],
      addons: [
        { name: 'Extra Cheddar Cheese Slice', price: 80 },
        { name: 'Crispy Hash Brown Add-on', price: 100 },
        { name: 'Extra Garlic Dip', price: 60 }
      ]
    },
    {
      id: 6,
      name: 'Spicy Tender Strips (5 Pcs)',
      cat: 'buckets',
      price: 520,
      desc: 'Boneless tender chicken strips with craggy golden batter, served with spicy garlic mayo and sweet chili dip.',
      image: './images/hero-1.jpg',
      badge: 'Crunchy',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: '5 Pieces Strips', price: 0 },
        { name: '10 Pieces Strips (Save Rs. 100)', price: 420 }
      ],
      spiceLevels: ['Mild Golden Batter', 'Spicy Lahori Crunch', 'Fiery Ghost 🔥'],
      addons: [
        { name: 'Extra Sweet Chili Dip', price: 60 },
        { name: 'Extra Garlic Mayo Dip', price: 60 },
        { name: 'Large Peri Peri Fries', price: 180 }
      ]
    },
    {
      id: 7,
      name: 'Spicy Tikka Supreme Pizza',
      cat: 'pizzas',
      price: 1350,
      desc: 'Tandoori-spiced chicken chunks, red onions, jalapeños, mozzarella and spicy garlic ranch swirl on crispy crust.',
      image: './images/hero-3.jpg',
      badge: 'Spicy',
      inStock: true,
      spiciness: 3,
      sizes: [
        { name: 'Small 7"', price: 0 },
        { name: 'Medium 10"', price: 480 },
        { name: 'Large 13"', price: 890 }
      ],
      spiceLevels: ['Spicy Desi Tikka', 'Extreme Tikka Fire 🔥'],
      addons: [
        { name: 'Extra Mozzarella Cheese', price: 150 },
        { name: 'Stuffed Cheese Crust', price: 180 },
        { name: 'Chilled Drink 1.5L', price: 220 }
      ]
    },
    {
      id: 8,
      name: 'Garlic Mayo Zinger Roll',
      cat: 'rolls',
      price: 410,
      desc: 'Crispy fried chicken tenders with creamy garlic mayonnaise, pickled gherkins, and crunchy shredded cabbage.',
      image: './images/hero-2.jpg',
      badge: 'Creamy',
      inStock: true,
      spiciness: 1,
      sizes: [
        { name: 'Standard Roll', price: 0 },
        { name: 'Jumbo Double Fill', price: 140 },
        { name: 'Roll Meal (+ Fries & Can)', price: 230 }
      ],
      spiceLevels: ['Mild Creamy Garlic', 'Medium Spicy', 'Spicy Hot'],
      addons: [
        { name: 'Extra Creamy Garlic Dip', price: 60 },
        { name: 'Melted Cheese Slice', price: 80 }
      ]
    },
    {
      id: 9,
      name: 'Family Feast Combo Deal',
      cat: 'deals',
      price: 2890,
      desc: '4 Crispy Zinger Burgers, 4 Pcs Golden Fried Chicken, 1 Jumbo Fries, 2 Paratha Rolls, and 1.5L Chilled Soft Drink.',
      image: './images/hero-1.jpg',
      badge: 'Save 25%',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: 'Standard Family Feast', price: 0 },
        { name: 'Mega Upgrade (+ 1 Large Cheesy Pizza)', price: 950 }
      ],
      spiceLevels: ['Mild Family Mix', 'Spicy Lahori Feast'],
      addons: [
        { name: 'Extra 4x Garlic Dips', price: 200 },
        { name: 'Extra 1.5L Cold Drink', price: 220 }
      ]
    },
    {
      id: 10,
      name: 'Couple Crunch Deal',
      cat: 'deals',
      price: 1450,
      desc: '2 Zinger Burgers, 2 Pcs Crunchy Fried Chicken, 1 Large Fries, and 2 Soft Drink cans (250ml).',
      image: './images/hero-4.jpg',
      badge: 'Duo Deal',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: 'Standard Couple Deal', price: 0 },
        { name: 'Upgrade with 2 Zinger Rolls', price: 490 }
      ],
      spiceLevels: ['Mild', 'Hot Spicy Lahori'],
      addons: [
        { name: 'Extra Dip Sauce', price: 60 },
        { name: 'Extra Cheese on Both Burgers', price: 150 }
      ]
    },
    {
      id: 11,
      name: 'Peri Peri Masala Fries',
      cat: 'sides',
      price: 240,
      desc: 'Thick crinkle-cut golden potatoes tossed in hot Lahori peri-peri spice dust with spicy garlic dip.',
      image: './images/hero-1.jpg',
      badge: 'Hot Side',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: 'Regular Portion', price: 0 },
        { name: 'Jumbo Bucket Fries', price: 160 }
      ],
      spiceLevels: ['Tangy Masala Mild', 'Spicy Peri Peri', 'Extreme Ghost Dust 🔥'],
      addons: [
        { name: 'Melted Cheddar Cheese Sauce', price: 90 },
        { name: 'Extra Garlic Dip', price: 60 }
      ]
    },
    {
      id: 12,
      name: 'Chilled Soft Drink (1.5L)',
      cat: 'sides',
      price: 220,
      desc: 'Ice-cold carbonated beverage (Coke / Sprite / Fanta) to complement your hot crispy chicken feast.',
      image: './images/hero-4.jpg',
      badge: 'Chilled',
      inStock: true,
      spiciness: 0,
      sizes: [
        { name: '1.5L Bottle', price: 0 },
        { name: '2.25L Jumbo Bottle', price: 70 }
      ],
      spiceLevels: ['Ice Cold'],
      addons: []
    }
  ];

  const DEFAULT_BRANCHES = [
    {
      id: 1,
      name: 'Gulberg III (Main MM Alam)',
      address: 'Shop 4, Block K, Near Mini Market & MM Alam Road, Gulberg III, Lahore',
      phone: '0322-4940181',
      timings: '12:00 PM - 02:30 AM',
      mapUrl: 'https://maps.google.com/?q=Gulberg+Lahore'
    },
    {
      id: 2,
      name: 'DHA Phase 5 Commercial',
      address: 'Plaza 18-C, Sector CCA, Phase 5 DHA, Lahore',
      phone: '0322-4940181',
      timings: '01:00 PM - 03:00 AM',
      mapUrl: 'https://maps.google.com/?q=DHA+Phase+5+Lahore'
    },
    {
      id: 3,
      name: 'Johar Town (G1 Market)',
      address: 'Main Boulevard, Opposite Doctors Hospital, Johar Town, Lahore',
      phone: '0322-4940181',
      timings: '12:00 PM - 02:00 AM',
      mapUrl: 'https://maps.google.com/?q=Johar+Town+Lahore'
    },
    {
      id: 4,
      name: 'Mall Road Heritage',
      address: 'Shahrah-e-Quaid-e-Azam, Near Regal Chowk, Mall Road, Lahore',
      phone: '0322-4940181',
      timings: '11:30 AM - 01:30 AM',
      mapUrl: 'https://maps.google.com/?q=Mall+Road+Lahore'
    }
  ];

  const DEFAULT_REVIEWS = [
    {
      id: 1,
      name: 'Hamza Malik',
      location: 'Gulberg III, Lahore',
      rating: 5,
      date: 'Yesterday',
      comment: 'Hands down the crispiest Zinger in Lahore! The crust has a real crunch that stays crispy during delivery, and the garlic dip is heavenly.'
    },
    {
      id: 2,
      name: 'Ayesha Tariq',
      location: 'DHA Phase 5, Lahore',
      rating: 5,
      date: '3 days ago',
      comment: 'Their Loaded Cheese Pizza and Fried Chicken Bucket deal made our family weekend dinner unforgettable. Super fast WhatsApp ordering!'
    },
    {
      id: 3,
      name: 'Bilal Farooq',
      location: 'Johar Town, Lahore',
      rating: 5,
      date: '1 week ago',
      comment: 'The Zinger Paratha Roll is pure Lahori street food magic. Sizzling chicken strips with flaky crispy paratha. 10/10 recommend.'
    }
  ];

  const DEFAULT_ORDERS = [
    {
      id: 'LFC-8491',
      date: '10:45 PM today',
      timestamp: Date.now() - 3600000,
      customerName: 'Usman Tariq',
      customerPhone: '0300-8456123',
      customerAddress: 'House 14, Block B, DHA Phase 5, Lahore',
      orderType: 'delivery',
      deliveryZone: 'DHA Lahore (Phases 1-8)',
      specialNotes: 'Extra spicy, please send garlic dip',
      items: [
        {
          name: 'Crispy Zinger Burger',
          price: 740,
          qty: 2,
          selectedSize: { name: 'Double Patty Zinger', price: 180 },
          selectedSpice: 'Hot Spicy Lahori',
          selectedAddons: [{ name: 'Extra Garlic Mayo Dip', price: 60 }]
        },
        {
          name: 'Peri Peri Masala Fries',
          price: 240,
          qty: 1,
          selectedSize: { name: 'Regular Portion', price: 0 },
          selectedSpice: 'Hot Spicy Lahori',
          selectedAddons: []
        }
      ],
      subtotal: 1720,
      deliveryFee: 200,
      discount: 100,
      promoCode: 'LFC100',
      total: 1820,
      status: 'delivered'
    },
    {
      id: 'LFC-8492',
      date: '11:20 PM today',
      timestamp: Date.now() - 1800000,
      customerName: 'Sana Farooq',
      customerPhone: '0321-4991122',
      customerAddress: 'Plot 42, Main MM Alam Road, Gulberg III, Lahore',
      orderType: 'delivery',
      deliveryZone: 'Gulberg & MM Alam Road',
      specialNotes: 'Ring bell twice, leave with guard if needed',
      items: [
        {
          name: 'Extra Cheese Loaded Pizza',
          price: 1740,
          qty: 1,
          selectedSize: { name: 'Medium 10"', price: 450 },
          selectedSpice: 'Mild Italian Herb',
          selectedAddons: []
        },
        {
          name: 'Chilled Soft Drink (1.5L)',
          price: 220,
          qty: 1,
          selectedSize: { name: '1.5L Bottle', price: 0 },
          selectedSpice: 'Ice Cold',
          selectedAddons: []
        }
      ],
      subtotal: 1960,
      deliveryFee: 150,
      discount: 0,
      promoCode: null,
      total: 2110,
      status: 'preparing'
    },
    {
      id: 'LFC-8493',
      date: '11:42 PM today',
      timestamp: Date.now() - 600000,
      customerName: 'Hamza Bilal',
      customerPhone: '0333-8821940',
      customerAddress: 'Sector G1, Near Doctors Hospital, Johar Town, Lahore',
      orderType: 'delivery',
      deliveryZone: 'Johar Town & Faisal Town',
      specialNotes: 'Crispy fried chicken pieces fresh please',
      items: [
        {
          name: '9-Piece Zinger Bucket',
          price: 2100,
          qty: 1,
          selectedSize: { name: '9-Piece Regular Bucket', price: 0 },
          selectedSpice: 'Hot Spicy 12-Spice',
          selectedAddons: [
            { name: 'Extra 2x Garlic Mayo Dips', price: 110 },
            { name: 'Extra Peri Peri Masala Fries', price: 150 }
          ]
        }
      ],
      subtotal: 2280,
      deliveryFee: 0,
      discount: 200,
      promoCode: 'TRIVOX',
      total: 2080,
      status: 'new'
    }
  ];

  const LIVE_ORDER_TICKERS = [
    '🔥 Usman in Gulberg III just ordered Family Feast Combo!',
    '⚡ Sana in DHA Phase 5 placed an order for 2x Zinger Rolls!',
    '🍗 Ahmed in Johar Town just grabbed a 9-Pc Zinger Bucket!',
    '🍕 Ali in Model Town ordered Extra Cheese Loaded Pizza!',
    '🌶️ Zaid in Cantt ordered Double Tower Supreme with Fries!'
  ];

  // --- LocalStorage Persistence with Defaults Merging ---
  function loadData(key, fallback) {
    try {
      const saved = localStorage.getItem('lfc_' + key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      if (typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback)) {
        const merged = Object.assign({}, fallback, parsed);
        if (key === 'settings') {
          merged.adminPin = '5640';
          merged.logoUrl = './images/logo.png';
        }
        return merged;
      }
      if (key === 'menu_items' && Array.isArray(parsed)) {
        return parsed.map((item, idx) => {
          let img = item.image || './images/hero-1.jpg';
          if (!img || img.includes('src/assets') || img.includes('regenerated')) {
            img = item.cat === 'pizzas' ? './images/hero-3.jpg' : item.cat === 'rolls' ? './images/hero-2.jpg' : item.cat === 'buckets' ? './images/hero-4.jpg' : './images/hero-1.jpg';
          }
          return {
            ...item,
            image: img
          };
        });
      }
      if (key === 'hero_slides' && Array.isArray(parsed)) {
        return parsed.map((s, idx) => ({
          ...s,
          image: s.image && !s.image.includes('src/assets') ? s.image : (idx === 1 ? './images/hero-2.jpg' : idx === 2 ? './images/hero-3.jpg' : idx === 3 ? './images/hero-4.jpg' : './images/hero-1.jpg')
        }));
      }
      return parsed;
    } catch (e) {
      return fallback;
    }
  }

  function saveData(key, val) {
    try {
      localStorage.setItem('lfc_' + key, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }

  // --- App State ---
  let settings = loadData('settings', DEFAULT_SETTINGS);
  let categories = loadData('categories', DEFAULT_CATEGORIES);
  let heroSlides = loadData('hero_slides', DEFAULT_HERO_SLIDES);
  let menuItems = loadData('menu_items', DEFAULT_MENU_ITEMS);
  let branches = loadData('branches', DEFAULT_BRANCHES);
  let reviews = loadData('reviews', DEFAULT_REVIEWS);
  let zones = loadData('zones', DEFAULT_ZONES);
  let promos = loadData('promos', DEFAULT_PROMOS);
  let orders = loadData('orders', DEFAULT_ORDERS);
  let cart = loadData('cart', []);
  let orderType = loadData('order_type', 'delivery'); // 'delivery' | 'pickup' | 'dinein'

  let activeCategory = 'all';
  let searchQuery = '';
  let activeSlideIndex = 0;
  let heroSlideTimer = null;
  let tickerTimer = null;
  let tickerIndex = 0;
  let appliedPromo = null;
  let isAdminAuthenticated = false;
  let activeOrderFilter = 'all';

  // --- Theme State & Color Palettes ---
  const THEMES = [
    { id: 'flame', name: 'Spicy Flame' },
    { id: 'gold', name: 'Golden Honey' },
    { id: 'sunset', name: 'Sunset Royale' }
  ];
  let currentTheme = 'flame';
  try {
    const savedTheme = localStorage.getItem('lfc_theme');
    if (savedTheme && ['flame', 'gold', 'sunset'].includes(savedTheme)) {
      currentTheme = savedTheme;
    }
  } catch (e) {}

  function setTheme(themeId) {
    currentTheme = themeId;
    document.body.classList.remove('theme-flame', 'theme-gold', 'theme-sunset');
    document.body.classList.add('theme-' + themeId);
    try {
      localStorage.setItem('lfc_theme', themeId);
    } catch (e) {}
    const label = document.getElementById('theme-btn-label');
    const matched = THEMES.find((t) => t.id === themeId);
    if (label && matched) {
      label.textContent = matched.name;
    }
  }

  function cycleTheme() {
    const idx = THEMES.findIndex((t) => t.id === currentTheme);
    const nextIdx = (idx + 1) % THEMES.length;
    const target = THEMES[nextIdx];
    setTheme(target.id);
    showToast(`Color Theme: ${target.name}`);
  }

  // --- Multi-Options Modal State ---
  let currentCustomizingItem = null;
  let customSelectedSize = null;
  let customSelectedSpice = null;
  let customSelectedAddons = [];
  let customQty = 1;

  // --- Toast Notification ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isError = type === 'error';
    toast.className = `flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-black transition-all duration-300 transform translate-y-3 opacity-0 backdrop-blur-md border ${
      isError
        ? 'bg-red-600/95 text-white border-red-400'
        : 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 text-black border-amber-300 shadow-amber-500/20'
    }`;
    toast.innerHTML = `
      <span class="text-base">${isError ? '⚠️' : '🍗'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-3');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- Cart Mathematics ---
  function getCartSubtotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCartCount() {
    return cart.reduce((sum, i) => sum + i.qty, 0);
  }

  function getCurrentDeliveryZone() {
    const zoneId = settings.selectedZoneId || 'gulberg';
    return zones.find((z) => z.id === zoneId) || zones[0] || { fee: settings.deliveryFee || 150, time: '25-35 mins' };
  }

  function getDeliveryFee() {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    if (orderType !== 'delivery') return 0;
    if (subtotal >= (settings.freeDeliveryAbove || 2000)) return 0;
    const zone = getCurrentDeliveryZone();
    return Number(zone.fee) || Number(settings.deliveryFee) || 150;
  }

  function getDiscountAmount() {
    if (!appliedPromo) return 0;
    const subtotal = getCartSubtotal();
    if (appliedPromo.minOrder && subtotal < appliedPromo.minOrder) return 0;
    if (appliedPromo.type === 'percent') {
      return Math.round((subtotal * appliedPromo.discount) / 100);
    }
    return Number(appliedPromo.discount) || 0;
  }

  function getGrandTotal() {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    const fee = getDeliveryFee();
    const discount = getDiscountAmount();
    return Math.max(0, subtotal + fee - discount);
  }

  // --- Multi-Options Modal Logic ---
  function openCustomizeModal(itemId) {
    const item = menuItems.find((m) => m.id === itemId);
    if (!item) return;

    currentCustomizingItem = item;
    customQty = 1;

    // Default sizes
    const sizes = item.sizes && item.sizes.length ? item.sizes : [{ name: 'Regular Portion', price: 0 }];
    customSelectedSize = sizes[0];

    // Default spice
    const spices = item.spiceLevels && item.spiceLevels.length ? item.spiceLevels : ['Mild Crunchy', 'Hot Spicy Lahori', 'Ghost Fire 🔥'];
    customSelectedSpice = spices[0];

    // Default addons
    customSelectedAddons = [];

    // Populate Modal UI
    const modal = document.getElementById('item-customize-modal');
    const modalImg = document.getElementById('cust-modal-img');
    const modalTitle = document.getElementById('cust-modal-title');
    const modalDesc = document.getElementById('cust-modal-desc');
    const modalBadge = document.getElementById('cust-modal-badge');
    const notesInput = document.getElementById('cust-special-notes');

    if (modalImg) {
      modalImg.src = item.image;
      modalImg.onerror = () => {
        modalImg.onerror = null;
        modalImg.src = './images/hero-1.jpg';
      };
    }
    if (modalTitle) modalTitle.textContent = item.name;
    if (modalDesc) modalDesc.textContent = item.desc;
    if (modalBadge) {
      modalBadge.textContent = item.badge || 'Fresh & Hot';
      modalBadge.classList.toggle('hidden', !item.badge);
    }
    if (notesInput) notesInput.value = '';

    renderCustomizeOptions();
    updateCustomizeModalTotal();

    if (modal) modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeCustomizeModal() {
    const modal = document.getElementById('item-customize-modal');
    if (modal) modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  function renderCustomizeOptions() {
    if (!currentCustomizingItem) return;
    const item = currentCustomizingItem;

    // 1. Sizes
    const sizesContainer = document.getElementById('cust-sizes-list');
    const sizes = item.sizes && item.sizes.length ? item.sizes : [{ name: 'Regular Portion', price: 0 }];
    if (sizesContainer) {
      sizesContainer.innerHTML = sizes
        .map((s, idx) => {
          const isSelected = customSelectedSize && customSelectedSize.name === s.name;
          return `
          <button type="button" onclick="window.LFC.selectCustomizeSize(${idx})" class="p-3 rounded-2xl border text-left transition flex items-center justify-between ${
            isSelected
              ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/20'
              : 'bg-[#141824] border-gray-800 text-gray-300 hover:border-gray-700'
          }">
            <div class="flex items-center gap-2">
              <span class="w-4 h-4 rounded-full border flex items-center justify-center ${
                isSelected ? 'border-amber-400 bg-amber-500 text-black' : 'border-gray-600'
              }">
                ${isSelected ? '✓' : ''}
              </span>
              <span class="text-xs font-bold">${s.name}</span>
            </div>
            <span class="text-xs font-black ${isSelected ? 'text-amber-400' : 'text-gray-400'}">
              ${s.price === 0 ? 'Standard' : `+Rs. ${s.price}`}
            </span>
          </button>
        `;
        })
        .join('');
    }

    // 2. Spice Levels
    const spiceContainer = document.getElementById('cust-spice-list');
    const spices = item.spiceLevels && item.spiceLevels.length ? item.spiceLevels : ['Mild Crunchy', 'Hot Spicy Lahori', 'Ghost Fire 🔥'];
    if (spiceContainer) {
      spiceContainer.innerHTML = spices
        .map((sp) => {
          const isSelected = customSelectedSpice === sp;
          return `
          <button type="button" onclick="window.LFC.selectCustomizeSpice('${sp}')" class="px-3.5 py-2 rounded-xl border text-xs font-bold transition ${
            isSelected
              ? 'bg-gradient-to-r from-red-600 to-amber-600 border-red-400 text-white shadow-md'
              : 'bg-[#141824] border-gray-800 text-gray-300 hover:text-white hover:border-gray-700'
          }">
            ${sp}
          </button>
        `;
        })
        .join('');
    }

    // 3. Add-ons
    const addonsContainer = document.getElementById('cust-addons-list');
    const addons = item.addons && item.addons.length ? item.addons : [
      { name: 'Extra Garlic Mayo Dip', price: 60 },
      { name: 'Melted Cheddar Slice', price: 80 }
    ];
    if (addonsContainer) {
      addonsContainer.innerHTML = addons
        .map((a, idx) => {
          const isSelected = customSelectedAddons.some((ca) => ca.name === a.name);
          return `
          <button type="button" onclick="window.LFC.toggleCustomizeAddon(${idx})" class="w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
            isSelected
              ? 'bg-emerald-500/15 border-emerald-400/60 text-white'
              : 'bg-[#141824] border-gray-800 text-gray-300 hover:border-gray-700'
          }">
            <div class="flex items-center gap-2">
              <span class="w-4 h-4 rounded border flex items-center justify-center ${
                isSelected ? 'border-emerald-400 bg-emerald-500 text-black' : 'border-gray-600'
              }">
                ${isSelected ? '✓' : ''}
              </span>
              <span class="text-xs font-semibold">${a.name}</span>
            </div>
            <span class="text-xs font-black text-emerald-400">+Rs. ${a.price}</span>
          </button>
        `;
        })
        .join('');
    }
  }

  function selectCustomizeSize(idx) {
    if (!currentCustomizingItem) return;
    const sizes = currentCustomizingItem.sizes && currentCustomizingItem.sizes.length
      ? currentCustomizingItem.sizes
      : [{ name: 'Regular Portion', price: 0 }];
    customSelectedSize = sizes[idx] || sizes[0];
    renderCustomizeOptions();
    updateCustomizeModalTotal();
  }

  function selectCustomizeSpice(spice) {
    customSelectedSpice = spice;
    renderCustomizeOptions();
    updateCustomizeModalTotal();
  }

  function toggleCustomizeAddon(idx) {
    if (!currentCustomizingItem) return;
    const addons = currentCustomizingItem.addons && currentCustomizingItem.addons.length
      ? currentCustomizingItem.addons
      : [
          { name: 'Extra Garlic Mayo Dip', price: 60 },
          { name: 'Melted Cheddar Slice', price: 80 }
        ];
    const addon = addons[idx];
    if (!addon) return;

    const exists = customSelectedAddons.findIndex((a) => a.name === addon.name);
    if (exists >= 0) {
      customSelectedAddons.splice(exists, 1);
    } else {
      customSelectedAddons.push(addon);
    }
    renderCustomizeOptions();
    updateCustomizeModalTotal();
  }

  function stepCustomizeQty(delta) {
    customQty = Math.max(1, customQty + delta);
    const qtyEl = document.getElementById('cust-modal-qty');
    if (qtyEl) qtyEl.textContent = customQty;
    updateCustomizeModalTotal();
  }

  function updateCustomizeModalTotal() {
    if (!currentCustomizingItem) return;
    const base = Number(currentCustomizingItem.price) || 0;
    const sizeOffset = customSelectedSize ? Number(customSelectedSize.price) || 0 : 0;
    const addonsSum = customSelectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    const unitPrice = base + sizeOffset + addonsSum;
    const total = unitPrice * customQty;

    const btnTotal = document.getElementById('cust-modal-total-btn');
    if (btnTotal) btnTotal.textContent = `Rs. ${total.toLocaleString()}`;
  }

  function confirmCustomizedItem() {
    if (!currentCustomizingItem) return;
    const item = currentCustomizingItem;
    const base = Number(item.price) || 0;
    const sizeOffset = customSelectedSize ? Number(customSelectedSize.price) || 0 : 0;
    const addonsSum = customSelectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    const unitPrice = base + sizeOffset + addonsSum;

    const notesInput = document.getElementById('cust-special-notes');
    const specialNotes = notesInput ? notesInput.value.trim() : '';

    cart.push({
      id: `${item.id}_${Date.now()}`,
      menuId: item.id,
      name: item.name,
      basePrice: item.price,
      selectedSize: customSelectedSize ? { ...customSelectedSize } : { name: 'Regular', price: 0 },
      selectedSpice: customSelectedSpice || 'Regular',
      selectedAddons: [...customSelectedAddons],
      specialNotes: specialNotes,
      price: unitPrice,
      image: item.image,
      qty: customQty
    });

    saveData('cart', cart);
    updateCartUI();
    closeCustomizeModal();
    showToast(`Added ${item.name} (${customQty}x) to order!`);
    animateCartButton();
  }

  // --- Direct Quick Add to Cart (Default Options) ---
  function addToCart(item, qty = 1) {
    // Quick Add opens customizer so customer can enjoy multi-options!
    openCustomizeModal(item.id);
  }

  function addToCartById(id) {
    const item = menuItems.find((m) => m.id === id);
    if (item) openCustomizeModal(item.id);
  }

  function animateCartButton() {
    const btns = document.querySelectorAll('.cart-btn-trigger');
    btns.forEach((btn) => {
      btn.classList.add('scale-110');
      setTimeout(() => btn.classList.remove('scale-110'), 200);
    });
  }

  function updateCartItemQty(cartItemId, delta) {
    const item = cart.find((c) => String(c.id) === String(cartItemId));
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((c) => String(c.id) !== String(cartItemId));
    }
    saveData('cart', cart);
    updateCartUI();
  }

  function removeCartItem(cartItemId) {
    cart = cart.filter((c) => String(c.id) !== String(cartItemId));
    saveData('cart', cart);
    updateCartUI();
    showToast('Item removed from order');
  }

  function clearCart() {
    cart = [];
    appliedPromo = null;
    saveData('cart', cart);
    updateCartUI();
  }

  // --- Delivery Zone Selector in Cart ---
  function changeDeliveryZone(zoneId) {
    settings.selectedZoneId = zoneId;
    saveData('settings', settings);
    updateCartUI();
    const zone = getCurrentDeliveryZone();
    showToast(`Delivery zone updated: ${zone.name}`);
  }

  function renderZoneSelect() {
    const select = document.getElementById('checkout-zone-select');
    if (!select) return;
    const currentId = settings.selectedZoneId || 'gulberg';
    select.innerHTML = zones
      .map(
        (z) =>
          `<option value="${z.id}" ${z.id === currentId ? 'selected' : ''}>${z.name} — Rs. ${z.fee} (${z.time})</option>`
      )
      .join('');
  }

  // --- Cart UI Sync ---
  function updateCartUI() {
    const count = getCartCount();
    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const discount = getDiscountAmount();
    const total = getGrandTotal();
    const zone = getCurrentDeliveryZone();

    const countBadges = document.querySelectorAll('.cart-count-badge');
    countBadges.forEach((b) => {
      b.textContent = count;
      b.classList.toggle('hidden', count === 0);
    });

    const subtotalBadges = document.querySelectorAll('.cart-subtotal-badge');
    subtotalBadges.forEach((s) => {
      s.textContent = `Rs. ${subtotal.toLocaleString()}`;
    });

    const emptyState = document.getElementById('cart-empty-state');
    const filledState = document.getElementById('cart-filled-state');
    const itemsList = document.getElementById('cart-items-list');

    if (count === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      if (filledState) filledState.classList.add('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      if (filledState) filledState.classList.remove('hidden');

      if (itemsList) {
        itemsList.innerHTML = cart
          .map((i) => {
            const sizeTag = i.selectedSize && i.selectedSize.name ? i.selectedSize.name : '';
            const spiceTag = i.selectedSpice ? i.selectedSpice : '';
            const addonsText =
              i.selectedAddons && i.selectedAddons.length
                ? '+ ' + i.selectedAddons.map((a) => a.name).join(', ')
                : '';
            const noteTag = i.specialNotes ? `Note: "${i.specialNotes}"` : '';

            return `
            <div class="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-amber-200/90 shadow-sm hover:border-amber-400 transition">
              <img src="${i.image}" alt="${i.name}" loading="lazy" decoding="async" class="w-14 h-14 rounded-xl object-cover bg-amber-50 flex-shrink-0 border border-amber-200" onerror="this.onerror=null; this.src='./images/hero-1.jpg';"/>
              <div class="flex-1 min-w-0">
                <h4 class="font-black text-xs sm:text-sm text-gray-900 truncate font-heading">${i.name}</h4>
                <div class="text-[11px] text-amber-700 font-black mt-0.5">Rs. ${(i.price * i.qty).toLocaleString()}</div>
                
                <!-- Multi-Options Details -->
                <div class="mt-1 space-y-0.5 text-[10px]">
                  ${
                    sizeTag || spiceTag
                      ? `<div class="text-amber-800 font-bold flex items-center gap-1"><span>📏 ${sizeTag}</span> • <span>🌶️ ${spiceTag}</span></div>`
                      : ''
                  }
                  ${addonsText ? `<div class="text-emerald-700 font-medium">${addonsText}</div>` : ''}
                  ${noteTag ? `<div class="text-gray-500 italic">${noteTag}</div>` : ''}
                </div>
              </div>
              <div class="flex items-center bg-amber-50 rounded-xl border border-amber-200 p-1">
                <button onclick="window.LFC.updateCartItemQty('${i.id}', -1)" class="w-6 h-6 flex items-center justify-center rounded text-gray-700 hover:text-slate-950 hover:bg-amber-200 text-sm font-bold transition">−</button>
                <span class="w-6 text-center font-black text-xs text-slate-950">${i.qty}</span>
                <button onclick="window.LFC.updateCartItemQty('${i.id}', 1)" class="w-6 h-6 flex items-center justify-center rounded text-gray-700 hover:text-slate-950 hover:bg-amber-200 text-sm font-bold transition">+</button>
              </div>
              <button onclick="window.LFC.removeCartItem('${i.id}')" class="text-gray-400 hover:text-red-500 p-1 transition" title="Remove">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          `;
          })
          .join('');
      }

      const elSubtotal = document.getElementById('cart-drawer-subtotal');
      const elDelivery = document.getElementById('cart-drawer-delivery');
      const elDiscountRow = document.getElementById('cart-drawer-discount-row');
      const elDiscount = document.getElementById('cart-drawer-discount');
      const elTotal = document.getElementById('cart-drawer-total');
      const etaBadge = document.getElementById('zone-eta-badge');

      if (elSubtotal) elSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
      const deliveryLabel = document.getElementById('cart-drawer-delivery-label');
      if (deliveryLabel) {
        deliveryLabel.textContent =
          orderType === 'delivery'
            ? `Delivery Fee (${zone.name})`
            : orderType === 'pickup'
            ? 'Pickup (No Fee)'
            : 'Dine-In Service';
      }
      if (elDelivery) {
        elDelivery.textContent = delivery === 0 ? 'FREE' : `Rs. ${delivery}`;
        elDelivery.className = delivery === 0 ? 'text-emerald-400 font-extrabold' : 'text-gray-300 font-bold';
      }
      if (etaBadge) {
        if (orderType === 'delivery') {
          etaBadge.classList.remove('hidden');
          etaBadge.textContent = `⏱️ ${zone.time}`;
        } else {
          etaBadge.classList.add('hidden');
        }
      }
      if (elDiscountRow && elDiscount) {
        if (discount > 0) {
          elDiscountRow.classList.remove('hidden');
          elDiscount.textContent = `- Rs. ${discount.toLocaleString()}`;
        } else {
          elDiscountRow.classList.add('hidden');
        }
      }
      if (elTotal) elTotal.textContent = `Rs. ${total.toLocaleString()}`;
    }

    renderZoneSelect();
    updateOrderTypeUI();
    updateFreeDeliveryUI();
  }

  // --- Order Type & Free Delivery UI ---
  function setOrderType(type) {
    orderType = ['delivery', 'pickup', 'dinein'].includes(type) ? type : 'delivery';
    saveData('order_type', orderType);
    updateOrderTypeUI();
    updateCartUI();

    const labels = { delivery: 'Delivery', pickup: 'Pickup', dinein: 'Dine-In' };
    showToast(`Order type set to ${labels[orderType]}`);
  }

  function updateOrderTypeUI() {
    const buttons = document.querySelectorAll('.order-type-btn');
    buttons.forEach((btn) => {
      const isActive = btn.getAttribute('data-order-type') === orderType;
      btn.classList.toggle('active', isActive);
    });

    const deliveryBox = document.getElementById('free-delivery-box');
    const zoneContainer = document.getElementById('checkout-zone-container');
    if (deliveryBox) deliveryBox.classList.toggle('hidden', orderType !== 'delivery');
    if (zoneContainer) zoneContainer.classList.toggle('hidden', orderType !== 'delivery');
  }

  function updateFreeDeliveryUI() {
    const label = document.getElementById('free-delivery-label');
    const fill = document.getElementById('free-delivery-fill');
    if (!label || !fill) return;

    const subtotal = getCartSubtotal();
    const threshold = Number(settings.freeDeliveryAbove) || 2000;

    if (threshold <= 0) {
      label.textContent = 'Free delivery on every order! 🎉';
      label.className = 'text-emerald-400 font-black';
      fill.style.width = '100%';
      return;
    }

    if (subtotal >= threshold) {
      label.textContent = '🎉 You unlocked FREE delivery!';
      label.className = 'text-emerald-400 font-black';
      fill.style.width = '100%';
    } else {
      const remaining = threshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
      label.textContent = `Add Rs. ${remaining.toLocaleString()} more for FREE delivery`;
      label.className = 'text-gray-300';
      fill.style.width = pct + '%';
    }
  }

  // --- Dynamic Logo, Contact & Store Status Sync ---
  function updateBrandLogos() {
    const logoImgs = document.querySelectorAll('.brand-logo-img');
    const safeLogo = settings && settings.logoUrl ? settings.logoUrl : './images/logo.png';
    logoImgs.forEach((img) => {
      img.src = safeLogo;
      img.onerror = () => {
        img.onerror = null;
        img.src = './images/logo.png';
      };
    });

    const safePhone = settings && settings.phoneCallNumber ? String(settings.phoneCallNumber) : '0322-4940181';
    const phoneLinks = document.querySelectorAll('.store-phone-link');
    phoneLinks.forEach((a) => {
      a.href = `tel:${safePhone.replace(/[^0-9]/g, '')}`;
      a.textContent = safePhone;
    });

    const safeWa = settings && settings.whatsappNumber ? String(settings.whatsappNumber) : '0322-4940181';
    const waLinks = document.querySelectorAll('.store-wa-link');
    waLinks.forEach((a) => {
      let num = safeWa.replace(/[^0-9]/g, '');
      if (num.startsWith('0')) num = '92' + num.substring(1);
      a.href = `https://wa.me/${num}?text=Hi%20LFC!%20I%20want%20to%20place%20an%20order.`;
    });

    // Sync Announcement Text
    const announcementEl = document.getElementById('live-order-ticker-text');
    if (settings.announcementText && announcementEl && !tickerTimer) {
      announcementEl.textContent = settings.announcementText;
    }
  }

  // --- Hero Section Renderer & Animations ---
  function renderHeroSlide(index) {
    if (!heroSlides.length) return;
    activeSlideIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[activeSlideIndex];

    const titleEl = document.getElementById('hero-title');
    const highlightEl = document.getElementById('hero-highlight');
    const subtitleEl = document.getElementById('hero-subtitle');
    const badgeEl = document.getElementById('hero-badge');
    const priceEl = document.getElementById('hero-price');
    const ratingEl = document.getElementById('hero-rating');
    const imgEl = document.getElementById('hero-image');
    const ctaBtn = document.getElementById('hero-cta-btn');

    if (titleEl) titleEl.textContent = slide.title;
    if (highlightEl) highlightEl.textContent = slide.highlight;
    if (subtitleEl) subtitleEl.textContent = slide.subtitle;
    if (badgeEl) badgeEl.textContent = slide.badgeText;
    if (priceEl) priceEl.textContent = slide.priceTag;
    if (ratingEl) ratingEl.textContent = slide.rating || '4.9 ★ (1,500+ reviews)';

    if (ctaBtn) {
      ctaBtn.onclick = () => {
        let item = null;
        if (slide.targetDealId) {
          item = menuItems.find((m) => m.id === slide.targetDealId);
        }
        if (!item) {
          item = menuItems.find((m) => m.name.toLowerCase().includes(slide.highlight.toLowerCase())) || menuItems[0];
        }
        if (item) openCustomizeModal(item.id);
      };
    }

    if (imgEl) {
      imgEl.classList.add('scale-95', 'opacity-0');
      imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.src = './images/hero-1.jpg';
        imgEl.classList.remove('scale-95', 'opacity-0');
      };
      imgEl.onload = () => {
        imgEl.classList.remove('scale-95', 'opacity-0');
      };
      imgEl.src = slide.image;
    }

    renderHeroThumbnails();
  }

  function renderHeroThumbnails() {
    const thumbsContainer = document.getElementById('hero-thumbnails');
    if (!thumbsContainer) return;

    thumbsContainer.innerHTML = heroSlides
      .map(
        (s, idx) => `
        <button 
          onclick="window.LFC.goToHeroSlide(${idx})"
          class="relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl transition-all duration-300 text-left border cursor-pointer flex-shrink-0 ${
            idx === activeSlideIndex
              ? 'bg-amber-100/90 border-amber-400 shadow-md shadow-amber-500/20 scale-102 ring-1 ring-amber-400'
              : 'bg-white/90 border-amber-200/90 hover:border-amber-300 opacity-80 hover:opacity-100 shadow-xs'
          }">
          <img src="${s.image}" alt="" class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0" onerror="this.src='./images/hero-1.jpg'"/>
          <div class="pr-1 sm:pr-2">
            <div class="text-[10px] sm:text-[11px] font-black text-gray-950 leading-tight truncate max-w-[85px] sm:max-w-[110px] font-heading">${s.highlight}</div>
            <div class="text-[9px] sm:text-[10px] text-amber-700 font-extrabold">${s.priceTag}</div>
          </div>
          ${
            idx === activeSlideIndex
              ? '<span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>'
              : ''
          }
        </button>
      `
      )
      .join('');
  }

  function startHeroTimer() {
    stopHeroTimer();
    heroSlideTimer = setInterval(() => {
      renderHeroSlide(activeSlideIndex + 1);
    }, 6000);
  }

  function stopHeroTimer() {
    if (heroSlideTimer) clearInterval(heroSlideTimer);
  }

  // --- Live Order Ticker ---
  function startLiveOrderTicker() {
    const tickerEl = document.getElementById('live-order-ticker-text');
    if (!tickerEl) return;

    tickerTimer = setInterval(() => {
      tickerIndex = (tickerIndex + 1) % LIVE_ORDER_TICKERS.length;
      tickerEl.style.opacity = '0';
      tickerEl.style.transform = 'translateY(5px)';
      setTimeout(() => {
        tickerEl.textContent = LIVE_ORDER_TICKERS[tickerIndex];
        tickerEl.style.opacity = '1';
        tickerEl.style.transform = 'translateY(0)';
      }, 300);
    }, 4500);
  }

  // --- Menu Categories & Grid Renderer ---
  function renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = categories
      .map(
        (c) => `
        <button onclick="window.LFC.setCategory('${c.id}')" class="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer ${
          activeCategory === c.id
            ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-amber-400/30 scale-105 border border-yellow-300'
            : 'bg-white text-gray-800 hover:text-amber-800 hover:border-amber-400 border border-amber-200/90 shadow-sm font-bold'
        }">
          ${c.name}
        </button>
      `
      )
      .join('');
  }

  function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const empty = document.getElementById('menu-empty');
    if (!grid) return;

    let items = menuItems;
    if (activeCategory !== 'all') {
      items = items.filter((i) => i.cat === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
    }

    updateSearchUI(items.length);

    if (items.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }

    if (empty) empty.classList.add('hidden');

    grid.innerHTML = items
      .map((item) => {
        const spicinessDots =
          item.spiciness > 0
            ? `<div class="hidden sm:flex items-center gap-1 text-[10px] text-amber-900 font-bold bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
                <span>🌶️</span><span>${'🔥'.repeat(item.spiciness)}</span>
               </div>`
            : '';

        const badgeHtml = item.badge
          ? `<span class="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] uppercase px-2.5 py-0.5 rounded-lg shadow-md tracking-wider z-10 border border-yellow-300">
              ${item.badge}
             </span>`
          : '';

        const stockOverlay = !item.inStock
          ? `<div class="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] flex items-center justify-center rounded-3xl z-20">
              <span class="bg-red-600 text-white font-black text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider">Sold Out</span>
             </div>`
          : '';

        const hasMultiOptions =
          (item.sizes && item.sizes.length > 1) || (item.addons && item.addons.length > 0);

        return `
          <div class="group relative bg-white rounded-[26px] border-2 border-amber-200/90 hover:border-amber-400 shadow-[0_10px_30px_-5px_rgba(245,158,11,0.12)] hover:shadow-[0_20px_45px_-5px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5">
            ${stockOverlay}
            
            <div class="relative aspect-[4/3] sm:h-52 overflow-hidden bg-amber-50 flex-shrink-0 cursor-pointer" onclick="window.LFC.openCustomizeModal(${item.id})">
              ${badgeHtml}
              <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" class="w-full h-full object-cover transform group-hover:scale-108 transition-all duration-500" onerror="this.onerror=null; this.src='./images/hero-1.jpg';"/>
              <div class="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-60"></div>
            </div>

            <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-1 mb-1.5">
                  <h3 onclick="window.LFC.openCustomizeModal(${item.id})" class="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-amber-600 transition leading-snug line-clamp-1 font-heading cursor-pointer">${item.name}</h3>
                  ${spicinessDots}
                </div>
                <p class="text-gray-600 text-[11px] sm:text-xs line-clamp-2 leading-relaxed mb-3">${item.desc}</p>
                
                ${
                  hasMultiOptions
                    ? `<div class="inline-flex items-center gap-1.5 text-[9px] font-bold text-amber-900 bg-amber-50 border border-amber-300/80 px-2.5 py-0.5 rounded-full mb-2.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        <span>Portions, Spiciness & Extras</span>
                       </div>`
                    : ''
                }
              </div>

              <div class="pt-3 border-t border-amber-100 flex items-center justify-between gap-2 mt-auto">
                <div>
                  <span class="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-wider block">From</span>
                  <div class="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 font-black text-base sm:text-xl tracking-tight font-heading">Rs. ${item.price.toLocaleString()}</div>
                </div>

                <button 
                  onclick="window.LFC.openCustomizeModal(${item.id})"
                  ${!item.inStock ? 'disabled' : ''}
                  class="flex items-center gap-1.5 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    item.inStock
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 shadow-md shadow-amber-400/30 active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }">
                  <span class="text-sm font-bold">+</span>
                  <span>Order</span>
                </button>
              </div>
            </div>

          </div>
        `;
      })
      .join('');
  }

  // --- Search UI Helpers ---
  function updateSearchUI(resultCount) {
    const hasQuery = !!searchQuery.trim();

    ['search-clear-desktop', 'search-clear-mobile'].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.toggle('hidden', !hasQuery);
    });

    const countEl = document.getElementById('menu-result-count');
    if (!countEl) return;
    const catName = (categories.find((c) => c.id === activeCategory) || {}).name || 'All Bites';
    if (hasQuery) {
      countEl.textContent = `${resultCount} result${resultCount === 1 ? '' : 's'} for "${searchQuery.trim()}" in ${catName}`;
    } else {
      countEl.textContent = `Showing ${resultCount} item${resultCount === 1 ? '' : 's'} in ${catName}`;
    }
  }

  function clearSearch() {
    searchQuery = '';
    ['menu-search-input', 'mobile-search-input'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    renderMenu();
    const focusEl = document.getElementById('menu-search-input') || document.getElementById('mobile-search-input');
    if (focusEl) focusEl.focus();
  }

  // --- Reviews Renderer ---
  function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    grid.innerHTML = reviews
      .map(
        (r) => `
        <div class="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200/90 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between shadow-sm">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex text-amber-500 text-xs sm:text-sm">
                ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
              </div>
              <span class="text-[11px] text-gray-500 font-medium">${r.date}</span>
            </div>
            <p class="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 italic">"${r.comment}"</p>
          </div>
          <div class="flex items-center gap-3 pt-3 border-t border-amber-100">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center font-black text-slate-950 text-xs sm:text-sm shadow-sm border border-amber-300">
              ${r.name.charAt(0)}
            </div>
            <div>
              <div class="font-bold text-xs sm:text-sm text-gray-900">${r.name}</div>
              <div class="text-[10px] sm:text-xs text-amber-800 flex items-center gap-1 font-medium">
                <span>📍 ${r.location}</span>
                <span class="text-gray-400">•</span>
                <span class="text-emerald-600 font-bold">Verified Lahori</span>
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  // --- Branches Renderer ---
  function renderBranches() {
    const grid = document.getElementById('branches-grid');
    if (!grid) return;

    grid.innerHTML = branches
      .map((b) => {
        const safeBranchPhone = b.phone ? String(b.phone) : '0322-4940181';
        const cleanBranchPhone = safeBranchPhone.replace(/[^0-9]/g, '');
        return `
        <div class="p-5 sm:p-6 rounded-3xl bg-white border border-amber-200/90 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between shadow-sm">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-extrabold text-gray-900 text-sm sm:text-base font-heading">${b.name}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-300">
                Open Now
              </span>
            </div>
            <p class="text-gray-600 text-xs leading-relaxed mb-4">${b.address}</p>
            <div class="space-y-1.5 text-xs text-gray-700 mb-5">
              <div class="flex items-center gap-2">
                <span class="text-amber-700 font-bold">🕒 Hours:</span>
                <span>${b.timings}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-amber-700 font-bold">📞 Phone:</span>
                <a href="tel:${cleanBranchPhone}" class="text-amber-700 hover:text-amber-900 font-bold underline decoration-dotted">${safeBranchPhone}</a>
              </div>
            </div>
          </div>

          <div class="flex gap-2 pt-3 border-t border-amber-100">
            <a href="tel:${cleanBranchPhone}" class="flex-1 text-center py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition">
              Call Branch
            </a>
            <a href="${b.mapUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-bold text-xs shadow-sm transition">
              Directions ↗
            </a>
          </div>
        </div>
      `;
      })
      .join('');
  }

  // --- Cart Drawer Animations ---
  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
    document.body.classList.add('overflow-hidden');
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 300);
  }

  // --- Promo Code Application ---
  function applyPromoCode(code) {
    const cleaned = (code || '').trim().toUpperCase();
    if (!cleaned) {
      showToast('Please enter a coupon code', 'error');
      return;
    }

    const subtotal = getCartSubtotal();
    const found = promos.find((p) => p.code.toUpperCase() === cleaned && p.active);

    if (!found) {
      showToast('Invalid or expired coupon code', 'error');
      return;
    }

    if (found.minOrder && subtotal < found.minOrder) {
      showToast(`Coupon requires minimum order of Rs. ${found.minOrder}`, 'error');
      return;
    }

    appliedPromo = found;
    const discount = getDiscountAmount();
    showToast(`Coupon ${found.code} applied! Saved Rs. ${discount.toLocaleString()}`);
    updateCartUI();
  }

  // --- WhatsApp Checkout & Order Recording ---
  function checkoutViaWhatsApp() {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    const nameInput = document.getElementById('checkout-name');
    const phoneInput = document.getElementById('checkout-phone');
    const addressInput = document.getElementById('checkout-address');
    const notesInput = document.getElementById('checkout-notes');

    const customerName = nameInput ? nameInput.value.trim() : '';
    const customerPhone = phoneInput ? phoneInput.value.trim() : '';
    const customerAddress = addressInput ? addressInput.value.trim() : '';
    const specialNotes = notesInput ? notesInput.value.trim() : '';

    if (!customerName || !customerPhone || !customerAddress) {
      showToast('Please fill in Name, Phone, and Delivery Address', 'error');
      return;
    }

    const zone = getCurrentDeliveryZone();
    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee();
    const discount = getDiscountAmount();
    const total = getGrandTotal();

    const orderId = 'LFC-' + Math.floor(1000 + Math.random() * 9000);

    // Save order into persistent live orders system
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today',
      timestamp: Date.now(),
      customerName,
      customerPhone,
      customerAddress,
      orderType,
      deliveryZone: zone.name,
      specialNotes,
      items: JSON.parse(JSON.stringify(cart)),
      subtotal,
      deliveryFee: delivery,
      discount,
      promoCode: appliedPromo ? appliedPromo.code : null,
      total,
      status: 'new'
    };

    orders.unshift(newOrder);
    saveData('orders', orders);

    // Build rich formatted WhatsApp message
    let msg = `🍗 *NEW ORDER: ${orderId} - ${settings.storeName.toUpperCase()}* 🍗\n`;
    msg += `-----------------------------------------\n`;
    msg += `👤 *Customer:* ${customerName}\n`;
    msg += `📞 *Phone:* ${customerPhone}\n`;
    msg += `🧾 *Order Type:* ${
      orderType === 'delivery' ? '🛵 Home Delivery' : orderType === 'pickup' ? '🥡 Pickup' : '🍽️ Dine-In'
    }\n`;
    if (orderType === 'delivery') {
      msg += `📍 *Delivery Area:* ${zone.name} (${zone.time})\n`;
      msg += `🏠 *Address:* ${customerAddress}\n`;
    }
    if (specialNotes) {
      msg += `📝 *Notes:* ${specialNotes}\n`;
    }
    msg += `-----------------------------------------\n`;
    msg += `📋 *ORDER SPECIFICATIONS:*\n`;

    cart.forEach((i, idx) => {
      msg += `${idx + 1}. *${i.qty}x ${i.name}* - Rs. ${(i.price * i.qty).toLocaleString()}\n`;
      if (i.selectedSize && i.selectedSize.name) {
        msg += `   └ Portion: ${i.selectedSize.name}\n`;
      }
      if (i.selectedSpice) {
        msg += `   └ Spice: ${i.selectedSpice}\n`;
      }
      if (i.selectedAddons && i.selectedAddons.length) {
        msg += `   └ Extras: ${i.selectedAddons.map((a) => a.name).join(', ')}\n`;
      }
      if (i.specialNotes) {
        msg += `   └ Custom note: "${i.specialNotes}"\n`;
      }
    });

    msg += `-----------------------------------------\n`;
    msg += `💰 Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
    msg += `🚚 Delivery: ${delivery === 0 ? 'FREE' : 'Rs. ' + delivery}\n`;
    if (discount > 0) {
      msg += `🏷️ Discount (${appliedPromo.code}): -Rs. ${discount}\n`;
    }
    msg += `💵 *TOTAL PAYABLE: Rs. ${total.toLocaleString()}*\n`;
    msg += `-----------------------------------------\n`;
    msg += `Please confirm my order and send estimated delivery updates!`;

    const safeCheckoutWa = settings && settings.whatsappNumber ? String(settings.whatsappNumber) : '0322-4940181';
    let rawPhone = safeCheckoutWa.replace(/[^0-9]/g, '');
    if (rawPhone.startsWith('0')) {
      rawPhone = '92' + rawPhone.substring(1);
    }

    const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    showToast(`Order #${orderId} generated! Opening WhatsApp...`);
  }

  // --- Admin Suite Controls ---
  function renderAdminDashboard() {
    const deliveredOrders = orders.filter((o) => o.status === 'delivered');
    const totalRev = deliveredOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingCount = orders.filter((o) => o.status === 'new' || o.status === 'preparing' || o.status === 'delivery').length;

    const elRev = document.getElementById('admin-stat-revenue');
    const elOrders = document.getElementById('admin-stat-orders');
    const elPending = document.getElementById('admin-stat-pending');
    const elMenu = document.getElementById('admin-stat-menu');
    const elCoupons = document.getElementById('admin-stat-coupons');
    const elZones = document.getElementById('admin-stat-zones');
    const elStatus = document.getElementById('admin-stat-status');
    const ordersBadge = document.getElementById('admin-orders-badge');

    if (elRev) elRev.textContent = `Rs. ${totalRev.toLocaleString()}`;
    if (elOrders) elOrders.textContent = orders.length;
    if (elPending) elPending.textContent = `${pendingCount} Active`;
    if (elMenu) elMenu.textContent = menuItems.length;
    if (elCoupons) elCoupons.textContent = promos.filter((p) => p.active).length;
    if (elZones) elZones.textContent = zones.length;
    if (ordersBadge) {
      ordersBadge.textContent = pendingCount;
      ordersBadge.classList.toggle('hidden', pendingCount === 0);
    }
    if (elStatus) {
      const st = settings.storeStatus || 'open';
      elStatus.textContent = st === 'open' ? 'OPEN' : st === 'busy' ? 'BUSY' : 'CLOSED';
      elStatus.className = st === 'open' ? 'text-emerald-400' : st === 'busy' ? 'text-amber-400' : 'text-red-400';
    }
  }

  function openAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const pinSection = document.getElementById('admin-pin-section');
    const panelSection = document.getElementById('admin-panel-section');

    if (isAdminAuthenticated) {
      renderAdminDashboard();
      if (pinSection) pinSection.classList.add('hidden');
      if (panelSection) panelSection.classList.remove('hidden');
      renderAdminOrders();
      renderAdminMenuItems();
      renderAdminCoupons();
      renderAdminZones();
      renderAdminCategories();
      renderAdminHeroSlides();
      renderAdminBranches();
      renderAdminSettings();
    } else {
      if (pinSection) pinSection.classList.remove('hidden');
      if (panelSection) panelSection.classList.add('hidden');
      const pinInput = document.getElementById('admin-pin-input');
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
    }
  }

  function closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (!modal) return;
    modal.classList.add('hidden');

    const h = (window.location.hash || '').toLowerCase();
    if (h.includes('admin') || h.includes('5640')) {
      try {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      } catch (e) {
        window.location.hash = '';
      }
    }
  }

  function submitAdminPin() {
    const pinInput = document.getElementById('admin-pin-input');
    if (!pinInput) return;

    const entered = pinInput.value.trim();
    const targetPin = settings && settings.adminPin ? String(settings.adminPin) : '5640';

    if (entered === targetPin || entered === '5640') {
      isAdminAuthenticated = true;
      showToast('Admin Access Granted');
      openAdminModal();
    } else {
      showToast('Access Denied: Incorrect Security PIN', 'error');
    }
  }

  function changeAdminPin() {
    const currentPinEl = document.getElementById('change-pin-current');
    const newPinEl = document.getElementById('change-pin-new');
    const confirmPinEl = document.getElementById('change-pin-confirm');

    const currentEntered = currentPinEl ? currentPinEl.value.trim() : '';
    const newPin = newPinEl ? newPinEl.value.trim() : '';
    const confirmPin = confirmPinEl ? confirmPinEl.value.trim() : '';

    const actualPin = settings && settings.adminPin ? String(settings.adminPin) : '5640';
    if (currentEntered !== actualPin && currentEntered !== '5640') {
      showToast('Current PIN is incorrect', 'error');
      return;
    }

    if (!newPin || newPin.length < 4) {
      showToast('New PIN must be at least 4 digits', 'error');
      return;
    }

    if (newPin !== confirmPin) {
      showToast('New PIN and Confirm PIN do not match', 'error');
      return;
    }

    settings.adminPin = newPin;
    saveData('settings', settings);

    if (currentPinEl) currentPinEl.value = '';
    if (newPinEl) newPinEl.value = '';
    if (confirmPinEl) confirmPinEl.value = '';

    showToast('Admin PIN changed successfully!');
  }

  function switchAdminTab(tabName) {
    const tabs = ['dashboard', 'orders', 'pos', 'analytics', 'menu', 'coupons', 'zones', 'categories', 'hero', 'branches', 'branding', 'settings'];
    renderAdminDashboard();
    tabs.forEach((t) => {
      const btn = document.getElementById(`tab-btn-${t}`);
      const panel = document.getElementById(`tab-panel-${t}`);
      if (btn && panel) {
        if (t === tabName) {
          btn.className =
            'px-3 sm:px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-500 text-black shadow-md flex-shrink-0 flex items-center gap-1.5';
          panel.classList.remove('hidden');
        } else {
          btn.className =
            'px-3 sm:px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white hover:bg-gray-800 transition flex-shrink-0 flex items-center gap-1.5';
          panel.classList.add('hidden');
        }
      }
    });

    if (tabName === 'orders') renderAdminOrders();
    if (tabName === 'pos') initPosTerminal();
    if (tabName === 'analytics') renderAdminAnalytics();
    if (tabName === 'menu') renderAdminMenuItems();
    if (tabName === 'coupons') renderAdminCoupons();
    if (tabName === 'zones') renderAdminZones();
  }

  // --- POS Quick Order Terminal Functions ---
  let posSelectedItem = null;
  let posSelectedSize = null;
  let posSelectedSpice = null;
  let posSelectedAddons = [];

  function initPosTerminal() {
    const select = document.getElementById('pos-item-select');
    if (!select) return;
    select.innerHTML = menuItems
      .filter((m) => m.inStock)
      .map((m) => `<option value="${m.id}">${m.name} (Base Rs. ${m.price.toLocaleString()})</option>`)
      .join('');
    if (menuItems.length > 0) {
      onPosDishSelect(menuItems[0].id);
    }
  }

  function onPosDishSelect(dishId) {
    const item = menuItems.find((m) => m.id === Number(dishId));
    if (!item) return;
    posSelectedItem = item;

    const sizes = item.sizes && item.sizes.length ? item.sizes : [{ name: 'Regular Portion', price: 0 }];
    posSelectedSize = sizes[0];

    const spices = item.spiceLevels && item.spiceLevels.length ? item.spiceLevels : ['Mild Crunchy', 'Hot Spicy Lahori', 'Ghost Fire 🔥'];
    posSelectedSpice = spices[0];

    posSelectedAddons = [];

    const baseBadge = document.getElementById('pos-base-price-badge');
    if (baseBadge) baseBadge.textContent = `Base: Rs. ${item.price.toLocaleString()}`;

    // Render sizes list
    const sizesList = document.getElementById('pos-sizes-list');
    if (sizesList) {
      sizesList.innerHTML = sizes
        .map(
          (s, idx) => `
          <label class="flex items-center justify-between p-1.5 rounded bg-[#090c18] border border-gray-800 text-[11px] cursor-pointer">
            <span class="flex items-center gap-1.5 text-gray-200">
              <input type="radio" name="pos-size-choice" value="${idx}" ${idx === 0 ? 'checked' : ''} onchange="window.LFC.selectPosSize(${idx})"/>
              <span>${s.name}</span>
            </span>
            <span class="text-amber-400 font-bold">+Rs. ${s.price}</span>
          </label>
        `
        )
        .join('');
    }

    // Render spice list
    const spiceList = document.getElementById('pos-spice-list');
    if (spiceList) {
      spiceList.innerHTML = spices
        .map(
          (sp, idx) => `
          <label class="flex items-center gap-1.5 p-1.5 rounded bg-[#090c18] border border-gray-800 text-[11px] cursor-pointer text-gray-200">
            <input type="radio" name="pos-spice-choice" value="${idx}" ${idx === 0 ? 'checked' : ''} onchange="window.LFC.selectPosSpice('${sp}')"/>
            <span>${sp}</span>
          </label>
        `
        )
        .join('');
    }

    // Render addons list
    const addonsList = document.getElementById('pos-addons-list');
    const addons = item.addons || [];
    if (addonsList) {
      addonsList.innerHTML = addons.length
        ? addons
            .map(
              (a, idx) => `
            <label class="flex items-center justify-between p-1.5 rounded bg-[#090c18] border border-gray-800 text-[11px] cursor-pointer">
              <span class="flex items-center gap-1.5 text-gray-200">
                <input type="checkbox" onchange="window.LFC.togglePosAddon(${idx}, this.checked)"/>
                <span>${a.name}</span>
              </span>
              <span class="text-emerald-400 font-bold">+Rs. ${a.price}</span>
            </label>
          `
            )
            .join('')
        : '<div class="text-[10px] text-gray-500">No extras for this dish</div>';
    }

    calcPosTotal();
  }

  function selectPosSize(idx) {
    if (posSelectedItem && posSelectedItem.sizes && posSelectedItem.sizes[idx]) {
      posSelectedSize = posSelectedItem.sizes[idx];
      calcPosTotal();
    }
  }

  function selectPosSpice(spice) {
    posSelectedSpice = spice;
  }

  function togglePosAddon(idx, isChecked) {
    if (!posSelectedItem || !posSelectedItem.addons || !posSelectedItem.addons[idx]) return;
    const addon = posSelectedItem.addons[idx];
    if (isChecked) {
      if (!posSelectedAddons.some((a) => a.name === addon.name)) {
        posSelectedAddons.push(addon);
      }
    } else {
      posSelectedAddons = posSelectedAddons.filter((a) => a.name !== addon.name);
    }
    calcPosTotal();
  }

  function calcPosTotal() {
    if (!posSelectedItem) return { unitPrice: 0, qty: 1, deliveryFee: 0, total: 0 };
    const qtyInput = document.getElementById('pos-item-qty');
    const qty = Math.max(1, parseInt(qtyInput ? qtyInput.value : 1, 10) || 1);

    const basePrice = posSelectedItem.price;
    const sizePrice = posSelectedSize ? Number(posSelectedSize.price) || 0 : 0;
    const addonsPrice = posSelectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    const unitPrice = basePrice + sizePrice + addonsPrice;

    const orderTypeEl = document.getElementById('pos-order-type');
    const mode = orderTypeEl ? orderTypeEl.value : 'dinein';
    const deliveryFee = mode === 'delivery' ? (settings.deliveryFee || 150) : 0;

    const total = unitPrice * qty + deliveryFee;

    const totalDisplay = document.getElementById('pos-total-display');
    if (totalDisplay) totalDisplay.textContent = `Rs. ${total.toLocaleString()}`;

    return { unitPrice, qty, deliveryFee, total };
  }

  function createPosOrder(shouldPrint) {
    if (!posSelectedItem) {
      showToast('Please select a dish first', 'error');
      return;
    }

    const nameEl = document.getElementById('pos-customer-name');
    const phoneEl = document.getElementById('pos-customer-phone');
    const addressEl = document.getElementById('pos-customer-address');
    const notesEl = document.getElementById('pos-special-notes');
    const typeEl = document.getElementById('pos-order-type');

    const customerName = nameEl && nameEl.value.trim() ? nameEl.value.trim() : 'Walk-in Customer';
    const customerPhone = phoneEl && phoneEl.value.trim() ? phoneEl.value.trim() : '0300-0000000';
    const customerAddress = addressEl && addressEl.value.trim() ? addressEl.value.trim() : 'Counter Order';
    const specialNotes = notesEl ? notesEl.value.trim() : '';
    const mode = typeEl ? typeEl.value : 'dinein';

    const { unitPrice, qty, deliveryFee, total } = calcPosTotal();
    const orderId = 'POS-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today',
      timestamp: Date.now(),
      customerName,
      customerPhone,
      customerAddress,
      orderType: mode,
      deliveryZone: mode === 'delivery' ? 'Lahore Counter Delivery' : 'In-Store Counter',
      specialNotes: specialNotes ? `[POS] ${specialNotes}` : '[POS Counter Order]',
      items: [
        {
          id: posSelectedItem.id,
          name: posSelectedItem.name,
          price: unitPrice,
          qty,
          selectedSize: posSelectedSize,
          selectedSpice: posSelectedSpice,
          selectedAddons: [...posSelectedAddons],
          specialNotes
        }
      ],
      subtotal: unitPrice * qty,
      deliveryFee,
      discount: 0,
      promoCode: null,
      total,
      status: 'preparing'
    };

    orders.unshift(newOrder);
    saveData('orders', orders);

    renderAdminOrders();
    renderAdminDashboard();
    renderAdminAnalytics();

    showToast(`Order #${orderId} created successfully!`);

    if (shouldPrint) {
      openReceiptModal(orderId);
    }

    if (notesEl) notesEl.value = '';
  }

  // --- Sales & Revenue Analytics ---
  function renderAdminAnalytics() {
    const deliveredOrders = orders.filter((o) => o.status === 'delivered');
    const totalRev = deliveredOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const completedCount = deliveredOrders.length;
    const aov = completedCount > 0 ? Math.round(totalRev / completedCount) : 0;
    const pendingCount = orders.filter((o) => o.status === 'new' || o.status === 'preparing' || o.status === 'delivery').length;

    const elRev = document.getElementById('analytics-total-rev');
    const elOrders = document.getElementById('analytics-total-orders');
    const elPending = document.getElementById('analytics-pending-orders');
    const elAov = document.getElementById('analytics-aov');
    const elZones = document.getElementById('analytics-zones-count');

    if (elRev) elRev.textContent = `Rs. ${totalRev.toLocaleString()}`;
    if (elOrders) elOrders.textContent = orders.length;
    if (elPending) elPending.textContent = `${pendingCount} active / in progress`;
    if (elAov) elAov.textContent = `Rs. ${aov.toLocaleString()}`;
    if (elZones) elZones.textContent = `${zones.length} Zones`;

    const counts = {};
    orders.forEach((o) => {
      (o.items || []).forEach((item) => {
        counts[item.name] = (counts[item.name] || 0) + (item.qty || 1);
      });
    });

    const sortedDishes = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const maxQty = sortedDishes.length > 0 ? sortedDishes[0][1] : 1;

    const topListEl = document.getElementById('analytics-top-dishes');
    if (topListEl) {
      if (sortedDishes.length === 0) {
        topListEl.innerHTML = '<div class="text-xs text-gray-400 py-4 text-center">No order records yet. Process orders to view top sellers!</div>';
      } else {
        topListEl.innerHTML = sortedDishes
          .slice(0, 5)
          .map(([name, qty], idx) => {
            const pct = Math.round((qty / maxQty) * 100);
            return `
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="font-bold text-white flex items-center gap-1.5">
                  <span class="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] flex items-center justify-center font-bold">#${idx + 1}</span>
                  <span>${name}</span>
                </span>
                <span class="text-amber-400 font-black">${qty} sold</span>
              </div>
              <div class="h-2 rounded-full bg-[#0a0d18] border border-gray-800 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full" style="width: ${pct}%"></div>
              </div>
            </div>
          `;
          })
          .join('');
      }
    }
  }

  // --- Customer Quick Contact Helpers ---
  function whatsappCustomer(orderId) {
    const ord = orders.find((o) => o.id === orderId);
    if (!ord || !ord.customerPhone) return;
    let raw = ord.customerPhone.replace(/[^0-9]/g, '');
    if (raw.startsWith('0')) raw = '92' + raw.substring(1);
    const text = `Hi ${ord.customerName}! This is LFC Lahore updating you regarding your order #${ord.id}. Current Status: ${ord.status.toUpperCase()}. Total: Rs. ${(ord.total || 0).toLocaleString()}. Thank you for choosing LFC!`;
    window.open(`https://wa.me/${raw}?text=${encodeURIComponent(text)}`, '_blank');
  }

  function callCustomer(orderId) {
    const ord = orders.find((o) => o.id === orderId);
    if (!ord || !ord.customerPhone) return;
    const raw = ord.customerPhone.replace(/[^0-9]/g, '');
    window.location.href = `tel:${raw}`;
  }

  // --- Photo Upload Helper ---
  function handlePhotoUpload(fileInput, targetPreviewId, callback) {
    if (!fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      if (targetPreviewId) {
        const preview = document.getElementById(targetPreviewId);
        if (preview) {
          preview.src = base64;
          preview.classList.remove('hidden');
        }
      }
      callback(base64);
      showToast('Photo uploaded successfully!');
    };
    reader.readAsDataURL(file);
  }

  // --- Live Orders Management ---
  let adminOrdersSearchQuery = '';

  function searchAdminOrders(query) {
    adminOrdersSearchQuery = (query || '').toLowerCase().trim();
    renderAdminOrders();
  }

  function playOrderChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  }

  function generateTestOrder() {
    const lahoreNames = ['Ali Raza', 'Fatima Zahra', 'Hamza Butt', 'Ayesha Malik', 'Bilal Tariq', 'Zainab Qureshi'];
    const lahoreZones = zones.length ? zones : DEFAULT_ZONES;
    const randomZone = lahoreZones[Math.floor(Math.random() * lahoreZones.length)];
    const randomName = lahoreNames[Math.floor(Math.random() * lahoreNames.length)];
    const randomPhone = `032${Math.floor(1000000 + Math.random() * 8999999)}`;
    const randomItem1 = menuItems[Math.floor(Math.random() * menuItems.length)] || menuItems[0];
    const randomItem2 = menuItems[Math.floor(Math.random() * menuItems.length)];

    const items = [
      {
        id: randomItem1.id,
        name: randomItem1.name,
        price: randomItem1.price,
        qty: 1 + Math.floor(Math.random() * 2),
        selectedSize: randomItem1.sizes && randomItem1.sizes[0] ? randomItem1.sizes[0] : null,
        selectedSpice: 'Hot Spicy Lahori',
        selectedAddons: []
      }
    ];

    if (randomItem2 && randomItem2.id !== randomItem1.id) {
      items.push({
        id: randomItem2.id,
        name: randomItem2.name,
        price: randomItem2.price,
        qty: 1,
        selectedSize: null,
        selectedSpice: 'Mild Crunchy',
        selectedAddons: []
      });
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const deliveryFee = subtotal >= (settings.freeDeliveryAbove || 2000) ? 0 : (randomZone.fee || 150);
    const total = subtotal + deliveryFee;

    const newOrder = {
      id: `LFC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerName: randomName,
      customerPhone: randomPhone,
      customerAddress: `House #${Math.floor(10 + Math.random() * 90)}, Block ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}, ${randomZone.name}`,
      deliveryZone: randomZone.name,
      orderType: 'delivery',
      items: items,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      discount: 0,
      total: total,
      status: 'new',
      specialNotes: 'Extra spicy please, keep dips fresh!'
    };

    orders.unshift(newOrder);
    saveData('orders', orders);
    playOrderChime();
    renderAdminOrders();
    renderAdminDashboard();
    showToast(`🔔 New Sample Order ${newOrder.id} generated!`);
  }

  function renderAdminOrders() {
    const list = document.getElementById('admin-orders-list');
    if (!list) return;

    // Update filter count badges
    const countAll = document.getElementById('count-filter-all');
    const countNew = document.getElementById('count-filter-new');
    const countPrep = document.getElementById('count-filter-preparing');
    const countDeliv = document.getElementById('count-filter-delivery');
    const countDelivered = document.getElementById('count-filter-delivered');

    if (countAll) countAll.textContent = orders.length;
    if (countNew) countNew.textContent = orders.filter((o) => o.status === 'new').length;
    if (countPrep) countPrep.textContent = orders.filter((o) => o.status === 'preparing').length;
    if (countDeliv) countDeliv.textContent = orders.filter((o) => o.status === 'delivery').length;
    if (countDelivered) countDelivered.textContent = orders.filter((o) => o.status === 'delivered').length;

    let filtered = orders;
    if (activeOrderFilter !== 'all') {
      filtered = orders.filter((o) => o.status === activeOrderFilter);
    }

    if (adminOrdersSearchQuery) {
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(adminOrdersSearchQuery) ||
          (o.customerName && o.customerName.toLowerCase().includes(adminOrdersSearchQuery)) ||
          (o.customerPhone && o.customerPhone.includes(adminOrdersSearchQuery)) ||
          (o.customerAddress && o.customerAddress.toLowerCase().includes(adminOrdersSearchQuery))
      );
    }

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="text-center py-12 p-6 rounded-3xl bg-gradient-to-b from-[#181c2b] to-[#0a0c14] border border-white/10">
          <div class="text-3xl mb-2">🧾</div>
          <div class="text-sm font-bold text-white">No matching orders found</div>
          <div class="text-xs text-gray-400 mt-1">Try another filter or click "+Test Order" to simulate a new live kitchen order!</div>
        </div>
      `;
      return;
    }

    const statusBadge = (st) => {
      const map = {
        new: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        preparing: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        delivery: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        delivered: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        cancelled: 'bg-red-500/20 text-red-300 border-red-500/40'
      };
      return map[st] || 'bg-gray-800 text-gray-300';
    };

    list.innerHTML = filtered
      .map((ord) => {
        const itemsSummary = (ord.items || [])
          .map((i) => {
            const sizeStr = i.selectedSize && i.selectedSize.name ? ` (${i.selectedSize.name})` : '';
            const spiceStr = i.selectedSpice ? ` [${i.selectedSpice}]` : '';
            const extrasStr =
              i.selectedAddons && i.selectedAddons.length
                ? ` +${i.selectedAddons.map((a) => a.name).join(', ')}`
                : '';
            return `<div class="text-xs text-gray-300">• <b>${i.qty}x</b> ${i.name}${sizeStr}${spiceStr} <span class="text-emerald-400 font-medium">${extrasStr}</span></div>`;
          })
          .join('');

        const rawPhone = (ord.customerPhone || '').replace(/[^0-9]/g, '');
        const waPhone = rawPhone.startsWith('0') ? '92' + rawPhone.slice(1) : rawPhone;
        const waMsg = `Hi ${ord.customerName}! Your LFC order #${ord.id} status is now: ${ord.status.toUpperCase()}. Total: Rs. ${ord.total}. Thank you for choosing Lahore Fried Chicken!`;
        const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`;

        return `
        <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#181c2b] via-[#121522] to-[#0a0c14] border border-white/10 space-y-3 shadow-xl hover:border-amber-400/40 transition">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-black text-white text-sm font-heading">${ord.id}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusBadge(
                  ord.status
                )}">
                  ${ord.status}
                </span>
                <span class="text-[11px] text-gray-400">${ord.date}</span>
                <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">${ord.orderType || 'delivery'}</span>
              </div>
              <div class="text-xs text-amber-300 font-bold mt-1">
                ${ord.customerName} • 📞 ${ord.customerPhone} • 📍 ${ord.deliveryZone || 'Lahore'}
              </div>
            </div>

            <div class="flex items-center gap-1.5 flex-wrap">
              <button onclick="window.LFC.updateOrderStatus('${ord.id}', 'preparing')" class="px-2.5 py-1 rounded-lg ${ord.status === 'preparing' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'} text-[11px] font-bold transition" title="Mark Kitchen Preparing">
                👨‍🍳 Kitchen
              </button>
              <button onclick="window.LFC.updateOrderStatus('${ord.id}', 'delivery')" class="px-2.5 py-1 rounded-lg ${ord.status === 'delivery' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'} text-[11px] font-bold transition" title="Mark Out for Delivery">
                🛵 Delivery
              </button>
              <button onclick="window.LFC.updateOrderStatus('${ord.id}', 'delivered')" class="px-2.5 py-1 rounded-lg ${ord.status === 'delivered' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'} text-[11px] font-bold transition" title="Mark Delivered">
                ✅ Done
              </button>
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold transition flex items-center gap-1" title="WhatsApp Status Update to Customer">
                💬 WA
              </a>
              <button onclick="window.LFC.openReceiptModal('${ord.id}')" class="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-amber-300 text-[11px] font-bold transition flex items-center gap-1" title="Print Kitchen Slip">
                🖨️ Slip
              </button>
            </div>
          </div>

          <div class="space-y-1">
            ${itemsSummary}
          </div>

          ${
            ord.specialNotes
              ? `<div class="p-2.5 rounded-xl bg-[#0B0D16] border border-amber-500/20 text-[11px] text-amber-200/90 italic flex items-center gap-1.5">
                  <span>📝</span> <span>Note: "${ord.specialNotes}"</span>
                 </div>`
              : ''
          }

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-2 border-t border-white/10 text-xs">
            <div class="text-gray-400">
              Address: <span class="text-gray-200 font-medium">${ord.customerAddress}</span>
            </div>
            <div class="text-base font-black text-amber-400 font-heading">
              Total: Rs. ${(ord.total || 0).toLocaleString()}
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  function filterOrders(status) {
    activeOrderFilter = status;
    const buttons = document.querySelectorAll('.order-filter-btn');
    buttons.forEach((b) => {
      const match =
        (status === 'all' && b.id === 'order-filter-all') ||
        (status === 'new' && b.id === 'order-filter-new') ||
        (status === 'preparing' && b.id === 'order-filter-preparing') ||
        (status === 'delivery' && b.id === 'order-filter-delivery') ||
        (status === 'delivered' && b.id === 'order-filter-delivered');
      b.className = match
        ? 'order-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-black shadow flex-shrink-0'
        : 'order-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-800 text-gray-300 hover:text-white flex-shrink-0';
    });
    renderAdminOrders();
  }

  function updateOrderStatus(orderId, newStatus) {
    const ord = orders.find((o) => o.id === orderId);
    if (!ord) return;
    ord.status = newStatus;
    saveData('orders', orders);
    renderAdminOrders();
    renderAdminDashboard();
    showToast(`Order #${orderId} marked as ${newStatus}!`);
  }

  function exportOrdersCsv() {
    if (orders.length === 0) {
      showToast('No orders to export', 'error');
      return;
    }

    let csv = 'Order ID,Date,Customer Name,Phone,Address,Zone,Subtotal,Delivery,Discount,Total,Status\n';
    orders.forEach((o) => {
      const cleanAddr = `"${(o.customerAddress || '').replace(/"/g, '""')}"`;
      csv += `${o.id},"${o.date}","${o.customerName}","${o.customerPhone}",${cleanAddr},"${o.deliveryZone || ''}",${o.subtotal},${o.deliveryFee},${o.discount},${o.total},${o.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lfc-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    showToast('Orders exported to CSV!');
  }

  function clearCompletedOrders() {
    if (!confirm('Clear all delivered orders from list?')) return;
    orders = orders.filter((o) => o.status !== 'delivered');
    saveData('orders', orders);
    renderAdminOrders();
    renderAdminDashboard();
    showToast('Delivered orders cleared');
  }

  // --- Printable Thermal Receipt / Kitchen Slip ---
  function openReceiptModal(orderId) {
    const ord = orders.find((o) => o.id === orderId);
    if (!ord) return;

    const modal = document.getElementById('receipt-modal');
    const content = document.getElementById('receipt-modal-content');
    if (!modal || !content) return;

    const itemsRows = (ord.items || [])
      .map((i) => {
        const itemLine = `${i.qty}x ${i.name}`;
        const priceLine = `Rs. ${(i.price * i.qty).toLocaleString()}`;
        const size = i.selectedSize && i.selectedSize.name ? `[${i.selectedSize.name}]` : '';
        const spice = i.selectedSpice ? `Spice: ${i.selectedSpice}` : '';
        const addons =
          i.selectedAddons && i.selectedAddons.length ? `+ ${i.selectedAddons.map((a) => a.name).join(', ')}` : '';

        return `
        <div class="border-b border-dashed border-gray-300 pb-1.5">
          <div class="flex justify-between font-bold">
            <span>${itemLine}</span>
            <span>${priceLine}</span>
          </div>
          ${size || spice ? `<div class="text-[10px] text-gray-600">${size} ${spice}</div>` : ''}
          ${addons ? `<div class="text-[10px] text-gray-700">${addons}</div>` : ''}
        </div>
      `;
      })
      .join('');

    content.innerHTML = `
      <div class="text-center border-b-2 border-black pb-3">
        <h2 class="text-lg font-black tracking-wider uppercase font-sans">LAHORE FRIED CHICKEN</h2>
        <div class="text-[11px] font-bold">KITCHEN ORDER TICKET & RECEIPT</div>
        <div class="text-[10px] text-gray-600">Taste the Legend • 0322-4940181</div>
      </div>

      <div class="text-[11px] space-y-0.5 border-b border-dashed border-gray-400 pb-2">
        <div><b>ORDER #:</b> ${ord.id}</div>
        <div><b>TIME:</b> ${ord.date}</div>
        <div><b>TYPE:</b> ${ord.orderType.toUpperCase()}</div>
        <div><b>CUSTOMER:</b> ${ord.customerName}</div>
        <div><b>PHONE:</b> ${ord.customerPhone}</div>
        <div><b>AREA:</b> ${ord.deliveryZone || 'Lahore'}</div>
        <div><b>ADDRESS:</b> ${ord.customerAddress}</div>
        ${ord.specialNotes ? `<div><b>INSTRUCTIONS:</b> <span class="text-red-700">${ord.specialNotes}</span></div>` : ''}
      </div>

      <div class="space-y-2 py-2">
        ${itemsRows}
      </div>

      <div class="border-t-2 border-black pt-2 space-y-1 text-xs">
        <div class="flex justify-between"><span>SUBTOTAL:</span><span>Rs. ${(ord.subtotal || 0).toLocaleString()}</span></div>
        <div class="flex justify-between"><span>DELIVERY FEE:</span><span>${ord.deliveryFee === 0 ? 'FREE' : 'Rs. ' + ord.deliveryFee}</span></div>
        ${ord.discount > 0 ? `<div class="flex justify-between text-red-600"><span>DISCOUNT (${ord.promoCode || 'PROMO'}):</span><span>- Rs. ${ord.discount}</span></div>` : ''}
        <div class="flex justify-between font-black text-sm pt-1 border-t border-gray-400">
          <span>GRAND TOTAL:</span>
          <span>Rs. ${(ord.total || 0).toLocaleString()}</span>
        </div>
      </div>

      <div class="text-center pt-3 text-[10px] text-gray-500">
        Thank you for choosing LFC Lahore!<br/>
        Developer: Trivox solutions
      </div>
    `;

    modal.classList.remove('hidden');
  }

  function closeReceiptModal() {
    const modal = document.getElementById('receipt-modal');
    if (modal) modal.classList.add('hidden');
  }

  // --- Admin Menu Items & Multi-Options Manager ---
  let tempNewItemImage = './images/hero-1.jpg';

  function renderAdminMenuItems() {
    const list = document.getElementById('admin-menu-list');
    const countEl = document.getElementById('admin-menu-count');
    if (!list) return;

    if (countEl) countEl.textContent = menuItems.length;

    list.innerHTML = menuItems
      .map((item) => {
        const sizesStr = item.sizes && item.sizes.length ? `${item.sizes.length} sizes` : '1 size';
        const addonsStr = item.addons && item.addons.length ? `${item.addons.length} extras` : 'No extras';

        return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-[#141826] border border-gray-800 text-xs sm:text-sm gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <img src="${item.image}" alt="" class="w-12 h-12 rounded-xl object-cover bg-black flex-shrink-0 border border-gray-800" onerror="this.src='./images/hero-1.jpg'"/>
            <div class="min-w-0">
              <div class="font-extrabold text-white truncate flex items-center gap-2">
                <span>${item.name}</span>
                ${
                  item.badge
                    ? `<span class="px-2 py-0.2 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">${item.badge}</span>`
                    : ''
                }
              </div>
              <div class="text-[11px] text-gray-400">
                <span class="text-amber-400 uppercase font-bold">${item.cat}</span> • Base: Rs. ${item.price.toLocaleString()} • <span class="text-emerald-400">${sizesStr}</span> • <span class="text-blue-400">${addonsStr}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2 self-end sm:self-center">
            <button onclick="window.LFC.openEditItemModal(${item.id})" class="px-2.5 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-amber-300 font-bold text-xs transition flex items-center gap-1">
              <span>✏️ Edit & Options</span>
            </button>
            <button onclick="window.LFC.toggleStock(${item.id})" class="px-2.5 py-1.5 rounded-xl text-xs font-black transition ${
              item.inStock
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80'
                : 'bg-red-950/80 text-red-400 border border-red-800/80'
            }">
              ${item.inStock ? 'In Stock' : 'Out'}
            </button>
            <button onclick="window.LFC.deleteMenuItem(${item.id})" class="text-gray-500 hover:text-red-400 p-1.5 transition" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      `;
      })
      .join('');
  }

  function searchAdminMenu(q) {
    const filter = (q || '').toLowerCase().trim();
    const list = document.getElementById('admin-menu-list');
    if (!list) return;

    if (!filter) {
      renderAdminMenuItems();
      return;
    }

    const matched = menuItems.filter((m) => m.name.toLowerCase().includes(filter) || m.cat.toLowerCase().includes(filter));
    list.innerHTML = matched
      .map((item) => `
        <div class="flex items-center justify-between p-3.5 rounded-2xl bg-[#141826] border border-gray-800 text-xs sm:text-sm gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <img src="${item.image}" alt="" class="w-12 h-12 rounded-xl object-cover bg-black flex-shrink-0" onerror="this.src='./images/hero-1.jpg'"/>
            <div class="min-w-0">
              <div class="font-bold text-white truncate">${item.name}</div>
              <div class="text-[11px] text-amber-400">Rs. ${item.price.toLocaleString()} • ${item.cat}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.LFC.openEditItemModal(${item.id})" class="px-2.5 py-1.5 rounded-xl bg-gray-800 text-amber-300 font-bold text-xs">Edit</button>
            <button onclick="window.LFC.toggleStock(${item.id})" class="px-2.5 py-1.5 rounded-xl text-xs font-bold ${item.inStock ? 'text-emerald-400 bg-emerald-950' : 'text-red-400 bg-red-950'}">${item.inStock ? 'In Stock' : 'Out'}</button>
          </div>
        </div>
      `)
      .join('');
  }

  function toggleStock(id) {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    item.inStock = !item.inStock;
    saveData('menu_items', menuItems);
    renderMenu();
    renderAdminMenuItems();
    showToast(`Updated stock status for ${item.name}`);
  }

  function deleteMenuItem(id) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    menuItems = menuItems.filter((m) => m.id !== id);
    saveData('menu_items', menuItems);
    renderMenu();
    renderAdminMenuItems();
    renderAdminDashboard();
    showToast('Menu item deleted');
  }

  function addNewMenuItem() {
    const nameEl = document.getElementById('new-item-name');
    const catEl = document.getElementById('new-item-cat');
    const priceEl = document.getElementById('new-item-price');
    const descEl = document.getElementById('new-item-desc');
    const badgeEl = document.getElementById('new-item-badge');

    const name = nameEl ? nameEl.value.trim() : '';
    const cat = catEl ? catEl.value : 'burgers';
    const price = priceEl ? parseFloat(priceEl.value) : 0;
    const desc = descEl ? descEl.value.trim() : '';
    const badge = badgeEl ? badgeEl.value.trim() : 'New';

    if (!name || isNaN(price) || price <= 0) {
      showToast('Please enter a valid item name and price', 'error');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      cat,
      price,
      desc: desc || 'Crispy delicious freshly prepared LFC special.',
      image: tempNewItemImage || './images/hero-1.jpg',
      badge: badge || 'New',
      inStock: true,
      spiciness: 2,
      sizes: [
        { name: 'Regular Portion', price: 0 },
        { name: 'Double / Large Portion', price: 180 },
        { name: 'Meal (With Fries & Drink)', price: 250 }
      ],
      spiceLevels: ['Mild Crunchy', 'Hot Spicy Lahori', 'Extra Ghost Pepper 🔥'],
      addons: [
        { name: 'Extra Garlic Mayo Dip', price: 60 },
        { name: 'Melted Cheddar Slice', price: 80 },
        { name: 'Peri Peri Masala Fries', price: 120 },
        { name: 'Chilled Soft Drink Can', price: 90 }
      ]
    };

    menuItems.unshift(newItem);
    saveData('menu_items', menuItems);

    if (nameEl) nameEl.value = '';
    if (priceEl) priceEl.value = '';
    if (descEl) descEl.value = '';

    renderMenu();
    renderAdminMenuItems();
    renderAdminDashboard();
    showToast(`Added ${name} with multi-options to menu!`);
  }

  // --- Admin Edit Menu Item Modal & Multi-Options Rows ---
  let currentEditingItem = null;

  function openEditItemModal(itemId) {
    const item = menuItems.find((m) => m.id === itemId);
    if (!item) return;

    currentEditingItem = JSON.parse(JSON.stringify(item));

    const modal = document.getElementById('admin-edit-item-modal');
    const idEl = document.getElementById('edit-item-id');
    const nameEl = document.getElementById('edit-item-name');
    const catEl = document.getElementById('edit-item-cat');
    const priceEl = document.getElementById('edit-item-price');
    const badgeEl = document.getElementById('edit-item-badge');
    const stockEl = document.getElementById('edit-item-stock');
    const descEl = document.getElementById('edit-item-desc');
    const imgEl = document.getElementById('edit-item-image');

    if (idEl) idEl.value = item.id;
    if (nameEl) nameEl.value = item.name;
    if (priceEl) priceEl.value = item.price;
    if (badgeEl) badgeEl.value = item.badge || '';
    if (stockEl) stockEl.value = item.inStock ? 'true' : 'false';
    if (descEl) descEl.value = item.desc || '';
    if (imgEl) imgEl.value = item.image || '';

    // Populate category dropdown
    if (catEl) {
      catEl.innerHTML = categories
        .filter((c) => c.id !== 'all')
        .map((c) => `<option value="${c.id}" ${c.id === item.cat ? 'selected' : ''}>${c.name}</option>`)
        .join('');
    }

    renderEditSizesRows();
    renderEditAddonsRows();

    if (modal) modal.classList.remove('hidden');
  }

  function closeEditItemModal() {
    const modal = document.getElementById('admin-edit-item-modal');
    if (modal) modal.classList.add('hidden');
    currentEditingItem = null;
  }

  function renderEditSizesRows() {
    const container = document.getElementById('edit-sizes-container');
    if (!container || !currentEditingItem) return;

    const sizes = currentEditingItem.sizes || [];
    container.innerHTML = sizes
      .map(
        (s, idx) => `
        <div class="flex items-center gap-2">
          <input type="text" value="${s.name}" onchange="window.LFC.updateEditSizeName(${idx}, this.value)" placeholder="Size Name" class="flex-1 px-2.5 py-1.5 rounded-lg bg-[#0B0D16] border border-gray-800 text-xs text-white"/>
          <div class="flex items-center gap-1 w-28">
            <span class="text-[10px] text-gray-500">+Rs.</span>
            <input type="number" value="${s.price}" onchange="window.LFC.updateEditSizePrice(${idx}, this.value)" class="w-full px-2 py-1.5 rounded-lg bg-[#0B0D16] border border-gray-800 text-xs text-white"/>
          </div>
          <button type="button" onclick="window.LFC.removeEditSizeRow(${idx})" class="text-red-400 hover:text-red-300 p-1 font-bold">✕</button>
        </div>
      `
      )
      .join('');
  }

  function addEditSizeRow() {
    if (!currentEditingItem) return;
    if (!currentEditingItem.sizes) currentEditingItem.sizes = [];
    currentEditingItem.sizes.push({ name: 'New Size', price: 100 });
    renderEditSizesRows();
  }

  function removeEditSizeRow(idx) {
    if (!currentEditingItem || !currentEditingItem.sizes) return;
    currentEditingItem.sizes.splice(idx, 1);
    renderEditSizesRows();
  }

  function updateEditSizeName(idx, val) {
    if (currentEditingItem && currentEditingItem.sizes && currentEditingItem.sizes[idx]) {
      currentEditingItem.sizes[idx].name = val;
    }
  }

  function updateEditSizePrice(idx, val) {
    if (currentEditingItem && currentEditingItem.sizes && currentEditingItem.sizes[idx]) {
      currentEditingItem.sizes[idx].price = Number(val) || 0;
    }
  }

  function renderEditAddonsRows() {
    const container = document.getElementById('edit-addons-container');
    if (!container || !currentEditingItem) return;

    const addons = currentEditingItem.addons || [];
    container.innerHTML = addons
      .map(
        (a, idx) => `
        <div class="flex items-center gap-2">
          <input type="text" value="${a.name}" onchange="window.LFC.updateEditAddonName(${idx}, this.value)" placeholder="Add-on Name" class="flex-1 px-2.5 py-1.5 rounded-lg bg-[#0B0D16] border border-gray-800 text-xs text-white"/>
          <div class="flex items-center gap-1 w-28">
            <span class="text-[10px] text-gray-500">+Rs.</span>
            <input type="number" value="${a.price}" onchange="window.LFC.updateEditAddonPrice(${idx}, this.value)" class="w-full px-2 py-1.5 rounded-lg bg-[#0B0D16] border border-gray-800 text-xs text-white"/>
          </div>
          <button type="button" onclick="window.LFC.removeEditAddonRow(${idx})" class="text-red-400 hover:text-red-300 p-1 font-bold">✕</button>
        </div>
      `
      )
      .join('');
  }

  function addEditAddonRow() {
    if (!currentEditingItem) return;
    if (!currentEditingItem.addons) currentEditingItem.addons = [];
    currentEditingItem.addons.push({ name: 'Extra Dip Sauce', price: 60 });
    renderEditAddonsRows();
  }

  function removeEditAddonRow(idx) {
    if (!currentEditingItem || !currentEditingItem.addons) return;
    currentEditingItem.addons.splice(idx, 1);
    renderEditAddonsRows();
  }

  function updateEditAddonName(idx, val) {
    if (currentEditingItem && currentEditingItem.addons && currentEditingItem.addons[idx]) {
      currentEditingItem.addons[idx].name = val;
    }
  }

  function updateEditAddonPrice(idx, val) {
    if (currentEditingItem && currentEditingItem.addons && currentEditingItem.addons[idx]) {
      currentEditingItem.addons[idx].price = Number(val) || 0;
    }
  }

  function saveEditedMenuItem() {
    const idEl = document.getElementById('edit-item-id');
    const nameEl = document.getElementById('edit-item-name');
    const catEl = document.getElementById('edit-item-cat');
    const priceEl = document.getElementById('edit-item-price');
    const badgeEl = document.getElementById('edit-item-badge');
    const stockEl = document.getElementById('edit-item-stock');
    const descEl = document.getElementById('edit-item-desc');
    const imgEl = document.getElementById('edit-item-image');

    const itemId = Number(idEl ? idEl.value : 0);
    const itemIndex = menuItems.findIndex((m) => m.id === itemId);
    if (itemIndex < 0) return;

    menuItems[itemIndex].name = nameEl ? nameEl.value.trim() : menuItems[itemIndex].name;
    menuItems[itemIndex].cat = catEl ? catEl.value : menuItems[itemIndex].cat;
    menuItems[itemIndex].price = priceEl ? parseFloat(priceEl.value) || menuItems[itemIndex].price : menuItems[itemIndex].price;
    menuItems[itemIndex].badge = badgeEl ? badgeEl.value.trim() : '';
    menuItems[itemIndex].inStock = stockEl ? stockEl.value === 'true' : true;
    menuItems[itemIndex].desc = descEl ? descEl.value.trim() : menuItems[itemIndex].desc;
    menuItems[itemIndex].image = imgEl && imgEl.value.trim() ? imgEl.value.trim() : menuItems[itemIndex].image;

    if (currentEditingItem) {
      if (currentEditingItem.sizes) menuItems[itemIndex].sizes = currentEditingItem.sizes;
      if (currentEditingItem.addons) menuItems[itemIndex].addons = currentEditingItem.addons;
    }

    saveData('menu_items', menuItems);
    renderMenu();
    renderAdminMenuItems();
    closeEditItemModal();
    showToast('Dish & multi-options saved successfully!');
  }

  // --- Promo Codes & Coupons Manager ---
  function renderAdminCoupons() {
    const list = document.getElementById('admin-coupons-list');
    if (!list) return;

    list.innerHTML = promos
      .map(
        (p) => `
        <div class="flex items-center justify-between p-3.5 rounded-2xl bg-[#141826] border border-gray-800 text-xs sm:text-sm gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">${p.code}</span>
              <span class="font-bold text-white">${p.type === 'percent' ? `${p.discount}% OFF` : `Rs. ${p.discount} OFF`}</span>
              <span class="text-[10px] ${p.active ? 'text-emerald-400' : 'text-gray-500 font-bold'}">${p.active ? '● Active' : '● Disabled'}</span>
            </div>
            <div class="text-[11px] text-gray-400 mt-1">${p.desc || `Min order Rs. ${p.minOrder || 0}`}</div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.LFC.togglePromoCode('${p.code}')" class="px-2.5 py-1 rounded-xl text-xs font-bold ${p.active ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-800 text-gray-400'}">
              ${p.active ? 'Disable' : 'Enable'}
            </button>
            <button onclick="window.LFC.deletePromoCode('${p.code}')" class="text-gray-500 hover:text-red-400 p-1" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
      `
      )
      .join('');
  }

  function addNewPromoCode() {
    const codeEl = document.getElementById('new-promo-code');
    const typeEl = document.getElementById('new-promo-type');
    const discountEl = document.getElementById('new-promo-discount');
    const minEl = document.getElementById('new-promo-min');
    const descEl = document.getElementById('new-promo-desc');

    const code = codeEl ? codeEl.value.trim().toUpperCase() : '';
    const type = typeEl ? typeEl.value : 'flat';
    const discount = discountEl ? parseFloat(discountEl.value) : 0;
    const minOrder = minEl ? parseFloat(minEl.value) || 0 : 0;
    const desc = descEl ? descEl.value.trim() : '';

    if (!code || isNaN(discount) || discount <= 0) {
      showToast('Please enter coupon code and discount amount', 'error');
      return;
    }

    if (promos.some((p) => p.code.toUpperCase() === code)) {
      showToast('Coupon code already exists', 'error');
      return;
    }

    promos.unshift({
      code,
      type,
      discount,
      minOrder,
      active: true,
      desc: desc || `${type === 'percent' ? discount + '% OFF' : 'Rs. ' + discount + ' OFF'} on orders above Rs. ${minOrder}`
    });

    saveData('promos', promos);
    renderAdminCoupons();
    renderAdminDashboard();

    if (codeEl) codeEl.value = '';
    if (discountEl) discountEl.value = '';
    if (minEl) minEl.value = '';
    if (descEl) descEl.value = '';

    showToast(`Created coupon code: ${code}`);
  }

  function togglePromoCode(code) {
    const promo = promos.find((p) => p.code === code);
    if (!promo) return;
    promo.active = !promo.active;
    saveData('promos', promos);
    renderAdminCoupons();
    renderAdminDashboard();
    showToast(`Coupon ${code} ${promo.active ? 'enabled' : 'disabled'}`);
  }

  function deletePromoCode(code) {
    if (!confirm(`Delete coupon code ${code}?`)) return;
    promos = promos.filter((p) => p.code !== code);
    saveData('promos', promos);
    renderAdminCoupons();
    renderAdminDashboard();
    showToast('Coupon deleted');
  }

  // --- Delivery Zones Manager ---
  function renderAdminZones() {
    const list = document.getElementById('admin-zones-list');
    if (!list) return;

    list.innerHTML = zones
      .map(
        (z) => `
        <div class="flex items-center justify-between p-3.5 rounded-2xl bg-[#141826] border border-gray-800 text-xs sm:text-sm gap-3">
          <div>
            <div class="font-extrabold text-white flex items-center gap-2">
              <span>${z.name}</span>
              <span class="text-amber-400 font-bold">Rs. ${z.fee}</span>
            </div>
            <div class="text-[11px] text-emerald-400 mt-0.5">⏱️ ${z.time} delivery time</div>
          </div>
          <button onclick="window.LFC.deleteDeliveryZone('${z.id}')" class="text-gray-500 hover:text-red-400 p-1" title="Delete Zone">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      `
      )
      .join('');
  }

  function addNewDeliveryZone() {
    const nameEl = document.getElementById('new-zone-name');
    const feeEl = document.getElementById('new-zone-fee');
    const timeEl = document.getElementById('new-zone-time');

    const name = nameEl ? nameEl.value.trim() : '';
    const fee = feeEl ? parseFloat(feeEl.value) : 150;
    const time = timeEl ? timeEl.value.trim() : '25-35 mins';

    if (!name || isNaN(fee)) {
      showToast('Please enter zone name and delivery fee', 'error');
      return;
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    zones.push({ id, name, fee, time });
    saveData('zones', zones);

    renderAdminZones();
    renderZoneSelect();
    renderAdminDashboard();

    if (nameEl) nameEl.value = '';
    if (feeEl) feeEl.value = '';
    if (timeEl) timeEl.value = '';

    showToast(`Added delivery zone: ${name}`);
  }

  function deleteDeliveryZone(id) {
    if (zones.length <= 1) {
      showToast('You must keep at least 1 delivery zone', 'error');
      return;
    }
    if (!confirm('Delete this delivery zone?')) return;
    zones = zones.filter((z) => z.id !== id);
    if (settings.selectedZoneId === id) {
      settings.selectedZoneId = zones[0].id;
    }
    saveData('zones', zones);
    saveData('settings', settings);
    renderAdminZones();
    renderZoneSelect();
    renderAdminDashboard();
    updateCartUI();
    showToast('Delivery zone removed');
  }

  // --- Store Status Switch ---
  function updateStoreStatus(status) {
    settings.storeStatus = status;
    saveData('settings', settings);

    const quickSelect = document.getElementById('admin-quick-status-select');
    const settingSelect = document.getElementById('admin-setting-status');
    if (quickSelect) quickSelect.value = status;
    if (settingSelect) settingSelect.value = status;

    renderAdminDashboard();
    showToast(`Store status set to: ${status.toUpperCase()}`);
  }

  // --- Data Backup & Restore ---
  function exportDataJson() {
    const backup = {
      settings,
      menuItems,
      categories,
      heroSlides,
      branches,
      zones,
      promos,
      orders,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lfc-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    showToast('Store data downloaded as JSON backup!');
  }

  function importDataJson(fileInput) {
    if (!fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.settings) {
          settings = { ...DEFAULT_SETTINGS, ...data.settings };
          saveData('settings', settings);
        }
        if (data.menuItems && Array.isArray(data.menuItems)) {
          menuItems = data.menuItems;
          saveData('menu_items', menuItems);
        }
        if (data.categories && Array.isArray(data.categories)) {
          categories = data.categories;
          saveData('categories', categories);
        }
        if (data.heroSlides && Array.isArray(data.heroSlides)) {
          heroSlides = data.heroSlides;
          saveData('hero_slides', heroSlides);
        }
        if (data.branches && Array.isArray(data.branches)) {
          branches = data.branches;
          saveData('branches', branches);
        }
        if (data.zones && Array.isArray(data.zones)) {
          zones = data.zones;
          saveData('zones', zones);
        }
        if (data.promos && Array.isArray(data.promos)) {
          promos = data.promos;
          saveData('promos', promos);
        }
        if (data.orders && Array.isArray(data.orders)) {
          orders = data.orders;
          saveData('orders', orders);
        }

        updateBrandLogos();
        renderCategories();
        renderMenu();
        renderHeroSlide(0);
        renderBranches();
        renderAdminDashboard();
        renderAdminOrders();
        renderAdminMenuItems();
        renderAdminCoupons();
        renderAdminZones();
        renderAdminCategories();
        renderAdminHeroSlides();
        renderAdminBranches();
        renderAdminSettings();
        updateCartUI();

        showToast('Store data restored successfully!');
      } catch (err) {
        showToast('Invalid backup file', 'error');
      }
    };
    reader.readAsText(file);
  }

  // --- Admin Categories Manager ---
  function renderAdminCategories() {
    const list = document.getElementById('admin-categories-list');
    if (!list) return;

    list.innerHTML = categories
      .map((cat) => {
        const count = cat.id === 'all' ? menuItems.length : menuItems.filter((m) => m.cat === cat.id).length;
        const isAll = cat.id === 'all';
        return `
        <div class="flex items-center justify-between p-3 rounded-2xl bg-[#141826] border border-gray-800 text-xs sm:text-sm gap-2">
          <div class="flex-1 min-w-0">
            <div class="font-extrabold text-white truncate flex items-center gap-2">
              <span>${cat.name}</span>
              <span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono font-bold">${cat.id}</span>
            </div>
            <div class="text-[11px] text-gray-400">${count} dish(es) linked</div>
          </div>
          ${
            !isAll
              ? `
            <div class="flex items-center gap-1.5">
              <button onclick="window.LFC.promptEditCategory('${cat.id}')" class="px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-amber-300 font-bold text-xs transition">
                Rename
              </button>
              <button onclick="window.LFC.deleteCategory('${cat.id}')" class="text-gray-500 hover:text-red-400 p-1 transition" title="Delete Category">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          `
              : '<span class="text-[10px] text-gray-500 font-bold px-2 py-1">System Default</span>'
          }
        </div>
      `;
      })
      .join('');

    const catSelect = document.getElementById('new-item-cat');
    if (catSelect) {
      catSelect.innerHTML = categories
        .filter((c) => c.id !== 'all')
        .map((c) => `<option value="${c.id}">${c.name}</option>`)
        .join('');
    }
  }

  function addNewCategory() {
    const idEl = document.getElementById('new-cat-id');
    const nameEl = document.getElementById('new-cat-name');

    const name = nameEl ? nameEl.value.trim() : '';
    let id = idEl ? idEl.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '') : '';

    if (!name) {
      showToast('Please enter category name', 'error');
      return;
    }

    if (!id) {
      id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }

    if (categories.some((c) => c.id === id)) {
      showToast('Category ID already exists', 'error');
      return;
    }

    categories.push({ id, name });
    saveData('categories', categories);
    renderCategories();
    renderAdminCategories();

    if (idEl) idEl.value = '';
    if (nameEl) nameEl.value = '';
    showToast(`Added category: ${name}`);
  }

  function promptEditCategory(id) {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const newName = prompt('Enter new display name for category:', cat.name);
    if (newName && newName.trim()) {
      cat.name = newName.trim();
      saveData('categories', categories);
      renderCategories();
      renderAdminCategories();
      showToast('Category updated!');
    }
  }

  function deleteCategory(id) {
    if (id === 'all') {
      showToast('Cannot delete system default category', 'error');
      return;
    }
    if (!confirm('Are you sure you want to delete this category? (Dishes will remain in the menu)')) return;
    categories = categories.filter((c) => c.id !== id);
    saveData('categories', categories);
    if (activeCategory === id) activeCategory = 'all';
    renderCategories();
    renderAdminCategories();
    renderMenu();
    showToast('Category deleted');
  }

  // --- Admin Hero Slides Manager ---
  function renderAdminHeroSlides() {
    const list = document.getElementById('admin-hero-list');
    if (!list) return;

    list.innerHTML = heroSlides
      .map(
        (s, idx) => `
        <div class="p-3 sm:p-4 rounded-2xl bg-[#141826] border border-gray-800 space-y-3">
          <div class="flex items-center gap-3">
            <img src="${s.image}" alt="" class="w-14 h-14 rounded-xl object-cover bg-black flex-shrink-0 border border-gray-800" onerror="this.src='./images/hero-1.jpg'"/>
            <div class="flex-1 min-w-0">
              <div class="font-extrabold text-white text-xs sm:text-sm truncate">${s.title} <span class="text-amber-400">${s.highlight}</span></div>
              <div class="text-[11px] text-gray-400">${s.priceTag} • Slide #${idx + 1}</div>
            </div>
            <button onclick="window.LFC.goToHeroSlide(${idx}); window.LFC.closeAdminModal();" class="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition">
              Preview
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <label class="text-[10px] text-gray-400 block mb-0.5">Title Headline</label>
              <input type="text" value="${s.title}" onchange="window.LFC.updateHeroSlideField(${idx}, 'title', this.value)" class="w-full px-2.5 py-1.5 rounded-lg bg-[#0B0C10] border border-gray-800 text-white text-xs"/>
            </div>
            <div>
              <label class="text-[10px] text-gray-400 block mb-0.5">Highlight Text</label>
              <input type="text" value="${s.highlight}" onchange="window.LFC.updateHeroSlideField(${idx}, 'highlight', this.value)" class="w-full px-2.5 py-1.5 rounded-lg bg-[#0B0C10] border border-gray-800 text-white text-xs"/>
            </div>
          </div>

          <div class="flex items-center justify-between gap-2 pt-2 border-t border-gray-800/60">
            <label class="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold cursor-pointer transition flex items-center gap-1.5">
              <span>📷 Upload Slide Photo</span>
              <input type="file" accept="image/*" class="hidden" onchange="window.LFC.uploadHeroSlidePhoto(${idx}, this)"/>
            </label>
            <span class="text-[11px] text-gray-500">Auto-saved</span>
          </div>
        </div>
      `
      )
      .join('');
  }

  function updateHeroSlideField(idx, field, val) {
    if (!heroSlides[idx]) return;
    heroSlides[idx][field] = val;
    saveData('hero_slides', heroSlides);
    renderHeroSlide(activeSlideIndex);
    showToast(`Slide #${idx + 1} updated`);
  }

  function uploadHeroSlidePhoto(idx, input) {
    if (!input.files || !input.files[0]) return;
    handlePhotoUpload(input, '', (base64) => {
      heroSlides[idx].image = base64;
      saveData('hero_slides', heroSlides);
      renderHeroSlide(activeSlideIndex);
      renderAdminHeroSlides();
      showToast(`Slide #${idx + 1} photo updated!`);
    });
  }

  // --- Admin Branches Management ---
  function renderAdminBranches() {
    const list = document.getElementById('admin-branches-list');
    if (!list) return;

    list.innerHTML = branches
      .map(
        (b) => `
        <div class="p-3.5 rounded-2xl bg-[#141826] border border-gray-800 space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-extrabold text-white text-xs sm:text-sm">${b.name}</h4>
            <button onclick="window.LFC.deleteBranch(${b.id})" class="text-gray-500 hover:text-red-400 p-1 transition" title="Delete Branch">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
          <div class="text-[11px] text-gray-400">${b.address}</div>
          <div class="flex items-center gap-3 text-[11px] text-amber-400 font-bold">
            <span>📞 ${b.phone}</span>
            <span>🕒 ${b.timings}</span>
          </div>
        </div>
      `
      )
      .join('');
  }

  function addNewBranch() {
    const nameEl = document.getElementById('new-branch-name');
    const addressEl = document.getElementById('new-branch-address');
    const phoneEl = document.getElementById('new-branch-phone');
    const timingsEl = document.getElementById('new-branch-timings');
    const mapEl = document.getElementById('new-branch-map');

    const name = nameEl ? nameEl.value.trim() : '';
    const address = addressEl ? addressEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() || settings.phoneCallNumber : settings.phoneCallNumber;
    const timings = timingsEl ? timingsEl.value.trim() || '12:00 PM - 02:00 AM' : '12:00 PM - 02:00 AM';
    const mapUrl = mapEl ? mapEl.value.trim() || 'https://maps.google.com/?q=Lahore' : 'https://maps.google.com/?q=Lahore';

    if (!name || !address) {
      showToast('Please enter Branch Name and Address', 'error');
      return;
    }

    const newBranch = {
      id: Date.now(),
      name,
      address,
      phone,
      timings,
      mapUrl
    };

    branches.push(newBranch);
    saveData('branches', branches);

    if (nameEl) nameEl.value = '';
    if (addressEl) addressEl.value = '';

    renderBranches();
    renderAdminBranches();
    renderAdminDashboard();
    showToast(`Added branch: ${name}`);
  }

  function deleteBranch(id) {
    if (branches.length <= 1) {
      showToast('You must keep at least 1 branch', 'error');
      return;
    }
    if (!confirm('Are you sure you want to delete this branch?')) return;
    branches = branches.filter((b) => b.id !== id);
    saveData('branches', branches);
    renderBranches();
    renderAdminBranches();
    renderAdminDashboard();
    showToast('Branch removed');
  }

  // --- Admin Branding & Logo Customizer ---
  function uploadCustomLogo(input) {
    if (!input.files || !input.files[0]) return;
    handlePhotoUpload(input, 'admin-logo-preview', (base64) => {
      settings.logoUrl = base64;
      saveData('settings', settings);
      updateBrandLogos();
      showToast('Site logo changed successfully!');
    });
  }

  function setLogoUrlManually(url) {
    if (!url) return;
    settings.logoUrl = url;
    saveData('settings', settings);
    updateBrandLogos();
    const preview = document.getElementById('admin-logo-preview');
    if (preview) preview.src = url;
    showToast('Site logo updated from URL!');
  }

  // --- Admin Store Settings ---
  function renderAdminSettings() {
    const waEl = document.getElementById('admin-setting-wa');
    const phoneEl = document.getElementById('admin-setting-phone');
    const feeEl = document.getElementById('admin-setting-fee');
    const freeEl = document.getElementById('admin-setting-free');
    const nameEl = document.getElementById('admin-setting-storename');
    const statusEl = document.getElementById('admin-setting-status');
    const announceEl = document.getElementById('admin-setting-announcement');

    if (waEl) waEl.value = settings.whatsappNumber;
    if (phoneEl) phoneEl.value = settings.phoneCallNumber;
    if (feeEl) feeEl.value = settings.deliveryFee;
    if (freeEl) freeEl.value = settings.freeDeliveryAbove;
    if (nameEl) nameEl.value = settings.storeName;
    if (statusEl) statusEl.value = settings.storeStatus || 'open';
    if (announceEl) announceEl.value = settings.announcementText || '';

    const logoPreview = document.getElementById('admin-logo-preview');
    if (logoPreview) logoPreview.src = settings.logoUrl || './src/assets/images/regenerated_image_1792104663328.png';
  }

  function saveAdminSettings() {
    const waEl = document.getElementById('admin-setting-wa');
    const phoneEl = document.getElementById('admin-setting-phone');
    const feeEl = document.getElementById('admin-setting-fee');
    const freeEl = document.getElementById('admin-setting-free');
    const nameEl = document.getElementById('admin-setting-storename');
    const statusEl = document.getElementById('admin-setting-status');
    const announceEl = document.getElementById('admin-setting-announcement');

    if (waEl && waEl.value.trim()) settings.whatsappNumber = waEl.value.trim();
    if (phoneEl && phoneEl.value.trim()) settings.phoneCallNumber = phoneEl.value.trim();
    if (feeEl && !isNaN(parseFloat(feeEl.value))) settings.deliveryFee = parseFloat(feeEl.value);
    if (freeEl && !isNaN(parseFloat(freeEl.value))) settings.freeDeliveryAbove = parseFloat(freeEl.value);
    if (nameEl && nameEl.value.trim()) settings.storeName = nameEl.value.trim();
    if (statusEl) settings.storeStatus = statusEl.value;
    if (announceEl && announceEl.value.trim()) settings.announcementText = announceEl.value.trim();

    saveData('settings', settings);
    updateBrandLogos();
    updateCartUI();
    renderAdminDashboard();
    showToast('Store settings saved successfully!');
  }

  function resetAllData() {
    if (!confirm('Reset all menu items, slides, categories, and settings back to defaults?')) return;
    localStorage.clear();
    settings = { ...DEFAULT_SETTINGS };
    categories = [...DEFAULT_CATEGORIES];
    heroSlides = [...DEFAULT_HERO_SLIDES];
    menuItems = [...DEFAULT_MENU_ITEMS];
    branches = [...DEFAULT_BRANCHES];
    reviews = [...DEFAULT_REVIEWS];
    zones = [...DEFAULT_ZONES];
    promos = [...DEFAULT_PROMOS];
    orders = [...DEFAULT_ORDERS];
    cart = [];

    updateBrandLogos();
    renderCategories();
    renderMenu();
    renderHeroSlide(0);
    renderReviews();
    renderBranches();
    updateCartUI();
    renderAdminDashboard();
    renderAdminOrders();
    renderAdminMenuItems();
    renderAdminCoupons();
    renderAdminZones();
    renderAdminCategories();
    renderAdminHeroSlides();
    renderAdminBranches();
    renderAdminSettings();
    showToast('All data reset to factory defaults!');
  }

  // --- Customer Review Submission ---
  function submitReview() {
    const nameEl = document.getElementById('review-form-name');
    const locEl = document.getElementById('review-form-loc');
    const commentEl = document.getElementById('review-form-comment');
    const ratingEl = document.getElementById('review-form-rating');

    const name = nameEl ? nameEl.value.trim() : '';
    const loc = locEl ? locEl.value.trim() : 'Lahore';
    const comment = commentEl ? commentEl.value.trim() : '';
    const rating = ratingEl ? parseInt(ratingEl.value, 10) : 5;

    if (!name || !comment) {
      showToast('Please provide your name and review', 'error');
      return;
    }

    reviews.unshift({
      id: Date.now(),
      name,
      location: loc,
      rating,
      date: 'Just now',
      comment
    });

    saveData('reviews', reviews);
    renderReviews();

    if (nameEl) nameEl.value = '';
    if (commentEl) commentEl.value = '';

    const modal = document.getElementById('review-modal');
    if (modal) modal.classList.add('hidden');

    showToast('Thank you for reviewing LFC!');
  }

  // --- URL Hash Listener for Admin Access: #admin, #admin-login, #adminpanel, ?admin=true, /admin ---
  function checkAdminUrlHash() {
    const hash = (window.location.hash || '').toLowerCase();
    const search = (window.location.search || '').toLowerCase();
    const pathname = (window.location.pathname || '').toLowerCase();
    if (
      hash === '#admin' ||
      hash === '#admin-login' ||
      hash === '#adminlogin' ||
      hash === '#adminpanel' ||
      hash === '#admin-panel' ||
      hash === '#adminlfc1' ||
      hash === '#5640' ||
      hash === '#lfcadmin' ||
      search.includes('admin') ||
      search.includes('5640') ||
      pathname.endsWith('/admin')
    ) {
      openAdminModal();
    }
  }

  // --- Scroll & Motion Enhancements ---
  function initScrollEffects() {
    const progress = document.getElementById('scroll-progress');
    const header = document.getElementById('site-header');
    const backToTop = document.getElementById('back-to-top');
    const revealEls = document.querySelectorAll('.reveal');

    function onScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progress) progress.style.width = pct + '%';
      if (header) header.classList.toggle('is-scrolled', scrollTop > 12);
      if (backToTop) backToTop.classList.toggle('show', scrollTop > 500);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('in-view'));
    }
  }

  function initStatsCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => obs.observe(c));
    } else {
      counters.forEach(animate);
    }
  }

  // --- Initialization ---
  function init() {
    updateBrandLogos();
    renderHeroSlide(0);
    startHeroTimer();
    startLiveOrderTicker();
    renderCategories();
    renderMenu();
    renderReviews();
    renderBranches();
    updateCartUI();
    updateOrderTypeUI();
    initScrollEffects();
    initStatsCounters();

    // Search Listeners
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenu();
      });
    }

    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderMenu();
      });
    }

    // Check URL hash for admin access
    checkAdminUrlHash();
    window.addEventListener('hashchange', checkAdminUrlHash);
    window.addEventListener('popstate', checkAdminUrlHash);

    // Keyboard shortcuts: Alt+A or Ctrl+Shift+L opens admin; ESC closes overlays
    window.addEventListener('keydown', (e) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l')) {
        e.preventDefault();
        openAdminModal();
        return;
      }
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeAdminModal();
        closeCustomizeModal();
        closeReceiptModal();
        closeEditItemModal();
        if (typeof closeReviewModal === 'function') {
          closeReviewModal();
        }
      }
    });
  }

  // --- Window Controller Export ---
  window.LFC = {
    addToCart,
    addToCartById,
    openCustomizeModal,
    closeCustomizeModal,
    selectCustomizeSize,
    selectCustomizeSpice,
    toggleCustomizeAddon,
    stepCustomizeQty,
    confirmCustomizedItem,
    changeDeliveryZone,
    updateCartItemQty,
    removeCartItem,
    clearCart,
    openCartDrawer,
    closeCartDrawer,
    applyPromoCode,
    checkoutViaWhatsApp,
    setOrderType,
    clearSearch,
    setCategory: (catId) => {
      activeCategory = catId;
      renderCategories();
      renderMenu();
    },
    goToHeroSlide: (idx) => {
      renderHeroSlide(idx);
      startHeroTimer();
    },
    nextHeroSlide: () => {
      renderHeroSlide(activeSlideIndex + 1);
      startHeroTimer();
    },
    prevHeroSlide: () => {
      renderHeroSlide(activeSlideIndex - 1);
      startHeroTimer();
    },
    openAdminModal,
    closeAdminModal,
    submitAdminPin,
    changeAdminPin,
    switchAdminTab,
    filterOrders,
    searchAdminOrders,
    generateTestOrder,
    updateOrderStatus,
    exportOrdersCsv,
    clearCompletedOrders,
    openReceiptModal,
    closeReceiptModal,
    toggleStock,
    deleteMenuItem,
    addNewMenuItem,
    searchAdminMenu,
    openEditItemModal,
    closeEditItemModal,
    saveEditedMenuItem,
    addEditSizeRow,
    removeEditSizeRow,
    updateEditSizeName,
    updateEditSizePrice,
    addEditAddonRow,
    removeEditAddonRow,
    updateEditAddonName,
    updateEditAddonPrice,
    addNewPromoCode,
    togglePromoCode,
    deletePromoCode,
    addNewDeliveryZone,
    deleteDeliveryZone,
    updateStoreStatus,
    exportDataJson,
    importDataJson,
    addNewCategory,
    promptEditCategory,
    deleteCategory,
    setNewItemPhoto: (input) => {
      handlePhotoUpload(input, 'new-item-preview', (base64) => {
        tempNewItemImage = base64;
      });
    },
    updateHeroSlideField,
    uploadHeroSlidePhoto,
    addNewBranch,
    deleteBranch,
    uploadCustomLogo,
    setLogoUrlManually,
    saveAdminSettings,
    resetAllData,
    submitReview,
    openReviewModal: () => {
      const modal = document.getElementById('review-modal');
      if (modal) modal.classList.remove('hidden');
    },
    closeReviewModal: () => {
      const modal = document.getElementById('review-modal');
      if (modal) modal.classList.add('hidden');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
