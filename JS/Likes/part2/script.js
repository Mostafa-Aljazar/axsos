const buttons = document.querySelectorAll(".like-btn");
const likesEls = document.querySelectorAll(".likes");

let likes = [9, 12, 4];

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    likes[index]++;
    likesEls[index].textContent = `${likes[index]} like(s)`;
  });
});