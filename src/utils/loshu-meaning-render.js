const {
  MEANING_TRADITION,
  getNumberMeaning,
  getMissingNumberMeaning,
  getRepeatedNumberMeaning,
  getDriverNumberMeaning,
  getDestinyNumberMeaning
} = require("../config/loshu_config");

const escapeHtml = function (value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
};

const renderList = function (items) {
  if (!items || items.length === 0) {
    return "<p class=\"loshu-meaning-empty\">No items available.</p>";
  }
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};

const renderText = function (label, value) {
  return `<div class="loshu-meaning-item"><h4>${escapeHtml(label)}</h4><p>${escapeHtml(value)}</p></div>`;
};

const renderDetailSection = function (title, content, open = false) {
  return `
    <details class="loshu-meaning-section"${open ? " open" : ""}>
      <summary>${escapeHtml(title)}</summary>
      <div class="loshu-meaning-section-body">${content}</div>
    </details>
  `;
};

const renderNumberMeaningDetails = function (analysis, number) {
  const meaning = getNumberMeaning(number);
  if (!meaning) {
    return "<p class=\"loshu-meaning-empty\">No interpretation is configured for this number.</p>";
  }

  const count = analysis.counts[number];
  const missingMeaning = count === 0 ? getMissingNumberMeaning(number) : null;
  const repeatedMeaning = count > 0 ? getRepeatedNumberMeaning(number, count) : null;
  const planet = meaning.planet ? `<span class="loshu-meaning-tag">${escapeHtml(meaning.planet)}</span>` : "";
  const element = meaning.element ? `<span class="loshu-meaning-tag">${escapeHtml(meaning.element)}</span>` : "";
  const countLabel = count === 1 ? "occurrence" : "occurrences";

  const personalityContent = [
    renderText("Core meaning", meaning.coreMeaning),
    renderText("Personality", meaning.personality),
    renderText("Communication", meaning.communication),
    renderText("Emotional nature", meaning.emotionalNature),
    renderText("Leadership", meaning.leadership),
    renderText("Decision-making", meaning.decisionMaking),
    renderListSection("Positive traits", meaning.positiveTraits),
    renderListSection("Negative traits", meaning.negativeTraits),
    renderListSection("Strengths", meaning.strengths),
    renderListSection("Weaknesses", meaning.weaknesses)
  ].join("");

  const lifeAreasContent = [
    renderText("Career", meaning.career),
    renderText("Finance", meaning.finance),
    renderText("Relationships", meaning.relationships),
    renderText("Family and social life", meaning.family),
    renderText("Spirituality", meaning.spirituality),
    renderListSection("Life challenges", meaning.challenges),
    renderListSection("Recommendations", meaning.recommendations)
  ].join("");

  const missingContent = missingMeaning
    ? [
        renderText("Theme", missingMeaning.theme),
        renderText("Interpretation", missingMeaning.interpretation),
        renderText("Financial habits", missingMeaning.financialHabits),
        renderText("Emotional characteristics", missingMeaning.emotionalCharacteristics),
        renderListSection("Personality challenges", missingMeaning.personalityChallenges),
        renderListSection("Communication challenges", missingMeaning.communicationChallenges),
        renderListSection("Relationship challenges", missingMeaning.relationshipChallenges),
        renderListSection("Career challenges", missingMeaning.careerChallenges),
        renderListSection("Development opportunities", missingMeaning.developmentOpportunities),
        renderListSection("Practical suggestions", missingMeaning.suggestions)
      ].join("")
    : "";

  const repeatedContent = repeatedMeaning
    ? [
        renderText("Core meaning", repeatedMeaning.coreMeaning),
        renderText("Personality effects", repeatedMeaning.personalityEffects),
        renderText("Career implications", repeatedMeaning.careerImplications),
        renderText("Relationship implications", repeatedMeaning.relationshipImplications),
        renderListSection("Positive characteristics", repeatedMeaning.positiveCharacteristics),
        renderListSection("Potential challenges", repeatedMeaning.potentialChallenges),
        renderListSection("Practical recommendations", repeatedMeaning.practicalRecommendations)
      ].join("")
    : "";

  return `
    <div class="loshu-number-detail-content">
      <header class="loshu-detail-heading">
        <div>
          <span class="loshu-detail-eyebrow">Number ${number} · ${count} ${countLabel}</span>
          <h3 id="loshu-number-detail-title">${escapeHtml(meaning.title)}</h3>
        </div>
        <button class="loshu-detail-close" type="button" data-close-loshu-detail aria-label="Close number interpretation">
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
      </header>
      <div class="loshu-detail-tags">${planet}${element}</div>
      ${renderListSection("Keywords", meaning.keywords)}
      <div class="loshu-detail-sections">
        ${renderDetailSection("Personality and traits", personalityContent, true)}
        ${renderDetailSection("Life areas and development", lifeAreasContent)}
        ${missingMeaning ? renderDetailSection(missingMeaning.title, missingContent) : ""}
        ${repeatedMeaning ? renderDetailSection(`${repeatedMeaning.displayValue} · ${repeatedMeaning.interpretationTitle}`, repeatedContent) : ""}
      </div>
    </div>
  `;
};

const renderListSection = function (title, items) {
  return `
    <div class="loshu-meaning-item">
      <h4>${escapeHtml(title)}</h4>
      ${renderList(items)}
    </div>
  `;
};

