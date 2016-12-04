print('Advent of Code - Day 4, Challenge 1')

from collections import Counter

idSum = 0

def getHash(room):
  # get a list of tuples with (character, character_count) sorted by count then alphabetization
  counted = sorted(Counter(room).most_common(), key=lambda x: (x[1] * -1, x[0]))
  # join the characters together to form a string
  myHash = "".join("%s" % pair[0] for pair in counted)
  # return a substring of the first 5 characters
  return myHash[:5]

# Open source file and parse each instruction
with open('input.txt') as file:
  for line in file:
    # split input line into room, id and hash
    [room,id,hash] = [
      line.strip()[:-11].replace("-",""), 
      int(line.strip()[-10:-7]), 
      line.strip()[-6:-1]
    ]
    if(hash==getHash(room)):
      idSum += id

print(idSum)