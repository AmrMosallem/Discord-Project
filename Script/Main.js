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
document.querySelector(".plus-button").onclick = () => {
  plusMenu.classList.toggle("plus-menu-inactive");
  plusMenu.onclick = () => {
    plusMenu.classList.add("plus-menu-inactive");
  };
};
plusMenu.onmouseleave = () => {
  plusMenu.classList.add("plus-menu-inactive");
};

document.querySelectorAll(".member-container").forEach((member) => {
  member.addEventListener("click", () => {
    let memberOverview = member.querySelector(".member-overview");

    if (memberOverview.classList.contains("member-overview-active")) {
      memberOverview.classList.remove("member-overview-active");
    } else {
      document.querySelectorAll(".member-overview-active").forEach((member) => {
        member.classList.remove("member-overview-active");
      });
      memberOverview.classList.add("member-overview-active");
      memberOverview.onmouseleave = () => {
        memberOverview.classList.remove("member-overview-active");
      };
    }
  });
});
