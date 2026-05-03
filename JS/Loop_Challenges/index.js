// task 1 : Odd numbers from 1 to 20
console.log("🚀 ~ Odd numbers from 1 to 20:")
for (let i = 1; i <= 20; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}


// task 2 : Multiples of 3 from 100 down to 0
console.log("🚀 ~ Multiples of 3 from 100 down to 0:")
for (let i = 100; i >= 0; i--) {
  if (i % 3 === 0) {
    console.log(i);
  }
}

// task 3 : Print the sequence
console.log("🚀 ~ Print the sequence:")
for (let i = 4; i >= -3.5; i -= 1.5) {
  console.log(i);
}

// task 4 : Sigma from 1 to 100
console.log("🚀 ~ Sigma from 1 to 100:")

let sum = 0;

for (let i = 1; i <= 100; i++) {
  sum += i;
}

console.log(sum); // 5050


// task 5 : Factorial of 12
console.log("🚀 ~ Factorial of 12:")

let num = 1;

for (let i = 1; i <= 12; i++) {
  num *= i;
}

console.log(num); // 479001600