export {};

const getNumberFromString = (str: string) => 
  str.length === 1
    ? +`${str}${str}`
    : +`${str[0]}${str.slice(-1)}`;

const c1Total = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split("\n")
  .map(l => l.replace(/\D/g, ""))
  .reduce((acc: number, curr: string) => acc += getNumberFromString(curr), 0);

console.log(c1Total);