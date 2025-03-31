let stickyElement = document.getElementsByClassName("header")[0];

function isVisible() {
  return (
    stickyElement.getBoundingClientRect().top < window.innerHeight &&
    stickyElement.getBoundingClientRect().bottom >= 0
  );
}
function isOnTopOfPage() {
  return window.pageYOffset == 0;
}
document.addEventListener("scroll", function () {
  if (!isVisible()) stickyElement.classList.add("floating-header");
  else if (isOnTopOfPage()) stickyElement.classList.remove("floating-header");
});
