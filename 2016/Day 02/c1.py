print('Advent of Code - Day 2, Challenge 1')
# Left/Right alters key by 1, Up/Down alters key by 3
# 
#  123
#  456        keypad visual
#  789

# keys that cant move in a direction
cantLeft   = [1,4,7];
cantRight  = [3,6,9];
cantUp     = [1,2,3];
cantDown   = [7,8,9];

k = 5; # starting key
code = ''; # initialise final code

# update current key if move possible
def move(k,c):
  if   (c=='L' and k not in cantLeft):   return k-1
  elif (c=='R' and k not in cantRight):  return k+1
  elif (c=='U' and k not in cantUp):     return k-3
  elif (c=='D' and k not in cantDown):   return k+3
  return k

# Open source file and parse each instruction
with open('input.txt') as file:
  for line in file:
    for c in line.strip(): k = move(k,c)
    code += str(k)
print('The bathroom code is: ' + code)