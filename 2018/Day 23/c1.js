// // let data = require('fs').readFileSync('input.txt').toString().trim().split('\n').map(l => {
// //   const parts = l.split('>, r=');
// //   return {
// //     pos: parts[0].slice(5).split(',').map(Number),
// //     r: Number(parts[1])
// //   }
// // });

// // let strongestNdx = -1;
// // let strongestSignal = -1;
// // let strongestLocation;

// // // Get the nanobot with the largest radius.
// // for (let nanoNdx = 0; nanoNdx < data.length; nanoNdx++) {
// //    let nano = data[nanoNdx];
// //    if (nano.r > strongestSignal) {
// //       strongestSignal = nano.r;
// //       strongestNdx = nanoNdx;
// //       strongestLocation = nano.pos;
// //    }
// // }

// // console.log("Part one: " + getNumInRange(strongestLocation, strongestNdx));

// // // Locations with most nanobots found so far, with at least the one with the best Manhattan distance found so far of those.
// // let bestLocsSoFar = [[0,0,0]];
// // // Used to quickly prevent dupes in list of above.
// // let bestSoFarObj = {};
// // // The most nanobots found so far with a default to choose good starting location.
// // let bestNumFound = 50;
// // // Ended up not using this. I was going to repeat waves with shifts, but changed my mind.
// // let waveRepeats = 1;
// // // The disance between each scan, used for each dimension.
// // let scanDelta = 1000000;
// // // The number of outward scans from each best location so far.
// // let numScansPerWave = 6;

// // // Unused wave index. Mostly for debugging.
// // let waveNdx = 0;
// // let waveRepeatScans = 0;
// // // Scan until distance between each scan is 1. Didn't use repeats.
// // while (scanDelta > 1 || waveRepeatScans < waveRepeats) {
// //   //  console.log('Scanning with delta ' + scanDelta);
// //    waveNdx++;
// //    for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
// //       let xDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
// //       for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
// //          let yDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
// //          let foundBestInThisWave = false;
// //          for (let scanNdx = 0; scanNdx < numScansPerWave; scanNdx++) {
// //             // Only allow one new best location from each scan wave if distance between each scan is greater than 100.
// //             if (scanDelta < 100 || !foundBestInThisWave) {
// //                // Run a scan from each current best location.
// //                for (let bestLocNdx = 0; bestLocNdx < bestLocsSoFar.length; bestLocNdx++) {
// //                   let thisBestLoc = bestLocsSoFar[bestLocNdx];
// //                   let zDiff = (scanNdx - numScansPerWave / 2) * scanDelta;
// //                   let scanLoc =
// //                      [ thisBestLoc[0] + xDiff,
// //                         thisBestLoc[1] + yDiff,
// //                         thisBestLoc[2] + zDiff];
// //                   // Get the number of nanobots in range of this test location.
// //                   let scanRes = getNumInRange(scanLoc);
// //                   // If more nanobots found than before, clear list of those found and add this one.
// //                   if (scanRes > bestNumFound) {
// //                      bestNumFound = scanRes;
// //                      bestSoFarObj = {};
// //                      bestSoFarObj[scanLoc.join("|")] = true;
// //                      bestLocsSoFar = [ scanLoc ];
// //                     //  console.log(`New best of ${scanRes} at ${scanLoc}`);
// //                   }
// //                   // If the same number was found, only add if the Manhattan distance looks like a potential improvement.
// //                   else if (scanRes === bestNumFound
// //                      && getManhattanDistance(scanLoc, [0,0,0]) < getManhattanDistance(bestLocsSoFar[0],[0,0,0])
// //                      && getManhattanDistance(scanLoc, [0,0,0]) < getManhattanDistance(bestLocsSoFar[bestLocsSoFar.length - 1],[0,0,0])) {
// //                      foundBestInThisWave = true;
// //                      if (!bestSoFarObj[scanLoc.join("|")]) {
// //                         bestSoFarObj[scanLoc.join("|")] = true;
// //                         bestLocsSoFar.push(scanLoc);
// //                         // console.log(`Matched best of ${scanRes} at ${scanLoc}`);
// //                      }
// //                   }
// //                }
// //             }
// //          }
// //       }
// //    }
// //    waveRepeatScans++;
// //    if (waveRepeatScans > waveRepeats && scanDelta > 1) {
// //       waveRepeatScans = 0;
// //       scanDelta = parseInt(scanDelta / 2);
// //    }
// // }

