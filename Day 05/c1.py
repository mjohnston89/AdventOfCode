print('Advent of Code - Day 5, Challenge 1')

# Function that counts total occurrences of vowels in a string
def vowelCount(text):
	vowels = set('aeiou')
	vcount = 0
	for letter in text.lower():
		if letter in vowels:
			vcount+=1
	return vcount

# Function that checks if a string contains at least one letter that appears twice in a row
def repeatCheck(text):
	prev = ''
	for letter in text.lower():
		if (letter==prev):
			return True
		else:
			prev = letter
	return False

# Function that checks if a string contains certain substrings
def containCheck(text):
	exclusions = ['ab','cd','pq','xy']
	if any(word in text.lower() for word in exclusions):
		return True
	else:
		return False

# Initialise the count
count=0

# Open source file
with open('input.txt') as file:
	# Parse one line of the file at a time
	for line in file:
		# If line meets our defined criteria increment the count
		if (vowelCount(line)>2) and (repeatCheck(line)==True) and (containCheck(line)==False):
			count+=1

print count