// Weekend Challenge: Enhancing String.search() with Regular Expressions


// Add newSearch() directly onto every string in JavaScript.
// It works exactly like the built-in .search(), but you can pass
// a regex pattern as a string instead of only a fixed word.

String.prototype.newSearch = function(val) {
    const regex = new RegExp(val);
    return this.search(regex);
};


// ─── Examples from the assignment ───

console.log("dude".newSearch("[q-z]"));  // 1  — 'u' is in the range q-z
console.log("dude".newSearch("(ud)"));   // 1  — "ud" starts at index 1
console.log("dude".newSearch("[^a-c]")); // 0  — 'd' is not in a-c
console.log("dude".newSearch("d$"));     // -1 — 'd' is not at the end


// ─── Extra tests ───

console.log("hello world".newSearch("world"));  // 6  — plain string still works
console.log("hello world".newSearch("[0-9]"));  // -1 — no digits found
console.log("abc123".newSearch("[0-9]"));       // 3  — first digit at index 3
console.log("Hello123".newSearch("[A-Z]"));     // 0  — 'H' is uppercase at index 0
console.log("test@email.com".newSearch("@"));   // 4  — '@' found at index 4