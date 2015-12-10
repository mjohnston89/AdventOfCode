import hashlib

print('Advent of Code - Day 4, Challenge 1')

myKey = 'iwrupvqb'

i=0

while True:
	theTry = myKey+str(i)
	theHash = hashlib.md5(theTry)
	if theHash.hexdigest()[:5]=='00000': break
	i+=1

print 'The lowest number is: ', i
