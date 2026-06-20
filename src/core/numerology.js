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

const getNumerologyFromDob = function (dob) {
  const m = mulank(dob);
  const b = bhagyanka(dob);

  return {
    dob,
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
  getNumerologyFromDob
};
