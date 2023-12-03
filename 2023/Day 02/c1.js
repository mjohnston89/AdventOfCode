"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elf = { r: 12, g: 13, b: 14 };
const c1 = require('fs')
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
    const possible = (max.r <= elf.r) && (max.g <= elf.g) && (max.b <= elf.b);
    return { id, rounds, max, possible };
});
const total = c1.filter(game => game.possible).reduce((acc, curr) => acc += curr.id, 0);
console.log(total);
//# sourceMappingURL=c1.js.map