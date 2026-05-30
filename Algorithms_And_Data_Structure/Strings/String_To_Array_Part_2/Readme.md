# Strings To-Do 6 — String to Array Part 2

## Overview

Three short challenges about working with **objects** in JavaScript. Objects (also called associative arrays or maps) let you store data as key-value pairs — like a dictionary where every word has a definition.

---

## Challenges

### 1. Zip Arrays into Map

**Goal:** Take two arrays and combine them into one object. The first array becomes the keys, the second becomes the values.

```js
function zipArraysIntoMap(keysArray, valuesArray) {
  let map = {};

  for (let i = 0; i < keysArray.length; i++) {
    map[keysArray[i]] = valuesArray[i];
  }

  return map;
}
```

**Example:**

```js
let arr1 = ["abc", 3, "yo"];
let arr2 = [42, "wassup", true];

console.log(zipArraysIntoMap(arr1, arr2));
// { abc: 42, '3': 'wassup', yo: true }
```

**How it works — pairing them up side by side:**

| Index | Key (arr1) | Value (arr2) |
| ----- | ---------- | ------------ |
| 0     | `"abc"`    | `42`         |
| 1     | `3`        | `"wassup"`   |
| 2     | `"yo"`     | `true`       |

The loop just says: _"for each position i, take the item from the keys array and assign the matching item from the values array to it."_

---

### 2. Invert Hash

**Goal:** Flip an object inside out — swap every key with its value.

```js
function invertHash(obj) {
  let inverted = {};

  for (let key in obj) {
    inverted[obj[key]] = key;
  }

  return inverted;
}
```

**Example:**

```js
let assocArr = { name: "Zaphod", charm: "high", morals: "dicey" };

console.log(invertHash(assocArr));
// { Zaphod: 'name', high: 'charm', dicey: 'morals' }
```

**Before and after:**

| Before               |         | After                |
| -------------------- | ------- | -------------------- |
| `name` → `"Zaphod"`  | becomes | `"Zaphod"` → `name`  |
| `charm` → `"high"`   | becomes | `"high"` → `charm`   |
| `morals` → `"dicey"` | becomes | `"dicey"` → `morals` |

`for...in` is the loop that walks through every key in an object. `obj[key]` gives you the value for that key.

---

### 3. Count Values (without `.length`)

**Goal:** Count how many key-value pairs are in an object — without using `.length` (because objects don't have one).

```js
function countValues(obj) {
  let count = 0;

  for (let key in obj) {
    count++;
  }

  return count;
}
```

**Example:**

```js
let bandInfo = {
  band: "Travis Shredd & the Good Ol' Homeboys",
  style: "Country/Metal/Rap",
  album: "668: The Neighbor of the Beast",
};

console.log(countValues(bandInfo)); // 3
```

Every time the loop visits a key, we add 1 to the counter. Three keys → counter ends at 3.

> **Why can't we use `.length`?** Arrays are ordered lists, so JavaScript tracks their size automatically. Objects are unordered key-value stores, so there's no built-in size — you have to count yourself.

---

## The Key Difference: Arrays vs Objects

```js
// Array — ordered, use index numbers, has .length
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3

// Object — key-value pairs, no .length
let person = { name: "Ali", age: 25, city: "Nablus" };
console.log(person.name); // "Ali"
console.log(person.length); // undefined ← doesn't exist
```

---

## Concepts Used

| Concept                      | Where Applied             |
| ---------------------------- | ------------------------- |
| Object literal `{}`          | All three challenges      |
| `map[key] = value`           | Zip Arrays into Map       |
| `for...in` loop              | Invert Hash, Count Values |
| `obj[key]` to access a value | Invert Hash               |
| Counter variable             | Count Values              |

---
