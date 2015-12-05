print('Advent of Code - Day 5, Challenge 2')

# Function that checks if a string contains a pair of any two letters 
# that appears at least twice in the string without overlapping
def pairCheck(text):
	text.lower()
	for i in range(0, len(text)-2):
		if text[i] == text[i+2]:
			return True
		else:
			continue
	return False

# Function that checks if a string contains at least one letter 
# which repeats with exactly one letter between them
def strangeRepeat(text):
	text.lower()
	for i in range(0, len(text)-1):
		if text.count(text[i] + text[i+1]) > 1:
			return True
		else:
			continue
	return False

# Initialise the count
count=0

# Open source file
with open('input.txt') as file:
	# Parse one line of the file at a time
	for line in file:
		# If line meets our defined criteria increment the count
		if (pairCheck(line)==True) and (strangeRepeat(line)==True):
			count+=1

print count