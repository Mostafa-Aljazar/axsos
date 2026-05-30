// String To Do 8: Word Array Manipulations


// ─────────────────────────────────────────
// 1. String to Word Array
// ─────────────────────────────────────────
// Split on any whitespace (spaces, tabs, newlines).
// filter() removes any empty strings that sneak in.

function stringToWordArray(str) {
    return str.split(/\s+/).filter(word => word.length > 0);
}

console.log(stringToWordArray("Life is not a drill!"));
// ["Life", "is", "not", "a", "drill!"]

console.log(stringToWordArray("Hello   world\nfoo\tbar"));
// ["Hello", "world", "foo", "bar"]


// ─────────────────────────────────────────
// 2. Reverse Word Order
// ─────────────────────────────────────────
// Basic: split into words, reverse the array, join back.

function reverseWordOrder(str) {
    return str.split(/\s+/).reverse().join(" ");
}

console.log(reverseWordOrder("This is a test"));
// "test a is This"

// Bonus: also capitalize the new first word and lowercase the new last word.

function reverseWordOrderBonus(str) {
    let words = str.split(/\s+/).reverse();

    words[0] = words[0][0].toUpperCase() + words[0].slice(1);

    let last = words[words.length - 1];
    words[words.length - 1] = last[0].toLowerCase() + last.slice(1);

    return words.join(" ");
}

console.log(reverseWordOrderBonus("Life is not a drill, go for it!"));
// "It! for go drill, a not is life"


// ─────────────────────────────────────────
// 3. Longest Word
// ─────────────────────────────────────────
// Basic: split and track the longest word, punctuation included.

function longestWord(str) {
    let words = str.split(/\s+/);
    let longest = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }

    return longest;
}

console.log(longestWord("Snap crackle pop makes the world go round!"));
// "crackle"

// Bonus: strip punctuation before comparing lengths.

function longestWordBonus(str) {
    let words = str.split(/\s+/);
    let longest = "";

    for (let i = 0; i < words.length; i++) {
        let clean = words[i].replace(/[^a-zA-Z]/g, "");
        if (clean.length > longest.length) {
            longest = clean;
        }
    }

    return longest;
}

console.log(longestWordBonus("Snap crackle pop makes the world go round!"));
// "crackle"


// ─────────────────────────────────────────
// 4. Unique Words
// ─────────────────────────────────────────
// Basic: keep only words that appear exactly once.
// Punctuation is part of the word, so "Sing!" != "Sing".

function uniqueWords(str) {
    let words = str.split(/\s+/);
    let count = {};

    for (let i = 0; i < words.length; i++) {
        count[words[i]] = (count[words[i]] || 0) + 1;
    }

    let result = [];
    for (let i = 0; i < words.length; i++) {
        if (count[words[i]] === 1) result.push(words[i]);
    }

    return result.join(" ");
}

console.log(uniqueWords("Sing! Sing a song; sing out loud; sing out strong."));
// "Sing! Sing a song; loud; strong."

// Bonus: ignore punctuation and capitalization when counting duplicates.

function uniqueWordsBonus(str) {
    let words = str.split(/\s+/);
    let count = {};

    for (let i = 0; i < words.length; i++) {
        let clean = words[i].replace(/[^a-zA-Z]/g, "").toLowerCase();
        count[clean] = (count[clean] || 0) + 1;
    }

    let result = [];
    for (let i = 0; i < words.length; i++) {
        let clean = words[i].replace(/[^a-zA-Z]/g, "").toLowerCase();
        if (count[clean] === 1) {
            result.push(words[i].replace(/[^a-zA-Z]/g, ""));
        }
    }

    return result.join(" ");
}

console.log(uniqueWordsBonus("Sing a song! Sing a song; sing out loud and strong."));
// "out loud and strong"