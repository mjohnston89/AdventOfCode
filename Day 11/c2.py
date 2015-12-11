print('Advent of Code - Day 11, Challenge 2\n')

# My puzzle input
source = 'hxbxwxba'
# Result from challenge 2
source = 'hxbxxyzz'

# Function that checks if a string contains at least two sequences of letters that repeat at least twice in a row
def repeatCheck(text):
	prev = ''
	pair1 = ''
	for letter in text.lower():
		if (letter==prev):
			if (pair1==''):
				pair1 = letter
			elif (pair1!=letter):
				return True
		else:
			prev = letter
	return False

# Function that checks if a string contains 'i', 'o' or 'l'
def letterCheck(text):
	illegals = set('iol')
	for letter in text.lower():
		if letter in illegals:
			return True
	return False

# Function that checks if a string contains an increasing sequence of three characters such as 'abc', 'ijk', 'xyz'
def sequenceCheck(text):
	for i in range(1,len(text)-1):
		if((ord(text[i])-ord(text[i-1])==1) and (ord(text[i+1])-ord(text[i])==1)):
			return True
	return False

# Increment the current password to get a new passwword
def increment(text):
	alpha = 'abcdefghijklmnopqrstuvwxyz'
	try:
		return text[0:-1] + alpha[alpha.index(text[-1]) + 1]
	except IndexError:
		return increment(text[0:-1]) + 'a'

# Increment the passowrd, check if it is valid. If not continue
while True:
	source = increment(source)
	if repeatCheck(source) and sequenceCheck(source) and not letterCheck(source):
		print(source)
		break