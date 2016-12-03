import sys

print('Advent of Code - Day 1, Challenge 2')

uCount=0
dCount=0
eCount=0
santaPos=0
charPos=1


#open input file
file = open('input.txt')

#read file content and check content length
content = file.read()

#for each character in file count if up, down or error
for char in content:
	if char=='(': 
		uCount+=1
		santaPos+=1
	elif char==')':
		dCount+=1
		santaPos-=1
	else: eCount+=1
	if santaPos<0:
		print('Santa has entered the basement due to instruction: ', charPos)
		sys.exit(0)
	charPos+=1
#print(uCount,' - ',dCount,' - ',eCount)

#close input file
file.close()