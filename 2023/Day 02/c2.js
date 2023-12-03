"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const c2 = require('fs')
    .readFileSync('input.txt')
    .toString()
    .trim()
    .split("\n")
    .map(l => {
    const [_id, game] = l.split(": ");
    const id = +_id.split(" ")[1];
    const rounds = game.split("; ").map(r => r.split(", ")).map(r => r.reduce((acc, curr) => {
        const [num, colour] = curr.split(" ");
        acc[colour[0]] = +num;
        return acc;
    }, {}));
    const max = rounds.reduce((acc, curr) => {
        Object.keys(curr).forEach(c => {
            if (acc[c] < curr[c])
                acc[c] = curr[c];
        });
        return acc;
    }, { r: 0, g: 0, b: 0 });
    const power = max.r * max.g * max.b;
    return { id, rounds, max, power };
});
const total = c2.reduce((acc, curr) => acc += curr.power, 0);
console.log(total);
//# sourceMappingURL=c2.js.map