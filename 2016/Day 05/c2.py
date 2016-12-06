print('Advent of Code - Day 5, Challenge 1')

import md5
import sys

doorID = 'uqwqemis';
thePassword = '________';
num = 0

while '_' in thePassword:
  # create hash from doorID + current num
  temp = doorID + str(num)
  hash = md5.new(temp).hexdigest()
  # show output to console to indicate progress
  if num % 1000 == 0:
    sys.stdout.flush()
    sys.stdout.write("password: {} cracking hash: {} \r".format(thePassword,hash))
  if hash.startswith("00000"):
    # check that the location digit at hash[5] is valid
    if ord(hash[5]) >= ord('0') and ord(hash[5]) <= ord('7'):
      # and that it has not been assigned
      if thePassword[int(hash[5])] == '_':
        loc = int(hash[5])
        # add hash[6] to password at index hash[5]
        thePassword = thePassword[:loc] + hash[6] + thePassword[loc+1:]
  num += 1

print('\nThe password is: ' + thePassword[:8])