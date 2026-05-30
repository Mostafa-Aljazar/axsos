// Short Answer Questions — JavaScript Fundamentals


// 1. What is a string? How is it different from an array?
// A string is text wrapped in quotes. An array is a list that can hold any types of values.
let str = "Hello, World!";
let arr = ["apple", "banana", "cherry"];


// 2. What is a data type? Is this what typeof tells us?
// A data type tells us what kind of value something is. typeof returns that type as a string.
console.log(typeof "hello");   // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof { a: 1 });  // "object"
console.log(typeof [1, 2, 3]); // "object"
console.log(typeof undefined); // "undefined"


// 3. typeof string vs typeof array
console.log(typeof "hello");   // "string"
console.log(typeof [1, 2, 3]); // "object" — arrays are technically objects in JS


// 4. How do you find the number of characters in a string?
let text = "Hello, World!";
console.log(text.length); // 13


// 5. Are spaces counted in string length?
let spacedText = "Hello World";
console.log(spacedText.length); // 11 — yes, the space counts


// 6. A few built-in string methods
let sample = "  Hello, World!  ";
console.log(sample.toUpperCase());       // "  HELLO, WORLD!  "
console.log(sample.toLowerCase());       // "  hello, world!  "
console.log(sample.trim());              // "Hello, World!"
console.log(sample.trim().substring(0, 5)); // "Hello"
console.log(sample.trim().split(", "));  // ["Hello", "World!"]


// 7. Convert a string to an array
let fruits = "apple,banana,cherry";
let fruitsArray = fruits.split(",");
console.log(fruitsArray); // ["apple", "banana", "cherry"]


// 8. Convert an array to a string
let colorsArray = ["red", "green", "blue"];
let colorsString = colorsArray.join(", ");
console.log(colorsString); // "red, green, blue"


// 9. Convert a string to a boolean
// No direct method exists — use a comparison instead
let boolStr = "true";
let bool = (boolStr === "true");
console.log(bool); // true


// 10. Convert a number to a string
let num = 123;
let numStr = num.toString();
console.log(numStr);        // "123"
console.log(typeof numStr); // "string"


// 11. Switch statement
let day = 2;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Not a valid day");
}


// 12. Fast-finish check
// Return early as soon as you find what you need — skip the rest.
function findEvenNumber(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            return arr[i];
        }
    }
    return null;
}
console.log(findEvenNumber([1, 3, 4, 7, 8])); // 4


// 13. Associative array vs traditional array
let person = { name: "Alice", age: 30 };
console.log(person["name"]); // "Alice" — accessed by key

let colors = ["red", "green", "blue"];
console.log(colors[1]); // "green" — accessed by index


// 14 & 15. JavaScript object — closest thing to an associative array
let car = { make: "Toyota", model: "Corolla", year: 2021 };
console.log(car.make);    // "Toyota"
console.log(typeof car);  // "object"


// 16. Immutable vs mutable
// Strings are immutable — you can't change a character in place
let word = "hello";
word[0] = "H"; // does nothing
console.log(word); // still "hello"

// Arrays are mutable — you can change elements
let nums = [1, 2, 3];
nums[0] = 99;
console.log(nums); // [99, 2, 3]

// Objects are mutable — you can change properties
let obj = { name: "Alice" };
obj.name = "Bob";
console.log(obj.name); // "Bob"


// 17 & 18. for...in loop — gives you the keys
let profile = { name: "Alice", age: 30, city: "Nablus" };
for (let key in profile) {
    console.log(key + ": " + profile[key]);
}
// name: Alice
// age: 30
// city: Nablus


// 19. Why avoid built-in functions in challenges?
// Building things from scratch helps you understand how they actually work.
// Anyone can call .reverse() — but can you write it yourself?