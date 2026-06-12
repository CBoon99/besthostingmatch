/* scoring.js — Best Hosting Match
   Weights (v1.0 — locked):
   Performance 25% | Uptime 20% | Price 20% | Support 15%
   Security 10% | Ease of Use 5% | Scalability 3% | Dev Features 2%
*/

function buildHosting(record) {
  const id = record.id;
  const savings = (typeof HOSTING_SAVINGS !== "undefined" && HOSTING_SAVINGS[id]) || [0, 0];
  const ws = calculateHostingScore(record);
  /* True 3-year cost: 12 months at entry price + 24 months at renewal price */
  const trueThreeYearCost = Math.round(record.entryPrice * 12 + record.renewalPrice * 24);
  return {
    ...record,
    savingsPct:         savings[0],
    regularPrice:       savings[1],
    affiliateLink:      affiliateHref(id),
    weightedScore:      ws,
    trueThreeYearCost:  trueThreeYearCost,
    ranking:            0
  };
}

function calculateHostingScore(v) {
  return Math.round(
    v.performanceScore * 0.25 +
    v.uptimeScore      * 0.20 +
    v.priceScore       * 0.20 +
    v.supportScore     * 0.15 +
    v.securityScore    * 0.10 +
    v.easeScore        * 0.05 +
    v.scalabilityScore * 0.03 +
    v.devScore         * 0.02
  );
}

function enrichHostings(arr) {
  arr.sort((a, b) => b.weightedScore - a.weightedScore);
  arr.forEach((v, i) => { v.ranking = i + 1; });
}
