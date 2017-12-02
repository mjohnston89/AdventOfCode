const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
const rows = input.map(r => r.split('\t').map(Number));
let total = 0;
rows.forEach((r) => {
  // const max = r.reduce((a,b) => Math.max(a,b));
  // const min = r.reduce((a,b) => Math.min(a,b));
  // total += (max-min);
  for(let i = 0; i < r.length; i++) {
    for(let j = 0; j < r.length; j++) {
      if(i!==j && (r[i]%r[j]==0)) {
        total += r[i] / r[j];
      }
    }
  }
});
console.log(total)