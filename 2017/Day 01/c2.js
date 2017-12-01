const input = require('fs').readFileSync('input.txt').toString().trim();

let total = 0;

for (var i = 0; i < input.length; i++) {
  const next =  input[(i + input.length / 2) % input.length];
  if (input[i] === next) { total += parseInt(input[i], 10); }
}

console.log(total);