const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeDob } = require("../src/core/validation");

test("normalizeDob formats compact DDMMYYYY input", () => {
  assert.equal(normalizeDob("11122000"), "11-12-2000");
});

test("normalizeDob keeps accepting slash and hyphen separators", () => {
  assert.equal(normalizeDob("11/12/2000"), "11-12-2000");
  assert.equal(normalizeDob("11-12-2000"), "11-12-2000");
});

test("normalizeDob rejects invalid compact calendar dates", () => {
  assert.throws(() => normalizeDob("31022000"), /valid calendar date/);
});
