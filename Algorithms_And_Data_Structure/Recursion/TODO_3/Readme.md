# Recursion To Do 3

## Overview

Four recursion challenges covering search, math, performance testing, and combinatorics. Each one uses a different recursive strategy — halving, reducing by modulo, branching three ways, and splitting include/exclude choices.

---

## Challenges

### 1. Recursive Binary Search

**Goal:** Given a **sorted** array and a value, recursively determine if the value is present.

```js
function rBinarySearch(arr, val, low = 0, high = arr.length - 1) {
  if (low > high) return false;
  let mid = Math.floor((low + high) / 2);
  if (arr[mid] === val) return true;
  if (arr[mid] < val) return rBinarySearch(arr, val, mid + 1, high);
  return rBinarySearch(arr, val, low, mid - 1);
}
```

**Examples:**

```js
console.log(rBinarySearch([1, 3, 5, 6], 4)); // false
console.log(rBinarySearch([4, 5, 6, 8, 12], 5)); // true
```

**How it works — searching for `5` in `[4,5,6,8,12]`:**

```
low=0, high=4 → mid=2 → arr[2]=6 → 6 > 5 → search left
low=0, high=1 → mid=0 → arr[0]=4 → 4 < 5 → search right
low=1, high=1 → mid=1 → arr[1]=5 → found! → true
```

Each call cuts the search space **in half**. A list of 1 million items takes at most 20 steps. That's the power of binary search.

---

### 2. Greatest Common Factor

**Goal:** Find the largest number that divides evenly into both inputs.

```js
function rGCF(num1, num2) {
  if (num1 === num2) return num1;
  if (num1 > num2) return rGCF(num1 % num2 || num2, num2);
  return rGCF(num1, num2 % num1 || num1);
}
```

**Examples:**

```js
console.log(rGCF(12, 8)); // 4
console.log(rGCF(123456, 987654)); // 6
```

**Euclid's original rules (slow):**

```
gcf(a, b) = a            if a == b
gcf(a, b) = gcf(a-b, b)  if a > b
gcf(a, b) = gcf(a, b-a)  if b > a
```

For `gcf(12, 8)` this would take many steps: 12→4→... For large numbers like 123456 it would take thousands of subtractions.

**Improved with modulo (fast):**

Instead of subtracting one at a time, `a % b` jumps straight to the remainder — doing all those subtractions at once.

```
rGCF(123456, 987654):
  987654 % 123456 = 9270  → rGCF(9270, 123456)... → 6
```

The `|| num2` (or `|| num1`) handles the case where the modulo is `0`, meaning one number divides the other evenly — the divisor is the GCF.

---

### 3. Tarai (Bonus)

**Goal:** Implement the Tarai function — created specifically to stress-test recursive systems.

```js
function tarai(x, y, z) {
  if (x <= y) return y;
  return tarai(tarai(x - 1, y, z), tarai(y - 1, z, x), tarai(z - 1, x, y));
}
```

**Example:**

```js
console.log(tarai(10, 2, 9)); // 9  (after ~4145 recursive calls)
```

**The two rules:**

| Condition | Returns                           |
| --------- | --------------------------------- |
| `x <= y`  | `y` — base case, stop immediately |
| `x > y`   | Three nested tarai calls          |

The numbers never get very large, but the branching is intense — each call spawns three more calls. `tarai(10,2,9)` recurses thousands of times to produce just the number `9`.

---

### 4. String In-Order Subsets (Bonus)

**Goal:** Return every possible subset of a string's characters, keeping them in the original order.

```js
function strSubsets(str) {
  if (str.length === 0) return [""];
  let rest = strSubsets(str.slice(1));
  let withFirst = rest.map((s) => str[0] + s);
  return [...rest, ...withFirst];
}
```

**Example:**

```js
console.log(strSubsets("abc"));
// ['', 'c', 'b', 'bc', 'a', 'ac', 'ab', 'abc']
```

**How it works — the include/exclude idea:**

For each character, you have two choices: include it or skip it. Recursion handles this naturally.

```
strSubsets('abc')
  strSubsets('bc')
    strSubsets('c')
      strSubsets('')  → ['']
      withFirst = ['c']
      → ['', 'c']
    withFirst = ['b', 'bc']
    → ['', 'c', 'b', 'bc']
  withFirst = ['a', 'ac', 'ab', 'abc']
  → ['', 'c', 'b', 'bc', 'a', 'ac', 'ab', 'abc']
```

A string of length `n` always produces `2ⁿ` subsets:

- `'abc'` (3 chars) → 2³ = **8** subsets
- `'abcd'` (4 chars) → 2⁴ = **16** subsets

---

## Concepts Used

| Concept                      | Where Applied  |
| ---------------------------- | -------------- |
| Halving search space         | Binary Search  |
| Default parameters           | Binary Search  |
| Modulo for fast reduction    | GCF            |
| Three nested recursive calls | Tarai          |
| Include/exclude pattern      | String Subsets |
| `.map()` with recursion      | String Subsets |
| Spread `[...a, ...b]`        | String Subsets |

---
