const video = document.getElementById("mainVideo");

function playVideo() {
  video.play();
}

function pauseVideo() {
  video.pause();
  video.currentTime = 0;
}