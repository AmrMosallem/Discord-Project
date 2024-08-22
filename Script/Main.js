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
function createMessage(messageObject) {
  if (document.getElementById("last-message"))
    document.getElementById("last-message").removeAttribute("id");

  let reply = document.createElement("div");
  reply.className = "message-reply";

  if (messageObject.replyName) {
    let replyImg = document.createElement("img");
    replyImg.src = messageObject.replyImg;
    let replyName = document.createElement("span");
    replyName.className = "message-reply-name";
    replyName.innerHTML = messageObject.replyName;
    let replyText = document.createElement("span");
    replyText.className = "message-reply-text";
    replyText.innerHTML = messageObject.replyText;
    reply.appendChild(replyImg);
    reply.appendChild(replyName);
    reply.appendChild(replyText);
  }

  let messageIcons = document.createElement("div");
  messageIcons.className = "message-icons";

  let reactIcon = document.createElement("i");
  reactIcon.className = "fa-solid fa-face-smile";
  let replyIcon = document.createElement("i");
  replyIcon.className = "fa-solid fa-reply";
  replyIcon.onclick = function () {
    let message = this.parentElement.parentElement;
    document.querySelector(".message-bar").classList.add("message-bar-replied");
    let replyBar = document.querySelector(".reply-bar");
    document.getElementById("reply-name").innerHTML =
      "@" + message.querySelector(".message-header .message-name").innerHTML;
    replyBar.classList.add("reply-bar-active");
    MessageReply = message;
  };
  let editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen";

  editIcon.onclick = function () {
    let message = this.parentElement.parentElement;
    let messageText = message.querySelector(".message-text p");
    let editInput = document.createElement("textarea");
    editInput.classList = "message-edit-input";
    editInput.value = messageText.innerHTML;
    messageText.remove();
    message.querySelector(".message-text").appendChild(editInput);
    editInput.focus();
    editInput.onblur = function () {
      messageText.innerHTML = editInput.value;
      message.querySelector(".message-text").appendChild(messageText);
      saveToLocalStorage();
      editInput.remove();
    };
    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        editInput.blur();
      }
    });
  };

  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";

  deleteIcon.onclick = function () {
    let message = this.parentElement.parentElement;
    document
      .getElementById("confirm-container")
      .classList.add("confirm-active");
    let clonedMessage = this.parentElement.parentElement.cloneNode(true);
    if(clonedMessage.querySelector(".message-reply"))
    clonedMessage.querySelector(".message-reply").remove();
    clonedMessage.classList = "confirm-message";
    document
      .getElementById("confirm-message-container")
      .appendChild(clonedMessage);
    document.getElementById("delete-button").onclick = function () {
      message.remove();
      saveToLocalStorage();
      clonedMessage.remove();
      document
        .getElementById("confirm-container")
        .classList.remove("confirm-active");
    };
    document.getElementById("cancel-button").onclick = function () {
      clonedMessage.remove();
      document
        .getElementById("confirm-container")
        .classList.remove("confirm-active");
    };
  };

  messageIcons.appendChild(reactIcon);
  messageIcons.appendChild(replyIcon);
  if (document.getElementById("user-name").innerHTML == messageObject.name)
    messageIcons.appendChild(editIcon);
  messageIcons.appendChild(deleteIcon);

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

  if (messageObject.replyName) {
    message.appendChild(reply);
  }
  message.appendChild(messageIcons);
  message.appendChild(messageImgContainer);
  message.appendChild(messageContent);
  return message;
}
