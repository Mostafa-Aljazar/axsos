# Strings To Do 7 — String Manipulations

## Overview

Five of the most useful built-in string methods in JavaScript. These come up constantly in real projects — learning them well saves a lot of time.

---

## Methods

### 1. `String.concat()`

Joins multiple strings together into one.

```js
let greeting = "Hello";
let name = "Alice";

console.log(greeting.concat(", ", name, "!"));
// "Hello, Alice!"
```

You can pass as many strings as you want — they all get added to the end in order.

> **Tip:** You can also just use `+` to join strings: `"Hello" + ", " + "Alice!"`. Both work the same way. `.concat()` is just the method version.

---

### 2. `String.slice()`

Cuts out a piece of a string and returns it. You give it a start index and an optional end index.

```js
let text = "Hello, World!";

console.log(text.slice(7, 12)); // "World"
console.log(text.slice(0, 5)); // "Hello"
console.log(text.slice(-6)); // "World!"
console.log(text.slice(-6, -1)); // "World"
```

**Positive indexes — count from the left:**

```
H  e  l  l  o  ,     W  o  r  l  d  !
0  1  2  3  4  5  6  7  8  9  10 11 12
```

`text.slice(7, 12)` → starts at index 7 (`W`), stops before index 12 (`!`) → `"World"`

**Negative indexes — count from the right:**

```
H   e   l   l   o   ,      W   o   r   l   d   !
-13 -12 -11 -10 -9  -8  -7 -6  -5  -4  -3  -2  -1
```

`text.slice(-6)` → starts 6 from the end → `"World!"`

---

### 3. `String.trim()`

Removes spaces, tabs, and newlines from the **start and end** of a string. Everything in the middle stays exactly as it is.

```js
let messyString = " \n hello goodbye \t ";
console.log(messyString.trim());
// "hello goodbye"
```

This is especially useful when dealing with user input — people often accidentally add spaces when typing into a form.

| Before trim         | After trim         |
| ------------------- | ------------------ |
| `"   hello   "`     | `"hello"`          |
| `"\n  hi there \t"` | `"hi there"`       |
| `"no extra space"`  | `"no extra space"` |

---

### 4. `String.split()`

Breaks a string into an array of smaller pieces. You choose what character to split on.

```js
let sentence = "Hello, World! How are you?";

console.log(sentence.split(" "));
// ["Hello,", "World!", "How", "are", "you?"]

console.log(sentence.split(" ", 3));
// ["Hello,", "World!", "How"]  ← only the first 3 pieces

console.log("cat".split(""));
// ["c", "a", "t"]  ← split into individual characters
```

**Common separators:**

| Separator | What it splits on | Example result        |
| --------- | ----------------- | --------------------- |
| `" "`     | spaces            | words                 |
| `","`     | commas            | CSV values            |
| `""`      | nothing (empty)   | individual characters |
| `"\n"`    | newlines          | lines of text         |

> `.split()` is the opposite of `.join()`. Split breaks a string into an array; join puts an array back into a string.

---

### 5. `String.search()`

Looks for a word or phrase inside a string and tells you **where it starts**. Returns `-1` if it isn't found.

```js
let phrase = "Hello, World!";

console.log(phrase.search("World")); // 7  — starts at index 7
console.log(phrase.search("Universe")); // -1 — not found

console.log("I love pizza".search("pizza")); // 7
```

**How to use the result:**

```js
let result = phrase.search("World");

if (result === -1) {
  console.log("Not found");
} else {
  console.log("Found at index " + result);
}
```

---

## Quick Reference

| Method                     | What it does              | Returns              |
| -------------------------- | ------------------------- | -------------------- |
| `.concat(str1, str2, ...)` | Joins strings together    | New string           |
| `.slice(start, end)`       | Cuts out a piece          | New string           |
| `.trim()`                  | Removes edge whitespace   | New string           |
| `.split(separator, limit)` | Breaks into array         | Array                |
| `.search(value)`           | Finds position of a match | Index number or `-1` |

> All of these return a **new** string or array — they never change the original string. Strings in JavaScript are immutable (can't be modified in place).
