import hashlib

print('Advent of Code - Day 4, Challenge 2')

myKey = 'iwrupvqb'

i=0

while True:
	theTry = myKey+str(i)
	theHash = hashlib.md5(theTry)
	if theHash.hexdigest()[:6]=='000000': break
	i+=1

print 'The lowest number is: ', i