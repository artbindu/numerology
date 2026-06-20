const { getNumerologyFromDob, getNumerologyFromName, getNumberDetails } = require("../core/numerology");
const { normalizeDob, normalizeDigitInput, normalizeName } = require("../core/validation");
const { isPalindrome, isSpecial, isSameFrequency } = require("../tools/special-date");

const modeButtons = Array.from(document.querySelectorAll(".mode-btn"));
const form = document.getElementById("numerology-form");
const input = document.getElementById("input-value");
const inputLabel = document.getElementById("input-label");
const result = document.getElementById("result");
const error = document.getElementById("error");

let activeMode = "dob";

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

const updateMode = function (mode) {
  activeMode = mode;
  modeButtons.forEach((btn) => {
    const isActive = btn.dataset.mode === mode;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });

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

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => updateMode(btn.dataset.mode));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();
  error.textContent = "";
  result.innerHTML = "";

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
