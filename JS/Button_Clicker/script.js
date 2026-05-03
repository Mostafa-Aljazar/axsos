function toggleLogin() {
  const btn = document.getElementById("loginBtn");

  if (btn.innerText === "Login") {
    btn.innerText = "Logout";
  } else {
    btn.innerText = "Login";
  }
}

function removeAddButton() {
  const btn = document.getElementById("addBtn");
  btn.remove();
}

function like(button) {
  alert("Ninja was liked");

  let count = parseInt(button.innerText);
  count++;
  button.innerText = count + " likes";
}