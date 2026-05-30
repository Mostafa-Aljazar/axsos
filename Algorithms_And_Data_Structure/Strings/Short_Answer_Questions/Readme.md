# Short Answer Questions — JavaScript Fundamentals

## Overview

Nineteen questions covering the core JavaScript concepts learned so far: data types, strings, arrays, objects, loops, and more. Each answer includes a short explanation and a working code example.

---

## Questions & Answers

### 1. What is a string? How is it different from an array?

A **string** is text wrapped in quotes — it holds characters.
An **array** is a list that can hold multiple values of any type.

```js
let str = "Hello, World!"; // string
let arr = ["apple", "banana", "cherry"]; // array
```

The big difference: a string only holds text. An array can hold strings, numbers, booleans, objects — anything.

---

### 2. What is a data type? Is this what `typeof` tells us?

A **data type** tells JavaScript what kind of value something is, and what you can do with it. `typeof` is how you ask JavaScript: _"what type is this?"_

```js
console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof { a: 1 }); // "object"
console.log(typeof [1, 2, 3]); // "object"
console.log(typeof undefined); // "undefined"
```

**Data types we've learned:**

| Type      | Example           | Description               |
| --------- | ----------------- | ------------------------- |
| String    | `"hello"`         | Text                      |
| Number    | `42`              | Any number                |
| Boolean   | `true` / `false`  | Yes or no                 |
| Object    | `{ name: "Ali" }` | Key-value pairs           |
| Array     | `[1, 2, 3]`       | Ordered list              |
| Undefined | `undefined`       | Declared but not assigned |

---

### 3. What does `typeof` return for a string vs an array?

```js
console.log(typeof "hello"); // "string"
console.log(typeof [1, 2, 3]); // "object"
```

Arrays return `"object"` because in JavaScript, arrays _are_ objects under the hood — they're just a special kind with numbered keys.

---

### 4. How do you find the number of characters in a string?

Use the `.length` property.

```js
let text = "Hello, World!";
console.log(text.length); // 13
```

---

### 5. Are spaces counted in string length?

**Yes.** Every space is a character and counts toward `.length`.

```js
let spacedText = "Hello World";
console.log(spacedText.length); // 11 — the space in the middle counts
```

---

### 6. What are some built-in string methods?

```js
let sample = "  Hello, World!  ";

sample.toUpperCase(); // "  HELLO, WORLD!  "
sample.toLowerCase(); // "  hello, world!  "
sample.trim(); // "Hello, World!"
sample.trim().substring(0, 5); // "Hello"
sample.trim().split(", "); // ["Hello", "World!"]
```

---

### 7. How do you convert a string to an array?

Use `.split()` and pass in the character to split on.

```js
let fruits = "apple,banana,cherry";
let arr = fruits.split(",");
console.log(arr); // ["apple", "banana", "cherry"]
```

Split on a space `" "` to get individual words. Split on `""` to get individual characters.

---

### 8. How do you convert an array to a string?

Use `.join()` and pass in the character to put between items.

```js
let arr = ["red", "green", "blue"];
let str = arr.join(", ");
console.log(str); // "red, green, blue"
```

`.split()` and `.join()` are opposites — one breaks a string apart, the other puts it back together.

---

### 9. How do you convert a string to a boolean?

There's no direct method. The simplest way is a comparison:

```js
let str = "true";
let bool = str === "true";
console.log(bool); // true
```

---

### 10. How do you convert a number to a string?

Use `.toString()`.

```js
let num = 123;
let str = num.toString();
console.log(str); // "123"
console.log(typeof str); // "string"
```

---

### 11. What is a switch statement, and when should you use it?

A `switch` statement checks one value against many possible cases. It's cleaner than a long chain of `if/else if` when you're comparing the same variable to lots of values.

```js
let day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday"); // this runs
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Not a valid day");
}
```

Always use `break` — without it, the code "falls through" and runs the next case too.

---

### 12. What is a fast-finish check?

It means returning **as soon as you have your answer**, instead of finishing the whole loop unnecessarily. It makes code more efficient.

```js
function findEvenNumber(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      return arr[i]; // done — stop immediately
    }
  }
  return null;
}

console.log(findEvenNumber([1, 3, 4, 7, 8])); // 4
```

Without the early `return`, the loop would keep going through `7` and `8` even after already finding `4`. That's wasted work.

---

### 13. What is an associative array? How is it different from a regular array?

An **associative array** uses named keys (strings) to access values. A **regular array** uses numbered indexes.

```js
// Associative array (object)
let person = { name: "Alice", age: 30 };
console.log(person["name"]); // "Alice"

// Regular array
let colors = ["red", "green", "blue"];
console.log(colors[1]); // "green"
```

---

### 14 & 15. What is a JavaScript object? Is it the same as an associative array?

A JavaScript object is a collection of key-value pairs. It's the closest thing JavaScript has to an associative array.

```js
let car = { make: "Toyota", model: "Corolla", year: 2021 };
console.log(car.make); // "Toyota"
console.log(typeof car); // "object"
```

The difference is subtle: objects in JavaScript can also hold **methods** (functions as values), which most associative arrays in other languages can't.

---

### 16. What does "immutable" mean? Which types are immutable?

**Immutable** means it can't be changed after it's created.

```js
// Strings are IMMUTABLE — you can't change a character in place
let word = "hello";
word[0] = "H"; // silently does nothing
console.log(word); // still "hello"

// Arrays are MUTABLE — you can change elements
let nums = [1, 2, 3];
nums[0] = 99;
console.log(nums); // [99, 2, 3]

// Objects are MUTABLE — you can change properties
let obj = { name: "Alice" };
obj.name = "Bob";
console.log(obj.name); // "Bob"
```

| Type   | Mutable? |
| ------ | -------- |
| String | ❌ No    |
| Array  | ✅ Yes   |
| Object | ✅ Yes   |

---

### 17 & 18. How do you loop through an object? Does it give keys or values?

Use a `for...in` loop. It gives you the **keys** — you use those to access the values.

```js
let profile = { name: "Alice", age: 30, city: "Nablus" };

for (let key in profile) {
  console.log(key + ": " + profile[key]);
}
// name: Alice
// age: 30
// city: Nablus
```

`key` is the key. `profile[key]` is the value.

---

### 19. Why does the Dojo discourage using built-in functions in challenges?

Because the whole point is to **understand how things work**, not just get an answer. Calling `.reverse()` takes one second. Writing your own reverse function teaches you loops, indexes, and logic that will help you solve problems that _don't_ have a built-in shortcut.

Anyone can use a tool. The goal is to understand it well enough to build it yourself.
