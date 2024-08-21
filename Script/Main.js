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
  if(document.getElementById("last-message"))
    document.getElementById("last-message").scrollIntoView({behavior: 'smooth', block: 'end'});
}
function createMessage(messageObject) {
    if (document.getElementById("last-message"))
        document.getElementById("last-message").removeAttribute("id");
  let messageIcons = document.createElement("div");
  messageIcons.className = "message-icons";
  messageIcons.innerHTML = `<i class="fa-solid fa-face-smile"></i>
    <i class="fa-solid fa-reply"></i>
    <i class="fa-solid fa-share"></i>
    <i class="fa-solid fa-ellipsis"></i>`;

  let messageImgContainer = document.createElement("div");
  messageImgContainer.className = "message-img";
  let messageImg = document.createElement("img");
  messageImg.src = messageObject.img;
  messageImgContainer.appendChild(messageImg);

  let messageContent = document.createElement("div");
  messageContent.className = "message-content";

  let messageHeader = document.createElement("div");
  messageHeader.className = "message-header";
  let messageName = document.createElement("span");
  messageName.className = "message-name";
  messageName.innerHTML = messageObject.name;

  let messageDate = document.createElement("span");
  messageDate.className = "message-date";
  messageDate.innerHTML = messageObject.date;

  messageHeader.appendChild(messageName);
  messageHeader.appendChild(messageDate);

  let messageText = document.createElement("div");
  messageText.className = "message-text";
  let messageTextP = document.createElement("p");
  messageTextP.innerHTML = messageObject.text;
  messageText.appendChild(messageTextP);

  let messageMedia = document.createElement("div");
  messageMedia.className = "message-media";
  let messageReactions = document.createElement("div");
  messageReactions.className = "message-reactions";

  messageContent.appendChild(messageHeader);
  messageContent.appendChild(messageText);
  messageContent.appendChild(messageMedia);
  messageContent.appendChild(messageReactions);

  let message = document.createElement("div");
  message.className = "message";
  message.setAttribute("id", "last-message");

  message.appendChild(messageIcons);
  message.appendChild(messageImgContainer);
  message.appendChild(messageContent);
  return message;
}
