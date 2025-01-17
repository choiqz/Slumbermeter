//check if username already is in system
// localStorage.setItem("username", "");
const existingUser = localStorage.getItem("username");
if (existingUser && existingUser.trim() !== ""){
  window.location.href = "../html/home.html";
}

const siginForm = document.getElementById("signin-form");

siginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const username = document.getElementById("uname").value;
  localStorage.setItem("username", username);
  window.location.href = "../html/home.html";
});