/*
Question 1:

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
Each input has exactly one solution.
You may not use the same element twice.
Return the indices in any order.

# Example:
Input: nums = [2,4, 5, 11, 15], target = 9
Output: [0, 1]
*/

var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};

// Example usage:
let nums = [2, 4, 5, 8, 11, 15];
let target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1]
