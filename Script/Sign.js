
let users = document.querySelectorAll(".user");


if(localStorage.getItem("signedUserName")){
  let signedUserName = localStorage.getItem("signedUserName");
  let signedUserImg = localStorage.getItem("signedUserImg");
  document.querySelector(".signed-in").style.display = "flex";
  document.querySelector(".signed-in").querySelector(".user-name").innerHTML = signedUserName;
  document.querySelector(".signed-in").querySelector(".user-img").src = signedUserImg;
  users.forEach((user) => {
    if(user.querySelector(".user-name").innerHTML == signedUserName){
      user.style.display = "none";
    }
  })
  document.querySelector(".continue").addEventListener("click", () => {
    window.location.href = "community-announcements.html";
  })
}

users.forEach((user) => {
  user.querySelector(".sign-in").addEventListener("click", () => {
    let signedUserName = user.querySelector(".user-name").innerHTML;
    let signedUserImg = user.querySelector(".user-img").src;
    localStorage.setItem("signedUserName", signedUserName);
    localStorage.setItem("signedUserImg", signedUserImg);
    console.log(
      `signedUserName: ${signedUserName}, signedUserImg: ${signedUserImg}`
    );
    window.location.href = "community-announcements.html";
  });
});

