let inputs = require('fs').readFileSync('input.txt').toString().trim().split('\n').map(r => r.split(''));

let previousStates = {};
let totalTime = 1000000000;

for (let min = 1; min <= totalTime; min++) {
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

  let snapshot = inputs.map(row => row.join("")).join("/");

  if (snapshot in previousStates) {
    let previousTime = previousStates[snapshot];
    let timeDiff = min - previousTime;
    min += Math.floor((totalTime - min) / timeDiff) * timeDiff;
  } else {
    previousStates[snapshot] = min;
  }
}

let t = 0, l = 0;
inputs.forEach(row => row.forEach(acre => {
  if (acre === '|') t++;
  if (acre === '#') l++;
}))

console.log(t, l, t * l);