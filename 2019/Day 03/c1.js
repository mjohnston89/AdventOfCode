const sets = [new Set(), new Set()];

const lines = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n")
  .map(l => l.split(","));

lines.forEach((l, i) => {
  let x = 0, y = 0;
  l.forEach((p) => {
    const d = +p.slice(1);
    switch (p.slice(0,1)) {
      case 'U':
        for (let a = 1; a <= d; a++) sets[i].add(`${x},${y + a}`);
        y += d;
        break;
      case 'D':
        for (let a = 1; a <= d; a++) sets[i].add(`${x},${y - a}`);
        y -= d;
        break;
      case 'L':
        for (let a = 1; a <= d; a++) sets[i].add(`${x - a},${y}`);
        x -= d;
        break;
      case 'R':
        for (let a = 1; a <= d; a++) sets[i].add(`${x + a},${y}`);
        x += d;
        break;
    }
  });
});

const both = [...sets[0]].filter(z => sets[1].has(z));
const distances = both.map((p) => {
  const [x, y] = p.split(",");
  return Math.abs(+x) + Math.abs(+y);
})
console.log(distances.sort((a, b) => a - b)[0]);