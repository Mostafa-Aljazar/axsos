# Weekend Challenge — Enhancing String.search() with Regular Expressions

## Overview

JavaScript's built-in `.search()` method can only look for a fixed string. This challenge extends it by adding a new method called `.newSearch()` that accepts **regular expressions** — patterns that can match ranges of characters, sequences, negations, and more.

---

## The Solution

```js
String.prototype.newSearch = function (val) {
  const regex = new RegExp(val);
  return this.search(regex);
};
```

That's it. Three lines. `String.prototype` lets us attach a new method to every string in JavaScript. Inside, we convert the pattern string into a real regex using `new RegExp(val)`, then let `.search()` do the work.

---

## Examples

```js
console.log("dude".newSearch("[q-z]")); // 1
console.log("dude".newSearch("(ud)")); // 1
console.log("dude".newSearch("[^a-c]")); // 0
console.log("dude".newSearch("d$")); // -1
```

---

## How Each Pattern Works

### `[q-z]` — Character range

Matches any single letter from `q` to `z`.

```
"dude"
 d  u  d  e
 0  1  2  3

Is 'd' in [q-z]? No
Is 'u' in [q-z]? Yes ✓ → return 1
```

---

### `(ud)` — Group / exact sequence

Matches the exact sequence of characters inside the parentheses.

```
"dude"
 d  u  d  e
 0  1  2  3

Does "ud" start at index 0? "du" ≠ "ud" → No
Does "ud" start at index 1? "ud" = "ud" → Yes ✓ → return 1
```

---

### `[^a-c]` — Negation

The `^` inside square brackets means "anything that is NOT in this set".

```
"dude"
 d  u  d  e
 0  1  2  3

Is 'd' NOT in [a-c]? Yes ✓ → return 0
```

---

### `d$` — End anchor

The `$` means "only match if this is at the end of the string".

```
"dude"
 d  u  d  e
 0  1  2  3

Does the string end with 'd'? No, it ends with 'e' → return -1
```

---

## More Useful Patterns

| Pattern  | Matches                | Example                               |
| -------- | ---------------------- | ------------------------------------- |
| `[0-9]`  | Any digit              | `"abc123".newSearch("[0-9]")` → `3`   |
| `[A-Z]`  | Any uppercase letter   | `"Hello".newSearch("[A-Z]")` → `0`    |
| `[a-z]`  | Any lowercase letter   | `"Hello".newSearch("[a-z]")` → `1`    |
| `[^a-z]` | Anything not lowercase | `"Hello".newSearch("[^a-z]")` → `0`   |
| `@`      | Literal `@` character  | `"me@email.com".newSearch("@")` → `2` |
| `^H`     | `H` at the start       | `"Hello".newSearch("^H")` → `0`       |
| `e$`     | `e` at the end         | `"dude".newSearch("e$")` → `3`        |

---

## What is `String.prototype`?

In JavaScript, every string is secretly an object, and all strings share a common blueprint called `String.prototype`. Adding a method to it makes that method available on **every** string automatically.

```js
// Before
"hello".newSearch("[0-9]"); // ❌ not a function

// After adding to prototype
String.prototype.newSearch = function(val) { ... };

"hello".newSearch("[0-9]"); // ✓ works on any string
"world".newSearch("[A-Z]"); // ✓ works here too
```

This is how JavaScript's own built-in methods like `.toUpperCase()` and `.trim()` work — they live on `String.prototype`.

---

## What is `new RegExp(val)`?

Normally you write regex like this: `/[q-z]/`

But when the pattern comes in as a string (like `"[q-z]"`), you can't use that syntax directly. `new RegExp(val)` converts a string into a working regex object at runtime.

```js
let pattern = "[q-z]";
let regex = new RegExp(pattern); // same as /[q-z]/

"dude".search(regex); // 1
```

---
