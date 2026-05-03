// Basic function
console.log("🚀 ~ Basic function:")

function welcome() {
  console.log("Welcome to coding!");
}

welcome();

// Function with argument
console.log("🚀 ~ Function with argument:");

function square(num) {
  console.log(num * num);
}

square(5);

// Function with return value
console.log("🚀 ~ Function with return value:");

function convertToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

let result = convertToCelsius(68);
console.log(result);

// Reusable function
console.log("🚀 ~ Reusable function:");

function isEven(num) {
  return num % 2 === 0;
}

console.log(isEven(4)); // true
console.log(isEven(7)); // false