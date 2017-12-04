const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
let valid = 0;
input.forEach((passphrase) => {
  const words = passphrase.trim().split(' ').map(wrd => wrd.split('').sort().join(''));
  if (words.length === new Set(words).size) {
    valid += 1;
  } 
});
console.log(valid);