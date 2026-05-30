// Strings To Do 2: String Basic Functions — Solutions


// ─────────────────────────────────────────
// 1. Reverse String
// ─────────────────────────────────────────
function reverseString(str) {
    var reversed = "";

    for (var i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }

    return reversed;
}

console.log(reverseString("creature")); // "erutaerc"
console.log(reverseString("hello"));    // "olleh"


// ─────────────────────────────────────────
// 2. Remove Even-Length Strings
// ─────────────────────────────────────────
function removeEvenLengthStrings(arr) {
    // Iterate backwards so splice doesn't shift unvisited indices
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].length % 2 === 0) {
            arr.splice(i, 1);
        }
    }
}

let arr = ["Nope!", "Its", "Kris", "starting", "with", "K!", "(instead", "of", "Chris", "with", "C)", "."];
removeEvenLengthStrings(arr);
console.log(arr); // ["Nope!", "Its", "Chris", "."]


// ─────────────────────────────────────────
// 3. Integer to Roman Numerals
// ─────────────────────────────────────────
function intToRoman(num) {
    var values  = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    var result = "";

    for (var i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            result += symbols[i];
            num -= values[i];
        }
    }

    return result;
}

console.log(intToRoman(349));  // "CCCXLIX"
console.log(intToRoman(444));  // "CDXLIV"
console.log(intToRoman(609));  // "DCIX"
console.log(intToRoman(1492)); // "MCDXCII"


// ─────────────────────────────────────────
// 4. Roman Numerals to Integer
// ─────────────────────────────────────────
function romanToInt(roman) {
    var map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

    var total = 0;

    for (var i = 0; i < roman.length; i++) {
        var current = map[roman[i]];
        var next    = map[roman[i + 1]];

        if (next && current < next) {
            total -= current;
        } else {
            total += current;
        }
    }

    return total;
}

console.log(romanToInt("III"));    // 3
console.log(romanToInt("DCIX"));   // 609
console.log(romanToInt("MXDII")); // 1492