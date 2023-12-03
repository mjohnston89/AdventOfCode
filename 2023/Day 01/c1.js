"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getNumberFromString = (str) => str.length === 1
    ? +`${str}${str}`
    : +`${str[0]}${str.slice(-1)}`;
const c1Total = require('fs')
    .readFileSync('input.txt')
    .toString()
    .trim()
    .split("\n")
    .map(l => l.replace(/\D/g, ""))
    .reduce((acc, curr) => acc += getNumberFromString(curr), 0);
console.log(c1Total);
//# sourceMappingURL=c1.js.map