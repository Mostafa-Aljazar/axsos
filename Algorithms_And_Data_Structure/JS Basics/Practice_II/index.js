// Check positive or negative
console.log("🚀 ~ Check positive or negative:");

let num = -5;

if (num > 0) {
  console.log("Positive");
} else if (num < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}

// Morning or afternoon
console.log("🚀 ~ Morning or afternoon:");

let hour = 10;

if (hour < 12) {
  console.log("Good morning");
} else {
  console.log("Good afternoon");
}

// Assign grades
console.log("🚀 ~ Assign grades:");
let score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}

// Weekday or weekend
console.log("🚀 ~ Weekday or weekend:");

let day = "Friday";

switch (day) {
  case "Friday":
  case "Saturday":
    console.log("Weekend");
    break;

  case "Sunday":
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Weekday");
    break;

  default:
    console.log("Invalid day");
}
