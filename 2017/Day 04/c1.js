const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
let valid = 0;
input.forEach((passphrase) => {
  const words = passphrase.trim().split(' ');
  if (words.length === new Set(words).size) {
    valid += 1;
  }
});
console.log(valid);