// Aiming for 596

const input = require('fs').readFileSync('test.txt').toString().trim().split("\n");

const weights = new Map();
const subTowers = new Map();
const unbalanced = new Map();

input.forEach((line) => {
  const parts = line.split('->');
  if (parts.length === 2) {
    subTowers.set(parts[0].substr(0, parts[0].indexOf('(') - 1), parts[1].trim().split(', '));
  }
  const parts2 = parts[0].split('(').map(x => x.trim());
  weights.set(parts2[0], Number(parts2[1].slice(0,-1)));
});

const children = Array.from(subTowers.values()).reduce((a,b) => a.concat(b));
const inputs = Array.from(weights.keys());
const root = inputs.filter(k => !children.includes(k))[0];

let parent = root;

while (!checkBalance(root)) {
  parent = root
  root = unbalancedChild(root)
}
let anotherChild = subTowers.get(parent)[0]
if (anotherChild === root) {
  anotherChild = children[parent][1]
}
console.log(weights.get(root) - calcWeight(root) + calcWeight(anotherChild));

function checkBalance(parent) {
  if (!subTowers.has(parent)) {
    return true;
  }
  const childWeights = calcChildWeights(parent);
  return new Set(childWeights).length === 1;
}

function calcChildWeights(parent) {
  const childWeights = [];
  Array.from(subTowers.get(parent)).forEach((child) => {
    childWeights.push(calcWeight(child));
  });
  return childWeights;
}

function calcWeight(root) {
  let total = weights.get(root);
  Array.from(subTowers.get(root)).forEach((child) => {
    total += calcWeight(child);
  });
  return total;
}

function unbalancedChild(root) {
  const childWeights = calcChildWeights(root);
  childWeights.forEach((child) => {
    const temp = calcWeight(child);
    if (childWeights.filter(c => c === temp).length === 1) {
      return child;
    }
  })
}
