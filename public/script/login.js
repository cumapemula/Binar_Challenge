const inputPassword = document.getElementById("inputPassword");
const showHide = document.getElementById("show-hide");

showHide.addEventListener("click", () => {
  showHide.classList.toggle("show");

  if (showHide.classList.contains("show")) {
    showHide.classList.remove("fa-slash-eye");
    showHide.classList.add("fa-eye");
    inputPassword.setAttribute("type", "text");
  } else {
    showHide.classList.remove("fa-eye");
    showHide.classList.add("fa-slash-eye");
    inputPassword.setAttribute("type", "password");
  }
});
