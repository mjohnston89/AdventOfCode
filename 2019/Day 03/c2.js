const sets = [new Set(), new Set()];
const s2p = [{}, {}];
const steps = [0, 0];

const lines = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n")
  .map(l => l.split(","));

const update = (position, index) => {
  steps[index]++;
  sets[index].add(position);
  if(!s2p[index].hasOwnProperty(position)) s2p[index][position] = steps[index];
}

lines.forEach((l, i) => {
  let x = 0, y = 0;
  l.forEach((p) => {
    const d = +p.slice(1);
    switch (p.slice(0,1)) {
      case 'U':
        for (let a = 1; a <= d; a++) update(`${x},${y + a}`, i);
        y += d;
        break;
      case 'D':
        for (let a = 1; a <= d; a++) update(`${x},${y - a}`, i);
        y -= d;
        break;
      case 'L':
        for (let a = 1; a <= d; a++) update(`${x - a},${y}`, i);
        x -= d;
        break;
      case 'R':
        for (let a = 1; a <= d; a++) update(`${x + a},${y}`, i);
        x += d;
        break;
    }
  });
});

const both = [...sets[0]].filter(z => sets[1].has(z));
const distances = both.map((p) => {
  return s2p[0][p] + s2p[1][p];
})
console.log(distances.sort((a, b) => a - b)[0]);