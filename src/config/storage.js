const { STORAGE_KEYS } = require("./appConfig");

const saveAppInput = function (value, mode) {
  try {
    const storageKey = STORAGE_KEYS[mode];
    if (!storageKey) {
      console.warn(`Unknown mode: ${mode}`);
      return;
    }
    localStorage.setItem(storageKey, value);
  } catch (e) {
    console.warn("Failed to save input to localStorage:", e);
  }
};

const loadAppInput = function (mode) {
  try {
    const storageKey = STORAGE_KEYS[mode];
    if (!storageKey) {
      console.warn(`Unknown mode: ${mode}`);
      return "";
    }
    return localStorage.getItem(storageKey) || "";
  } catch (e) {
    console.warn("Failed to load input from localStorage:", e);
    return "";
  }
};

module.exports = {
  saveAppInput,
  loadAppInput
};
