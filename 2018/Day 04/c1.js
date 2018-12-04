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

// For each guard find the total mins they were asleep, sort then return highest
const maxID = Object.entries(guards)
  .map(x => [x[0], x[1].length])
  .sort((a,b) => b[1] - a[1])[0][0]

// Count occurences of each min for guard who slept most
const modeList = guards[maxID].reduce((acc, min) => { 
  if (min in acc) {
    acc[min]++;
  } else {
    acc[min] = 1;
  }
  return acc;
}, {});

// Find the min that was slept through the most
const mode = Object.keys(modeList).reduce((a,b) => {
  return modeList[a] > modeList[b] ? a : b;
})

console.log(`Guard ${maxID} sleeps most: ${guards[maxID].length} mins`);
console.log(`${mode} is the most common minute they are asleep`);
console.log(`${maxID} x ${mode}: ${maxID * mode}`);