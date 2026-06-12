/* site-config.js — Best Hosting Match */
const SITE_CONFIG = {
  affiliateActive: false,
  dataLastVerified: "2026-06-12",
  providerCount: 22,
  siteName: "Best Hosting Match",
  siteUrl: "https://besthostingmatch.com"
};

const HOSTING_HOME_LINKS = {
  hostinger:     "https://www.hostinger.com",
  bluehost:      "https://www.bluehost.com",
  dreamhost:     "https://www.dreamhost.com",
  siteground:    "https://www.siteground.com",
  ionos:         "https://www.ionos.com",
  namecheap:     "https://www.namecheap.com",
  a2hosting:     "https://www.a2hosting.com",
  greengeeks:    "https://www.greengeeks.com",
  inmotion:      "https://www.inmotionhosting.com",
  hostgator:     "https://www.hostgator.com",
  kinsta:        "https://kinsta.com",
  wpengine:      "https://wpengine.com",
  cloudways:     "https://www.cloudways.com",
  pressable:     "https://pressable.com",
  rocketnet:     "https://rocket.net",
  flywheel:      "https://getflywheel.com",
  digitalocean:  "https://www.digitalocean.com",
  vultr:         "https://www.vultr.com",
  linode:        "https://www.linode.com",
  hetzner:       "https://www.hetzner.com",
  liquidweb:     "https://www.liquidweb.com",
  ionosdedicated:"https://www.ionos.com/servers/dedicated-servers"
};

/* Fill when affiliate programs approved */
const AFFILIATE_LINKS = {};

/* [savingsPct, regularMonthlyPrice] — shown only when affiliateActive: true */
const HOSTING_SAVINGS = {
  hostinger:     [60, 9.99],
  bluehost:      [55, 11.99],
  dreamhost:     [48, 4.95],
  siteground:    [70, 14.99],
  ionos:         [80, 8.00],
  namecheap:     [55, 4.48],
  a2hosting:     [60, 11.99],
  greengeeks:    [70, 10.95],
  inmotion:      [55, 8.99],
  hostgator:     [60, 10.95],
  kinsta:        [0,  35.00],
  wpengine:      [0,  20.00],
  cloudways:     [0,  11.00],
  pressable:     [0,  25.00],
  rocketnet:     [0,  30.00],
  flywheel:      [0,  15.00],
  digitalocean:  [0,  6.00],
  vultr:         [0,  6.00],
  linode:        [0,  5.00],
  hetzner:       [0,  4.00],
  liquidweb:     [0,  150.00],
  ionosdedicated:[0,  65.00]
};

function affiliateHref(id) {
  if (SITE_CONFIG.affiliateActive && AFFILIATE_LINKS[id]) return AFFILIATE_LINKS[id];
  return HOSTING_HOME_LINKS[id] || "#";
}

function outboundRel() {
  return SITE_CONFIG.affiliateActive ? "noopener sponsored" : "noopener noreferrer";
}

function outboundLabel() {
  return SITE_CONFIG.affiliateActive ? "Affiliate link" : "Official site";
}
