print('Advent of Code - Day 20, Challenge 2\n')

import math

# function to find all divisors for given house number
def GetDivisors(n):
    small_divisors = [i for i in xrange(1, int(math.sqrt(n)) + 1) if n % i == 0]
    large_divisors = [n / d for d in small_divisors if n != d * d]
    return small_divisors + large_divisors

target = 34000000
houseNum = None
i = 0

# find first house number where the calculated total is greater than the target
while not houseNum:
    i += 1
    divisors = GetDivisors(i)
    if not houseNum:
        if sum(d for d in divisors if i / d <= 50) * 11 >= target:
            houseNum = i

print houseNum