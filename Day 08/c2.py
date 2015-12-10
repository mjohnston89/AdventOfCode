print('Advent of Code - Day 8, Challenge 1')

import re

literalCount = 0
encodedCount = 0

# Open source file
with open('input.txt') as file:
	# Parse one line of the file at a time
	for line in file:
		# Increment the literal count
		literalCount += len(line.strip())
		# increment character count
		encodedCount += len('"{0}"'.format(re.escape(line.strip())))

print encodedCount, '-', literalCount,'=',encodedCount-literalCount