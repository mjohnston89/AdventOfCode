print('Advent of Code - Day 2, Challenge 2')

#Initialise total amount of ribbon needed
ribbonNeeded = 0

#Open source file
with open('input.txt') as file:
	#Parse one line of the file at a time
	for line in file:
		#Split each line into length, width and height. Convert each to an int and finally store as list.
		theSplit = line.split('x')
		l = int(theSplit[0])
		w = int(theSplit[1])
		h = int(theSplit[2])
		dimensions = [l,w,h]
		#Sort the list
		dimensions.sort()
		#Calculate required ribbon
		required = 2*dimensions[0] + 2*dimensions[1] + l*w*h
		#Update total ribbon needed
		ribbonNeeded += required

print ribbonNeeded