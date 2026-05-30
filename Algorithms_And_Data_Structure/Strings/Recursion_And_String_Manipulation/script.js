// Strings To Do 9: Recursion and String Manipulation


// ─────────────────────────────────────────
// 1. Rotate String
// ─────────────────────────────────────────
// Cut the last n characters off and move them to the front.

function rotateString(str, n) {
    n = n % str.length;
    return str.slice(str.length - n) + str.slice(0, str.length - n);
}

console.log(rotateString("Boris Godunov", 5)); // "dunovBoris Go"
console.log(rotateString("hello", 2));          // "lohel"


// ─────────────────────────────────────────
// 2. Censor
// ─────────────────────────────────────────
// Replace every occurrence of each naughty word with x's.

function censor(str, naughtyWords) {
    for (let i = 0; i < naughtyWords.length; i++) {
        let word = naughtyWords[i];
        let xs = "x".repeat(word.length);
        str = str.split(word).join(xs);
    }
    return str;
}

console.log(censor("Snap crackle pop nincompoop!", ["crack", "poop"]));
// "Snap xxxxxle pop nincomxxxx!"

// Bonus: case-insensitive version
function censorBonus(str, naughtyWords) {
    for (let i = 0; i < naughtyWords.length; i++) {
        let word = naughtyWords[i];
        let xs = "x".repeat(word.length);
        let regex = new RegExp(word, "gi");
        str = str.replace(regex, xs);
    }
    return str;
}

console.log(censorBonus("Snap Crackle pop nincompoop!", ["crack", "poop"]));
// "Snap xxxxxle pop nincomxxxx!"


// ─────────────────────────────────────────
// 3. Is Rotation?
// ─────────────────────────────────────────
// A string is a rotation of another if it appears inside str1 + str1.

function isRotation(str1, str2) {
    if (str1.length !== str2.length) return false;
    return (str1 + str1).includes(str2);
}

console.log(isRotation("waterbottle", "erbottlewat")); // true
console.log(isRotation("hello", "llohe"));              // true
console.log(isRotation("hello", "world"));              // false


// ─────────────────────────────────────────
// 4. Bad Characters
// ─────────────────────────────────────────
// Build a new string, skipping any character found in badChars.

function removeBadChars(str, badChars) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        if (badChars.indexOf(str[i]) === -1) {
            result += str[i];
        }
    }
    return result;
}

console.log(removeBadChars("Battlefield", "aeiou")); // "Bttlfld"
console.log(removeBadChars("Hello World", "lo"));     // "He Wrd"


// ─────────────────────────────────────────
// 5. Genetic Marker
// ─────────────────────────────────────────
// Check if the target matches any pattern in the array.
// '?' in a pattern matches any single character.

function geneticMarker(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        let pattern = arr[i];
        if (pattern.length !== target.length) continue;

        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (pattern[j] !== "?" && pattern[j] !== target[j]) {
                match = false;
                break;
            }
        }

        if (match) return true;
    }
    return false;
}

console.log(geneticMarker(["ABC", "A?C", "XYZ"], "ACC")); // true
console.log(geneticMarker(["ABC", "XYZ"], "ACC"));          // false


// ─────────────────────────────────────────
// 6. Optimal Sequence
// ─────────────────────────────────────────
// Fill in each '?' so every column is in alphabetical order.
// Use the smallest possible letter that keeps the column sorted.

function optimalSequence(words) {
    let result = words.map(w => w.split(""));
    let numCols = words[0].length;

    for (let col = 0; col < numCols; col++) {
        // Fill '?' slots — each must be >= the letter above it
        for (let row = 0; row < result.length; row++) {
            if (result[row][col] === "?") {
                let prev = row > 0 ? result[row - 1][col] : "A";
                result[row][col] = prev;
            }
        }
        // Make sure the column is sorted top to bottom
        for (let row = 1; row < result.length; row++) {
            if (result[row][col] < result[row - 1][col]) {
                result[row][col] = result[row - 1][col];
            }
        }
    }

    return result.map(w => w.join(""));
}

console.log(optimalSequence(["EA?K", "?RX?", "GAG?"]));
// ["EAAK", "ERXK", "GRXK"]

console.log(optimalSequence(["?F??", "W??S", "??X?"]));
// ["AFAA", "WFAS", "WFXS"]