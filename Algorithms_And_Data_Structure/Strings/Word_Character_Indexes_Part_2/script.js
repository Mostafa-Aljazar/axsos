// Strings To Do 4: Word Character Indexes Part 2 — Solutions


// ─────────────────────────────────────────
// 1. Is Word Alphabetical
// ─────────────────────────────────────────
// Strip non-letters and lowercase, then compare each character
// to the next one. If any character is greater than the next, 
// the word is not in alphabetical order.
function isWordAlphabetical(str) {
    str = str.toLowerCase().replace(/[^a-z]/g, '');

    for (let i = 0; i < str.length - 1; i++) {
        if (str[i] > str[i + 1]) {
            return false;
        }
    }

    return true;
}

console.log(isWordAlphabetical("abcdefg"));    // true
console.log(isWordAlphabetical("hello"));      // false  (h > e)
console.log(isWordAlphabetical("facetiously")); // false  (f > a)
console.log(isWordAlphabetical("abc"));        // true


// ─────────────────────────────────────────
// 2. D Gets Jiggy
// ─────────────────────────────────────────
// Take the first letter, uppercase the rest of the name,
// then format it as "REST to the FIRST!"
function dGetsJiggy(name) {
    if (name.length < 2) return "";

    let firstLetter = name[0];
    let newName = name.slice(1).toUpperCase();

    return newName + " to the " + firstLetter + "!";
}

console.log(dGetsJiggy("Dylan")); // "YLAN to the D!"
console.log(dGetsJiggy("Mike"));  // "IKE to the M!"
console.log(dGetsJiggy("A"));     // ""  (less than 2 chars)


// ─────────────────────────────────────────
// 3. Common Suffix
// ─────────────────────────────────────────
// Start with the full first word as a candidate suffix.
// For each remaining word, keep trimming the first character off
// the suffix until the word actually ends with it.
// If the suffix becomes empty, there is no common suffix.
function commonSuffix(words) {
    if (words.length === 0) return "";

    let suffix = words[0];

    for (let i = 1; i < words.length; i++) {
        while (words[i].indexOf(suffix) !== words[i].length - suffix.length) {
            suffix = suffix.slice(1);
            if (suffix.length === 0) return "";
        }
    }

    return suffix;
}

console.log(commonSuffix(["deforestation", "citation", "conviction", "incarceration"])); // "tion"
console.log(commonSuffix(["nice", "ice", "baby"]));                                      // ""
console.log(commonSuffix(["running", "jumping", "swimming"]));                           // "ing"


// ─────────────────────────────────────────
// 4. Book Index
// ─────────────────────────────────────────
// Walk through the sorted page numbers. When consecutive pages are
// found (each one exactly 1 more than the last), extend the range.
// Output single pages as "n" and ranges as "start-end".
function bookIndex(pages) {
    let index = "";

    for (let i = 0; i < pages.length; i++) {
        let start = pages[i];

        // Advance i while the next page is consecutive
        while (i < pages.length - 1 && pages[i] + 1 === pages[i + 1]) {
            i++;
        }

        let end = pages[i];

        if (start === end) {
            index += start + ", ";
        } else {
            index += start + "-" + end + ", ";
        }
    }

    return index.slice(0, -2); // remove trailing ", "
}

console.log(bookIndex([1, 13, 14, 15, 37, 38, 70])); // "1, 13-15, 37-38, 70"
console.log(bookIndex([1, 2, 3, 4, 5]));              // "1-5"
console.log(bookIndex([5, 10, 11, 20]));              // "5, 10-11, 20"


// ─────────────────────────────────────────
// 5. Drop the Mike
// ─────────────────────────────────────────
// Trim whitespace, check for "mike" (case-insensitive).
// If found → "stunned silence". Otherwise capitalize the first
// letter of every word using a regex word-boundary replacement.
function dropTheMike(str) {
    str = str.trim();

    if (str.toLowerCase().includes("mike")) {
        return "stunned silence";
    }

    return str.replace(/\b\w/g, char => char.toUpperCase());
}

console.log(dropTheMike(" hello world "));  // "Hello World"
console.log(dropTheMike(" Hey Mike "));     // "stunned silence"
console.log(dropTheMike("  foo bar baz ")); // "Foo Bar Baz"