// Print numbers 1 to 10
console.log("🚀 ~ Print numbers 1 to 10:");

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Reverse counting 10 to 1
console.log("🚀 ~ Reverse counting 10 to 1:");

for (let i = 10; i >= 1; i--) {
  console.log(i);
}

// Even numbers 1 to 20
console.log("🚀 ~ Even numbers from 1 to 20:")

for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Odd numbers 1 to 20
console.log("🚀 ~ Odd numbers from 1 to 20:")

for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

// Sum from 1 to 10
console.log("🚀 ~ Sum from 1 to 10:");
let sum = 0;

for (let i = 1; i <= 10; i++) {
  sum += i;
}

console.log(sum);

// FizzBuzz 1 to 30
console.log("🚀 ~ FizzBuzz from 1 to 30:");

for (let i = 1; i <= 30; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}