const toTitleCase = function (value) {
  return value.replace(/\b\w/g, (ch) => ch.toUpperCase());
};

module.exports = {
  toTitleCase
};