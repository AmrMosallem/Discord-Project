let users = document.querySelectorAll(".user");


function checkSignedIn() {

  for (let i = 0; i < users.length; i++) {
    if (
      localStorage.getItem("signedUserName") ==
        users[i].querySelector(".user-name").innerHTML &&
      localStorage.getItem("signedUserImg") ==
        users[i].querySelector(".user-img").src
    ) {
      let signedUserName = localStorage.getItem("signedUserName");
      let signedUserImg = localStorage.getItem("signedUserImg");
      document.querySelector(".signed-in").style.display = "flex";
      document
        .querySelector(".signed-in")
        .querySelector(".user-name").innerHTML = signedUserName;
      document.querySelector(".signed-in").querySelector(".user-img").src =
        signedUserImg;
      users[i].style.display = "none";
      document.getElementById("continue").addEventListener("click", () => {
        window.location.href = "main.html";
      });
      document.getElementById("sign-out").addEventListener("click", () => {
        localStorage.removeItem("signedUserName");
        localStorage.removeItem("signedUserImg");
        window.location.href = "index.html";
      });
      break;
    }
  }
}
checkSignedIn();
let userName, UserImg;
let backButton = document.getElementById("back-button");
backButton.onclick = () => {
  document.getElementById("users").style.display = "flex";
  document.getElementById("sign-in-container").style.display = "none";
  document.getElementById("title").innerHTML = "Discord";
  backButton.style.display = "none";
  checkSignedIn();
  // document.querySelector(".signed-in").style.display = "none";
  // document.querySelector(".signed-in").querySelector(".user-name").innerHTML = "";
  // document.querySelector(".signed-in").querySelector(".user-img").src = "";
};
users.forEach((user) => {
  user.addEventListener("click", () => {
    userName = user.querySelector(".user-name").innerHTML;
    UserImg = user.querySelector(".user-img").src;
    document.querySelector("#sign-in-user .user-img").src = UserImg;
    document.querySelector("#sign-in-user .user-name").innerHTML = userName;
    document.getElementById("title").innerHTML = "Sign In";
    document.getElementById("users").style.display = "none";
    document.querySelector(".signed-in").style.display = "none";
    document.getElementById("sign-in-container").style.display = "flex";
    backButton.style.display = "block";

    // if()
    // let signedUserName = user.querySelector(".user-name").innerHTML;
    // let signedUserImg = user.querySelector(".user-img").src;
    // localStorage.setItem("signedUserName", signedUserName);
    // localStorage.setItem("signedUserImg", signedUserImg);
    // console.log(
    //   `signedUserName: ${signedUserName}, signedUserImg: ${signedUserImg}`
    // );
    // window.location.href = "main.html";
  });
});

let password = document.getElementById("password");

password.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    document.getElementById("sign-in-button").click();
  }
});

document.getElementById("sign-in-button").addEventListener("click", () => {
  if (password.value == "1234") {
    localStorage.setItem("signedUserName", userName);
    localStorage.setItem("signedUserImg", UserImg);
    backButton.style.display = "none";
    window.location.href = "main.html";
  } else {
    if (!document.getElementById("sign-in-form").querySelector("span")) {
      let wrong = document.createElement("span");
      wrong.innerHTML = "Wrong Password";
      wrong.style.color = "rgb(255,100,100)";
      document.getElementById("sign-in-form").appendChild(wrong);
    }
  }
});
