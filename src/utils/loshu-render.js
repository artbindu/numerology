const renderLoShuGrid = function (analysis) {
  return `
    <div class="loshu-grid">
      ${analysis.grid
        .flat()
        .map((number) => {
          const count = analysis.counts[number];

          return `
            <div class="loshu-cell">
              <div class="loshu-cell-number">${number}</div>
              <div class="loshu-cell-digits">
                ${count > 0 ? String(number).repeat(count) : ""}
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
};

module.exports = {
  renderLoShuGrid
};