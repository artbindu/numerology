const card = function (title, body, spanSix) {
  const spanClass = spanSix ? "span-6" : "";
  return `
    <article class="card ${spanClass}">
      <h3>${title}</h3>
      ${body}
    </article>
  `;
};

const renderLuckyProfile = function (profile) {
  if (!profile) {
    return "<p>No lucky profile available.</p>";
  }

  const colors = profile.colorMeanings
    .map((entry) => `<li><strong>${entry.color}</strong>: ${entry.meaning || "No meaning available"}</li>`)
    .join("");

  return `
    <p><strong>Sign:</strong> ${profile.sign}</p>
    <p><strong>Status:</strong> ${profile.status}</p>
    <ul>${colors}</ul>
  `;
};

const renderNumberDetails = function (cardRenderer, label, detail) {
  return [
    cardRenderer(
      `${label} <span class="badge">${detail.number}</span>`,
      `<p class="kpi">${detail.number}</p><p>${detail.planetaryRuler || "No planetary detail found."}</p>`,
      true
    ),
    cardRenderer("Lucky Profile", renderLuckyProfile(detail.luckyProfile), true)
  ].join("");
};

module.exports = {
  card,
  renderLuckyProfile,
  renderNumberDetails
};