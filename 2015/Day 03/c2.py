print('Advent of Code - Day 3, Challenge 2')

# Initialise current positions for santa and robo santa
sx=0
sy=0
rx=0
ry=0

# Initialise the list of visited locations
visited = set()
# Add the starting location to visited
visited.add((0,0))
# Keep track of whose turn it is
theTurn=0

# Open source file
file = open('input.txt')
while True:
	# Read one character
	char = file.read(1)
	# If at EOF break
	if not char: break
	if theTurn%2==0:
		# Move north: increment y
		if char=='^': sy+=1
		# Move east: increment x
		elif char=='>': sx+=1
		# Move south: decrement y
		elif char=='v': sy-=1
		# Move west: decrement x
		elif char=='<': sx-=1
		visited.add((sx,sy))
	else:
		# Move north: increment y
		if char=='^': ry+=1
		# Move east: increment x
		elif char=='>': rx+=1
		# Move south: decrement y
		elif char=='v': ry-=1
		# Move west: decrement x
		elif char=='<': rx-=1
		visited.add((rx,ry))
	theTurn+=1

print(len(visited))