const card = function (title, body) {
  return `
    <article class="card">
      <h3>${title}</h3>
      ${body}
    </article>
  `;
};

const renderLoShuGrid = function (analysis) {
  const gridHtml = `
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

  const missingNumbersHtml = analysis.missingNumbers.length > 0
    ? `<p>${analysis.missingNumbers.join(", ")}</p>`
    : `<p>No missing numbers</p>`;

  const repeatedNumbersHtml = analysis.repeatedNumbers.length > 0
    ? `<ul>${analysis.repeatedNumbers.map((item) => `<li>${item.number} × ${item.count}</li>`).join("")}</ul>`
    : `<p>No repeated numbers</p>`;

  const strengthArrows = analysis.arrows.filter((arrow) => arrow.active);
  const missingArrows = analysis.arrows.filter((arrow) => arrow.missing);

  const arrowsHtml = `
    ${strengthArrows.length > 0 ? `<div class="arrow-section"><p class="arrow-label">Strength Arrows</p><ul>${strengthArrows.map((arrow) => `<li>${arrow.name}</li>`).join("")}</ul></div>` : ""}
    ${missingArrows.length > 0 ? `<div class="arrow-section"><p class="arrow-label">Missing Arrows</p><ul>${missingArrows.map((arrow) => `<li>${arrow.name}</li>`).join("")}</ul></div>` : ""}
  `;

  return [
    card("Lo Shu Grid", gridHtml),
    card("Missing Numbers", missingNumbersHtml),
    card("Repeated Numbers", repeatedNumbersHtml),
    card("Arrow Analysis", arrowsHtml)
  ].join("");
};

module.exports = {
  renderLoShuGrid
};