// Function to calculate Bhagyanka (Life Path Number)
const bhagyanka = function (dob) {
  dob = dob.replace(/-/g, "");
  const res = dob.split("").reduce((acc, val) => acc + parseInt(val), 0);
  return res > 9 ? bhagyanka(res.toString()) : res;
};

// Function to calculate Mulank (Destiny Number)
const mulank = function (dob) {
  dob = dob.split("-")[0];
  const res = dob.split("").reduce((acc, val) => acc + parseInt(val), 0);
  return res > 9 ? mulank(res.toString()) : res;
};

const planetaryRulers = {
  1: "Sun (☀️): Represents the self, creation, and primal force. It signifies leadership, ambition, and independence.",
  2: "Moon (🌙): Represents the mind, emotions, and intuition. It signifies sensitivity, adaptability, and emotional depth.",
  3: "Jupiter (♃): Represents wisdom, growth, and prosperity. It signifies optimism, expansion, and spirituality.",
  4: "Rahu/Uranus (♅): Represents unconventional thinking, sudden changes, and worldly manifestation. It signifies hard work and discipline.",
  5: "Mercury (☿): Represents intellect, communication, and commerce. It signifies adaptability, business acumen, and travel.",
  6: "Venus (♀): Represents love, beauty, and harmony. It signifies art, luxury, and nurturing relationships.",
  7: "Ketu/Neptune (♆): Represents spirituality, mysticism, and introspection. It signifies research and philosophical depth.",
  8: "Saturn (♄): Represents karma, discipline, and material success. It signifies resilience, ambition, and hard work.",
  9: "Mars (♂): Represents energy, courage, and action. It signifies passion, endurance, and humanitarianism.",
};

const favoriteColors = [
  {
    day: [1, 10, 19, 28],
    luckyColor: ["Red", "Golden", "Orange"],
    sign: "Sign of Rolity, Given Confidence and Leadership",
    status: "Natural Leaders",
  },
  {
    day: [2, 11, 20, 29],
    luckyColor: ["White", "Silver", "Off-White"],
    sign: "Sign of Peace, Given Balance and Harmony",
    status: "Peacemakers, Harmony Seekers",
  },
  {
    day: [3, 12, 21, 30],
    luckyColor: ["Purple", "Shades of Yellow"],
    sign: "Sign of Growth, Given Renewal and Vitality",
    status: "Growth-Oriented, Nature Lovers",
  },
  {
    day: [4, 13, 22, 31],
    luckyColor: ["Blue", "Gray"],
    sign: "Sign of Stability, Given Trust and Loyalty",
    status: "Stable, Loyal Individuals",
  },
  {
    day: [5, 14, 23],
    luckyColor: ["Green", "Turquoise"],
    sign: "Sign of Balance, Given Harmony and Prosperity",
    status: "Balanced, Prosperous Individuals",
  },
  {
    day: [6, 15, 24],
    luckyColor: ["Yellow", "Gold"],
    sign: "Sign of Joy, Given Optimism and Success",
    status: "Joyful, Optimistic Individuals",
  },
  {
    day: [7, 16, 25],
    luckyColor: ["Indigo", "Violet"],
    sign: "Sign of Intuition, Given Spiritual Insight and Wisdom",
    status: "Intuitive, Wise Individuals",
  },
  {
    day: [8, 17, 26],
    luckyColor: ["Black", "Dark Gray"],
    sign: "Sign of Power, Given Strength and Authority",
    status: "Powerful, Authoritative Individuals",
  },
  {
    day: [9, 18, 27],
    luckyColor: ["Maroon", "Crimson"],
    sign: "Sign of Compassion, Given Empathy and Humanitarianism",
    status: "Compassionate, Humanitarian Individuals",
  },
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

