/* widgets.js — Best Hosting Match
   Declarative renderers for landing pages. Drop a <div data-widget="..."> mount
   point in the HTML and this fills it from the live HOSTINGS data.
   Requires (loaded first): site-config.js, scoring.js, hosting-data.js
   Widget types:
     <div data-widget="cards"  data-ids="a,b,c" | data-filter="tag" data-sort="field" data-limit="6"></div>
     <div data-widget="table"  data-ids="..."   | data-filter="tag" data-sort="field"></div>
     <div data-widget="vs"     data-a="hostinger" data-b="bluehost"></div>
*/
(function () {
  "use strict";
  if (typeof HOSTINGS === "undefined") return;

  var money  = function (n) { return "$" + Number(n).toFixed(2); };
  var moneyR = function (n) { return "$" + Math.round(n).toLocaleString(); };
  var rel    = (typeof outboundRel === "function") ? outboundRel() : "noopener noreferrer";
  var byId   = function (id) { return HOSTINGS.filter(function (v) { return v.id === id; })[0]; };

  function pool(el) {
    var ids = el.getAttribute("data-ids");
    var list;
    if (ids) {
      list = ids.split(",").map(function (s) { return byId(s.trim()); }).filter(Boolean);
    } else {
      var f = el.getAttribute("data-filter");
      list = HOSTINGS.filter(function (v) {
        if (!f || f === "all") return true;
        if (["shared", "wordpress", "cloud", "dedicated"].indexOf(f) > -1) return v.category === f;
        return (v.tags || []).indexOf(f) > -1;
      });
    }
    var sort = el.getAttribute("data-sort") || "weightedScore";
    list = list.slice().sort(function (a, b) { return (b[sort] || 0) - (a[sort] || 0); });
    var lim = parseInt(el.getAttribute("data-limit") || "0", 10);
    return lim > 0 ? list.slice(0, lim) : list;
  }

  function cardHTML(v, i, showRank) {
    var rank = showRank ? '<div class="card__rank">#' + (i + 1) + "</div>" : "";
    return '<div class="card">' + rank +
      '<div class="card__head"><span class="card__icon">' + v.logoIcon + '</span><span class="card__name">' + v.name +
        '</span><span class="card__score">' + v.weightedScore + "<small>/100</small></span></div>" +
      '<p class="card__tagline">' + v.tagline + "</p>" +
      '<div class="card__metrics">' +
        '<div><span class="l">Entry price</span><span class="v price-entry">' + money(v.entryPrice) + "/mo</span></div>" +
        '<div><span class="l">Renewal</span><span class="v price-renewal">' + money(v.renewalPrice) + "/mo</span></div>" +
        '<div><span class="l">True 3-yr cost</span><span class="v true-cost">' + moneyR(v.trueThreeYearCost) + "</span></div>" +
        '<div><span class="l">Support</span><span class="v">' + (v.support24_7 ? "24/7" : "Limited") + "</span></div>" +
      "</div>" +
      '<div class="card__cta"><a href="' + v.affiliateLink + '" target="_blank" rel="' + rel + '" class="btn btn--primary btn--sm">Visit site →</a></div>' +
      "</div>";
  }

  function renderCards(el) {
    var list = pool(el);
    var showRank = el.getAttribute("data-rank") !== "false";
    el.className = "cards";
    el.innerHTML = list.map(function (v, i) { return cardHTML(v, i, showRank); }).join("");
  }

  function renderTable(el) {
    var list = pool(el);
    el.className = "table-scroll";
    el.innerHTML =
      '<table class="cmp"><thead><tr><th>Provider</th><th>Score</th><th>Entry</th><th>Renewal</th><th>True 3-Yr Cost</th><th>Support</th><th>Visit</th></tr></thead><tbody>' +
      list.map(function (v) {
        return "<tr>" +
          "<td><strong>" + v.logoIcon + " " + v.name + "</strong></td>" +
          '<td><span class="pill">' + v.weightedScore + "<small>/100</small></span></td>" +
          '<td class="price-entry" style="font-weight:700">' + money(v.entryPrice) + "</td>" +
          '<td class="price-renewal" style="font-weight:700">' + money(v.renewalPrice) + "</td>" +
          '<td class="true-cost" style="font-weight:800">' + moneyR(v.trueThreeYearCost) + "</td>" +
          "<td>" + (v.support24_7 ? "24/7" : "Limited") + "</td>" +
          '<td><a href="' + v.affiliateLink + '" target="_blank" rel="' + rel + '" class="btn btn--primary btn--sm">Visit →</a></td>' +
          "</tr>";
      }).join("") + "</tbody></table>";
  }

  function row(label, a, b, fmt) {
    var av = fmt ? fmt(a) : a, bv = fmt ? fmt(b) : b;
    return "<tr><td>" + label + "</td><td>" + av + "</td><td>" + bv + "</td></tr>";
  }
  function renderVs(el) {
    var a = byId(el.getAttribute("data-a")), b = byId(el.getAttribute("data-b"));
    if (!a || !b) { el.innerHTML = ""; return; }
    var winner = a.weightedScore >= b.weightedScore ? a : b;
    var sc = function (v, k) { return v[k] + "/100"; };
    el.innerHTML =
      '<div class="cards vs-cards">' + cardHTML(a, 0, false) + cardHTML(b, 1, false) + "</div>" +
      '<div class="table-scroll"><table class="cmp"><thead><tr><th>Factor</th><th>' + a.name + "</th><th>" + b.name + "</th></tr></thead><tbody>" +
        row("Our score", '<span class="pill">' + a.weightedScore + "</span>", '<span class="pill">' + b.weightedScore + "</span>") +
        row("Performance (25%)", sc(a, "performanceScore"), sc(b, "performanceScore")) +
        row("Uptime (20%)", sc(a, "uptimeScore"), sc(b, "uptimeScore")) +
        row("Price/Value (20%)", sc(a, "priceScore"), sc(b, "priceScore")) +
        row("Support (15%)", sc(a, "supportScore"), sc(b, "supportScore")) +
        row("Security (10%)", sc(a, "securityScore"), sc(b, "securityScore")) +
        row("Ease of use (5%)", sc(a, "easeScore"), sc(b, "easeScore")) +
        row("Entry price", '<span class="price-entry">' + money(a.entryPrice) + "</span>", '<span class="price-entry">' + money(b.entryPrice) + "</span>") +
        row("Renewal price", '<span class="price-renewal">' + money(a.renewalPrice) + "</span>", '<span class="price-renewal">' + money(b.renewalPrice) + "</span>") +
        row("True 3-year cost", '<span class="true-cost">' + moneyR(a.trueThreeYearCost) + "</span>", '<span class="true-cost">' + moneyR(b.trueThreeYearCost) + "</span>") +
      "</tbody></table></div>" +
      '<div class="callout"><strong>Our verdict:</strong> ' + winner.name + " takes it on weighted score (" + winner.weightedScore + "/100). " +
        "But check the True 3-Year Cost and your own priorities — the right pick depends on what you're building.</div>";
  }

  function renderAll() {
    var els = document.querySelectorAll("[data-widget]");
    for (var i = 0; i < els.length; i++) {
      var t = els[i].getAttribute("data-widget");
      if (t === "cards") renderCards(els[i]);
      else if (t === "table") renderTable(els[i]);
      else if (t === "vs") renderVs(els[i]);
    }
  }

  /* theme toggle (shared) */
  function initTheme() {
    var tt = document.getElementById("tt");
    if (!tt) return;
    function sync() { tt.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"; }
    sync();
    tt.addEventListener("click", function () {
      var d = document.documentElement.getAttribute("data-theme") === "dark";
      if (d) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("hosting-theme", "light"); }
      else { document.documentElement.setAttribute("data-theme", "dark"); localStorage.setItem("hosting-theme", "dark"); }
      sync();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { renderAll(); initTheme(); });
  else { renderAll(); initTheme(); }
})();
