from math import log

def josephus(n):
    return int(bin(n)[3:] + '1', 2)

def josephus_across(n):
    t = 3**int(log(n, 3))
    return n if n == t else max(n - t, 2*n - 3*t)

# print(josephus(3005290))
print(josephus_across(3005290))