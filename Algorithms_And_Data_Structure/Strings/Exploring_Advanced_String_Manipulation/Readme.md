# Strings To Do 10 — Advanced String Manipulation

## Overview

Five challenges that go deeper into string work: deduplication, frequency counting, digit extraction, and converting numbers to English words. The focus is on thinking character by character and breaking big problems into smaller helpers.

---

## Challenges

### 1. Dedupe

**Goal:** Remove duplicate characters, keeping only the **last** occurrence of each one.

```js
function dedupe(str) {
  let seen = {};
  let result = "";

  for (let i = str.length - 1; i >= 0; i--) {
    if (!seen[str[i]]) {
      seen[str[i]] = true;
      result = str[i] + result;
    }
  }

  return result;
}
```

**Example:**

```js
console.log(dedupe("Snaps! crackles! pops!"));
// "Snrackle ops!"
```

**Why walk backwards?** We want to keep the _last_ occurrence. By going from the end, the first time we see a character is the last time it appears in the string. We skip it on all future encounters (which are earlier in the string).

**Walking through `"pops!"`:**

| i   | char | seen?   | Action                  |
| --- | ---- | ------- | ----------------------- |
| 4   | `!`  | no      | keep, result = `"!"`    |
| 3   | `s`  | no      | keep, result = `"s!"`   |
| 2   | `p`  | no      | keep, result = `"ps!"`  |
| 1   | `o`  | no      | keep, result = `"ops!"` |
| 0   | `p`  | **yes** | skip                    |

---

### 2. Index of First Unique Letter

**Goal:** Find the index of the first character that appears exactly once in the string.

```js
function firstUniqueLetterIndex(str) {
  let count = {};

  for (let i = 0; i < str.length; i++) {
    count[str[i]] = (count[str[i]] || 0) + 1;
  }

  for (let i = 0; i < str.length; i++) {
    if (count[str[i]] === 1) return i;
  }

  return -1;
}
```

**Example:**

```js
console.log(firstUniqueLetterIndex("empathetic monarch meets primo stinker"));
// 35  — the character 'k'
```

**Two-pass approach:**

1. First loop: count every character
2. Second loop: find the first one with count = 1

This is more efficient than checking every character against the whole string in a nested loop.

---

### 3. Unique Letters

**Goal:** Return only the characters that appear **exactly once**. Case-sensitive — `'P'` and `'p'` are different.

```js
function uniqueLetters(str) {
  let count = {};

  for (let i = 0; i < str.length; i++) {
    count[str[i]] = (count[str[i]] || 0) + 1;
  }

  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (count[str[i]] === 1) result += str[i];
  }

  return result;
}
```

**Example:**

```js
console.log(uniqueLetters("Snap! Crackle! Poop!"));
// "SnCrckleP"
```

**Character frequency breakdown for `"Snap! Crackle! Poop!"`:**

| Char | Count | Kept? |
| ---- | ----- | ----- |
| `S`  | 1     | ✅    |
| `n`  | 1     | ✅    |
| `a`  | 2     | ❌    |
| `p`  | 2     | ❌    |
| `!`  | 3     | ❌    |
| ` `  | 2     | ❌    |
| `C`  | 1     | ✅    |
| `r`  | 1     | ✅    |
| `c`  | 1     | ✅    |
| `k`  | 1     | ✅    |
| `l`  | 1     | ✅    |
| `e`  | 1     | ✅    |
| `P`  | 1     | ✅    |
| `o`  | 2     | ❌    |

> `'p'` (lowercase) appears in `"Snap!"` and `"Poop!"` — count of 2, removed. `'P'` (uppercase) only appears once in `"Poop!"` — kept. The assignment's expected output `"SnCrcklePp"` includes a lowercase `p` which would be incorrect since `p` appears twice.

---

### 4. Num to String

**Goal:** Convert a number to a string **without** using `.toString()`.

