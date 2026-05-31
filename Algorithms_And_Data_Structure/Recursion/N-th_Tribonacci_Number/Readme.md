# LeetCode — N-th Tribonacci Number

## Problem

The Tribonacci sequence is like Fibonacci, but each number is the sum of the **three** previous values instead of two.

- `T(0) = 0`
- `T(1) = 1`
- `T(2) = 1`
- `T(n) = T(n-1) + T(n-2) + T(n-3)` for n ≥ 3

Given `n`, return `T(n)`.

🔗 https://leetcode.com/problems/n-th-tribonacci-number/

---

## The Solution

```js
var tribonacci = function (n) {
  if (n === 0) return 0;
  if (n <= 2) return 1;

  let a = 0,
    b = 1,
    c = 1;

  for (let i = 3; i <= n; i++) {
    let next = a + b + c;
    a = b;
    b = c;
    c = next;
  }

  return c;
};
```

---

## Cases

```js
console.log(tribonacci(4)); // 4
console.log(tribonacci(25)); // 1389537
```

---

## How It Works

Instead of recursion (which recalculates the same values over and over), we use three variables that slide forward one step at a time — keeping track of only the last three values we need.

**Starting point:**

```
a = 0  (T0)
b = 1  (T1)
c = 1  (T2)
```

**Each loop step — compute next, then slide all three forward:**

```
next = a + b + c
a    = b
b    = c
c    = next
```

**Walking through `tribonacci(6)`:**

| Step  | a   | b   | c   | next (a+b+c) |
| ----- | --- | --- | --- | ------------ |
| start | 0   | 1   | 1   | —            |
| i=3   | 1   | 1   | 2   | 2            |
| i=4   | 1   | 2   | 4   | 4            |
| i=5   | 2   | 4   | 7   | 7            |
| i=6   | 4   | 7   | 13  | 13           |

`tribonacci(6)` = **13**

---

## The Full Sequence

| n   | T(n)        |
| --- | ----------- |
| 0   | 0           |
| 1   | 1           |
| 2   | 1           |
| 3   | 2           |
| 4   | **4**       |
| 5   | 7           |
| 6   | 13          |
| 7   | 24          |
| 8   | 44          |
| 25  | **1389537** |

---

## Why Not Recursion?

A recursive version would work but is very slow — `tribonacci(n)` would call itself three times, and each of those calls three more times, growing exponentially.

```
tribonacci(5)
= tribonacci(4) + tribonacci(3) + tribonacci(2)
= (tribonacci(3) + tribonacci(2) + tribonacci(1)) + ...
```

`tribonacci(3)` gets calculated multiple times, `tribonacci(2)` even more so. The iterative approach calculates each value exactly once — O(n) time, O(1) space.

---

## Complexity

|       | Value                                 |
| ----- | ------------------------------------- |
| Time  | O(n) — one loop from 3 to n           |
| Space | O(1) — only three variables, no array |

---
