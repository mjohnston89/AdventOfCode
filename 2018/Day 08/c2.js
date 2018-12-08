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

  if (!childCount) {
    return inputs.splice(0, metaCount).reduce((acc, curr) => acc + curr);
  } else {
    const children = [];
    for (let c = 0; c < childCount; c++) {
      children.push(parseNodes());
    }
    const metas = inputs.splice(0, metaCount);
    for (let m = 0; m < metas.length; m++) {
      if (metas[m]-1 >= 0 && metas[m]-1 < children.length) {
        sum += children[metas[m]-1];
      }
    }
    return sum;
  }
}

console.log(parseNodes());