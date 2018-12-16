let input = require('fs').readFileSync('input.txt', {encoding: 'utf8'})
let tracks = input.replace(/\^|v/g, '|').replace(/<|>/g, '-').split('\n');
input = input.split('\n').map(l=>l.split(''));
let states = {}, cartCount = 0;

for (let y = 0; y < input.length; ++y) {
  for (let x = 0; x < input[y].length; ++x) {
    let ch = input[y][x];
    if (ch != 'v' && ch != '^' && ch != '<' && ch != '>') continue;
    ++cartCount;
  }
}

while (true) {
  let complete = [];
  let newStates = {};
  for (let y = 0; y < input.length; ++y) {
    for (let x = 0; x < input[y].length; ++x) {
      let ch = input[y][x];
      if (ch != 'v' && ch != '^' && ch != '<' && ch != '>') continue;
      if (complete.includes(1000 * y + x)) continue;
      let newX = x, newY = y;
      if (ch == 'v') newY++;
      else if (ch == '^') newY--;
      else if (ch == '<') newX--;
      else if (ch == '>') newX++;
      complete.push(newY * 1000 + newX);
      input[y][x] = tracks[y][x];
      if (input[newY][newX] == 'v' || input[newY][newX] == '^' || input[newY][newX] == '<' || input[newY][newX] == '>') {
        input[newY][newX] = tracks[newY][newX];
        cartCount -= 2;
        continue;
      }
      input[newY][newX] = ch;
      newStates[1000 * newY + newX] = (states[1000 * y + x] || 0);
      let trackShape = tracks[newY][newX];
      if (trackShape == '-' || trackShape == '|') continue;
      if (trackShape == '/') {
        if (ch == 'v') ch = '<';
        else if (ch == '^') ch = '>';
        else if (ch == '<') ch = 'v';
        else if (ch == '>') ch = '^';
      } else if (trackShape == '\\') {
        if (ch == 'v') ch = '>';
        else if (ch == '^') ch = '<';
        else if (ch == '<') ch = '^';
        else if (ch == '>') ch = 'v';
      } else if (trackShape == '+') {
        let s = (states[1000 * y + x] || 0) % 3 + 3;
        for (let k = 0; k < s; ++k) {
          if (ch == 'v') ch = '<';
          else if (ch == '^') ch = '>';
          else if (ch == '<') ch = '^';
          else if (ch == '>') ch = 'v';
        }
        newStates[1000 * newY + newX] = (states[1000 * y + x] || 0) + 1;
      }
      input[newY][newX] = ch;
    }
  }
  states = newStates;
  if (cartCount == 1) {
    for (let y = 0; y < input.length; ++y) {
      for (let x = 0; x < input[y].length; ++x) {
        let ch = input[y][x];
        if (ch != 'v' && ch != '^' && ch != '<' && ch != '>') continue;
        console.log(x + ',' + y);
        return;
      }
    }
  }
}