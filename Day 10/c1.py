print('Advent of Code - Day 10, Challenge 1\n')

# My puzzle input
source =  '1321131112'

def looksay(num):
	# initialise variables
	temp = ''
	current = num[0]
	charCount = 0
	i=0
	# loop through num and build new string
	while i<len(num):
		if (current=='' or current==num[i]):
			charCount+=1
		else:
			temp += str(charCount) + current
			charCount = 1
		current=num[i]
		i+=1
	temp += str(charCount) + current
	# print and return result
	print "{0:0>2}".format(x), len(num)
	return temp

for x in range(41):
	source = looksay(source)