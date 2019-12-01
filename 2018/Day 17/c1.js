let map = {}, min, max, L = 1, W = 2;

let inputs = require('fs').readFileSync('input.txt').toString().trim().split('\n')
  .map(v => v.split(", "))
  .forEach(pair => {
    // X always first
    pair.sort();
    
    // Break out into the range arrays and cast to number ("9" < "20" causes a bug)
    pair[0] = pair[0].split("=")[1].split("..").map(n => +n);
    pair[1] = pair[1].split("=")[1].split("..").map(n => +n);
  
    // Pick a top range
    let ymax = pair[1][0];
    let xmax = pair[0][0];
    // Will be the number after the ".." if one exists
    if (pair[1][1] !== undefined) { ymax = pair[1][1]; }
    if (pair[0][1] !== undefined) { xmax = pair[0][1]; }
  
    // Mark the designated land in our sparse map
    for (let y = pair[1][0]; y <= ymax; y++) {
      // Keep track of min and max y values for water counting
      min = Math.min(y, min || y);
      max = Math.max(y, max || y);
      for (let x = pair[0][0]; x <= xmax; x++) {
        if (!map[y]) { map[y] = {}; }
        map[y][x] = L;
      }
    }
  });

// Total water marked
let count = 0;
// Settled water (result of side-fill)
let settle = 0;

// OOB-safe check to see if given block is given type
function check(x, y, t) {
	if (!map[y]) return false;
	return map[y][x] === t;
}

function set(x, y, t) {
	// Count water if in range
	if (t === W && y >= min && y <= max) { count++; }
	// Create row if DNE, and fill with type
	if (!map[y]) { map[y] = {}; }
	map[y][x] = t;
}

function fall(x, y) {
	// Force-stop conditions
	if (y > max) { return; }
	if (check(x, y, W)) { return; }
	
	// Add water to current square
	set(x, y, W);

	// Empty spot below us
	if (!check(x, y + 1, L)) {
		// Run algorithm recursively beneath (i.e. drain down)
		fall(x, y + 1);
	}

	// If standing water or clay built up beneath after drain
	if (check(x, y + 1, L)) {
		// Spread water to sides
		let r = side(x, y, 1);
		let l = side(x, y, -1);

		// If both L and R eventually hit a wall (i.e. standing water)
		if (r !== false && l !== false) {
			// Replace the standing water with land (it's the same for the algo)
			for (let i = l; i <= r; i++) {
				set(i, y, L);
				// Count settled water
				// No need for y bounds check since guaranteed to be between solid blocks
				settle++;
			}
			// Then we'll recurse back up a level and the calling 'fall'
			// will see it's got a floor now and spread out left and right
		}
	}
}

function side(x, y, dir) {
	// Move in direction
	while (x += dir) {
		// Stop if another water stream has already reached this loc
		if (check(x, y, W)) { return; }
		// If hit wall, don't water spot, just return the end of the water
		if (check(x, y, L)) { return x - dir; }
		
		// Empty spot, water it
		set(x, y, W);

		// If floor fell out beneath us
		if (!check(x, y + 1, L)) {
			// Drain down
			fall(x, y + 1);
			// And then quit if it didn't fill up after fill
			if (!check(x, y + 1, L)) { return false; }
		}
	}
}

fall(500, 0);

console.log("Total", count);
console.log("Settle", settle);