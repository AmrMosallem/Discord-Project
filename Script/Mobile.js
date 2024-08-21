let leftSection = document.getElementById("left-section");
let mainSection = document.getElementById("main-section");

document.getElementById("show-left-section-button").onclick = function () {
  mainSection.style.display = "none";
  leftSection.style.display = "grid";
};
// Create a MediaQueryList object
var x = window.matchMedia("(min-width: 900px)");
myFunction(x);
function myFunction(x) {

  if (x.matches) {
    // If media query matches
    mainSection.style.display = "block";
    leftSection.style.display = "grid";
    document.querySelectorAll(".channels").forEach((channel) => {
      channel.addEventListener("click", () => {
        mainSection.style.display = "block";
        leftSection.style.display = "grid";

      });
    })
  } else {
    mainSection.style.display = "none";
    leftSection.style.display = "grid";
    document.querySelectorAll(".channels").forEach((channel) => {
      channel.addEventListener("click", () => {
        mainSection.style.display = "block";
        leftSection.style.display = "none";
      });
    })
    document.getElementById("member-list-checkbox").checked = false;
  }
}
x.addEventListener("change", function () {
  myFunction(x);
});
