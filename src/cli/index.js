const { getNumerologyFromDob, getNumberDetails } = require("../core/numerology");
const { normalizeDob, normalizeDigitInput } = require("../core/validation");

const usage = [
  "Usage:",
  "  node src/index.js --dob DD-MM-YYYY",
  "  node src/index.js --mulank N",
  "  node src/index.js --bhagyank N",
  "",
  "Examples:",
  "  node src/index.js --dob 24-08-1993",
  "  node src/index.js --mulank 6",
  "  node src/index.js --bhagyank 9"
].join("\n");

const runCli = function () {
  const args = process.argv.slice(2);
  const flag = args[0];
  const value = args[1];

  if (!flag || !value) {
    console.log(usage);
    process.exit(1);
  }

  try {
    let result;

    if (flag === "--dob") {
      const dob = normalizeDob(value);
      result = {
        inputType: "dob",
        ...getNumerologyFromDob(dob)
      };
    } else if (flag === "--mulank") {
      const number = normalizeDigitInput(value, "Mulank");
      result = {
        inputType: "mulank",
        details: getNumberDetails(number, "mulank")
      };
    } else if (flag === "--bhagyank") {
      const number = normalizeDigitInput(value, "Bhagyank");
      result = {
        inputType: "bhagyank",
        details: getNumberDetails(number, "bhagyank")
      };
    } else {
      throw new Error("Invalid flag. Use --dob, --mulank, or --bhagyank.");
    }

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log(usage);
    process.exit(1);
  }
};

module.exports = {
  runCli
};

if (require.main === module) {
  runCli();
}
