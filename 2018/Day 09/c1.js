const inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ');

class Marble {
  constructor(data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

const playerCount = Number(inputs[0]), highest = Number(inputs[6]);
const players = Array(playerCount).fill(0);
let curr = new Marble(0);
curr.next = curr;
curr.prev = curr;
  
for(let m = 1; m <= highest; m++) {
  if (m % 23 == 0) {
    let remove = curr.prev.prev.prev.prev.prev.prev.prev;
    curr = remove.next;
    curr.prev = remove.prev;
    remove.prev.next = curr;
    const playerIndex = ((m - 1) % players.length + 1) - 1;
    const playerScore = remove.data;
    players[playerIndex] += m + playerScore;
  } else {
    const insertPosition = new Marble(m, curr.next, curr.next.next);
    curr.next.next.prev = insertPosition;
    curr.next.next = insertPosition;
    curr = insertPosition;
  }
}

const top = Object.values(players).sort((a, b) => b - a)[0];
console.log(top);