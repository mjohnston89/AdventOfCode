print('Advent of Code - Day 18, Challenge 1\n')

# for each char in input file, if char=='#' then add its coordinates (char-pos,line-num) to the set lights
lights = set()
y = 0
for line in open('input.txt'):
	for x, char in enumerate(line.strip()):
		if char=='#':
			lights.add((x,y))
	y+=1

# for given (x,y) check how many of its neighbours are in lights
def neighbours(x,y):
	count = 0
	for _x in (x-1,x,x+1):
		for _y in (y-1,y,y+1):
			if ((_x,_y) in lights) and ((_x,_y) != (x,y)):
				count+=1
	return count


# repeat 100 times
for z in range(100):
	# for each pair of (x,y) between 0 and 99, if in lights and meet neighbour requirements then add to new set of lights
	templights = set()
	for x in range(100):
		for y in range(100):
			if ((x,y) in lights and 2<=neighbours(x,y)<=3) or ((x,y) not in lights and neighbours(x,y)==3):
				templights.add((x,y))
	lights = templights

print len(lights)