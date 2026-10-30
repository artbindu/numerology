const { getNumerologyFromDob, getNumerologyFromName, getNumberDetails } = require("../core/numerology");
const { normalizeDob, normalizeDigitInput, normalizeName } = require("../core/validation");
const { getColorCss, getOrderedColorEntries } = require("../core/colors");
const { getLoShuAnalysis } = require("../core/loshu");
const { renderLoShuGrid } = require("../utils/loshu-render");
const { isPalindrome, isSpecial, isSameFrequency } = require("../tools/special-date");
const { card, renderNumberDetails } = require("../utils/render");
const { getElement, getAllElements } = require("../utils/dom");
const {
  isMobileViewport,
  loadSidebarState,
  saveSidebarState
} = require("../utils/sidebar-state");
const { saveAppInput, loadAppInput } = require("../config/storage");
const { MODE_CONFIG } = require("../config/appConfig");
const { toTitleCase } = require("../utils/text");
const { version: APP_VERSION } = require("../../package.json");

const sidebarModeButtons = getAllElements(".sidebar-mode-btn");
const sidebarToggle = getElement("#sidebar-toggle");
const sidebarToggleIcon = sidebarToggle ? sidebarToggle.querySelector(".material-icons") : null;
const sidebarBackdrop = getElement("#sidebar-backdrop");
const workspace = getElement(".workspace");
const form = getElement("#numerology-form");
const formShell = getElement(".form-shell");
const input = getElement("#input-value");
const inputLabel = getElement("#input-label");
const result = getElement("#result");
const colorGuide = getElement("#color-guide");
const showColorGuideButton = getElement("#show-color-guide-btn");
const sideNav = getElement(".side-nav");
const appVersionValue = getElement("#app-version");
const currentModeValue = getElement("#current-mode-value");
const error = getElement("#error");

let activeMode = "dob";
let hasRenderedColorGuide = false;

let sidebarState = loadSidebarState();

const setSidebarState = function (isOpen) {
  if (!workspace || !sidebarToggle) {
    return;
  }

  const mobile = isMobileViewport();

  workspace.classList.toggle("sidebar-open", isOpen);
  workspace.classList.toggle("sidebar-closed", !isOpen);
  workspace.classList.toggle("sidebar-collapsed", !mobile && !isOpen);

  sidebarToggle.setAttribute("aria-expanded", String(isOpen));
  sidebarToggle.setAttribute("aria-label", isOpen ? "Close sidebar" : "Open sidebar");
  sidebarToggle.setAttribute("title", isOpen ? "Close sidebar" : "Open sidebar");

  if (sidebarToggleIcon) {
    sidebarToggleIcon.textContent = isOpen ? "menu_open" : "menu";
  }

  if (mobile) {
    sidebarState.mobileOpen = isOpen;
  } else {
    sidebarState.desktopOpen = isOpen;
  }
  saveSidebarState(sidebarState);
};

const syncSidebarForViewport = function () {
  if (isMobileViewport()) {
    // Mobile drawer should always start closed to avoid covering content on load.
    setSidebarState(false);
    return;
  }

  setSidebarState(sidebarState.desktopOpen);
};

const renderColorGuide = function () {
  if (!colorGuide) {
    return;
  }

  const colors = getOrderedColorEntries()
    .map(
      ([name, meaning]) => `
      <li class="color-chip" style="--chip:${getColorCss(name)}">
        <span class="color-dot" aria-hidden="true"></span>
        <div>
          <p class="color-chip-title">${toTitleCase(name)}</p>
          <p class="color-chip-copy">${meaning}</p>
        </div>
      </li>
    `
    )
    .join("");

  colorGuide.innerHTML = card("Color Meaning Guide", `<ul class="color-guide-list">${colors}</ul>`);
};

const showColorGuide = function (source) {
  if (source !== "sidebar-button") {
    return;
  }

  if (!colorGuide) {
    return;
  }

  if (!hasRenderedColorGuide) {
    renderColorGuide();
    hasRenderedColorGuide = true;
  }

  colorGuide.hidden = false;
  colorGuide.scrollIntoView({ behavior: "smooth", block: "start" });
};

const hideColorGuide = function () {
  if (!colorGuide) {
    return;
  }

  colorGuide.hidden = true;
  colorGuide.innerHTML = "";
  hasRenderedColorGuide = false;
};

const showNumerologyForm = function () {
  if (formShell) {
    formShell.hidden = false;
  }

  if (!form) {
    return;
  }

  form.hidden = false;
};

const hideNumerologyForm = function () {
  if (formShell) {
    formShell.hidden = true;
  }

  if (!form) {
    return;
  }

  form.hidden = true;
};

const getSpecialDateSummary = function (dob) {
  const [day, month, year] = dob.split("-");
  const ddmmyyyy = `${day}${month}${year}`;
  const yyyymmdd = `${year}${month}${day}`;
  const tags = [];

  if (isPalindrome(ddmmyyyy) || isPalindrome(yyyymmdd)) {
    tags.push("🔄 Palindrome");
  }

  if (isSpecial(ddmmyyyy) || isSpecial(yyyymmdd)) {
    tags.push("👑 Mirror Pattern");
  }

  if (isSameFrequency(ddmmyyyy)) {
    tags.push("🔢 Same Frequency Digits");
  }

  if (tags.length === 0) {
    return {
      isSpecialDate: false,
      description: "No special pattern found for this DOB."
    };
  }

  return {
    isSpecialDate: true,
    description: tags.join(" • ")
  };
};

