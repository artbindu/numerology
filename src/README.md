# Numerology App - Source Structure

## Directory Organization

```
src/
├── core/                    # Core numerology calculations
│   ├── colors.js            # Color meanings and utilities
│   ├── loshu.js             # Lo Shu Grid analysis calculations
│   ├── numerology.js        # Main numerology calculations (DOB, Name)
│   └── validation.js        # Input validation and normalization
│
├── utils/                   # Utility and rendering modules
│   ├── dom.js               # DOM element queries and helpers
│   ├── loshu-render.js      # Lo Shu Grid HTML rendering
│   ├── render.js            # General rendering utilities (cards, details)
│   ├── sidebar-state.js     # Sidebar state persistence
│   ├── storage.js           # App input localStorage management
│   └── text.js              # Text formatting utilities
│
├── tools/                   # Specialized analysis tools
│   ├── date-range.js        # Date range calculations
│   └── special-date.js      # Special date detection (palindrome, frequency)
│
├── cli/                     # CLI interface
│   └── index.js             # Command-line interface entry point
│
└── index.js                 # Main entry point for core library
```

## Module Responsibilities

### Core (`/core`)

**`numerology.js`**
- `getNumerologyFromDob(dob)` - Calculates numerology from date of birth
- `getNumerologyFromName(name)` - Calculates numerology from name
- `getNumberDetails(number)` - Returns meaning and characteristics of a number

**`validation.js`**
- `normalizeDob(value)` - Validates and normalizes DOB (DD-MM-YYYY format)
- `normalizeName(value)` - Validates and normalizes name input
- `normalizeDigitInput(value, label)` - Validates 1-9 digit inputs
- Throws descriptive errors for invalid inputs

**`loshu.js`**
- `getLoShuAnalysis(dob)` - Comprehensive Lo Shu Grid analysis
- `getDobDigits(dob)` - Extracts digits from validated DOB
- `getNumberCounts(dob)` - Counts digit occurrences (1-9)
- `getMissingNumbers(counts)` - Identifies absent numbers
- `getRepeatedNumbers(counts)` - Identifies repeated numbers
- `getArrows(counts)` - Calculates strength and missing arrows

**`colors.js`**
- Color-to-meaning mappings for number visualization
- Utilities for color CSS generation and retrieval

### Utils (`/utils`)

**`storage.js`**
- `saveAppInput(value)` - Persists user input to localStorage
- `loadAppInput()` - Retrieves stored input on page load
- Graceful fallback if localStorage unavailable

**`loshu-render.js`**
- `renderLoShuGrid(analysis)` - Renders complete Lo Shu Grid analysis
- Displays grid, missing/repeated numbers, and arrow analysis
- Returns multiple card sections as HTML string

**`render.js`**
- `card(title, body)` - Generic card component renderer
- `renderNumberDetails(label, detail)` - Number detail card rendering

**`sidebar-state.js`**
- `loadSidebarState()` - Retrieves sidebar state
- `saveSidebarState(state)` - Persists sidebar open/close state

**`dom.js`**
- `getElement(selector)` - Single element query
- `getAllElements(selector)` - Multiple elements query

**`text.js`**
- `toTitleCase(text)` - Title case formatting

### Tools (`/tools`)

**`special-date.js`**
- `isPalindrome(dob)` - Checks if DOB is a palindrome
- `isSpecial(dob)` - Identifies special dates
- `isSameFrequency(dob)` - Analyzes digit frequency patterns

**`date-range.js`**
- Date range calculations and utilities

## Data Flow

### DOB Input Path
```
DOB input (UI)
    ↓
normalizeDob()           [validation.js]
    ↓
getNumerologyFromDob()   [numerology.js]
    ↓
renderNumberDetails()    [render.js]
    ↓
Display on UI
```

### Lo Shu Grid Path
```
DOB input (UI)
    ↓
normalizeDob()           [validation.js]
    ↓
getLoShuAnalysis()       [loshu.js]
    ↓
renderLoShuGrid()        [loshu-render.js]
    ↓
Display on UI
```

### Name Input Path
```
Name input (UI)
    ↓
normalizeName()          [validation.js]
    ↓
getNumerologyFromName()  [numerology.js]
    ↓
renderNumberDetails()    [render.js]
    ↓
Display on UI
```

## Key Design Patterns

### Separation of Concerns
- **Validation** → Input normalization and error handling
- **Calculation** → Pure numerology logic
- **Rendering** → HTML generation
- **Storage** → Persistence layer

### Error Handling
All validation functions throw descriptive errors that are caught by the UI layer and displayed to users.

### Modularity
Each file exports specific functions for a single responsibility, making the codebase:
- Testable
- Reusable (CLI + Web can share core logic)
- Maintainable

## Integration Points

### Web Application (`/web/app.js`)
- Imports from all modules
- Handles user events and DOM manipulation
- Manages input/output flow

### CLI (`/cli/index.js`)
- Imports core calculation modules
- Command-line interface wrapper
- No UI/storage dependencies

### Main Entry (`index.js`)
- Library entry point
- Exports for package consumers
