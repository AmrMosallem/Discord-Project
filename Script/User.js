let userName = document.getElementById("user-name");
userName.innerHTML = localStorage.getItem("signedUserName");

let userImg = document.getElementById("user-img");
userImg.src = localStorage.getItem("signedUserImg");

document.querySelector(".user-status").children[1].innerHTML = userName.innerHTML;

document.querySelectorAll(".member-info").forEach((member) => {
  if (
    member
      .querySelector(".member-name")
      .innerHTML.includes(localStorage.getItem("signedUserName"))
  ) {
    member.previousElementSibling.querySelector(".member-img").classList =
      "member-img member-online";
    member.parentElement.classList = "member-container";

    document
      .querySelector(".members-section")
      .insertBefore(
        member.parentElement.parentElement,
        document.querySelector(".members-section").children[1]
      );
  }

});
