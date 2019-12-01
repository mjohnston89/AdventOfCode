let inputs = require('fs').readFileSync('input.txt').toString().trim().split('\n').map(r => r.split(''));

for (let min = 0; min < 10; min++) {
  inputs = inputs.map((row, y) => row.map((acre, x) => {
    let adjacent = [
      inputs[y][x + 1],
      inputs[y][x - 1],
      inputs[y + 1] && inputs[y + 1][x],
      inputs[y + 1] && inputs[y + 1][x + 1],
      inputs[y + 1] && inputs[y + 1][x - 1],
      inputs[y - 1] && inputs[y - 1][x],
      inputs[y - 1] && inputs[y - 1][x + 1],
      inputs[y - 1] && inputs[y - 1][x - 1],
    ].filter(Boolean);

    if (acre === '.') {
      if (adjacent.filter(a => a === '|').length >= 3) return '|';
      else return '.';
    } else if (acre === '|') {
      if (adjacent.filter(a => a === '#').length >= 3) return '#';
      else return '|';
    } else {
      if (adjacent.filter(a => a === '#').length >= 1 && adjacent.filter(a => a === '|').length >= 1) return '#';
      else return '.';
    }
  }))
}

let t = 0, l = 0;
inputs.forEach(row => row.forEach(acre => {
  if (acre === '|') t++;
  if (acre === '#') l++;
}))

console.log(t, l, t * l);