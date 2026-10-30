const normalizeDob = function (value) {
  const trimmed = value.trim();
  const cleaned = /^\d{8}$/.test(trimmed)
    ? `${trimmed.slice(0, 2)}-${trimmed.slice(2, 4)}-${trimmed.slice(4)}`
    : trimmed.replace(/\//g, "-");
  if (!/^\d{2}-\d{2}-\d{4}$/.test(cleaned)) {
    throw new Error("DOB must be in DD-MM-YYYY format.");
  }

  const [dayStr, monthStr, yearStr] = cleaned.split("-");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  const testDate = new Date(year, month - 1, day);
  const isValid =
    testDate.getFullYear() === year &&
    testDate.getMonth() === month - 1 &&
    testDate.getDate() === day;

  if (!isValid) {
    throw new Error("DOB is not a valid calendar date.");
  }

  return cleaned;
};

const normalizeDigitInput = function (value, label) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n) || n < 1 || n > 9) {
    throw new Error(`${label} must be a number between 1 and 9.`);
  }

  return n;
};

const normalizeName = function (value) {
  const cleaned = value.trim();
  const lettersOnly = cleaned.replace(/[^A-Za-z]/g, "");

  if (!lettersOnly) {
    throw new Error("Name must contain at least one alphabet letter.");
  }

  return cleaned;
};

module.exports = {
  normalizeDob,
  normalizeDigitInput,
  normalizeName
};