// // console.log(`Best: ${bestNumFound} at ${bestLocsSoFar}`);

// // // The shortest Manhattan distance of locations found with the most nanobots.
// // let shortestManhattan = getManhattanDistance(bestLocsSoFar[0], [0,0,0]);
// // // The location of the shortest above.
// // let closestBest = bestLocsSoFar[0];

// // // Find the location with the shortest Manhattan distance of those with the most nanobots.
// // for (let bestNdx = 0; bestNdx < bestLocsSoFar.length; bestNdx++) {
// //    let bestToCheck = bestLocsSoFar[bestNdx]; // value

// //    let thisDistance = getManhattanDistance(bestToCheck, [0,0,0]);
// //    if (thisDistance < shortestManhattan) {
// //       shortestManhattan = thisDistance;
// //       closestBest = bestToCheck;
// //    }
// // }

// // console.log(`Part two: ${shortestManhattan} at ${closestBest}`);

// // // Get the number of nanobots within range of a location. ignoreNdx maintains support for part one approach.
// // function getNumInRange(location, ignoreNdx) {
// //    let inRange = 0;

// //    for (let nanoNdx in data) {
// //       let nano = data[nanoNdx];

// //       if (nanoNdx === ignoreNdx) {
// //          continue;
// //       }

// //       if (getManhattanDistance(location, nano.pos) <= nano.r) {
// //          inRange++;
// //       }
// //    }

// //    return inRange;
// // }

// // // Get the Manhattan distance between two locations.
// // function getManhattanDistance(loc1, loc2) {
// //    let xDiff = Math.abs(loc1[0] - loc2[0]);
// //    let yDiff = Math.abs(loc1[1] - loc2[1]);
// //    let zDiff = Math.abs(loc1[2] - loc2[2]);
// //    return xDiff + yDiff + zDiff;
// // }

// const fs = require('fs');
// const data = fs.readFileSync('./input.txt')
//     .toString()
//     .split('\n')
//     .map(v => {
//         let match = v.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/);
//         return {
//             x: parseInt(match[1], 10),
//             y: parseInt(match[2], 10),
//             z: parseInt(match[3], 10),
//             r: parseInt(match[4], 10),
//         };
//     });

// let strongest = null, max = -Infinity;
// let minx = Infinity, maxx = -Infinity,
//     miny = Infinity, maxy = -Infinity,
//     minz = Infinity, maxz = -Infinity;

// data.forEach(nb => {
//     minx = Math.min(nb.x, minx);
//     maxx = Math.max(nb.x, maxx);
//     miny = Math.min(nb.x, miny);
//     maxy = Math.max(nb.x, maxy);
//     minz = Math.min(nb.x, minz);
//     maxz = Math.max(nb.x, maxz);

//     if (nb.r > max) {
//         max = nb.r;
//         strongest = nb;
//     }
// });

// const mhd = (a, b) =>
//     Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

// let a = data.filter(v => mhd(v, strongest) <= strongest.r);
// console.log('part 1:', a.length);

// const countBots = (point) =>
//     data.reduce((botsInRange, bot) =>
//         botsInRange + (mhd(bot, point) <= bot.r ? 1 : 0)
//     , 0);

// const inRangeOfVolume = (vol, bot) => {
//     let cost = 0;
//     if (bot.x > vol.xmax) {
//         cost += bot.x - vol.xmax;
//     } else if (bot.x < vol.xmin) {
//         cost += vol.xmin - bot.x;
//     }

//     if (bot.y > vol.ymax) {
//         cost += bot.y - vol.ymax;
//     } else if (bot.y < vol.ymin) {
//         cost += vol.ymin - bot.y;
//     }

//     if (bot.z > vol.zmax) {
//         cost += bot.z - vol.zmax;
//     } else if (bot.z < vol.zmin) {
//         cost += vol.zmin - bot.z;
//     }

