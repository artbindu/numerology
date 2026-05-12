const isPalindrome = (str) => {
    const cleanedStr = str.replace(/[^0-9]/g, '');
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

const isFormat_XXX_YY_ZZZ = (str) => {
  const part1 = str.slice(0, 3); // xxx
  const part2 = str.slice(3, 5); // yy
  const part3 = str.slice(5); // zzz
  const isSame = (s) => s.split("").every((c) => c === s[0]);
  return isSame(part1) && isSame(part2) && isSame(part3);
}
const isFormat_XX_YYYY_ZZ = (str) => {
  const part1 = str.slice(0, 2); // xx
  const part2 = str.slice(2, 6); // yyyy
  const part3 = str.slice(6); // zz
  const isSame = (s) => s.split("").every((c) => c === s[0]);
  return isSame(part1) && isSame(part2) && isSame(part3);
}
const isSpecial = (str) => {
  // Must be exactly 8 digits
  if (!/^\d{8}$/.test(str)) return false;

  if(isFormat_XXX_YY_ZZZ(str)) {
    return true;
  } else if(isFormat_XX_YYYY_ZZ(str)) {
    return true;
  }
};

function isSameFrequency(str) {
  // Step 1: validate input
  if (!/^\d{8}$/.test(str)) return false;
  
  // Count frequency of each digit
  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  // Check each frequency is between 2 and 4
  return Object.values(freq).every(count => count >= 2 && count <= 4);
}



/**
 * Choose Date between 1950 to 2050 (DD-MM-YYYY) as following format:
 * - XX-XX-YYYY
 * - XX-XY-YZZZ
 */
function special_date() {
    const startDate = new Date(1980, 0, 1); // 01-01-1950
    const endDate = new Date(2030, 11, 31); // 31-12-2050

    const storeData = {
        palindrome: [],
        mirror: [],
        sameFrequency: []
    }

    for(let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
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
            case isSpecial(dateNumeric1) :
                storeData.mirror.push(`${day}-${month}-${year}`);
                break;
            case isSpecial(dateNumeric2):
                storeData.mirror.push(`${year}-${month}-${day}`);
                break;
            case isSameFrequency(dateNumeric1):
                storeData.sameFrequency.push(`${day}-${month}-${year}`);
                break;
        }
    }

    console.log('Mirror Dates: ', storeData.mirror);
    console.log('Palindrome Dates: ', storeData.palindrome);
    console.log('Same Frequency Dates: ', storeData.sameFrequency);
}


special_date();