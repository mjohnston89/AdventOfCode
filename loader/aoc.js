const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const axios = require('axios');
const minimist = require('minimist');
const env = require('./env.json');

const logRed = '\x1b[31m%s\x1b[0m';
const logYellow = '\x1b[33m%s\x1b[0m'
const logGreen = '\x1b[32m%s\x1b[0m'

const parseInput = () => {
  const args = minimist(process.argv.slice(2));
  let validArgs = true;
  if (args.help) {
    console.log(logYellow, 'Example: node aoc.js 2018 03');
  } else {
    const _year = args['_'][0], _day = args['_'][1];
    if (!(_year && _year > 2014)) {
      console.log(logRed, 'Invalid year provided.');
      validArgs = false;
    }
    if (!(_day && _day > 0 && _day < 26)) {
      console.log(logRed, 'Invalid day provided');
      validArgs = false;
    }
    if (validArgs) getInput(_year, _day);
  }
}

const getInput = (year, day) => {
  const hash = crypto.createHash('sha256');
  const session = env.cookie;
  hash.update(session);
  axios({
    method: 'GET',
    url: `https://adventofcode.com/${year}/day/${day}/input`,
    headers: { 'Cookie': `session=${session}` }
  })
    .then((res) => {
      const d = `0${day}`.slice(-2);
      const p1 = path.join(__dirname, '..', `${year}`, `Day ${d}`, 'input.txt');
      const p2 = path.join(__dirname, '..', `${year}`, `Day ${d}`, 'c1.js');

      fs.writeFile(p1, res.data, 'utf8')
        .then(() => console.log(logGreen, 'Input file created'))
        .catch((err2) => console.log(logRed, `Error creating file: ${err2}`));
      
      fs.writeFile(p2, '', 'utf8')
        .then(() => console.log(logGreen, 'Part 1 file created'))
        .catch((err2) => console.log(logRed, `Error creating file: ${err2}`));
    })
    .catch((err) => console.log(logRed, `Error: ${err}`))
};

parseInput();
