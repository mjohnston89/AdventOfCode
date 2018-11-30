const input = 'jzgqcdpd';
let counter = 128;
let used = 0;
const grid = [];

while (counter--) {
  let h = knotHash(`${input}-${127 - counter}`).split('').map(x => parseInt(x, 16));
  grid.push(h.map(x => ("0000"+ x.toString(2)).substr(-4)).join("").split(""))
}

let c = (x,y) => (x < 0 || y < 0 || x > 127 || y > 127) ? 0 : grid[x][y];

function removeGroup(x,y) {
  if (c(x, y) == 0) return
  grid[x][y] = 0
  removeGroup(x + 1, y)
  removeGroup(x - 1, y)
  removeGroup(x, y + 1)
  removeGroup(x, y - 1)
}

let groups = 0
for (let x = 0; x < 128; x++) {
  for (let y = 0; y < 128; y++) {
    if (c(x,y) == 1) {
      groups++;
      removeGroup(x, y);
    }
  }
}
console.log(groups);

function knotHash(str) {
  const salt = [17, 31, 73, 47, 23]
  str = str.split('').map(x => x.charCodeAt(0))
  str.push(...salt);
  const list = Array.from(Array(256).keys());
  let current = 0;
  let skipSize = 0;
  let loop = 64;
  while(loop--) {
    for (let i = 0; i < str.length; i++) {
      if ((current + str[i]) > list.length) {
        const overflow = (current + str[i]) % list.length;
        const end = list.slice(current);
        const start = list.slice(0, overflow);
        let temp = [...end, ...start].reverse();
        const newEnd = temp.splice(0, end.length);
        Array.prototype.splice.apply(list, [current, newEnd.length].concat(newEnd));
        Array.prototype.splice.apply(list, [0, temp.length].concat(temp));
      } else {
        const selection = list.slice(current, current + str[i]).reverse();
        Array.prototype.splice.apply(list, [current, str[i]].concat(selection));
      }
      current = (current + str[i] + skipSize) % list.length;
      skipSize++;
    }
  }
  let hash = [];
  while (list.length) { hash.push(list.splice(0, 16)) };
  hash = hash.map((h) => {
    const hex = h.reduce((a,b) => a ^ b).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }).join('');
  return hash;
}