//     return cost <= bot.r;
// };

// const nearestPoint = (vol, bot) => {
//     let nx = (bot.x > vol.xmax ? vol.xmax : bot.x < vol.xmin ? vol.xmin : bot.x),
//         ny = (bot.y > vol.ymax ? vol.ymax : bot.y < vol.ymin ? vol.ymin : bot.y),
//         nz = (bot.z > vol.zmax ? vol.zmax : bot.z < vol.zmin ? vol.zmin : bot.z);
//     return {x: nx, y: ny, z: nz};
// };

// const botsInRange = (vol) => {
//     let set = new Set();
//     for (let nb of data) {
//         if (inRangeOfVolume(vol, nb)) { set.add(nb); }
//     }
//     return set;
// };

// const setEquals = (a, b) => {
//     if (a.size !== b.size) { return false; }
//     for (const item of a) { if (!b.has(item)) return false; }
//     return true;
// };

// let vol = {
//     xmin: Math.min(minx, miny, minz),
//     xmax: Math.max(maxx, maxy, maxz),
//     ymin: Math.min(minx, miny, minz),
//     ymax: Math.max(maxx, maxy, maxz),
//     zmin: Math.min(minx, miny, minz),
//     zmax: Math.max(maxx, maxy, maxz),
// };

// const subdivide = vol => {
//     if (vol.xmin === vol.xmax && vol.ymin === vol.ymax && vol.zmin === vol.zmax) {
//         return {xmin: vol.xmin, xmax: vol.xmax, ymin: vol.ymin, ymax: vol.ymax, zmin: vol.zmin, zmax: vol.zmax};
//     }

//     let xmid = Math.floor((vol.xmax - vol.xmin) / 2 + vol.xmin),
//         ymid = Math.floor((vol.ymax - vol.ymin) / 2 + vol.ymin),
//         zmid = Math.floor((vol.zmax - vol.zmin) / 2 + vol.zmin);

//     // sometimes this function will get called with a volume that's a line, or a plane
//     // this will generate duplicate volumes, but they don't matter significantly
//     return [
//         { xmin: vol.xmin, xmax: xmid,     ymin: vol.ymin, ymax: ymid,     zmin: vol.zmin, zmax: zmid     },
//         { xmin: xmid + 1, xmax: vol.xmax, ymin: vol.ymin, ymax: ymid,     zmin: vol.zmin, zmax: zmid     },
//         { xmin: vol.xmin, xmax: xmid,     ymin: ymid + 1, ymax: vol.ymax, zmin: vol.zmin, zmax: zmid     },
//         { xmin: xmid + 1, xmax: vol.xmax, ymin: ymid + 1, ymax: vol.ymax, zmin: vol.zmin, zmax: zmid     },
//         { xmin: vol.xmin, xmax: xmid,     ymin: vol.ymin, ymax: ymid,     zmin: zmid + 1, zmax: vol.zmax },
//         { xmin: xmid + 1, xmax: vol.xmax, ymin: vol.ymin, ymax: ymid,     zmin: zmid + 1, zmax: vol.zmax },
//         { xmin: vol.xmin, xmax: xmid,     ymin: ymid + 1, ymax: vol.ymax, zmin: zmid + 1, zmax: vol.zmax },
//         { xmin: xmid + 1, xmax: vol.xmax, ymin: ymid + 1, ymax: vol.ymax, zmin: zmid + 1, zmax: vol.zmax },
//     ];
// };

// let origin = {x: 0, y: 0, z: 0};

// let vols = [ vol ];
// vol.inRange = botsInRange(vol);

// let best = null, bestP = null, bestD = Infinity;

// const findBest = (v1, v2) =>
//     v1.inRange.size > v2.inRange.size ? v1 :
//     v2.inRange.size > v1.inRange.size ? v2 :
//     nearestPoint(v1, origin) < nearestPoint(v2, origin) ? v1 :
//     nearestPoint(v2, origin) < nearestPoint(v1, origin) ? v2 :
//     v1; // arbitrary

// outer: while (vols.length) {
//     let v;
//     while (vols.length) {
//         v = vols.pop();

