print('Advent of Code - Day 8, Challenge 1')

import re

literalCount = 0
characterCount = 0

# Open source file
with open('input.txt') as file:
	# Parse one line of the file at a time
	for line in file:
		# Increment the literal count
		literalCount += len(line.strip())
		# operations to calculate character count
		# remove line return and encompasing quotation marks
		temp = line.strip()[1:-1].decode('string_escape')
		characterCount+=len(temp)

print literalCount, '-', characterCount,'=',literalCount-characterCount