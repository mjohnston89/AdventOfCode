"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getNumberFromString = (str) => str.length === 1
    ? +`${str}${str}`
    : +`${str[0]}${str.slice(-1)}`;
const replaceWordsWithNumbers = (input) => {
    const wordToNumber = {
        one: "one1one",
        two: "two2two",
        three: "three3three",
        four: "four4four",
        five: "five5five",
        six: "six6six",
        seven: "seven7seven",
        eight: "eight8eight",
        nine: "nine9nine"
    };
    for (const num in wordToNumber) {
        input = input.replaceAll(num, wordToNumber[num]);
    }
    return input;
};
const c2Total = require('fs')
    .readFileSync('input.txt')
    .toString()
    .trim()
    .split("\n")
    .map(l => replaceWordsWithNumbers(l))
    .map(l => l.replace(/\D/g, ""))
    .reduce((acc, curr) => acc += getNumberFromString(curr), 0);
console.log(c2Total);
//# sourceMappingURL=c2.js.map