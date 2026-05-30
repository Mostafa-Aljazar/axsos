# Array Challenges — Assignment

## Overview

This assignment focuses on practicing fundamental JavaScript concepts including `for` loops, `while` loops, and `if/else` conditionals — all applied through array manipulation challenges.

---

## Objectives

- Familiarize yourself with loops such as `for` and `while`
- Become comfortable with conditionals like `if/else`
- Practice building and returning new arrays
- Understand how to iterate through arrays to compute results

---

## Challenges

### 1. Always Hungry

**Goal:** Iterate through an array and log `"yummy"` every time the string `"food"` is found. If `"food"` is never found, log `"I'm hungry"` once.

```js
function alwaysHungry(arr) {
  var foundFood = false;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == "food") {
      console.log("yummy");
      foundFood = true;
    }
  }

  if (foundFood == false) {
    console.log("I'm hungry");
  }
}
```

**Examples:**

```js
alwaysHungry([3.14, "food", "pie", true, "food"]);
// yummy
// yummy

alwaysHungry([4, 1, 5, 7, 2]);
// I'm hungry
```

---

### 2. High Pass Filter

**Goal:** Given an array and a cutoff value, return a new array containing only the elements **greater than** the cutoff.

```js
function highPass(arr, cutoff) {
  var filteredArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > cutoff) {
      filteredArr.push(arr[i]);
    }
  }

  return filteredArr;
}
```

**Example:**

```js
var result = highPass([6, 8, 3, 10, -2, 5, 9], 5);
console.log(result);
// Expected: [6, 8, 10, 9]
```

---

### 3. Better Than Average

**Goal:** Calculate the average of the array, then count and return how many numbers are **greater than** that average.

```js
function betterThanAverage(arr) {
  var sum = 0;
  var count = 0;

  for (var i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }

  var avg = sum / arr.length;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > avg) {
      count = count + 1;
    }
  }

  return count;
}
```

**Example:**

```js
var result = betterThanAverage([6, 8, 3, 10, -2, 5, 9]);
console.log(result);
// Expected: 4
```

> **How it works:** The average of the array is `5.57`. The values `6`, `8`, `10`, and `9` are all greater than the average — so the result is `4`.

---

### 4. Array Reverse

**Goal:** Return a new array with all elements in reverse order, without using the built-in `.reverse()` method.

```js
function reverse(arr) {
  var newArray = [];

  for (var i = arr.length - 1; i >= 0; i = i - 1) {
    newArray.push(arr[i]);
  }

  return newArray;
}
```

**Example:**

```js
var result = reverse(["a", "b", "c", "d", "e"]);
console.log(result);
// Expected: ["e", "d", "c", "b", "a"]
```

---

### 5. Fibonacci Array

**Goal:** Generate an array of Fibonacci numbers up to a specified length `n`. Each number is the sum of the two numbers before it.

```js
function fibonacciArray(n) {
  var fibArr = [0, 1];

  while (fibArr.length < n) {
    var nextNumber = fibArr[fibArr.length - 1] + fibArr[fibArr.length - 2];
    fibArr.push(nextNumber);
  }

  return fibArr;
}
```

**Example:**

```js
var result = fibonacciArray(10);
console.log(result);
// Expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

> **How it works:** Starting from `[0, 1]`, each new value is the sum of the last two. The loop continues until the array reaches the desired length `n`.

---

## Concepts Used

| Concept             | Where Applied                                                       |
| ------------------- | ------------------------------------------------------------------- |
| `for` loop          | Always Hungry, High Pass Filter, Better than Average, Array Reverse |
| `while` loop        | Fibonacci Array                                                     |
| `if` / `else`       | Always Hungry, High Pass Filter, Better than Average                |
| `.push()`           | High Pass Filter, Array Reverse, Fibonacci Array                    |
| Accumulator pattern | Better than Average (sum + count)                                   |
| Reverse iteration   | Array Reverse                                                       |

---
