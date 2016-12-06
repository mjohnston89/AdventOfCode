print('Advent of Code - Day 5, Challenge 1')

import md5
import sys

doorID = 'uqwqemis';
thePassword = '';
num = 0

while len(thePassword)<9:
  # create hash from doorID + current num
  temp = doorID + str(num)
  hash = md5.new(temp).hexdigest()
  # show output to console to indicate progress
  if num % 1000 == 0:
    sys.stdout.flush()
    sys.stdout.write("password: {} cracking hash: {} \r".format(thePassword,hash))
  if hash.startswith("00000"):
    # add hash[5] to password if hash starts with '00000'
    thePassword += hash[5]
  num += 1

print('\nThe password is: ' + thePassword[:8])