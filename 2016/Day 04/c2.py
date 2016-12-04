print('Advent of Code - Day 4, Challenge 2')

from string import maketrans

idSum = 0

def rotateText(room,id):
  alphabet = "abcdefghijklmnopqrstuvwxyz"
  key = id % 26;
  cipher = maketrans(alphabet, alphabet[key:] + alphabet[:key])
  for i in range(len(room)):
    room[i] = room[i].translate(cipher)
  return " ".join(room)


# Open source file and parse each instruction
with open('input.txt') as file:
  for line in file:
    # split input line into room, id and hash
    [room,id,hash] = [
      line.strip()[:-11].split("-"), 
      int(line.strip()[-10:-7]), 
      line.strip()[-6:-1]
    ]
    result = rotateText(room,id)
    if result.__contains__("north"): print(result, id)