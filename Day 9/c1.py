print('Advent of Code - Day 9, Challenge 1\n')

from collections import defaultdict
from itertools import permutations

places = set()
distances = defaultdict(dict)

# Open source file
for line in open('input.txt'):
	# split each line
    (source, _, dest, _, distance) = line.split()
    # store each place in places and distance between each place in distances
    places.add(source)
    places.add(dest)
    distances[dest][source] = int(distance)
    distances[source][dest] = int(distance)

# initialise extremely high initial shortest value
shortest = 100000
route = ""

# for each course in the set of all possible courses
for course in permutations(places):
	temp = 0
	routeLengths = []
	# create list of all distances
	for i in range(0,len(course)-1):
		routeLengths.append(distances[course[i]][course[i+1]])
	# check if a distance of 0 is present and if so continue 
	if temp in routeLengths: continue
	# sum up total length of route
	for i in range(0,len(course)-1):
		temp+=routeLengths[i]
	# if shorter than shortest assign value and route
	if temp<shortest:
		shortest = temp
		route = course

# print output
for i in range(0,len(route)-1):
	print i, route[i],'+',route[i+1],'=',distances[route[i]][route[i+1]]
print '\n',shortest, route
