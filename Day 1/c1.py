print('Advent of Code - Day 1, Challenge 1')

uCount=0
dCount=0
eCount=0
santaLevel=0

#open input file
file = open('input.txt')

#read file content and check content length
content = file.read()
#print(len(content))
#print(len(content.strip()))

#for each character in file count if up, down or error
for char in content:
	if char=='(': uCount+=1
	elif char==')': dCount+=1
	else: eCount+=1
#print(uCount,' - ',dCount,' - ',eCount)

#calculate Santa's destination and print
destination = santaLevel + uCount - dCount
print(destination)

#close input file
file.close()