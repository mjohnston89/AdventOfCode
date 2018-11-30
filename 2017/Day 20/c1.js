let input = require('fs').readFileSync('input.txt').toString().trim().split('\n');
const reg = /p=<(.*?)>, v=<(.*?)>, a=<(.*?)>/;
input = input.map(a => {
  return a.match(reg).slice(1).map(b => {
    return b.split(',').map(Number);
  });
});

const update = (p1, p2) => [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];
const distance = (particle) => particle.reduce((a,b) => Math.abs(a) + Math.abs(b));

const distances = []

for(var i = 0; i < 1000; i++) {
  input.forEach((particle, index) => {
    const position = particle[0];
    const velocity = particle[1];
    const acceleration = particle[2];
    particle[1] = update(velocity, acceleration);
    particle[0] = update(position, particle[1]);
    distances[index] = distance(particle[0]);   
  }); 
};

const min = distances.indexOf(Math.min(...distances));
console.log(min);