# Recursion To Do 1

## Overview

Three recursion challenges. The first two are classic patterns — building a sum and a product by breaking the problem into smaller versions of itself. The bonus challenge applies recursion to a 2D grid, simulating a paint-bucket fill tool.

---

## What is Recursion?

A function that **calls itself** with a smaller version of the problem, until it hits a base case that stops it.

```
rSigma(5)
= 5 + rSigma(4)
= 5 + 4 + rSigma(3)
= 5 + 4 + 3 + rSigma(2)
= 5 + 4 + 3 + 2 + rSigma(1)
= 5 + 4 + 3 + 2 + 1 + rSigma(0)
= 5 + 4 + 3 + 2 + 1 + 0
= 15
```

Every recursive function needs:

1. A **base case** — when to stop
2. A **recursive call** — a smaller version of the same problem

---

## Challenges

### 1. Recursive Sigma

**Goal:** Return the sum of all integers from 1 up to `num`. Truncate decimals. Return 0 for negatives.

```js
function rSigma(num) {
  num = Math.floor(num);
  if (num <= 0) return 0;
  return num + rSigma(num - 1);
}
```

**Examples:**

```js
console.log(rSigma(5)); // 15  → 1+2+3+4+5
console.log(rSigma(2.5)); // 3   → Math.floor(2.5)=2, then 1+2
console.log(rSigma(-1)); // 0   → base case
```

**Call stack for `rSigma(4)`:**

```
rSigma(4) = 4 + rSigma(3)
                = 3 + rSigma(2)
                      = 2 + rSigma(1)
                            = 1 + rSigma(0)
                                  = 0  ← base case
```

Unwinds to: `1 + 2 + 3 + 4 = 10`

---

### 2. Recursive Factorial

**Goal:** Return the product of all integers from 1 up to `num`. Truncate decimals. Treat negatives as 0. `0! = 1` by mathematical convention.

```js
function rFact(num) {
  num = Math.floor(num);
  if (num <= 0) return 1;
  return num * rFact(num - 1);
}
```

**Examples:**

```js
console.log(rFact(3)); // 6   → 1*2*3
console.log(rFact(6.5)); // 720 → Math.floor(6.5)=6, then 1*2*3*4*5*6
console.log(rFact(0)); // 1   → 0! = 1
```

**Call stack for `rFact(3)`:**

```
rFact(3) = 3 * rFact(2)
               = 2 * rFact(1)
                     = 1 * rFact(0)
                           = 1  ← base case
```

Unwinds to: `1 * 1 * 2 * 3 = 6`

**Sigma vs Factorial — the only difference:**

|           | Sigma      | Factorial  |
| --------- | ---------- | ---------- |
| Operation | `+`        | `*`        |
| Base case | `return 0` | `return 1` |

---

### 3. Flood Fill (Bonus)

**Goal:** Given a 2D grid (canvas), a starting point, and a new color — fill all connected pixels that share the same original color. Only spread up, down, left, right (not diagonally).

```js
function floodFill(canvas2D, startXY, newColor) {
  let [x, y] = startXY;
  let originalColor = canvas2D[y][x];

  if (originalColor === newColor) return canvas2D;

  function fill(x, y) {
    if (x < 0 || y < 0 || y >= canvas2D.length || x >= canvas2D[0].length)
      return;
    if (canvas2D[y][x] !== originalColor) return;

    canvas2D[y][x] = newColor;

    fill(x + 1, y);
    fill(x - 1, y);
    fill(x, y + 1);
    fill(x, y - 1);
  }

  fill(x, y);
  return canvas2D;
}
```

**Example:**

```js
let canvas = [
  [1, 1, 1, 1, 1],
  [1, 3, 3, 3, 1],
  [1, 3, 3, 3, 1],
  [1, 3, 3, 3, 1],
  [1, 1, 1, 1, 1],
];

floodFill(canvas, [2, 2], 1);
// All 3s become 1s
```

**Before:**

```
1  1  1  1  1
1  3  3  3  1
1  3  3 [3] 1   ← startXY is [2,2] = row 2, col 2
1  3  3  3  1
1  1  1  1  1
```

**After:**

```
1  1  1  1  1
1  1  1  1  1
1  1  1  1  1
1  1  1  1  1
1  1  1  1  1
```

**How it spreads:**

Starting at `[2,2]`, the function paints that pixel and then calls itself on all four neighbors. Each of those calls does the same thing — paint and spread — until it hits a boundary or a pixel with a different color.

```
fill(2,2) → paint → spread to (3,2), (1,2), (2,3), (2,1)
  fill(3,2) → paint → spread...
  fill(1,2) → paint → spread...
  ...and so on
```

**The base cases that stop the spread:**

- Out of bounds (off the edge of the canvas)
- The pixel is not the original color
- (The pixel being `newColor` already is handled by the `originalColor !== newColor` early return at the start)

---

## Concepts Used

| Concept                    | Where Applied |
| -------------------------- | ------------- |
| Base case + recursive call | All three     |
| `Math.floor()`             | rSigma, rFact |
| Nested recursive function  | Flood Fill    |
| Bounds checking            | Flood Fill    |
| 4-directional spread       | Flood Fill    |

---
