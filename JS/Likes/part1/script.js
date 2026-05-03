const likeBtn = document.querySelector(".like-btn");
const likesText = document.querySelector(".likes");

let likesCount = 3;

function updateLikesText( ) {
  likesCount++;
  likesText.textContent = `${likesCount} like(s)`;  
}