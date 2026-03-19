//  Pizza Factory Function
function pizzaOven(crust, sauce, cheeses, toppings) {
  return {
    crust: crust,
    sauce: sauce,
    cheeses: cheeses,
    toppings: toppings
  };
}

// Required Pizzas
// 1
var pizza1 = pizzaOven(
  "deep dish",
  "traditional",
  ["mozzarella"],
  ["pepperoni", "sausage"]
);

// 2
var pizza2 = pizzaOven(
  "hand tossed",
  "marinara",
  ["mozzarella", "feta"],
  ["mushrooms", "olives", "onions"]
);

// 3 (custom)
var pizza3 = pizzaOven(
  "thin crust",
  "alfredo",
  ["parmesan"],
  ["chicken", "spinach"]
);

// 4 (custom)
var pizza4 = pizzaOven(
  "stuffed crust",
  "bbq",
  ["cheddar"],
  ["beef", "onions", "peppers"]
);


console.log("Pizza 1:", pizza1);
console.log("Pizza 2:", pizza2);
console.log("Pizza 3:", pizza3);
console.log("Pizza 4:", pizza4);


// BONUS: Random Pizza Generator
function randomPizza() {
  var crusts = ["deep dish", "thin", "hand tossed", "stuffed crust"];
  var sauces = ["traditional", "marinara", "alfredo", "bbq"];
  var cheeses = ["mozzarella", "cheddar", "feta", "parmesan"];
  var toppings = [
    "pepperoni",
    "sausage",
    "mushrooms",
    "olives",
    "onions",
    "chicken",
    "bacon",
    "peppers"
  ];

  // get random item
  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // get random items (1–3)
  function randomItems(arr) {
    var result = [];
    var count = Math.floor(Math.random() * 3) + 1;

    for (var i = 0; i < count; i++) {
      result.push(randomItem(arr));
    }

    return result;
  }

  return pizzaOven(
    randomItem(crusts),
    randomItem(sauces),
    randomItems(cheeses),
    randomItems(toppings)
  );
}

// Generate random pizza
var randomPizza1 = randomPizza();
console.log("Random Pizza:", randomPizza1);