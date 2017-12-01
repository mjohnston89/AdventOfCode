# import sys

# record = []
# for line in sys.stdin.readlines():
#     a, b = [int(i) for i in line.strip().split("-")]
#     record.append((a, b))

# record.sort()
# total, ip, index = 0, 0, 0
# while ip < 2**32:
#     lower, upper = record[index]
#     if ip >= lower:
#         if ip <= upper:
#             ip = upper + 1
#             continue
#         index += 1
#     else:
#         total += 1
#         ip += 1

# print(total)

with open('input.txt') as fd:
    data = fd.read()

def test_ip(n):
    for start, end in data:
        if start <= n <= end:
            break
    else:
        if n < 2**32:
            return True
    return False

data = sorted([int(x), int(y)] for x,y in [z.split('-') for z in data.splitlines()])

candidates = [x[1]+1 for x in data]

valids = [c for c in candidates if test_ip(c)]

total = 0
for ip in valids:
    while test_ip(ip):
        total += 1
        ip += 1

print(valids[0])
print(total)