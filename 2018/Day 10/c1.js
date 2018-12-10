let inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  // Get all digit groups from string (including negative signs) and map to number type
  .map(i => i.match(/-?\d+/g).map(Number))
  // Create object from numbers
  .map(i => ({ x: i[0], y: i[1], xv: i[2], yv: i[3]}));

// Get the min and max values for x and y from input
const getBounds = (points) => {
  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));
  return [minX, maxX, minY, maxY];
}

// Absolute size of range between two numbers
const getRange = (max, min) => max - min + 1;

// Make a copy of input and repeatedly augment points until y range starts to increase
// At this point the points should be at their closest and letters should form
const getCount = () => {
  let count = 0;
  const inputCopy = JSON.parse(JSON.stringify(inputs));
  while (true) {
    for (let i = 0; i < inputCopy.length; i++) {
      inputCopy[i].x += inputCopy[i].xv;
      inputCopy[i].y += inputCopy[i].yv;
    }
    const [,, minY, maxY] = getBounds(inputCopy);
    const newRange = getRange(maxY, minY);
    if (newRange > yRange) break;
    yRange = newRange;
    count++;
  }
  return count;
}

// Build empty matrix, then mark points with a #
// Join each row into a string and print the result
const showOutput = (minX, maxX, minY, maxY) => {
  const xr = getRange(maxX, minX) + 1, yr = getRange(maxY, minY) + 1;
  let output = [];
  for (let y = 0; y < yr; y++) {
    output.push(new Array(xr).fill(' '));
  }
  for (let i = 0; i < inputs.length; i++) {
    output[inputs[i].y - minY][inputs[i].x - minX] = '#'
  }
  output = output.map(r => r.join('')).join('\n');
  console.log(output);
}

// Get initial y range
const [,,initMinY, initMaxY] = getBounds(inputs);
let yRange = getRange(initMaxY, initMinY);
// Get count of augments required
const count = getCount();
// Augment input required number of times
for (let i = 0; i < inputs.length; i++) {
  inputs[i].x += inputs[i].xv * count;
  inputs[i].y += inputs[i].yv * count;
}
// Get final bounds and print
const [minX, maxX, minY, maxY] = getBounds(inputs);
showOutput(minX, maxX, minY, maxY);