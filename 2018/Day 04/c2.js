const inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n");

// Sort input by datetime
const sorted = inputs.sort((a,b) => {
  const dateA = new Date(a.split(']')[0].slice(1));
  const dateB = new Date(b.split(']')[0].slice(1));
  return dateA - dateB;
})

const guards = {};
let currentGuard = null, startSleep = null;

// Parse instructions
sorted.forEach(e => {
  const _parts = e.split('] ');
  const min = _parts[0].slice(-2)
  const instr = _parts[1].trim().split(' ');
  if (instr[0] === 'Guard') {
    // If guard instruction, store ID
    currentGuard = instr[1].slice(1);
  } else if (instr[0] === 'falls') {
    // If guard falls asleep, store min
    startSleep = min;
  } else {
    // If guard wakes up, push each min he was asleep to his object
    if (!guards.hasOwnProperty(currentGuard)) guards[currentGuard] = [];
    for (let i = Number(startSleep); i < Number(min); i++) {
      guards[currentGuard].push(i);
    }
  }
})

// Count occurences of each min for for each guard
const guardModeList = Object.keys(guards).map(x => {
  return {
    id: x,
    modeList: guards[x].reduce((acc, min) => { 
      if (min in acc) {
        acc[min]++;
      } else {
        acc[min] = 1;
      }
      return acc;
    }, {})
  }
});

// For each guard return id, most slept min, and that mins sleep count
// Then reduce to return the min that was slept through the most by any guard
const guard = guardModeList.map(x => {
  const mode = Object.keys(x.modeList).reduce((a,b) => {
    return x.modeList[a] > x.modeList[b] ? a : b;
  });
  return {
    id: x.id,
    min: mode,
    count: x.modeList[mode]
  }
}).reduce((a, b) => {
  return a.count > b.count ? a : b;
});

console.log(`Guard: ${guard.id}`);
console.log(`${guard.min} is the most common minute they are asleep`);
console.log(`${guard.id} x ${guard.min}: ${guard.id * guard.min}`);