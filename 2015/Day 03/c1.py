print('Advent of Code - Day 3, Challenge 1')

# Initialise current positions
x=0
y=0
# Initialise the list of visited locations
visited = set()
# Add the starting location to visited
visited.add((0,0))
# Keep track of any unexpected characters
charError=0

# Open source file
file = open('input.txt')
while True:
	# Read one character
	char = file.read(1)
	# If at EOF break
	if not char: break
	# Parse character
	if char=='^':
		# Move north: increment y
		y+=1
	elif char=='>':
		# Move east: increment x
		x+=1
	elif char=='v':
		# Move south: decrement y
		y-=1
	elif char=='<':
		# Move west: decrement x
		x-=1
	else:
		# count unexpected char
		charError+=1
	visited.add((x,y))

print len(visited)
