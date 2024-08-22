let userName = document.getElementById("user-name");
userName.innerHTML = localStorage.getItem("signedUserName");

let userImg = document.getElementById("user-img");
userImg.src = localStorage.getItem("signedUserImg");

document.querySelector(".user-status").children[1].innerHTML =
  userName.innerHTML;


document.querySelectorAll(".member-container").forEach((member) => {
  if (
    member
      .querySelector(".member-name")
      .innerHTML.includes(localStorage.getItem("signedUserName"))
  ) {
    member.querySelector(".member-img").classList = "member-img member-online";
    member.classList = "member-container";

    member.querySelector(".member-img-overview").classList =
      "member-img-overview member-online";

    let penElement = document.createElement("i");
    penElement.classList = "fa-solid fa-pen";
    let buttonText = document.createTextNode("Edit Profile");

    let buttonElement = document.createElement("button");
    buttonElement.appendChild(penElement);
    buttonElement.appendChild(buttonText);

    let messageInput = member.querySelector(".overview-input");
    messageInput.remove();

    member.querySelector(".lower-overview").appendChild(buttonElement);

    document
      .querySelector(".members-section")
      .insertBefore(
        member.parentElement,
        member.parentElement.parentElement.children[1]
      );
  }
});
