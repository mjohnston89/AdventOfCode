const input = require('fs').readFileSync('input.txt').toString().trim().split('\n').map((line) => {
  const parts = line.split('/');
  return { a: parseInt(parts[0], 10), b: parseInt(parts[1], 10) };
});

const bridges = build({ str: 0, len: 0 }, input, 0);
const longest = bridges.reduce((a,b) => b.len > a.len ? b : a).len;
const longestStrength = bridges.filter(b => b.len === longest).reduce((a,b) => {
  return b.str > a.str ? b : a;
}).str;

console.log(longestStrength);

function build(bridge, pieces, connector) {
  let bridges = [];
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].a === connector || pieces[i].b === connector) {
      const newBridge = { str: bridge.str + pieces[i].a + pieces[i].b, len: bridge.len + 1 };
      bridges.push(newBridge);
      const leftpieces = pieces.slice();
      leftpieces.splice(i, 1);
      const newConnector = pieces[i].a === connector ? pieces[i].b : pieces[i].a;
      bridges = bridges.concat(build(newBridge, leftpieces, newConnector));
    }
  }
  return bridges;
}