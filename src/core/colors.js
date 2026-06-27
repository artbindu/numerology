const colorMeaningMap = {
  red: "energetic, bold, passionate, competitive",
  "light red": "warm, affectionate, expressive, approachable",
  blue: "calm, trustworthy, thoughtful, loyal",
  "light blue": "peaceful, clear, communicative, soothing",
  navy: "disciplined, dependable, strategic, calm authority",
  green: "balanced, natural, peaceful, growth-minded",
  "light green": "healing, fresh starts, emotional balance, renewal",
  yellow: "cheerful, creative, optimistic, social",
  golden: "abundance, confidence, prestige, warmth",
  black: "powerful, elegant, mysterious, independent",
  white: "simple, clean, honest, organized",
  "off white": "soft, stable, peaceful",
  purple: "imaginative, artistic, spiritual, unique",
  orange: "adventurous, friendly, confident, fun",
  pink: "caring, gentle, romantic, expressive",
  maroon: "grounded ambition, disciplined passion, depth",
  crimson: "bold action, vitality, courage, determination",
  brown: "dependable, grounded, practical, stable",
  gray: "calm, mature, balanced, reserved",
  charcoal: "focused, resilient, practical strength",
  silver: "reflective, elegant, intuitive",
  turquoise: "fresh, expressive, expansive",
  teal: "clarity, calm confidence, emotional depth",
  indigo: "deep thinker, spiritual, observant",
  violet: "visionary, artistic, intuitive",
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
  const normalized = normalizeColorName(colorName);
  const withHyphen = normalized.replace(/\s+/g, "-");
  const withSpace = normalized.replace(/-/g, " ");

  return colorMeaningMap[normalized] || colorMeaningMap[withHyphen] || colorMeaningMap[withSpace] || null;
};

module.exports = {
  colorMeaningMap,
  getColorMeaning
};
