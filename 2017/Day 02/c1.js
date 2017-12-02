const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
const rows = input.map(r => r.split('\t').map(Number));
let total = 0;
rows.forEach((r) => {
  const max = r.reduce((a,b) => Math.max(a,b));
  const min = r.reduce((a,b) => Math.min(a,b));
  total += (max-min);
});
console.log(total)