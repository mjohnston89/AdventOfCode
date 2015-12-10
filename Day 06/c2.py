print('Advent of Code - Day 6, Challenge 2')

# Initialise 1000x1000 matrix with each value set to 0
matrix = [[0]*1000 for i in range(1000)]

# Function that increases the brightness value of lights, in the range of (x1,y1) and (x2,y2) inclusive, by 1
def lightOn(x1,y1,x2,y2):
	for x in range(x1,x2+1):
		for y in range(y1,y2+1):
			matrix[x][y]+=1

# Function that decreases the brightness value of lights, in the range of (x1,y1) and (x2,y2) inclusive, by 1
def lightOff(x1,y1,x2,y2):
	for x in range(x1,x2+1):
		for y in range(y1,y2+1):
			# Decrease value only if greater than 0
			if (matrix[x][y]>0): matrix[x][y]-=1

# Function that increases the brightness value of lights, in the range of (x1,y1) and (x2,y2) inclusive, by 2
def toggleLight(x1,y1,x2,y2):
	for x in range(x1,x2+1):
		for y in range(y1,y2+1):
			matrix[x][y]+=2

# Open source file
with open('input.txt') as file:
	# Parse one line of the file at a time
	for line in file:
		# Split each line into parts
		theSplit = line.split(' ')
		# find the description of the command: 'turn on', 'turn off', 'toggle'
		cmdIndex = 0
		if theSplit[0]=='turn': cmdIndex = 1
		# from the split retrieve start(x,y) and end(x,y)
		x1 = int(theSplit[cmdIndex+1].split(',')[0])
		y1 = int(theSplit[cmdIndex+1].split(',')[1])
		x2 = int(theSplit[cmdIndex+3].split(',')[0])
		y2 = int(theSplit[cmdIndex+3].split(',')[1])
		# process relevant command to alter lights
		if theSplit[cmdIndex]=='on': lightOn(x1,y1,x2,y2)
		elif theSplit[cmdIndex]=='off': lightOff(x1,y1,x2,y2)
		elif theSplit[cmdIndex]=='toggle':toggleLight(x1,y1,x2,y2)

# Initialise the total brightness count
brightness = 0

# Count the total brightness value
for row in matrix:
	for digit in row:
		brightness+=digit

print brightness
