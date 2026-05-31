// Recursion To Do 1


// ─────────────────────────────────────────
// 1. Recursive Sigma
// ─────────────────────────────────────────
// Add all integers from 1 up to num.
// Truncate decimals, return 0 for negatives.

function rSigma(num) {
    num = Math.floor(num);
    if (num <= 0) return 0;
    return num + rSigma(num - 1);
}

console.log(rSigma(5));   // 15  (1+2+3+4+5)
console.log(rSigma(2.5)); // 3   (1+2)
console.log(rSigma(-1));  // 0


// ─────────────────────────────────────────
// 2. Recursive Factorial
// ─────────────────────────────────────────
// Multiply all integers from 1 up to num.
// Truncate decimals, treat negatives as 0. 0! = 1.

function rFact(num) {
    num = Math.floor(num);
    if (num <= 0) return 1;
    return num * rFact(num - 1);
}

console.log(rFact(3));   // 6    (1*2*3)
console.log(rFact(6.5)); // 720  (1*2*3*4*5*6)
console.log(rFact(0));   // 1


// ─────────────────────────────────────────
// 3. Flood Fill (Bonus)
// ─────────────────────────────────────────
// Starting at a pixel, spread a new color to all
// directly adjacent pixels that share the original color.

function floodFill(canvas2D, startXY, newColor) {
    let [x, y] = startXY;
    let originalColor = canvas2D[y][x];

    if (originalColor === newColor) return canvas2D;

    function fill(x, y) {
        if (x < 0 || y < 0 || y >= canvas2D.length || x >= canvas2D[0].length) return;
        if (canvas2D[y][x] !== originalColor) return;

        canvas2D[y][x] = newColor;

        fill(x + 1, y);
        fill(x - 1, y);
        fill(x, y + 1);
        fill(x, y - 1);
    }

    fill(x, y);
    return canvas2D;
}

let canvas = [
    [1, 1, 1, 1, 1],
    [1, 3, 3, 3, 1],
    [1, 3, 3, 3, 1],
    [1, 3, 3, 3, 1],
    [1, 1, 1, 1, 1],
];

console.log(floodFill(canvas, [2, 2], 1));
// All 3s become 1s