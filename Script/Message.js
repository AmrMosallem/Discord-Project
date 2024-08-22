let chat = document.getElementById("chat");
if (!document.getElementById("last-message"))
  chat.innerHTML += `<span id="last-message"></span>`;

window.onload = setTimeout(function () {
  document.getElementById("last-message").scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}, 200);

let MessageReply;

document.getElementById("cancel-reply").onclick = function () {
  document
    .querySelector(".message-bar")
    .classList.remove("message-bar-replied");
  document.querySelector(".reply-bar").classList.remove("reply-bar-active");
  MessageReply = null;
};

document
  .getElementById("message-input")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      chat.appendChild(addMessage(MessageReply));
      document.getElementById("last-message").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      saveToLocalStorage();
      setTimeout(function () {
        document.getElementById("message-input").value = "";
        document.getElementById("last-message").scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 0);
    }
  });

function addMessage(replyMessage) {
  if (document.getElementById("last-message"))
    document.getElementById("last-message").removeAttribute("id");

  let now = new Date(),
    month = now.getMonth() + 1,
    day = now.getDate(),
    year = now.getFullYear(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    apm = hour > 12 ? "PM" : "AM";
  hour %= 12;
  hour = hour ? hour : 12;
  minute = minute < 10 ? "0" + minute : minute;

  let reply = document.createElement("div");
  reply.className = "message-reply";

  if (replyMessage) {
    let replyImg = document.createElement("img");
    replyImg.src = replyMessage.querySelector(".message-img img").src;
    let replyName = document.createElement("span");
    replyName.className = "message-reply-name";
    replyName.innerHTML = replyMessage.querySelector(
      ".message-header .message-name"
    ).innerHTML;
    let replyText = document.createElement("span");
    replyText.className = "message-reply-text";
    replyText.innerHTML =
      replyMessage.querySelector(".message-text p").innerHTML;
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
    editInput.value = messageText.innerHTML;
    editInput.classList = "message-edit-input";

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
  messageIcons.appendChild(editIcon);
  messageIcons.appendChild(deleteIcon);

  let messageImgContainer = document.createElement("div");
  messageImgContainer.className = "message-img";
  let messageImg = document.createElement("img");
  messageImg.src = document.getElementById("user-img").src;
  messageImgContainer.appendChild(messageImg);

  let messageContent = document.createElement("div");
  messageContent.className = "message-content";

  let messageHeader = document.createElement("div");
  messageHeader.className = "message-header";
  let messageName = document.createElement("span");
  messageName.className = "message-name";
  messageName.innerHTML = document.getElementById("user-name").innerHTML;

  let messageDate = document.createElement("span");
  messageDate.className = "message-date";
  messageDate.innerHTML = `${month}/${day}/${year} ${hour}:${minute} ${apm}`;

  messageHeader.appendChild(messageName);
  messageHeader.appendChild(messageDate);

  let messageText = document.createElement("div");
  messageText.className = "message-text";
  let messageTextP = document.createElement("p");
  messageTextP.innerHTML = document.getElementById("message-input").value;
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

  if (replyMessage) {
    message.appendChild(reply);
    document.getElementById("cancel-reply").click();
  }
  message.appendChild(messageIcons);
  message.appendChild(messageImgContainer);
  message.appendChild(messageContent);

  return message;
}

function saveToLocalStorage() {
  let messagesArray = [];
  document.querySelectorAll(".message").forEach((message) => {
    let replyimg, replyname, replytext;
    if (message.querySelector(".message-reply")) {
      replyimg = message.querySelector(".message-reply img").src;
      replyname = message.querySelector(".message-reply-name").innerHTML;
      replytext = message.querySelector(".message-reply-text").innerHTML;
    }
    let messageObject = {
      replyImg: replyimg,
      replyName: replyname,
      replyText: replytext,
      img: message.querySelector(".message-img img").src,
      name: message.querySelector(".message-header .message-name").innerHTML,
      date: message.querySelector(".message-header .message-date").innerHTML,
      text: message.querySelector(".message-text p").innerHTML,
    };

    messagesArray.push(messageObject);
  });

  localStorage.setItem(
    document.querySelector(".channels-active").id,
    JSON.stringify(messagesArray)
  );
}
