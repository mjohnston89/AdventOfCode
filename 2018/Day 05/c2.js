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

// Get list of all unique characters in string
const lowercase = input.split('').map(i => i.toLowerCase());
const uniqueChars = [...new Set(lowercase)].sort();

const alpha = {};
uniqueChars.forEach((c) => {
  // For each unique character remove all instances of both cases of that character from input
  const pattern = `${c}|${c.toUpperCase()}`;
  const re = new RegExp(pattern, 'g');
  newInput = input.replace(re, '');
  // Calculate output string by passing this new string through pairs function
  const output = parseString(newInput);
  // Store the result of each output string length in object with unique character as key
  alpha[c] = output.length;
  console.log(`${c}: ${output.length}`);
})

// Find the unique character with the shortest output string
const lowest = Object.keys(alpha).reduce((prev, curr) => {
  return alpha[prev] < alpha[curr] ? prev : curr;
})

console.log(`\nRemoving '${lowest}' results in the shortest output with length ${alpha[lowest]}`);
