print('Advent of Code - Day 2, Challenge 2')
# Left/Right alters key by 1, Up/Down alters current key by 4
#   * unless moving between 1&3 or B&D(11,13) where they alter by 2
# 
#   1
#  234
# 56789        keypad visual
#  ABC         A=>10, B=>11, C=>12, D=>13
#   D

# keys that cant move in a direction
cantLeft   = [1,2,5,10,13];
cantRight  = [1,4,9,12,13]
cantUp     = [1,2,4,5,9];
cantDown   = [5,9,10,12,13]

k = 5; # starting key
code = ''; # initialise final code

# update current key if move possible
def move(k,c):
  if (c=='L' and k not in cantLeft): return k-1
  elif (c=='R' and k not in cantRight): return k+1
  elif (c=='U' and k not in cantUp): return k-2 if(k in [3,13]) else k-4
  elif (c=='D' and k not in cantDown): return k+2 if(k in [1,11]) else k+4
  return k

# decide what character to add to final code
def addToCode(k):
  chars = [1,2,3,4,5,6,7,8,9,'A','B','C','D']
  return str(chars[k-1])

# Open source file and parse each instruction
with open('input.txt') as file:
  for line in file:
    for c in line.strip(): k = move(k,c)
    code += addToCode(k)
print('The bathroom code is: ' + code)