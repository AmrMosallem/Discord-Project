let users = document.querySelectorAll(".user");

for (let i = 0; i < users.length; i++) {
  if (
    localStorage.getItem("signedUserName") ==
    users[i].querySelector(".user-name").innerHTML
  ) {
    let signedUserName = localStorage.getItem("signedUserName");
    let signedUserImg = localStorage.getItem("signedUserImg");
    document.querySelector(".signed-in").style.display = "flex";
    document.querySelector(".signed-in").querySelector(".user-name").innerHTML =
      signedUserName;
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
    })
    break;
  }
}


users.forEach((user) => {
  user.addEventListener("click", () => {
    let signedUserName = user.querySelector(".user-name").innerHTML;
    let signedUserImg = user.querySelector(".user-img").src;
    localStorage.setItem("signedUserName", signedUserName);
    localStorage.setItem("signedUserImg", signedUserImg);
    console.log(
      `signedUserName: ${signedUserName}, signedUserImg: ${signedUserImg}`
    );
    window.location.href = "main.html";
  });
});
