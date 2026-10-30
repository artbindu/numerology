const { getColorMeaning } = require("./colors");

const reduceToSingleDigit = function (value) {
  const sum = value
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  return sum > 9 ? reduceToSingleDigit(sum.toString()) : sum;
};

const bhagyanka = function (dob) {
  const cleanedDob = dob.replace(/[^0-9]/g, "");
  return reduceToSingleDigit(cleanedDob);
};

const mulank = function (dob) {
  const day = dob.toString().split("-")[0];
  return reduceToSingleDigit(day);
};

const getCurrentAge = function (dob, today = new Date()) {
  const [day, month, year] = dob.split("-").map(Number);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const isFutureDate =
    year > currentYear ||
    (year === currentYear &&
      (month > currentMonth || (month === currentMonth && day > today.getDate())));

  if (isFutureDate) {
    throw new Error("DOB cannot be in the future.");
  }

  let years = currentYear - year;
  let months = currentMonth - month;

  if (today.getDate() < day) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years}y ${months}m`;
};

const planetaryRulers = {
  1: "Sun: leadership, ambition, independence.",
  2: "Moon: emotions, intuition, sensitivity.",
  3: "Jupiter: growth, wisdom, positivity.",
  4: "Rahu/Uranus: structure, discipline, unconventionality.",
  5: "Mercury: communication, adaptability, intellect.",
  6: "Venus: harmony, beauty, relationships.",
  7: "Ketu/Neptune: spirituality, reflection, analysis.",
  8: "Saturn: karma, resilience, material stability.",
  9: "Mars: courage, action, humanitarian energy."
};

const favoriteColors = [
  {
    day: [1, 10, 19, 28],
    luckyColor: ["Red", "Golden", "Orange"],
    sign: "Confidence and leadership",
    status: "Natural leaders"
  },
  {
    day: [2, 11, 20, 29],
    luckyColor: ["White", "Silver", "Off-White"],
    sign: "Peace and harmony",
    status: "Balance seekers"
  },
  {
    day: [3, 12, 21, 30],
    luckyColor: ["Purple", "Shades of Yellow"],
    sign: "Growth and renewal",
    status: "Creative optimists"
  },
  {
    day: [4, 13, 22, 31],
    luckyColor: ["Blue", "Gray"],
    sign: "Stability and trust",
    status: "Practical builders"
  },
  {
    day: [5, 14, 23],
    luckyColor: ["Green", "Turquoise"],
    sign: "Balance and prosperity",
    status: "Adaptive thinkers"
  },
  {
    day: [6, 15, 24],
    luckyColor: ["Yellow", "Gold"],
    sign: "Joy and optimism",
    status: "Nurturing personalities"
  },
  {
    day: [7, 16, 25],
    luckyColor: ["Indigo", "Violet"],
    sign: "Intuition and wisdom",
    status: "Reflective minds"
  },
  {
    day: [8, 17, 26],
    luckyColor: ["Black", "Dark Gray"],
    sign: "Power and authority",
    status: "Strong executors"
  },
  {
    day: [9, 18, 27],
    luckyColor: ["Maroon", "Crimson"],
    sign: "Compassion and courage",
    status: "Humanitarian force"
  }
];

/**
 * Chaldean / commonly used Hindu numerology letter values.
 */
const letterNumerologyValues = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7
};

const letterNumerologyOutcomes = {
  1: "Leadership, individuality, ambition, confidence.",
  2: "Cooperation, diplomacy, intuition, emotional sensitivity.",
  3: "Creativity, expression, optimism, social energy.",
  4: "Discipline, practicality, structure, persistence.",
  5: "Adaptability, communication, freedom, versatility.",
  6: "Responsibility, care, harmony, family orientation.",
  7: "Spirituality, introspection, wisdom, analytical thinking.",
  8: "Power, authority, material achievement, resilience.",
  9: "Compassion, sacrifice, humanitarian ideals."
};

const getPlanetaryRuler = function (number) {
  return planetaryRulers[number] || null;
};

const getLuckyColorProfile = function (number) {
  return favoriteColors.find((entry) => entry.day.includes(number)) || null;
};

const enrichLuckyProfile = function (profile) {
  if (!profile) {
    return null;
  }

  return {
    ...profile,
    colorMeanings: profile.luckyColor.map((name) => ({
      color: name,
      meaning: getColorMeaning(name)
    }))
  };
};

const getNumberDetails = function (number, label) {
  return {
    type: label,
    number,
    planetaryRuler: getPlanetaryRuler(number),
    luckyProfile: enrichLuckyProfile(getLuckyColorProfile(number))
  };
};

const getNameNumber = function (name) {
  const cleanedName = name.toUpperCase().replace(/[^A-Z]/g, "");

  const total = cleanedName
    .split("")
    .reduce((sum, ch) => sum + (letterNumerologyValues[ch] || 0), 0);

  return reduceToSingleDigit(total);
};

const getNumerologyFromName = function (name) {
  const nameNumber = getNameNumber(name);

  return {
    name,
    nameNumber,
    nameDetails: getNumberDetails(nameNumber, "name")
  };
};

const getNumerologyFromDob = function (dob) {
  const m = mulank(dob);
  const b = bhagyanka(dob);

  return {
    dob,
    age: getCurrentAge(dob),
    mulank: m,
    bhagyank: b,
    mulankDetails: getNumberDetails(m, "mulank"),
    bhagyankDetails: getNumberDetails(b, "bhagyank")
  };
};

module.exports = {
  reduceToSingleDigit,
  bhagyanka,
  mulank,
  planetaryRulers,
  favoriteColors,
  letterNumerologyValues,
  getPlanetaryRuler,
  getLuckyColorProfile,
  enrichLuckyProfile,
  getNumberDetails,
  getNameNumber,
  getNumerologyFromName,
  getNumerologyFromDob,
  getCurrentAge
};
