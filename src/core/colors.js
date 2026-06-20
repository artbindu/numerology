const colorMeaningMap = {
  red: "energetic, bold, passionate, competitive",
  blue: "calm, trustworthy, thoughtful, loyal",
  green: "balanced, natural, peaceful, growth-minded",
  yellow: "cheerful, creative, optimistic, social",
  golden: "abundance, confidence, prestige, warmth",
  gold: "abundance, confidence, prestige, warmth",
  black: "powerful, elegant, mysterious, independent",
  white: "simple, clean, honest, organized",
  purple: "imaginative, artistic, spiritual, unique",
  orange: "adventurous, friendly, confident, fun",
  pink: "caring, gentle, romantic, expressive",
  maroon: "grounded ambition, disciplined passion, depth",
  crimson: "bold action, vitality, courage, determination",
  brown: "dependable, grounded, practical, stable",
  gray: "calm, mature, balanced, reserved",
  silver: "reflective, elegant, intuitive",
  turquoise: "fresh, expressive, expansive",
  indigo: "deep thinker, spiritual, observant",
  violet: "visionary, artistic, intuitive",
  "off-white": "soft, stable, peaceful",
  "dark gray": "steady, composed, focused",
  "shades of yellow": "optimistic, social, bright"
};

const normalizeColorName = function (value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

const getColorMeaning = function (colorName) {
  return colorMeaningMap[normalizeColorName(colorName)] || null;
};

module.exports = {
  colorMeaningMap,
  getColorMeaning
};