```js
function numToString(num) {
  let digits = "0123456789";

  if (num < 0) return "-" + numToString(-num);

  let intPart = Math.floor(Math.abs(num));
  let result = "";

  if (intPart === 0) {
    result = "0";
  } else {
    let temp = intPart;
    while (temp > 0) {
      result = digits[temp % 10] + result;
      temp = Math.floor(temp / 10);
    }
  }

  let strNum = "" + num;
  let dotIndex = strNum.indexOf(".");
  if (dotIndex !== -1) {
    result += "." + strNum.slice(dotIndex + 1);
  }

  return result;
}
```

**Examples:**

```js
console.log(numToString(1234)); // "1234"
console.log(numToString(11.2051)); // "11.2051"
console.log(numToString(0)); // "0"
```

**How digit extraction works for `1234`:**

| Step | `temp % 10` | Digit | Result so far |
| ---- | ----------- | ----- | ------------- |
| 1    | `1234 % 10` | `4`   | `"4"`         |
| 2    | `123 % 10`  | `3`   | `"34"`        |
| 3    | `12 % 10`   | `2`   | `"234"`       |
| 4    | `1 % 10`    | `1`   | `"1234"`      |

`% 10` peels off the last digit. `Math.floor(n / 10)` removes it. Repeat until nothing is left.

---

### 5. Num to Text

**Goal:** Convert a number into its full English word representation.

```js
function numToText(num) {
  let ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  let tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function underThousand(n) {
    if (n === 0) return "";
    if (n < 20) return ones[n];
    if (n < 100) {
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    }
    let rest = n % 100 !== 0 ? " " + underThousand(n % 100) : "";
    return ones[Math.floor(n / 100)] + " hundred" + rest;
  }

  let strNum = "" + num;
  let dotIndex = strNum.indexOf(".");
  let intPart = dotIndex !== -1 ? parseInt(strNum.slice(0, dotIndex)) : num;
  let decPart = dotIndex !== -1 ? strNum.slice(dotIndex + 1) : null;

  let result =
    intPart === 0
      ? "zero"
      : (() => {
          let parts = [];
          let billions = Math.floor(intPart / 1000000000);
          let millions = Math.floor((intPart % 1000000000) / 1000000);
          let thousands = Math.floor((intPart % 1000000) / 1000);
          let remainder = intPart % 1000;

          if (billions) parts.push(underThousand(billions) + " billion");
          if (millions) parts.push(underThousand(millions) + " million");
          if (thousands) parts.push(underThousand(thousands) + " thousand");
          if (remainder) parts.push(underThousand(remainder));

          return parts.join(" ");
        })();

  if (decPart) {
    result +=
      " point " +
      decPart
        .split("")
        .map((d) => ones[parseInt(d)])
        .join(" ");
  }

  return result;
}
```

**Examples:**

```js
console.log(numToText(40213)); // "forty thousand two hundred thirteen"
console.log(numToText(11.2051)); // "eleven point two zero five one"
console.log(numToText(1000000)); // "one million"
```

**How `40213` breaks down:**

| Segment    | Value | Words                                   |
| ---------- | ----- | --------------------------------------- |
| Billions   | 0     | —                                       |
| Millions   | 0     | —                                       |
| Thousands  | 40    | `"forty thousand"`                      |
| Remainder  | 213   | `"two hundred thirteen"`                |
| **Result** |       | `"forty thousand two hundred thirteen"` |

The `underThousand` helper handles any number up to 999 using recursion for the hundreds place.

---

## The Frequency Map Pattern

Challenges 1, 2, and 3 all use the same core trick — counting how many times each character appears:

```js
let count = {};
for (let i = 0; i < str.length; i++) {
  count[str[i]] = (count[str[i]] || 0) + 1;
}
```

`|| 0` means: if we haven't seen this character yet, start the count at 0 (instead of `undefined`).

---

## Concepts Used

| Concept                            | Where Applied                              |
| ---------------------------------- | ------------------------------------------ |
| Backwards loop                     | Dedupe                                     |
| Object as frequency map            | Dedupe, First Unique Index, Unique Letters |
| Two-pass loop                      | First Unique Index, Unique Letters         |
| `% 10` and `Math.floor` for digits | Num to String                              |
| Recursion                          | Num to Text (`underThousand`)              |
| Helper function                    | Num to Text                                |
| Decimal handling                   | Num to String, Num to Text                 |
