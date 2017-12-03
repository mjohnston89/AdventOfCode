const input = 347991;
let latest = 0;
let found = 0;
const mSize = 11; // Define matrix size;
let m = []; // Define empty matrix
// Build empty matrix
for(let i = 0; i < mSize; i++) {
  m.push(Array(mSize).fill(0));
}
// Define origin and intial value
const origin = [Math.floor(mSize / 2), Math.floor(mSize / 2)];
let x = origin[0];
let y = origin[1];
m[y][x] = 1;

// Functions to return surrounding values if they exist
function n() { return m[y-1][x] ? m[y-1][x] : 0 };
function ne() { return m[y-1][x+1] ? m[y-1][x+1] : 0 };
function e() { return m[y][x+1] ? m[y][x+1] : 0 };
function se() { return m[y+1][x+1] ? m[y+1][x+1] : 0 };
function s() { return m[y+1][x] ? m[y+1][x] : 0 };
function sw() { return m[y+1][x-1] ? m[y+1][x-1] : 0 };
function w() { return m[y][x-1] ? m[y][x-1] : 0 };
function nw() { return m[y-1][x-1] ? m[y-1][x-1] : 0 };

// Functions that move the sprial position onward
function up(num) {
  for(let j = 0; j < num; j++) {
    y -= 1;
    m[y][x] = nw() + w() + s() + sw();
    updateLatest(m[y][x]);
  }
}
function down(num) {
  for(let j = 0; j < num; j++) {
    y += 1;
    m[y][x] = n() + ne() + e() + se();
    updateLatest(m[y][x]);
  }
}
function right(num) {
  for(let j = 0; j < num; j++) {
    x += 1;
    m[y][x] = w() + nw() + n() + ne();
    updateLatest(m[y][x]);
  }
}
function left(num) {
  for(let j = 0; j < num; j++) {
    x -= 1;
    m[y][x] = e() + se() + s() + sw();
    updateLatest(m[y][x]);
  }
}

// Check if latest calculated value is greater than input
function updateLatest(val) {
  latest = val;
  if (latest>input && found==0) { found = latest; }
}

// Build the spiral
let k = 1;
while(latest < input) {
  right(1);
  up((k*2)-1);
  left(2*k);
  down(2*k);
  right(2*k);
  k++;
}

console.log(found);