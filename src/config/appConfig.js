// App configuration and constants

const MODES = {
  DOB: "dob",
  NAME: "name",
  LOSHU: "loshu",
  MULANK: "mulank",
  BHAGYANK: "bhagyank"
};

// Storage keys per input type
// DOB and LOSHU share the same key since they accept the same input format
const STORAGE_KEYS = {
  [MODES.DOB]: "numerology_input_dob",
  [MODES.NAME]: "numerology_input_name",
  [MODES.LOSHU]: "numerology_input_dob",  // Same as DOB
  [MODES.MULANK]: "numerology_input_mulank",
  [MODES.BHAGYANK]: "numerology_input_bhagyank"
};

// Mode configuration
const MODE_CONFIG = {
  [MODES.DOB]: {
    label: "Date of Birth (DD-MM-YYYY)",
    placeholder: "24-08-1993",
    storageKey: STORAGE_KEYS[MODES.DOB]
  },
  [MODES.LOSHU]: {
    label: "Date of Birth (DD-MM-YYYY)",
    placeholder: "27-10-1994",
    storageKey: STORAGE_KEYS[MODES.LOSHU]
  },
  [MODES.NAME]: {
    label: "Name",
    placeholder: "Rahul Sharma",
    storageKey: STORAGE_KEYS[MODES.NAME]
  },
  [MODES.MULANK]: {
    label: "Mulank Number (1-9)",
    placeholder: "6",
    storageKey: STORAGE_KEYS[MODES.MULANK]
  },
  [MODES.BHAGYANK]: {
    label: "Bhagyank Number (1-9)",
    placeholder: "9",
    storageKey: STORAGE_KEYS[MODES.BHAGYANK]
  }
};

module.exports = {
  MODES,
  STORAGE_KEYS,
  MODE_CONFIG
};
