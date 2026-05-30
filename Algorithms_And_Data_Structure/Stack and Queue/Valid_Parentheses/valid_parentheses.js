/**
 * LeetCode: Valid Parentheses
 * https://leetcode.com/problems/valid-parentheses/
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    let map = { ')': '(', '}': '{', ']': '[' };

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.pop() !== map[char]) return false;
        }
    }

    return stack.length === 0;
};


console.log(isValid("()"));      // true
console.log(isValid("()[]{}"));  // true
console.log(isValid("(]"));      // false
console.log(isValid("([])"));    // true
console.log(isValid("([)]"));    // false