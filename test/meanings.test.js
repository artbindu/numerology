const test = require("node:test");
const assert = require("node:assert/strict");

const {
  NUMBER_MEANINGS,
  MISSING_NUMBER_MEANINGS,
  DRIVER_NUMBER_MEANINGS,
  DESTINY_NUMBER_MEANINGS,
  getNumberMeaning,
  getMissingNumberMeaning,
  getRepeatedNumberMeaning,
  getDriverNumberMeaning,
  getDestinyNumberMeaning
} = require("../src/config/loshu_config");
const { LO_SHU_GRID, getLoShuAnalysis } = require("../src/core/loshu");
const { renderLoShuGrid } = require("../src/utils/loshu-render");
const {
  renderNumberMeaningDetails,
  renderLoShuInterpretationSections
} = require("../src/utils/loshu-meaning-render");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const assertCompleteEntries = (entries, requiredFields) => {
  assert.deepEqual(Object.keys(entries).map(Number), numbers);
  for (const number of numbers) {
    for (const field of requiredFields) {
      assert.ok(entries[number][field] !== undefined, `number ${number} is missing ${field}`);
    }
  }
};

test("all nine core meanings include every requested category", () => {
  assertCompleteEntries(NUMBER_MEANINGS, [
    "title", "planet", "element", "keywords", "coreMeaning", "personality",
    "positiveTraits", "negativeTraits", "strengths", "weaknesses", "career",
    "finance", "relationships", "family", "communication", "emotionalNature",
    "leadership", "decisionMaking", "spirituality", "challenges", "recommendations"
  ]);
  assert.equal(getNumberMeaning(0), null);
  assert.equal(getNumberMeaning("5").number, 5);
});

test("all nine missing-number meanings are complete and independently accessible", () => {
  assertCompleteEntries(MISSING_NUMBER_MEANINGS, [
    "title", "theme", "interpretation", "personalityChallenges", "communicationChallenges",
    "relationshipChallenges", "careerChallenges", "financialHabits", "emotionalCharacteristics",
    "developmentOpportunities", "suggestions"
  ]);
  assert.equal(getMissingNumberMeaning(9).number, 9);
  assert.equal(getMissingNumberMeaning(10), null);
});

test("Driver and Destiny meanings cover all numbers with separate schemas", () => {
  assertCompleteEntries(DRIVER_NUMBER_MEANINGS, [
    "personality", "naturalBehavior", "strengths", "weaknesses", "leadership", "career",
    "relationships", "financialTendencies", "lifeChallenges", "personalDevelopment"
  ]);
  assertCompleteEntries(DESTINY_NUMBER_MEANINGS, [
    "lifeDirection", "naturalAbilities", "opportunities", "careerDevelopment", "relationships",
    "challenges", "personalGrowth", "longTermDevelopment"
  ]);
  assert.equal(getDriverNumberMeaning(3).driverNumber, 3);
  assert.equal(getDestinyNumberMeaning(3).destinyNumber, 3);
  assert.equal(getDriverNumberMeaning(0), null);
  assert.equal(getDestinyNumberMeaning(10), null);
});

test("repeated-number meanings support single through five-plus occurrences", () => {
  for (const number of numbers) {
    for (const frequency of [1, 2, 3, 4, 5, 7]) {
      const meaning = getRepeatedNumberMeaning(number, frequency);
      assert.equal(meaning.number, number);
      assert.equal(meaning.frequency, frequency);
      assert.equal(meaning.displayValue, String(number).repeat(frequency));
      assert.ok(meaning.interpretationTitle);
      assert.ok(meaning.coreMeaning);
      assert.ok(meaning.positiveCharacteristics.length);
      assert.ok(meaning.potentialChallenges.length);
      assert.ok(meaning.personalityEffects);
      assert.ok(meaning.careerImplications);
      assert.ok(meaning.relationshipImplications);
      assert.ok(meaning.practicalRecommendations.length);
    }
  }
  assert.equal(getRepeatedNumberMeaning(1, 5).frequencyLabel, "Five or more occurrences");
  assert.equal(getRepeatedNumberMeaning(10, 2), null);
  assert.equal(getRepeatedNumberMeaning(2, 0), null);
});

test("Lo Shu analysis preserves traditional positions and uses input counts", () => {
  const analysis = getLoShuAnalysis("14-09-1992");
  assert.deepEqual(LO_SHU_GRID, [[4, 9, 2], [3, 5, 7], [8, 1, 6]]);
  assert.deepEqual(analysis.grid, LO_SHU_GRID);
  assert.equal(analysis.totalDigits, 7);
  assert.equal(analysis.counts[0], undefined);
  assert.equal(analysis.counts[1], 2);
  assert.equal(analysis.counts[2], 1);
  assert.equal(analysis.counts[4], 1);
  assert.equal(analysis.counts[9], 3);
  assert.deepEqual(analysis.missingNumbers, [3, 5, 6, 7, 8]);
  assert.deepEqual(analysis.repeatedNumbers, [
    { number: 1, count: 2 },
    { number: 9, count: 3 }
  ]);
});

test("Lo Shu renderer keeps grid order and includes interactive meaning sections", () => {
  const analysis = getLoShuAnalysis("14-09-1992");
  const html = renderLoShuGrid(analysis, { driverNumber: 5, destinyNumber: 8 });
  const gridNumbers = [...html.matchAll(/data-loshu-number="(\d)"/g)].map((match) => Number(match[1]));

  assert.deepEqual(gridNumbers, LO_SHU_GRID.flat());
  assert.match(html, /Lo Shu Grid Calculator/);
  assert.match(html, /Number frequency/);
  assert.match(html, /Driver Number 5/);
  assert.match(html, /Destiny Number 8/);
  assert.match(html, /not scientific assessments/);
});

test("Driver and Destiny interpretations share a grid with separate accordions", () => {
  const analysis = getLoShuAnalysis("14-09-1992");
  const html = renderLoShuInterpretationSections(analysis, 5, 8);

  assert.match(html, /<div class="loshu-primary-numbers">\s*<details class="loshu-accordion">\s*<summary>Driver Number 5<\/summary>[\s\S]*?<\/details>\s*<details class="loshu-accordion">\s*<summary>Destiny Number 8<\/summary>[\s\S]*?<\/details>\s*<\/div>/);
});

test("selected-number panel contains configured, missing, and repeated meanings", () => {
  const analysis = getLoShuAnalysis("14-09-1992");
  const repeatedHtml = renderNumberMeaningDetails(analysis, 9);
  const missingHtml = renderNumberMeaningDetails(analysis, 5);
  const sections = renderLoShuInterpretationSections(analysis, 5, 8);

  assert.match(repeatedHtml, /Mars/);
  assert.match(repeatedHtml, /Recommendations/);
  assert.match(repeatedHtml, /99/);
  assert.match(missingHtml, /Missing Number 5/);
  assert.match(missingHtml, /Practical suggestions/);
  assert.match(sections, /Driver Number 5/);
  assert.match(sections, /Destiny Number 8/);
});
