// Recursion To Do 2


// ─────────────────────────────────────────
// 1. Recursive Fibonacci
// ─────────────────────────────────────────
// Each number is the sum of the two before it.
// Sequence: 0, 1, 1, 2, 3, 5, 8, 13...

function rFib(num) {
    num = Math.floor(num);
    if (num <= 0) return 0;
    if (num === 1) return 1;
    return rFib(num - 1) + rFib(num - 2);
}

console.log(rFib(2));    // 1
console.log(rFib(3));    // 2
console.log(rFib(4));    // 3
console.log(rFib(5));    // 5
console.log(rFib(3.65)); // 2  (floors to 3)
console.log(rFib(-2));   // 0


// ─────────────────────────────────────────
// 2. Recursive Tribonacci
// ─────────────────────────────────────────
// Like Fibonacci but adds the previous THREE values.
// Sequence: 0, 0, 1, 1, 2, 4, 7, 13...

function rTrib(num) {
    num = Math.floor(num);
    if (num <= 1) return 0;
    if (num === 2) return 1;
    return rTrib(num - 1) + rTrib(num - 2) + rTrib(num - 3);
}

console.log(rTrib(3)); // 1
console.log(rTrib(4)); // 2
console.log(rTrib(5)); // 4
console.log(rTrib(6)); // 7


// ─────────────────────────────────────────
// 3. Ackermann Function
// ─────────────────────────────────────────
// A famous function that grows extremely fast.
// Warning: values above ackermann(3, n) can crash the stack.

function ackermann(num1, num2) {
    if (num1 === 0) return num2 + 1;
    if (num2 === 0) return ackermann(num1 - 1, 1);
    return ackermann(num1 - 1, ackermann(num1, num2 - 1));
}

console.log(ackermann(0, 5)); // 6
console.log(ackermann(1, 1)); // 3
console.log(ackermann(2, 2)); // 7
console.log(ackermann(3, 3)); // 61


// ─────────────────────────────────────────
// 4. Zibonacci
// ─────────────────────────────────────────
// Like Fibonacci but the formula zigzags between odd and even indices.
// Uses memoization to avoid recalculating the same values.

const zibCache = {};

function zibonacci(num) {
    if (num === 0 || num === 1) return 1;
    if (num === 2) return 2;
    if (zibCache[num] !== undefined) return zibCache[num];

    let result;
    if (num % 2 === 1) {
        let n = (num - 1) / 2;
        result = zibonacci(n) + zibonacci(n - 1) + 1;
    } else {
        let n = num / 2;
        result = zibonacci(n) + zibonacci(n + 1) + 1;
    }

    zibCache[num] = result;
    return result;
}

console.log(zibonacci(10));  // 15
console.log(zibonacci(100)); // 128

// Return the largest index that maps to a given Zibonacci result.
// Return null if no index maps to it.
function bestZibNum(target) {
    let best = null;
    for (let i = 0; i <= 10000; i++) {
        if (zibonacci(i) === target) best = i;
    }
    return best;
}

console.log(bestZibNum(3186)); // 2467
console.log(bestZibNum(3183)); // null