// Strings To-Do 6: String to Array Part 2
// Three challenges working with objects (associative arrays / maps).


// ─────────────────────────────────────────
// 1. Zip Arrays into Map
// ─────────────────────────────────────────
// Take two arrays and pair them up — first array becomes the keys,
// second array becomes the values.

function zipArraysIntoMap(keysArray, valuesArray) {
    let map = {};

    for (let i = 0; i < keysArray.length; i++) {
        map[keysArray[i]] = valuesArray[i];
    }

    return map;
}

let arr1 = ["abc", 3, "yo"];
let arr2 = [42, "wassup", true];
console.log(zipArraysIntoMap(arr1, arr2));
// { abc: 42, '3': 'wassup', yo: true }


// ─────────────────────────────────────────
// 2. Invert Hash
// ─────────────────────────────────────────
// Flip an object inside out — the values become the new keys,
// and the keys become the new values.

function invertHash(obj) {
    let inverted = {};

    for (let key in obj) {
        inverted[obj[key]] = key;
    }

    return inverted;
}

let assocArr = { name: "Zaphod", charm: "high", morals: "dicey" };
console.log(invertHash(assocArr));
// { Zaphod: 'name', high: 'charm', dicey: 'morals' }


// ─────────────────────────────────────────
// 3. Count Values (without .length)
// ─────────────────────────────────────────
// Objects don't have a .length property, so we count manually
// by looping through every key and incrementing a counter.

function countValues(obj) {
    let count = 0;

    for (let key in obj) {
        count++;
    }

    return count;
}

let bandInfo = {
    band: "Travis Shredd & the Good Ol' Homeboys",
    style: "Country/Metal/Rap",
    album: "668: The Neighbor of the Beast"
};
console.log(countValues(bandInfo)); // 3