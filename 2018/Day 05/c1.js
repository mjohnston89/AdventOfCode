let input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim();

// Recursive function that removes pairs of the same characters with different cases
// Will remove aA or Aa, not aa or AA
const parseString = (str) => {
  let changes = false;
  for (let i = 0; i < str.length -1; i++) {
    if (str[i] !== str[i+1] && str[i].toLowerCase() === str[i+1].toLowerCase()) {
      str = str.slice(0, i) + str.slice(i+2);
      changes = true;
    }
  }
  return changes ? parseString(str) : str;
}

const result = parseString(input);
console.log(result.length);