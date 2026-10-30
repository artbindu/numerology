const renderLoShuGrid = function (analysis) {
  const maximumCount = Math.max(1, ...Object.values(analysis.counts));
  const gridHtml = analysis.grid
    .flat()
    .map((number) => {
      const count = analysis.counts[number];
      const digits = count > 0 ? String(number).repeat(count) : "—";
      const occurrenceLabel = count === 1 ? "occurrence" : "occurrences";

      return `
        <div class="loshu-cell loshu-cell-${number}" role="gridcell" aria-label="Number ${number}, ${count} ${occurrenceLabel}">
          <span class="loshu-cell-number">${number}</span>
          <span class="loshu-cell-digits">${digits}</span>
        </div>
      `;
    })
    .join("");

  const missingNumbersHtml = analysis.missingNumbers.length
    ? analysis.missingNumbers.map((number) => `<li class="loshu-number-chip">${number}</li>`).join("")
    : `<li class="loshu-empty-state">None</li>`;

  const repeatedNumbersHtml = analysis.repeatedNumbers.length
    ? analysis.repeatedNumbers
        .map((item) => `<li class="loshu-number-chip">${item.number}<span>× ${item.count}</span></li>`)
        .join("")
    : `<li class="loshu-empty-state">None</li>`;

  const frequencyHtml = Object.entries(analysis.counts)
    .map(([number, count]) => {
      const barWidth = Math.round((count / maximumCount) * 100);
      const occurrenceLabel = count === 1 ? "occurrence" : "occurrences";

      return `
        <div class="loshu-frequency-row" aria-label="Number ${number}: ${count} ${occurrenceLabel}">
          <span class="loshu-frequency-number">${number}</span>
          <span class="loshu-frequency-track" aria-hidden="true">
            <span class="loshu-frequency-fill" style="width: ${barWidth}%"></span>
          </span>
          <strong class="loshu-frequency-count">${count}</strong>
        </div>
      `;
    })
    .join("");

  return `
    <div class="loshu-dashboard">
      <section class="loshu-grid-panel" aria-labelledby="loshu-grid-title">
        <div class="loshu-panel-heading">
          <div>
            <h2 id="loshu-grid-title">Lo Shu Grid Calculator</h2>
            <p>Traditional 3×3 arrangement · ${analysis.dob}</p>
          </div>
          <span class="loshu-total-badge">${analysis.totalDigits} digits</span>
        </div>
        <div class="loshu-grid" role="grid" aria-label="Traditional Lo Shu Grid">
          ${gridHtml}
        </div>
      </section>

      <div class="loshu-summary-column">
        <section class="loshu-stat-card loshu-total-card" aria-label="Total digits counted">
          <span class="loshu-stat-label">Total digits counted</span>
          <strong class="loshu-stat-value">${analysis.totalDigits}</strong>
          <span class="loshu-stat-note">Zeroes excluded</span>
        </section>

        <section class="loshu-stat-card" aria-labelledby="loshu-missing-title">
          <div class="loshu-stat-heading">
            <h3 id="loshu-missing-title">Missing numbers</h3>
            <span>${analysis.missingNumbers.length}</span>
          </div>
          <ul class="loshu-number-list">${missingNumbersHtml}</ul>
        </section>

        <section class="loshu-stat-card" aria-labelledby="loshu-repeated-title">
          <div class="loshu-stat-heading">
            <h3 id="loshu-repeated-title">Repeated numbers</h3>
            <span>${analysis.repeatedNumbers.length}</span>
          </div>
          <ul class="loshu-number-list">${repeatedNumbersHtml}</ul>
        </section>
      </div>

      <section class="loshu-frequency-panel" aria-labelledby="loshu-frequency-title">
        <div class="loshu-panel-heading">
          <div>
            <h3 id="loshu-frequency-title">Number frequency</h3>
            <p>Occurrences for each digit in the date</p>
          </div>
        </div>
        <div class="loshu-frequency-grid">${frequencyHtml}</div>
      </section>
    </div>
  `;
};

module.exports = {
  renderLoShuGrid
};