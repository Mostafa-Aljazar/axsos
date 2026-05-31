/**
 * LeetCode: N-th Tribonacci Number
 * https://leetcode.com/problems/n-th-tribonacci-number/
 *
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
    if (n === 0) return 0;
    if (n <= 2) return 1;

    let a = 0, b = 1, c = 1;

    for (let i = 3; i <= n; i++) {
        let next = a + b + c;
        a = b;
        b = c;
        c = next;
    }

    return c;
};


console.log(tribonacci(4));  // 4
console.log(tribonacci(25)); // 1389537