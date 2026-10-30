/**
 * @typedef {Object} NumberMeaningConfig
 * @property {number} number
 * @property {string} title
 * @property {string} planet
 * @property {string} [element]
 * @property {string[]} keywords
 * @property {string} coreMeaning
 * @property {string} personality
 * @property {string[]} positiveTraits
 * @property {string[]} negativeTraits
 * @property {string[]} strengths
 * @property {string[]} weaknesses
 * @property {string} career
 * @property {string} finance
 * @property {string} relationships
 * @property {string} family
 * @property {string} communication
 * @property {string} emotionalNature
 * @property {string} leadership
 * @property {string} decisionMaking
 * @property {string} spirituality
 * @property {string[]} challenges
 * @property {string[]} recommendations
 *
 * @typedef {Object} MissingNumberMeaning
 * @property {number} number
 * @property {string} title
 * @property {string} theme
 * @property {string} interpretation
 * @property {string[]} personalityChallenges
 * @property {string[]} communicationChallenges
 * @property {string[]} relationshipChallenges
 * @property {string[]} careerChallenges
 * @property {string} financialHabits
 * @property {string} emotionalCharacteristics
 * @property {string[]} developmentOpportunities
 * @property {string[]} suggestions
 *
 * @typedef {Object} RepeatedNumberMeaning
 * @property {number} number
 * @property {number} frequency
 * @property {string} frequencyLabel
 * @property {string} displayValue
 * @property {string} interpretationTitle
 * @property {string} coreMeaning
 * @property {string[]} positiveCharacteristics
 * @property {string[]} potentialChallenges
 * @property {string} personalityEffects
 * @property {string} careerImplications
 * @property {string} relationshipImplications
 * @property {string[]} practicalRecommendations
 *
 * @typedef {Object} DriverNumberMeaning
 * @property {number} driverNumber
 * @property {string} personality
 * @property {string} naturalBehavior
 * @property {string[]} strengths
 * @property {string[]} weaknesses
 * @property {string} leadership
 * @property {string} career
 * @property {string} relationships
 * @property {string} financialTendencies
 * @property {string[]} lifeChallenges
 * @property {string[]} personalDevelopment
 *
 * @typedef {Object} DestinyNumberMeaning
 * @property {number} destinyNumber
 * @property {string} lifeDirection
 * @property {string[]} naturalAbilities
 * @property {string[]} opportunities
 * @property {string} careerDevelopment
 * @property {string} relationships
 * @property {string[]} challenges
 * @property {string[]} personalGrowth
 * @property {string} longTermDevelopment
 */

const { NUMBER_MEANINGS } = require("./number-meanings");
const { MISSING_NUMBER_MEANINGS } = require("./missing-number-meanings");
const { getRepeatedNumberMeaning: createRepeatedNumberMeaning } = require("./repeated-number-meanings");
const { DRIVER_NUMBER_MEANINGS } = require("./driver-number-meanings");
const { DESTINY_NUMBER_MEANINGS } = require("./destiny-number-meanings");

const MEANING_TRADITION = {
  id: "traditional-lo-shu",
  label: "Traditional Lo Shu themes",
  note: "Planet and element associations are configurable interpretations and may differ between numerology traditions."
};

const normalizeNumber = function (number) {
  const value = Number(number);
  return Number.isInteger(value) && value >= 1 && value <= 9 ? value : null;
};

/** @returns {NumberMeaningConfig|null} */
const getNumberMeaning = function (number) {
  const value = normalizeNumber(number);
  return value === null ? null : NUMBER_MEANINGS[value] || null;
};

/** @returns {MissingNumberMeaning|null} */
const getMissingNumberMeaning = function (number) {
  const value = normalizeNumber(number);
  return value === null ? null : MISSING_NUMBER_MEANINGS[value] || null;
};

/** @returns {RepeatedNumberMeaning|null} */
const getRepeatedNumberMeaning = function (number, frequency) {
  const value = normalizeNumber(number);
  if (value === null) {
    return null;
  }
  return createRepeatedNumberMeaning(value, frequency);
};

/** @returns {DriverNumberMeaning|null} */
const getDriverNumberMeaning = function (number) {
  const value = normalizeNumber(number);
  return value === null ? null : DRIVER_NUMBER_MEANINGS[value] || null;
};

/** @returns {DestinyNumberMeaning|null} */
const getDestinyNumberMeaning = function (number) {
  const value = normalizeNumber(number);
  return value === null ? null : DESTINY_NUMBER_MEANINGS[value] || null;
};

module.exports = {
  MEANING_TRADITION,
  NUMBER_MEANINGS,
  MISSING_NUMBER_MEANINGS,
  DRIVER_NUMBER_MEANINGS,
  DESTINY_NUMBER_MEANINGS,
  getNumberMeaning,
  getMissingNumberMeaning,
  getRepeatedNumberMeaning,
  getDriverNumberMeaning,
  getDestinyNumberMeaning
};
