let leftSection = document.getElementById("left-section");
let mainSection = document.getElementById("main-section");

document.getElementById("show-main-section-button").onclick = function () {
  mainSection.style.display = "block";
  leftSection.style.display = "none";


};

document.getElementById("show-left-section-button").onclick = function () {
  mainSection.style.display = "none";
  leftSection.style.display = "grid";
};
function myFunction(x) {
  if (x.matches) {
    // If media query matches
    mainSection.style.display = "block";
    leftSection.style.display = "grid";
    
  } else {
    mainSection.style.display = "none";
  }
}

// Create a MediaQueryList object
var x = window.matchMedia("(min-width: 500px)");

x.addEventListener("change", function () {
  myFunction(x);
});
