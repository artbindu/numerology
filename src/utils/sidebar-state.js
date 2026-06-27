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

module.exports = {
  SIDEBAR_STATE_KEY,
  MOBILE_QUERY,
  isMobileViewport,
  loadSidebarState,
  saveSidebarState
};