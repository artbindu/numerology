const isPalindrome = (str) => {
  const cleanedStr = str.replace(/[^0-9]/g, "");
  return cleanedStr === cleanedStr.split("").reverse().join("");
};

const isFormat_XXX_YY_ZZZ = (str) => {
  const part1 = str.slice(0, 3);
  const part2 = str.slice(3, 5);
  const part3 = str.slice(5);
  const isSame = (s) => s.split("").every((c) => c === s[0]);
  return isSame(part1) && isSame(part2) && isSame(part3);
};

const isFormat_XX_YYYY_ZZ = (str) => {
  const part1 = str.slice(0, 2);
  const part2 = str.slice(2, 6);
  const part3 = str.slice(6);
  const isSame = (s) => s.split("").every((c) => c === s[0]);
  return isSame(part1) && isSame(part2) && isSame(part3);
};

const isSpecial = (str) => {
  if (!/^\d{8}$/.test(str)) return false;

  if (isFormat_XXX_YY_ZZZ(str)) {
    return true;
  }

  if (isFormat_XX_YYYY_ZZ(str)) {
    return true;
  }

  return false;
};

function isSameFrequency(str) {
  if (!/^\d{8}$/.test(str)) return false;

  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  return Object.values(freq).every((count) => count >= 2 && count <= 4);
}

function specialDate(startDate = new Date(1980, 0, 1), endDate = new Date(2030, 11, 31)) {
  const storeData = {
    palindrome: [],
    mirror: [],
    sameFrequency: []
  };

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const dateNumeric1 = `${day}${month}${year}`;
    const dateNumeric2 = `${year}${month}${day}`;

    switch (true) {
      case isPalindrome(dateNumeric1):
        storeData.palindrome.push(`${day}-${month}-${year}`);
        break;
      case isPalindrome(dateNumeric2):
        storeData.palindrome.push(`${year}-${month}-${day}`);
        break;
      case isSpecial(dateNumeric1):
        storeData.mirror.push(`${day}-${month}-${year}`);
        break;
      case isSpecial(dateNumeric2):
        storeData.mirror.push(`${year}-${month}-${day}`);
        break;
      case isSameFrequency(dateNumeric1):
        storeData.sameFrequency.push(`${day}-${month}-${year}`);
        break;
      default:
        break;
    }
  }

  return storeData;
}

module.exports = {
  isPalindrome,
  isSpecial,
  isSameFrequency,
  specialDate
};

if (require.main === module) {
  const result = specialDate();
  console.log("Mirror Dates:", result.mirror);
  console.log("Palindrome Dates:", result.palindrome);
  console.log("Same Frequency Dates:", result.sameFrequency);
}