const renderDobDetails = function (dob, details = getNumerologyFromDob(dob)) {
  const specialDateSummary = getSpecialDateSummary(dob);
  const specialDateCard = specialDateSummary.isSpecialDate
    ? card(
        "Special Date Check",
        `<p class="kpi">Yes</p><p>${specialDateSummary.description}</p>`
      )
    : "";
  const summaryClass = specialDateSummary.isSpecialDate ? " has-special-date" : "";

  result.innerHTML = [
    `<div class="dob-summary${summaryClass}">
      <div class="dob-summary-stack">
        ${card("Input DOB", `<p class="kpi">${details.dob}</p>`)}
        ${card("Current Age", `<p class="kpi">${details.age}</p>`)}
      </div>
      ${specialDateCard}
    </div>`,
    renderNumberDetails("Mulank", details.mulankDetails),
    renderNumberDetails("Bhagyank", details.bhagyankDetails)
  ].join("");
};

const renderNameDetails = function (name) {
  const details = getNumerologyFromName(name);

  result.innerHTML = [
    card("Input Name", `<p class="kpi">${details.name}</p>`),
    renderNumberDetails("Name Number", details.nameDetails)
  ].join("");
};

const renderSingleNumber = function (mode, number) {
  const detail = getNumberDetails(number, mode);
  result.innerHTML = renderNumberDetails(mode === "mulank" ? "Mulank" : "Bhagyank", detail);
};

const setActiveModeUi = function (mode) {
  sidebarModeButtons.forEach((btn) => {
    const isActive = btn.dataset.mode === mode;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
};

const setColorGuideButtonActive = function (isActive) {
  if (!showColorGuideButton) {
    return;
  }

  showColorGuideButton.classList.toggle("is-active", isActive);
  showColorGuideButton.setAttribute("aria-pressed", String(isActive));
};

const enterColorGuideMode = function () {
  hideNumerologyForm();
  setActiveModeUi("");
  setColorGuideButtonActive(true);
  showColorGuide("sidebar-button");
};

const exitColorGuideMode = function () {
  hideColorGuide();
  setColorGuideButtonActive(false);
  showNumerologyForm();
};

const updateMode = function (mode) {
  activeMode = mode;
  setActiveModeUi(mode);
  exitColorGuideMode();

  if (currentModeValue) {
    currentModeValue.textContent = mode.toUpperCase();
  }

  const config = MODE_CONFIG[mode];
  if (config) {
    inputLabel.textContent = config.label;
    input.placeholder = config.placeholder;
  }

  input.value = "";
  error.textContent = "";

  // Load stored input for this mode
  const storedInput = loadAppInput(mode);
  if (storedInput && input) {
    input.value = storedInput;
  }
};

sidebarModeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateMode(btn.dataset.mode);
    if (isMobileViewport()) {
      setSidebarState(false);
    }
    input.focus();
  });
});

if (sidebarToggle && workspace) {
  sidebarToggle.addEventListener("click", () => {
    const isOpen = workspace.classList.contains("sidebar-open");
    setSidebarState(!isOpen);
  });
}

if (sidebarBackdrop && workspace) {
  sidebarBackdrop.addEventListener("click", () => setSidebarState(false));
}

if (showColorGuideButton) {
  showColorGuideButton.setAttribute("aria-pressed", "false");
  showColorGuideButton.addEventListener("click", () => {
    enterColorGuideMode();
    if (isMobileViewport()) {
      setSidebarState(false);
    }
  });
}

if (sideNav) {
  sideNav.addEventListener("click", (event) => {
    const button = event.target.closest("button.side-option");
    if (!button) {
      return;
    }

    if (button.id !== "show-color-guide-btn") {
      exitColorGuideMode();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !workspace) {
    return;
  }

  if (workspace.classList.contains("sidebar-open")) {
    setSidebarState(false);
  }
});

window.addEventListener("resize", syncSidebarForViewport);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();
  error.textContent = "";
  result.innerHTML = "";
  exitColorGuideMode();

  // Save input to localStorage with mode-based key
  if (value) {
    saveAppInput(value, activeMode);
  }

  try {
    if (activeMode === "dob") {
      const dob = normalizeDob(value);
      const details = getNumerologyFromDob(dob);

      saveAppInput(dob, activeMode);
      saveAppInput(String(details.mulank), "mulank");
      saveAppInput(String(details.bhagyank), "bhagyank");
      renderDobDetails(dob, details);
      return;
    }

    if (activeMode === "name") {
      renderNameDetails(normalizeName(value));
      return;
    }

    if (activeMode === "loshu") {
      const dob = normalizeDob(value);
      const analysis = getLoShuAnalysis(dob);

      result.innerHTML = renderLoShuGrid(analysis);
      return;
    }

    const number = normalizeDigitInput(value, activeMode === "mulank" ? "Mulank" : "Bhagyank");
    renderSingleNumber(activeMode, number);
  } catch (e) {
    error.textContent = e.message;
  }
});

hideColorGuide();
updateMode(activeMode);
if (appVersionValue) {
  appVersionValue.textContent = APP_VERSION;
}
syncSidebarForViewport();
