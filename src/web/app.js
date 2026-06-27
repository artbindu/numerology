const { getNumerologyFromDob, getNumerologyFromName, getNumberDetails } = require("../core/numerology");
const { normalizeDob, normalizeDigitInput, normalizeName } = require("../core/validation");
const { colorMeaningMap } = require("../core/colors");
const { isPalindrome, isSpecial, isSameFrequency } = require("../tools/special-date");
const { version: APP_VERSION } = require("../../package.json");

const sidebarModeButtons = Array.from(document.querySelectorAll(".sidebar-mode-btn"));
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebarToggleIcon = sidebarToggle ? sidebarToggle.querySelector(".material-icons") : null;
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
const workspace = document.querySelector(".workspace");
const form = document.getElementById("numerology-form");
const formShell = document.querySelector(".form-shell");
const input = document.getElementById("input-value");
const inputLabel = document.getElementById("input-label");
const result = document.getElementById("result");
const colorGuide = document.getElementById("color-guide");
const showColorGuideButton = document.getElementById("show-color-guide-btn");
const sideNav = document.querySelector(".side-nav");
const appVersionValue = document.getElementById("app-version");
const currentModeValue = document.getElementById("current-mode-value");
const error = document.getElementById("error");

let activeMode = "dob";
let hasRenderedColorGuide = false;

const SIDEBAR_STATE_KEY = "numerology.sidebar.state.v1";
const MOBILE_QUERY = "(max-width: 768px)";

const isMobileViewport = function () {
  return window.matchMedia(MOBILE_QUERY).matches;
};

const loadSidebarState = function () {
  try {
    const raw = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (!raw) {
      return { desktopOpen: true, mobileOpen: false };
    }
    const parsed = JSON.parse(raw);
    return {
      desktopOpen: parsed.desktopOpen !== false,
      mobileOpen: parsed.mobileOpen === true
    };
  } catch (_err) {
    return { desktopOpen: true, mobileOpen: false };
  }
};

const saveSidebarState = function (state) {
  try {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(state));
  } catch (_err) {
    // ignore storage write failures
  }
};

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

const card = function (title, body, spanSix) {
  const spanClass = spanSix ? "span-6" : "";
  return `
    <article class="card ${spanClass}">
      <h3>${title}</h3>
      ${body}
    </article>
  `;
};

const renderLuckyProfile = function (profile) {
  if (!profile) {
    return "<p>No lucky profile available.</p>";
  }

  const colors = profile.colorMeanings
    .map((entry) => `<li><strong>${entry.color}</strong>: ${entry.meaning || "No meaning available"}</li>`)
    .join("");

  return `
    <p><strong>Sign:</strong> ${profile.sign}</p>
    <p><strong>Status:</strong> ${profile.status}</p>
    <ul>${colors}</ul>
  `;
};

const renderNumberDetails = function (label, detail) {
  return [
    card(
      `${label} <span class="badge">${detail.number}</span>`,
      `<p class="kpi">${detail.number}</p><p>${detail.planetaryRuler || "No planetary detail found."}</p>`,
      true
    ),
    card("Lucky Profile", renderLuckyProfile(detail.luckyProfile), true)
  ].join("");
};

const toTitleCase = function (value) {
  return value.replace(/\b\w/g, (ch) => ch.toUpperCase());
};

const colorNameToCss = function (name) {
  const n = name.toLowerCase();
  if (n === "off white" || n === "off-white") {
    return "#f8fafc";
  }
  if (n === "shades of yellow") {
    return "#facc15";
  }
  if (n === "dark gray" || n === "dark grey") {
    return "#4b5563";
  }
  if (n === "light blue") {
    return "#60a5fa";
  }
  if (n === "light green") {
    return "#86efac";
  }
  if (n === "light red") {
    return "#f87171";
  }
  return n;
};

const renderColorGuide = function () {
  if (!colorGuide) {
    return;
  }

  const colors = Object.entries(colorMeaningMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([name, meaning]) => `
      <li class="color-chip" style="--chip:${colorNameToCss(name)}">
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

const renderDobDetails = function (dob) {
  const details = getNumerologyFromDob(dob);
  const specialDateSummary = getSpecialDateSummary(dob);

  result.innerHTML = [
    card("Input DOB", `<p class="kpi">${details.dob}</p>`),
    specialDateSummary.isSpecialDate
      ? card(
          "Special Date Check",
          `<p class="kpi">Yes</p><p>${specialDateSummary.description}</p>`
        )
      : "",
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

  if (mode === "dob") {
    inputLabel.textContent = "Date of Birth (DD-MM-YYYY)";
    input.placeholder = "24-08-1993";
  } else if (mode === "name") {
    inputLabel.textContent = "Name";
    input.placeholder = "Rahul Sharma";
  } else if (mode === "mulank") {
    inputLabel.textContent = "Mulank Number (1-9)";
    input.placeholder = "6";
  } else {
    inputLabel.textContent = "Bhagyank Number (1-9)";
    input.placeholder = "9";
  }

  input.value = "";
  error.textContent = "";
  result.innerHTML = "";
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

  try {
    if (activeMode === "dob") {
      renderDobDetails(normalizeDob(value));
      return;
    }

    if (activeMode === "name") {
      renderNameDetails(normalizeName(value));
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
