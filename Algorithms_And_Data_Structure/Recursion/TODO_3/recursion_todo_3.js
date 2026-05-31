// Recursion To Do 3


// ─────────────────────────────────────────
// 1. Recursive Binary Search
// ─────────────────────────────────────────
// Check the middle of the sorted array. If too high, search left half.
// If too low, search right half. Repeat until found or out of range.

function rBinarySearch(arr, val, low = 0, high = arr.length - 1) {
    if (low > high) return false;
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === val) return true;
    if (arr[mid] < val) return rBinarySearch(arr, val, mid + 1, high);
    return rBinarySearch(arr, val, low, mid - 1);
}

console.log(rBinarySearch([1,3,5,6], 4));    // false
console.log(rBinarySearch([4,5,6,8,12], 5)); // true


// ─────────────────────────────────────────
// 2. Greatest Common Factor
// ─────────────────────────────────────────
// Euclid's algorithm using modulo instead of subtraction —
// much faster and handles large numbers like 123456 and 987654.

function rGCF(num1, num2) {
    if (num1 === num2) return num1;
    if (num1 > num2) return rGCF(num1 % num2 || num2, num2);
    return rGCF(num1, num2 % num1 || num1);
}

console.log(rGCF(12, 8));           // 4
console.log(rGCF(123456, 987654));  // 6


// ─────────────────────────────────────────
// 3. Tarai (Bonus)
// ─────────────────────────────────────────
// A function designed to stress-test recursion.
// Simple rules, enormous number of recursive calls.

function tarai(x, y, z) {
    if (x <= y) return y;
    return tarai(
        tarai(x - 1, y, z),
        tarai(y - 1, z, x),
        tarai(z - 1, x, y)
    );
}

console.log(tarai(10, 2, 9)); // 9  (after ~4145 recursive calls)


// ─────────────────────────────────────────
// 4. String In-Order Subsets (Bonus)
// ─────────────────────────────────────────
// Return every possible subset of characters that keeps the original order.
// For each character, generate subsets with it and without it.

function strSubsets(str) {
    if (str.length === 0) return [''];
    let rest = strSubsets(str.slice(1));
    let withFirst = rest.map(s => str[0] + s);
    return [...rest, ...withFirst];
}

console.log(strSubsets('abc'));
// ['', 'c', 'b', 'bc', 'a', 'ac', 'ab', 'abc']