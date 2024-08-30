
if(!localStorage.getItem("signedUserName")){
  window.location.href = "index.html";
}

let channels = document.querySelectorAll(".channels");
let activeChannel = "community-announcements";

if (localStorage.getItem("active-channel")) {
  activeChannel = localStorage.getItem("active-channel");
}
loadChannel(activeChannel);

channels.forEach((channel) => {
  channel.addEventListener("click", () => {
    activeChannel = channel.id;
    localStorage.setItem("active-channel", activeChannel);
    loadChannel(activeChannel);
  });
});

function loadChannel(channelName) {
  channels.forEach((channel) => {
    channel.classList.remove("channels-active");
  });
  document.getElementById(channelName).classList.add("channels-active");
  document.getElementById("channel-name").innerHTML =
    "<span class='hash'>#</span>" + channelName;
  document.getElementById(
    "chat-title"
  ).innerHTML = `Welcome to ${channelName}!`;
  document.getElementById(
    "chat-desc"
  ).innerHTML = `This is the start of ${channelName} channel.`;

  document.querySelectorAll(".message").forEach((message) => {
    message.remove();
  });
  let chat = document.getElementById("chat");
  let messagesArray = JSON.parse(localStorage.getItem(channelName));
  if (messagesArray) {
    messagesArray.forEach((messageObject) => {
      chat.appendChild(createMessage(messageObject));
    });
  }
  if (document.getElementById("last-message"))
    document
      .getElementById("last-message")
      .scrollIntoView({ behavior: "smooth", block: "end" });
}
document.getElementById("search-input").addEventListener("input", function () {
  let searchValue = document.getElementById("search-input").value;
  let messages = document.querySelectorAll(".message");

  let regex = new RegExp(searchValue, "gi");
  messages.forEach(function (message) {
    if (
      regex.test(message.querySelector(".message-text p").innerHTML) ||
      regex.test(
        message.querySelector(".message-header .message-name").innerHTML
      )
    ) {
      message.style.display = "flex";
    } else {
      message.style.display = "none";
    }
  });
});



let plusMenu = document.getElementById("plus-menu");

function hidePlusMenu (event) {

  if (!document.querySelector(".plus-button").contains(event.target)) {
    plusMenu.classList.add("plus-menu-inactive");
    document.removeEventListener("click", hidePlusMenu);
  }
}

document.querySelector(".plus-button").onclick = () => {
  plusMenu.classList.remove("plus-menu-inactive");
 document.addEventListener("click", hidePlusMenu);
};



document.querySelectorAll(".member-container").forEach((member) => {
  member.addEventListener("click", () => {
    let memberOverview = member.querySelector(".member-overview");
    memberOverview.classList.add("member-overview-active");
    
    function hideMemberOverview(event) {
      if (!member.contains(event.target)) {
        memberOverview.classList.remove("member-overview-active");
        document.removeEventListener("click", hideMemberOverview);
      }
    }
    document.addEventListener("click", hideMemberOverview);
  });
});