const renderNumberMeaningCard = function (title, content) {
  return `<article class="loshu-expanded-meaning"><h4>${escapeHtml(title)}</h4>${content}</article>`;
};

const renderMissingAnalysis = function (analysis) {
  const entries = analysis.missingNumbers.map((number) => {
    const meaning = getMissingNumberMeaning(number);
    if (!meaning) {
      return "";
    }
    return renderNumberMeaningCard(
      meaning.title,
      [
        renderText("Theme", meaning.theme),
        renderText("Interpretation", meaning.interpretation),
        renderText("Financial habits", meaning.financialHabits),
        renderText("Emotional characteristics", meaning.emotionalCharacteristics),
        renderListSection("Challenges", [
          ...meaning.personalityChallenges,
          ...meaning.communicationChallenges,
          ...meaning.relationshipChallenges,
          ...meaning.careerChallenges
        ]),
        renderListSection("Development opportunities", meaning.developmentOpportunities),
        renderListSection("Practical suggestions", meaning.suggestions)
      ].join("")
    );
  });

  return entries.length ? entries.join("") : "<p class=\"loshu-meaning-empty\">No numbers are missing from this grid.</p>";
};

const renderRepeatedAnalysis = function (analysis) {
  const presentNumbers = Object.entries(analysis.counts).filter(([, count]) => count > 0);
  const entries = presentNumbers.map(([number, count]) => {
    const meaning = getRepeatedNumberMeaning(Number(number), count);
    if (!meaning) {
      return "";
    }
    return renderNumberMeaningCard(
      `${meaning.displayValue} · ${meaning.interpretationTitle}`,
      [
        renderText("Core meaning", meaning.coreMeaning),
        renderText("Personality effects", meaning.personalityEffects),
        renderText("Career implications", meaning.careerImplications),
        renderText("Relationship implications", meaning.relationshipImplications),
        renderListSection("Positive characteristics", meaning.positiveCharacteristics),
        renderListSection("Potential challenges", meaning.potentialChallenges),
        renderListSection("Practical recommendations", meaning.practicalRecommendations)
      ].join("")
    );
  });

  return entries.join("");
};

const renderDriverAnalysis = function (number) {
  const meaning = getDriverNumberMeaning(number);
  if (!meaning) {
    return "<p class=\"loshu-meaning-empty\">Driver number interpretation is unavailable.</p>";
  }

  return renderNumberMeaningCard(`Driver Number ${number}`, [
    renderText("Personality", meaning.personality),
    renderText("Natural behavior", meaning.naturalBehavior),
    renderText("Leadership", meaning.leadership),
    renderText("Career", meaning.career),
    renderText("Relationships", meaning.relationships),
    renderText("Financial tendencies", meaning.financialTendencies),
    renderListSection("Strengths", meaning.strengths),
    renderListSection("Weaknesses", meaning.weaknesses),
    renderListSection("Life challenges", meaning.lifeChallenges),
    renderListSection("Personal development", meaning.personalDevelopment)
  ].join(""));
};

const renderDestinyAnalysis = function (number) {
  const meaning = getDestinyNumberMeaning(number);
  if (!meaning) {
    return "<p class=\"loshu-meaning-empty\">Destiny number interpretation is unavailable.</p>";
  }

  return renderNumberMeaningCard(`Destiny Number ${number}`, [
    renderText("Life direction", meaning.lifeDirection),
    renderText("Career development", meaning.careerDevelopment),
    renderText("Relationships", meaning.relationships),
    renderText("Long-term development", meaning.longTermDevelopment),
    renderListSection("Natural abilities", meaning.naturalAbilities),
    renderListSection("Opportunities", meaning.opportunities),
    renderListSection("Challenges", meaning.challenges),
    renderListSection("Personal growth", meaning.personalGrowth)
  ].join(""));
};

const renderLoShuInterpretationSections = function (analysis, driverNumber, destinyNumber) {
  return `
    <section class="loshu-interpretations" aria-labelledby="loshu-interpretations-title">
      <div class="loshu-panel-heading">
        <div>
          <h3 id="loshu-interpretations-title">Number interpretations</h3>
          <p>Traditional themes for reflection, not scientific assessments.</p>
        </div>
      </div>
      <div class="loshu-primary-numbers">
        <details class="loshu-accordion">
          <summary>Driver Number ${escapeHtml(driverNumber)}</summary>
          <div class="loshu-accordion-content">${renderDriverAnalysis(driverNumber)}</div>
        </details>
        <details class="loshu-accordion">
          <summary>Destiny Number ${escapeHtml(destinyNumber)}</summary>
          <div class="loshu-accordion-content">${renderDestinyAnalysis(destinyNumber)}</div>
        </details>
      </div>
      <details class="loshu-accordion">
        <summary>Repeated number analysis <span>${analysis.repeatedNumbers.length}</span></summary>
        <div class="loshu-accordion-content">${renderRepeatedAnalysis(analysis)}</div>
      </details>
   </section>
   `;
    // <details class="loshu-accordion">
    //   <summary>Missing number analysis <span>${analysis.missingNumbers.length}</span></summary>
    //   <div class="loshu-accordion-content">${renderMissingAnalysis(analysis)}</div>
    // </details>
};

module.exports = {
  renderNumberMeaningDetails,
  renderLoShuInterpretationSections
};
