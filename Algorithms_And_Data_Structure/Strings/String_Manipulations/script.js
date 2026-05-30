// Strings To Do 7: String Manipulations
// Five built-in string methods every JavaScript developer uses daily.


// ─────────────────────────────────────────
// 1. String.concat()
// ─────────────────────────────────────────
// Joins strings together into one new string.
// You can pass as many strings as you want.

let greeting = "Hello";
let name = "Alice";
let punctuation = "!";

let fullGreeting = greeting.concat(", ", name, punctuation);
console.log(fullGreeting);
// "Hello, Alice!"

// Another example
let first = "Good";
let second = " morning";
let third = ", have a nice day!";
console.log(first.concat(second, third));
// "Good morning, have a nice day!"


// ─────────────────────────────────────────
// 2. String.slice()
// ─────────────────────────────────────────
// Cuts out a piece of a string and returns it.
// slice(start, end) — start is included, end is not.
// Negative numbers count from the end of the string.

let text = "Hello, World!";

console.log(text.slice(7, 12));  // "World"   — from index 7 up to (not including) 12
console.log(text.slice(0, 5));   // "Hello"   — first 5 characters
console.log(text.slice(-6));     // "World!"  — last 6 characters
console.log(text.slice(-6, -1)); // "World"   — last 6, but stop before the last one


// ─────────────────────────────────────────
// 3. String.trim()
// ─────────────────────────────────────────
// Removes any spaces, tabs, or newlines from the
// start and end of a string. The middle is untouched.

let messyString = " \n hello goodbye \t ";
console.log(messyString.trim());
// "hello goodbye"

let padded = "   lots of space   ";
console.log(padded.trim());
// "lots of space"


// ─────────────────────────────────────────
// 4. String.split()
// ─────────────────────────────────────────
// Breaks a string apart into an array of pieces.
// You decide what character to split on (the separator).

let sentence = "Hello, World! How are you?";

console.log(sentence.split(" "));
// ["Hello,", "World!", "How", "are", "you?"]
// split on spaces → each word becomes an array item

console.log(sentence.split(" ", 3));
// ["Hello,", "World!", "How"]
// the second argument limits how many pieces you get

console.log("cat".split(""));
// ["c", "a", "t"]
// split on empty string → every single character becomes an item


// ─────────────────────────────────────────
// 5. String.search()
// ─────────────────────────────────────────
// Looks for a word or phrase inside a string.
// Returns the index where it starts, or -1 if not found.

let phrase = "Hello, World!";

console.log(phrase.search("World"));    // 7   — "World" starts at index 7
console.log(phrase.search("Universe")); // -1  — not found

console.log("I love pizza".search("pizza")); // 7