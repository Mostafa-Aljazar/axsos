# Strings To Do 5 — String to Array Part 1

## Overview

Two short challenges that practice using **objects** to return multiple related values from a single function. Instead of returning one number, each function returns a neat package of information all at once.

---

## Challenges

### 1. Coin Change with Object

**Goal:** Given a number of U.S. cents, figure out the fewest coins needed and return a breakdown as an object.

**The idea:** Always grab the biggest coin that fits first — quarters before dimes, dimes before nickels, nickels before pennies. This greedy approach always gives the minimum number of coins.

```js
function coinChange(cents) {
  var result = {
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0,
  };

  result.quarters = Math.floor(cents / 25);
  cents = cents % 25;

  result.dimes = Math.floor(cents / 10);
  cents = cents % 10;

  result.nickels = Math.floor(cents / 5);
  cents = cents % 5;

  result.pennies = cents;

  return result;
}
```

**Examples:**

```js
console.log(coinChange(87));
// { quarters: 3, dimes: 1, nickels: 0, pennies: 2 }

console.log(coinChange(41));
// { quarters: 1, dimes: 1, nickels: 1, pennies: 1 }

console.log(coinChange(5));
// { quarters: 0, dimes: 0, nickels: 1, pennies: 0 }

console.log(coinChange(0));
// { quarters: 0, dimes: 0, nickels: 0, pennies: 0 }
```

**How 87 cents breaks down:**

| Step                  | Coin       | Value | Remaining  |
| --------------------- | ---------- | ----- | ---------- |
| `Math.floor(87 / 25)` | 3 quarters | 75¢   | 12¢ left   |
| `Math.floor(12 / 10)` | 1 dime     | 10¢   | 2¢ left    |
| `Math.floor(2 / 5)`   | 0 nickels  | 0¢    | 2¢ left    |
| remainder             | 2 pennies  | 2¢    | 0¢ left ✅ |

**Two operators doing the heavy lifting:**

- `Math.floor(cents / 25)` — how many times does 25 fit in whole?
- `cents % 25` — what's left over after taking out the quarters?

---

### 2. Max / Min / Average with Object

**Goal:** Given an array of numbers, return an object with the largest value, smallest value, and the average — all in one go.

**The idea:** Loop through the array once. Keep track of the current max, current min, and a running sum. When the loop is done, divide the sum by the length to get the average.

```js
function maxMinAverage(arr) {
  if (arr.length === 0) {
    return { max: null, min: null, average: null };
  }

  var max = arr[0];
  var min = arr[0];
  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
    sum += arr[i];
  }

  return {
    max: max,
    min: min,
    average: sum / arr.length,
  };
}
```

**Examples:**

```js
console.log(maxMinAverage([3, 1, 7, 2, 9, 4]));
// { max: 9, min: 1, average: 4.333... }

console.log(maxMinAverage([10, 20, 30]));
// { max: 30, min: 10, average: 20 }

console.log(maxMinAverage([5]));
// { max: 5, min: 5, average: 5 }

console.log(maxMinAverage([]));
// { max: null, min: null, average: null }
```

**Walking through `[3, 1, 7, 2, 9, 4]`:**

| i   | value | max   | min   | sum               |
| --- | ----- | ----- | ----- | ----------------- |
| 0   | 3     | 3     | 3     | 3                 |
| 1   | 1     | 3     | 1     | 4                 |
| 2   | 7     | 7     | 1     | 11                |
| 3   | 2     | 7     | 1     | 13                |
| 4   | 9     | **9** | 1     | 22                |
| 5   | 4     | 9     | 1     | 26                |
| —   | —     | 9     | **1** | 26 ÷ 6 = **4.33** |

> Starting `max` and `min` at `arr[0]` (not 0) matters — if all numbers were negative, starting at 0 would give a wrong max.

---

## What's an Object and Why Use It Here?

An object lets you bundle related pieces of data under one roof and give each one a name:

```js
// Without an object — three separate variables, hard to pass around
var max = 9;
var min = 1;
var avg = 4.33;

// With an object — one tidy package
var stats = { max: 9, min: 1, average: 4.33 };
console.log(stats.max); // 9
console.log(stats.average); // 4.33
```

Functions can only return one thing — returning an object is the clean way to return multiple values at once.

---

## Concepts Used

| Concept                  | Where Applied                           |
| ------------------------ | --------------------------------------- |
| `Math.floor()`           | Coin Change — whole coin count          |
| Modulo `%`               | Coin Change — remainder after each coin |
| Object literal `{}`      | Both challenges                         |
| Accumulator (`sum +=`)   | Max/Min/Average                         |
| Tracking running max/min | Max/Min/Average                         |
| Edge case (empty array)  | Max/Min/Average                         |

---
