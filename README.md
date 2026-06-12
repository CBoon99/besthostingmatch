# Best Hosting Match

**The web hosting comparison that shows you the renewal price — not just the intro offer.**

[besthostingmatch.com](https://besthostingmatch.com) · Independent · Editorial · No paid rankings

---

Every "best hosting" list on the internet is ranked by who pays the biggest affiliate commission. Renewal prices are buried. Beginners drown in jargon; pros get patronised. Best Hosting Match does the opposite: **one transparent scoring system, applied equally to 22 providers, with the renewal-price trap shown front and centre.**

It's the hosting member of the **Best Match network** — alongside [Best VPN Match](https://bestvpnmatch.com) and [Best VPS Match](https://bestvpsmatch.com). Same DNA: honest, editorial-first, built to be useful before it's monetised.

---

## The one number nobody else shows you

Hosts advertise **$2.99/mo** to win you, then renew at **$9.99–$14.99/mo**. Over three years that's hundreds of dollars you didn't budget for.

So we calculate the **True 3-Year Cost**:

```
True 3-Year Cost = (entry price × 12) + (renewal price × 24)
```

| Provider | Intro | Renewal | True 3-Year Cost |
|----------|-------|---------|------------------|
| Hostinger | $2.99/mo | $9.99/mo | **$276** |
| SiteGround | $3.99/mo | $14.99/mo | **$408** |

Hostinger *looks* a dollar cheaper. Over three years it's $132 cheaper. Now you can see that **before** you buy. It's in every card, every table, and on its own [dedicated page](https://besthostingmatch.com/hosting-renewal-price-comparison).

---

## Built for beginners and pros at the same time

The hardest problem in hosting comparison: a beginner and a developer need completely different information from the same page. We solve it with **progressive disclosure**:

- **Beginners** get plain-English labels ("Speed: how fast your site loads"), price focus, and simple recommendations.
- **Pros** flip the **Pro view** toggle to reveal uptime SLAs, TTFB, staging, SSH, scalability — and tooltips explain every metric.

Nobody's left out. Nobody's patronised.

---

## How the scoring works

22 providers across **shared, managed WordPress, cloud, VPS, and dedicated**, scored on 8 weighted factors:

| Factor | Weight |
|--------|--------|
| Performance | 25% |
| Uptime / Reliability | 20% |
| Price / Value | 20% |
| Support | 15% |
| Security | 10% |
| Ease of Use | 5% |
| Scalability | 3% |
| Developer Features | 2% |

Scores are **editorial** — based on published specs, SLA documentation, and public benchmark reports. **No first-person lab tests, no paid placement.** Defensible, not absolute, and every score links to its source. Full rubric on the [methodology page](https://besthostingmatch.com/methodology).

---

## Tech

Pure static **HTML/CSS/JS**. No framework, no npm, no webpack, no build step on the live site. It just works in the browser and deploys to Netlify from the repo root.

```
data/           site-config.js · scoring.js · hosting-data.js · hosting-comparison-2026.json
assets/         widgets.js   — declarative data-widget renderer (cards · table · vs)
scripts/        build-landing.js — Node generator → plain static landing pages
index.html      hand-authored homepage (self-contained)
styles.css      shared theme for every other page
*.html          22+ landing, comparison, transparency & legal pages
```

Data loads in a strict order (`site-config → scoring → hosting-data`), leaving a fully enriched, ranked `HOSTINGS` array ready for the page. Landing pages are generated from a single template that holds the unique SEO copy — re-run `node scripts/build-landing.js` after editing.

**Theme:** light by default (warm off-white), with a dark toggle. Orange (`#f97316`) used with restraint — premium SaaS, not a billboard.

---

## What's live

- **Homepage** — hero, intent tiles, top picks, head-to-head hub, full comparison table with True 3-Year Cost, match quiz, educational explainers, FAQ
- **Flagship** — the [renewal-price comparison](https://besthostingmatch.com/hosting-renewal-price-comparison)
- **Guides** — cheapest hosting, best WordPress hosting, beginners, small business, agencies, nonprofits, high traffic, reseller, green/eco
- **Head-to-heads** — Hostinger vs Bluehost, Kinsta vs WP Engine, Cloudways vs Kinsta, and more
- **Transparency** — methodology, about, ethics, privacy & legal
- **AI discovery** — `llms.txt`, `agents.txt`, `ai.txt`, `.well-known/ai.json`, and a machine-readable [JSON endpoint](https://besthostingmatch.com/data/hosting-comparison-2026.json)

---

## Business model

Right now: **nothing.** Zero affiliate links. Every "Visit site" button points to the provider's official homepage. We're building trust first.

When affiliate partnerships are added, they'll be clearly disclosed, marked, and — critically — **they will never change a score or ranking.** The architecture (`affiliateActive` flag) keeps the two completely separate. See [ethics](https://besthostingmatch.com/ethics).

---

## Deployment

Static site on **Netlify**, publish dir `.`, clean URLs via `_redirects`. Pushes to `main` auto-deploy.

```bash
cd ~/Documents/BestHostingMatch
git add -A
git commit -m "your message"
git push origin main
```

---

*Run independently by Carl Boon. No company entity, no investors, no agenda — just honest data and a number nobody else will show you.*
