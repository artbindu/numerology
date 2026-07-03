const colorMeaningMap = {
  red: "energetic, bold, passionate, competitive",
  blue: "calm, trustworthy, thoughtful, loyal",
  green: "balanced, natural, peaceful, growth-minded",
  yellow: "cheerful, creative, optimistic, social",
  gold: "abundance, confidence, prestige, warmth",
  black: "powerful, elegant, mysterious, independent",
  white: "simple, clean, honest, organized",
  "off white": "soft, stable, peaceful",
  purple: "imaginative, artistic, spiritual, unique",
  orange: "adventurous, friendly, confident, fun",
  maroon: "grounded ambition, disciplined passion, depth",
  crimson: "bold action, vitality, courage, determination",
  gray: "calm, mature, balanced, reserved",
  silver: "reflective, elegant, intuitive",
  turquoise: "fresh, expressive, expansive",
  indigo: "deep thinker, spiritual, observant",
  violet: "visionary, artistic, intuitive",
  "dark gray": "steady, composed, focused",
};

const colorCssMap = {
  gold: "#fbbf24",
  "off white": "#f8fafc",
  "dark gray": "#4b5563",
};

const colorDisplayOrder = [
  "red",
  "gold",
  "orange",
  "white",
  "silver",
  "off white",
  "purple",
  "blue",
  "gray",
  "green",
  "turquoise",
  "yellow",
  "indigo",
  "violet",
  "black",
  "dark gray",
  "maroon",
  "crimson"
];

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

const getColorCss = function (colorName) {
  const normalized = normalizeColorName(colorName);
  const withHyphen = normalized.replace(/\s+/g, "-");
  const withSpace = normalized.replace(/-/g, " ");

  return colorCssMap[normalized] || colorCssMap[withHyphen] || colorCssMap[withSpace] || normalized;
};

const getOrderedColorEntries = function () {
  return colorDisplayOrder
    .filter((name) => Object.prototype.hasOwnProperty.call(colorMeaningMap, name))
    .map((name) => [name, colorMeaningMap[name]]);
};

module.exports = {
  colorMeaningMap,
  colorCssMap,
  colorDisplayOrder,
  getColorMeaning,
  getColorCss,
  getOrderedColorEntries
};
