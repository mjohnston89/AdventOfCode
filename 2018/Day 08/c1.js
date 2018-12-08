let inputs = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const parseNodes = () => {
  // Get child and meta counts
  const [childCount, metaCount] = inputs.splice(0,2);
  let sum = 0;

  // Recursively parse children
  for (let c = 0; c < childCount; c++) {
    sum += parseNodes();
  }

  return inputs.splice(0, metaCount).reduce((acc, curr) => acc + curr, sum);
}

console.log(parseNodes());