//         // we haven't refined this volume to a single point, subdivide it more
//         if (
//             v.xmax - v.xmin > 0 ||
//             v.ymax - v.ymin > 0 ||
//             v.zmax - v.zmin > 0
//         ) { break; }

//         // we have a single point; is it better than our current best?
//         best = best ? findBest(best, v) : v;
//         bestP = nearestPoint(best, origin);
//         bestD = mhd(bestP, origin);

//         // if we have a new best, we can discard all candidates whose
//         // upper bound of bot count is lower than the new best
//         if (best === v) {
//             vols = vols.filter(v2 =>
//                 v2.inRange.size >= best.inRange.size &&
//                 mhd(nearestPoint(v2, origin), origin) <= bestD
//             );
//         }

//         // pop a new candidate volume, or end our loop
//         continue outer;
//     }

//     let newVols = [ ];

//     // split a volume into 8 sub-volumes and annotate with bot counts
//     subdivide(v).forEach(v => {
//         v.inRange = botsInRange(v);
//         // nothing can reach this volume, discard it
//         if (v.inRange.size === 0) { return; }
//         // this volume's best case count of bots that can reach it is worse than our current best, discard it
//         if (best && v.inRange.size < best.inRange.size) { return; }
//         // this volume's closest point to the origin is worse than our current best, discard it
//         if (best && mhd(nearestPoint(v, origin), origin) > bestD) { return; }
//         newVols.push(v);
//     });

//     // add the new volumes to the queue
//     Array.prototype.push.apply(vols, newVols);

//     // sort the queue so that the volumes with the most bots that can reach them are
//     // at the end; this ensures that each iteration we work with the most promising volume
//     vols.sort((a, b) => a.inRange.size - b.inRange.size);
// }

// console.log(best.inRange.size, bestD);

let fs = require('fs');

let input = fs.readFileSync('./input.txt').toString().trim().split('\n').map(e => e.trim()).filter(e => e)
    .map(e => ({
        posX: Number(e.split(', ')[0].split(',')[0].substr('pos=<'.length)),
        posY: Number(e.split(', ')[0].split(',')[1]),
        posZ: Number(e.split(', ')[0].split(',')[2].substr(0, e.split(', ')[0].split(',')[2].length - 1)),
        radius: Number(e.split(', ')[1].substr('r='.length))
    }))

let bestBot = input.sort((a, b) => b.radius - a.radius)[0];

let cnt = 0;
for (let bot of input) {
    if (Math.abs(bot.posX - bestBot.posX) + Math.abs(bot.posY - bestBot.posY) + Math.abs(bot.posZ - bestBot.posZ) <= bestBot.radius) {
        cnt++;
    }
}

const findCenters = (res, mult) => {
    let centers = [];

    for (let x = (res.x - 1) * mult; x <= ((res.x) + 1) * mult; x++) {
        for (let y = (res.y - 1) * mult; y <= ((res.y) + 1) * mult; y++) {
            for (let z = (res.z - 1) * mult; z <= ((res.z) + 1) * mult; z++) {
                centers.push({ x, y, z })
            }
        }
    }

    return centers
}

let best = { x: 0, y : 0, z : 0 }
let multiplier = 2;
let divisor = 268435456

do {
    let points = null;

    points = findCenters(best, multiplier);
    for (let point of points) {
        let cnt1 = 0;
        for (let bot of input) {
            if (Math.abs(bot.posX / divisor - point.x) +
                Math.abs(bot.posY / divisor - point.y) +
                Math.abs(bot.posZ / divisor - point.z) <= bot.radius / divisor) {
                cnt1++;
            }
        }

        point.near = cnt1;
    }

    best = points[0];
    for (let p of points) {
        if (best.near < p.near) {
            best = p;
        } else if(best.near == p.near &&
            (Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.z) < (Math.abs(best.x) + Math.abs(best.y) + Math.abs(best.z)))) {
            best = p;
        }
    }

    divisor = divisor / multiplier;
} while (divisor >= 1)

let distanceFromZero = Math.abs(best.x) + Math.abs(best.y) + Math.abs(best.z)

console.log(`Answer1: ${cnt}`);
console.log(`Answer2: ${distanceFromZero}`);