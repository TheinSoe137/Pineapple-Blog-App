const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger-active");
  menu.classList.toggle("menu-active");
  console.log("first");
});
