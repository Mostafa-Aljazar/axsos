/*
Question 2:

Given an integer x, return true if x is a palindrome, and false otherwise.

A number is a palindrome if it reads the same forward and backward.

#Examples

Input: 121 → true
Input: -121 → false
Input: 10 → false

*/

function isPalindrome(x) {
  if (x < 0) return false;
  if (x !== 0 && x % 10 === 0) return false;

  let reversedHalf = 0;

  while (x > reversedHalf) {
    reversedHalf = reversedHalf * 10 + (x % 10);
    x = Math.trunc(x / 10);
  }

  return x === reversedHalf || x === Math.trunc(reversedHalf / 10);
}

// Examples
console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));