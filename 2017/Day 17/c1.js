const input = 356, nums = [0];
let position = 0;

for(let i = 1; i < 2018; i++) {
  position = (position + input) % nums.length;
  position++;
  nums.splice(position, 0 , i);
}

console.log(nums[position+1]);