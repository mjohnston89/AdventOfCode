const input = require('fs').readFileSync('input.txt').toString().trim().split("\n");
const guards = input.map(s => s.match(/\d+/g).map(Number));
const caughtByGuard = delay => ([d, r]) => (delay + d) % (2 * (r - 1)) === 0;
const severity = delay => guards.filter(caughtByGuard(delay))
    .reduce((n, [d, r]) => n + d * r, 0);

let delay = -1;
while (guards.some(caughtByGuard(++delay)));
console.log([severity(0), delay]);