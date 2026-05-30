# Strings To Do 2 — String Basic Functions

## Overview

This assignment focuses on string manipulation and algorithmic thinking in JavaScript. Each challenge builds on core skills: iterating through strings and arrays, using modular arithmetic, working with lookup tables, and applying subtractive logic.

---

## Challenges

### 1. Reverse String

**Goal:** Return a new string with all characters in reverse order — without using the built-in `.reverse()` method.

**Approach:** Loop backwards through the string, appending each character to a new string.

```js
function reverseString(str) {
  var reversed = "";

  for (var i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}
```

**Examples:**

```js
console.log(reverseString("creature")); // "erutaerc"
console.log(reverseString("hello")); // "olleh"
```

---

### 2. Remove Even-Length Strings

**Goal:** Modify an array **in place**, removing any string whose length is an even number.

**Approach:** Iterate **backwards** through the array and use `.splice()` to remove elements. Going backwards is critical — removing an element shifts indices forward, which would cause items to be skipped if iterating front-to-back.

```js
function removeEvenLengthStrings(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].length % 2 === 0) {
      arr.splice(i, 1);
    }
  }
}
```

**Example:**

```js
let arr = [
  "Nope!",
  "Its",
  "Kris",
  "starting",
  "with",
  "K!",
  "(instead",
  "of",
  "Chris",
  "with",
  "C)",
  ".",
];
removeEvenLengthStrings(arr);
console.log(arr); // ["Nope!", "Its", "Chris", "."]
```

| String       | Length | Even? | Kept? |
| ------------ | ------ | ----- | ----- |
| `"Nope!"`    | 5      | No    | ✅    |
| `"Its"`      | 3      | No    | ✅    |
| `"Kris"`     | 4      | Yes   | ❌    |
| `"starting"` | 8      | Yes   | ❌    |
| `"with"`     | 4      | Yes   | ❌    |
| `"K!"`       | 2      | Yes   | ❌    |
| `"(instead"` | 8      | Yes   | ❌    |
| `"of"`       | 2      | Yes   | ❌    |
| `"Chris"`    | 5      | No    | ✅    |
| `"with"`     | 4      | Yes   | ❌    |
| `"C)"`       | 2      | Yes   | ❌    |
| `"."`        | 1      | No    | ✅    |

---

### 3. Integer to Roman Numerals

**Goal:** Convert a positive integer (less than 4000) into its Roman numeral string.

**Approach:** Use two parallel arrays — one for decimal values, one for their Roman symbols — including the six subtractive combinations (e.g. `IV`, `IX`, `XL`). Loop through, repeatedly subtracting the largest fitting value and appending its symbol.

```js
function intToRoman(num) {
  var values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var symbols = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  var result = "";

  for (var i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }

  return result;
}
```

**Examples:**

```js
console.log(intToRoman(349)); // "CCCXLIX"
console.log(intToRoman(444)); // "CDXLIV"
console.log(intToRoman(609)); // "DCIX"
console.log(intToRoman(1492)); // "MCDXCII"
```

**Roman numeral reference:**

| Symbol | Value | Symbol | Value |
| ------ | ----- | ------ | ----- |
| I      | 1     | XL     | 40    |
| IV     | 4     | L      | 50    |
| V      | 5     | XC     | 90    |
| IX     | 9     | C      | 100   |
| X      | 10    | CD     | 400   |
|        |       | D      | 500   |
|        |       | CM     | 900   |
|        |       | M      | 1000  |

> **Note:** The assignment listed `"CCCIL"` for 349, but `IL` is not valid Roman numeral notation — you cannot subtract `I` from `L`. The correct and standard representation is `CCCXLIX`.

**All 13 lookup pairs explained:**

| Value | Symbol | Type                     |
| ----- | ------ | ------------------------ |
| 1000  | M      | Standard                 |
| 900   | CM     | 1000 − 100 (subtractive) |
| 500   | D      | Standard                 |
| 400   | CD     | 500 − 100 (subtractive)  |
| 100   | C      | Standard                 |
| 90    | XC     | 100 − 10 (subtractive)   |
| 50    | L      | Standard                 |
| 40    | XL     | 50 − 10 (subtractive)    |
| 10    | X      | Standard                 |
| 9     | IX     | 10 − 1 (subtractive)     |
| 5     | V      | Standard                 |
| 4     | IV     | 5 − 1 (subtractive)      |
| 1     | I      | Standard                 |

**Real-world examples across the full range:**

| Number | Roman     | Breakdown     |
| ------ | --------- | ------------- |
| 3      | III       | 1+1+1         |
| 14     | XIV       | 10+4          |
| 42     | XLII      | 40+1+1        |
| 58     | LVIII     | 50+5+1+1+1    |
| 199    | CXCIX     | 100+90+9      |
| 349    | CCCXLIX   | 300+40+9      |
| 444    | CDXLIV    | 400+40+4      |
| 609    | DCIX      | 500+100+9     |
| 1492   | MCDXCII   | 1000+400+90+2 |
| 1999   | MCMXCIX   | 1000+900+90+9 |
| 2024   | MMXXIV    | 2000+20+4     |
| 3999   | MMMCMXCIX | 3000+900+90+9 |

> 3999 is the maximum value the function handles — and it covers every valid combination correctly.

---

### 4. Roman Numerals to Integer

**Goal:** Convert a Roman numeral string back into its integer value.

**Approach:** Build a lookup map of each symbol's value. Walk through the string left to right. If the current symbol's value is **less than** the next symbol's value, it is a subtractive pair — subtract it. Otherwise, add it.

```js
function romanToInt(roman) {
  var map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

  var total = 0;

  for (var i = 0; i < roman.length; i++) {
    var current = map[roman[i]];
    var next = map[roman[i + 1]];

    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  return total;
}
```

**Examples:**

```js
console.log(romanToInt("III")); // 3
console.log(romanToInt("DCIX")); // 609
console.log(romanToInt("MXDII")); // 1492
```

**Step-by-step for `"DCIX"` (609):**

| Step | Symbol  | Next    | Action            | Running Total |
| ---- | ------- | ------- | ----------------- | ------------- |
| 1    | D (500) | C (100) | 500 > 100 → add   | 500           |
| 2    | C (100) | I (1)   | 100 > 1 → add     | 600           |
| 3    | I (1)   | X (10)  | 1 < 10 → subtract | 599           |
| 4    | X (10)  | —       | add               | **609**       |

---

## Concepts Used

| Concept                              | Where Applied              |
| ------------------------------------ | -------------------------- |
| String iteration (reverse loop)      | Reverse String             |
| `.splice()` with backwards iteration | Remove Even-Length Strings |
| Modulo operator `%`                  | Remove Even-Length Strings |
| Parallel arrays as a lookup table    | Integer to Roman           |
| `while` loop inside `for` loop       | Integer to Roman           |
| Object as a character map            | Roman to Integer           |
| Subtractive logic (lookahead)        | Roman to Integer           |

---

## How to Run

1. Save the file as `string_challenges.js`
2. Run it with Node.js:

```bash
node string_challenges.js
```

Or paste any function directly into your browser's DevTools console to test it interactively.
