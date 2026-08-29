const LO_SHU_GRID = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6]
];

const LO_SHU_LINES = [
  {
    id: "mental",
    numbers: [4, 9, 2],
    name: "Mental Plane"
  },
  {
    id: "emotional",
    numbers: [3, 5, 7],
    name: "Emotional Plane"
  },
  {
    id: "practical",
    numbers: [8, 1, 6],
    name: "Practical Plane"
  },
  {
    id: "thought",
    numbers: [4, 3, 8],
    name: "Thought"
  },
  {
    id: "willpower",
    numbers: [9, 5, 1],
    name: "Willpower"
  },
  {
    id: "action",
    numbers: [2, 7, 6],
    name: "Action"
  },
  {
    id: "diagonal-456",
    numbers: [4, 5, 6],
    name: "Diagonal 4-5-6"
  },
  {
    id: "diagonal-258",
    numbers: [2, 5, 8],
    name: "Diagonal 2-5-8"
  }
];

const createNumberCounts = function () {
  return {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
  };
};

const getDobDigits = function (dob) {
  return String(dob)
    .replace(/\D/g, "")
    .split("")
    .map(Number)
    .filter((digit) => digit !== 0);
};

const getNumberCounts = function (dob) {
  const counts = createNumberCounts();

  getDobDigits(dob).forEach((digit) => {
    counts[digit] += 1;
  });

  return counts;
};

const getMissingNumbers = function (counts) {
  return Object.keys(counts)
    .filter((number) => counts[number] === 0)
    .map(Number);
};

const getRepeatedNumbers = function (counts) {
  return Object.keys(counts)
    .filter((number) => counts[number] > 1)
    .map((number) => ({
      number: Number(number),
      count: counts[number]
    }));
};

const getArrows = function (counts) {
  return LO_SHU_LINES.map((line) => ({
    ...line,
    active: line.numbers.every((number) => counts[number] > 0),
    missing: line.numbers.every((number) => counts[number] === 0)
  }));
};

const getLoShuAnalysis = function (dob) {
  const counts = getNumberCounts(dob);

  return {
    dob,
    digits: getDobDigits(dob),
    grid: LO_SHU_GRID,
    counts,
    missingNumbers: getMissingNumbers(counts),
    repeatedNumbers: getRepeatedNumbers(counts),
    arrows: getArrows(counts)
  };
};

module.exports = {
  LO_SHU_GRID,
  LO_SHU_LINES,
  getDobDigits,
  getNumberCounts,
  getMissingNumbers,
  getRepeatedNumbers,
  getArrows,
  getLoShuAnalysis
};