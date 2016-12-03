print('Advent of Code - Day 2, Challenge 1')

#Initialise total amount of paper needed
paperNeeded = 0

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
		#Calculate required paper
		required = (2*l*w) + (2*w*h) + (2*h*l) + (dimensions[0]*dimensions[1])
		#Update total paper needed
		paperNeeded += required

print paperNeeded