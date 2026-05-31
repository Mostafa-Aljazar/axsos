# Recursion To Do 2

## Overview

Four recursion challenges, each building on the last in complexity. Fibonacci and Tribonacci are classic sequence problems. Ackermann is a famous function that grows so fast it can crash your call stack at small values. Zibonacci is a creative twist that zigzags between two different formulas.

---

## Challenges

### 1. Recursive Fibonacci

**Goal:** Return the nth Fibonacci number. The sequence starts `0, 1, 1, 2, 3, 5, 8, 13...` — each number is the sum of the two before it.

```js
function rFib(num) {
  num = Math.floor(num);
  if (num <= 0) return 0;
  if (num === 1) return 1;
  return rFib(num - 1) + rFib(num - 2);
}
```

**Examples:**

```js
console.log(rFib(2)); // 1
console.log(rFib(3)); // 2
console.log(rFib(4)); // 3
console.log(rFib(5)); // 5
console.log(rFib(3.65)); // 2  — floors to 3
console.log(rFib(-2)); // 0  — negative → 0
```

**Call stack for `rFib(5)`:**

```
rFib(5)
= rFib(4) + rFib(3)
= (rFib(3) + rFib(2)) + (rFib(2) + rFib(1))
= ((rFib(2) + rFib(1)) + (rFib(1) + rFib(0))) + ((rFib(1) + rFib(0)) + 1)
= ((1+1) + (1+0)) + ((1+0) + 1)
= 3 + 2 = 5
```

---

### 2. Recursive Tribonacci

**Goal:** Like Fibonacci, but adds the **three** previous values instead of two. First three values are `0, 0, 1`.

```js
function rTrib(num) {
  num = Math.floor(num);
  if (num <= 1) return 0;
  if (num === 2) return 1;
  return rTrib(num - 1) + rTrib(num - 2) + rTrib(num - 3);
}
```

**Examples:**

```js
console.log(rTrib(3)); // 1  → 0+0+1
console.log(rTrib(4)); // 2  → 0+1+1
console.log(rTrib(5)); // 4  → 1+1+2
console.log(rTrib(6)); // 7  → 1+2+4
```

**Tribonacci sequence:**

| n     | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| ----- | --- | --- | --- | --- | --- | --- | --- |
| value | 0   | 0   | 1   | 1   | 2   | 4   | 7   |

**Fibonacci vs Tribonacci — the only differences:**

|            | Fibonacci | Tribonacci    |
| ---------- | --------- | ------------- |
| Adds last  | 2 values  | 3 values      |
| Base cases | 0→0, 1→1  | 0→0, 1→0, 2→1 |

---

### 3. Ackermann Function

**Goal:** Implement this famous three-rule recursive function. It grows so fast that even small inputs produce enormous results and can crash the call stack.

```js
function ackermann(num1, num2) {
  if (num1 === 0) return num2 + 1;
  if (num2 === 0) return ackermann(num1 - 1, 1);
  return ackermann(num1 - 1, ackermann(num1, num2 - 1));
}
```

**Examples:**

```js
console.log(ackermann(0, 5)); // 6
console.log(ackermann(1, 1)); // 3
console.log(ackermann(2, 2)); // 7
console.log(ackermann(3, 3)); // 61
```

**The three rules:**

| Condition                   | Returns                                          |
| --------------------------- | ------------------------------------------------ |
| `num1 === 0`                | `num2 + 1`                                       |
| `num2 === 0` (and num1 > 0) | `ackermann(num1 - 1, 1)`                         |
| Everything else             | `ackermann(num1 - 1, ackermann(num1, num2 - 1))` |

**How fast does it grow?**

| ackermann(m, n) | Result                            |
| --------------- | --------------------------------- |
| (0, 5)          | 6                                 |
| (1, 1)          | 3                                 |
| (2, 2)          | 7                                 |
| (3, 3)          | 61                                |
| (4, 1)          | 65533                             |
| (4, 2)          | 2↑↑65536 (incomprehensibly large) |

Don't try `ackermann(4, 3)` — it will crash your stack before finishing.

---

### 4. Zibonacci

**Goal:** A custom sequence that uses two different formulas depending on whether the index is odd or even. Uses **memoization** to cache results and avoid recalculating.

```js
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
```

**Examples:**

```js
console.log(zibonacci(10)); // 15
console.log(zibonacci(100)); // 128
```

**The rules:**

| Condition        | Formula                                   |
| ---------------- | ----------------------------------------- |
| num = 0 or 1     | return 1                                  |
| num = 2          | return 2                                  |
| num is odd (≥3)  | `Zib((num-1)/2) + Zib((num-1)/2 - 1) + 1` |
| num is even (≥4) | `Zib(num/2) + Zib(num/2 + 1) + 1`         |

**What is memoization?** The cache (`zibCache`) stores results that have already been computed. Before calculating, we check the cache first. This prevents the same value from being computed thousands of times and makes `zibonacci(100)` instant instead of impossibly slow.

---

### `bestZibNum(target)`

Return the **largest** index `n` where `zibonacci(n) === target`. Return `null` if no such index exists.

```js
function bestZibNum(target) {
  let best = null;
  for (let i = 0; i <= 10000; i++) {
    if (zibonacci(i) === target) best = i;
  }
  return best;
}
```

```js
console.log(bestZibNum(3186)); // 2467
console.log(bestZibNum(3183)); // null
```

> Note: Both indices 2464 and 2467 map to 3186. The function returns 2467 as it's the **largest** index that produces that value.

---

## Concepts Used

| Concept                    | Where Applied |
| -------------------------- | ------------- |
| Two base cases             | rFib          |
| Three base cases           | rTrib         |
| `Math.floor()`             | rFib, rTrib   |
| Three-rule recursion       | Ackermann     |
| Memoization (cache object) | Zibonacci     |
| Odd/even branching         | Zibonacci     |
| Linear scan for best match | bestZibNum    |

---
