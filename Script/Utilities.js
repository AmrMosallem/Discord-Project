function createReply(messageObject) {
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
  return reply;
}

function createReactIcon() {
  let reactIcon = document.createElement("i");
  reactIcon.className = "fa-solid fa-face-smile";
  let emojisArray = [
    "❤️",
    "😂",
    "💯",
    "🔥",
    "😍",
    "🥰",
    "💀",
    "😠",
    "😭",
    "💖",
    "🤯",
    "👍",
    "😅",
    "😎",
    "🫡",
    "🤨",
    "😪",
    "😓",
    "😒",
    "😔",
    "🙁",
    "😱",
    "🥵",
    "🧐",
    "🤓",
    "😹",
    "💛",
    "🤍",
    "💔",
    "🔪",
    "❌",
    "✅",
  ];

  let emojis = document.createElement("span");
  emojis.className = "message-emojis";
  emojisArray.forEach((emoji) => {
    emojis.appendChild(createEmoji(emoji));
  });
  reactIcon.appendChild(emojis);
  reactIcon.addEventListener("click", function () {
    reactIcon
      .querySelector(".message-emojis")
      .classList.toggle("message-emojis-active");
  });
  return reactIcon;
}
function createEmoji(emoji) {
  let emojiSpan = document.createElement("span");
  emojiSpan.innerHTML = emoji;
  emojiSpan.addEventListener("click", function () {
    let messageReactions =
      emojiSpan.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".message-reactions"
      );

    let reactContainer = messageReactions.querySelector("." + emoji);
    if (!reactContainer) {
      let react = document.createElement("span");
      react.className = "emoji";
      react.innerHTML = emoji;
      let reactCount = document.createElement("span");
      reactCount.className = "message-react-count";
      reactCount.innerHTML = "1";
      reactContainer = document.createElement("div");
      reactContainer.className = "message-react-container " + emoji;
      reactContainer.appendChild(react);
      reactContainer.appendChild(reactCount);
      let reactors = document.createElement("span");
      reactors.className = "message-reactors";
      reactors.innerHTML = document.getElementById("user-name").innerHTML;
      reactContainer.appendChild(reactors);
      reactContainer.addEventListener("click", function () {
        toggleReact(reactContainer);
      });
      messageReactions.appendChild(reactContainer);
    } else {
      toggleReact(reactContainer);
    }
    storeMessagesInFirebase(getAllMessages());
  });
  return emojiSpan;
}

function toggleReact(reactContainer) {
  if (
    !reactContainer
      .querySelector(".message-reactors")
      .innerHTML.includes(document.getElementById("user-name").innerHTML)
  ) {
    reactContainer.querySelector(".message-react-count").innerHTML =
      parseInt(reactContainer.querySelector(".message-react-count").innerHTML) +
      1;
    reactContainer.querySelector(".message-reactors").innerHTML +=
      ", " + document.getElementById("user-name").innerHTML;
  } else {
    reactContainer.querySelector(".message-react-count").innerHTML =
      parseInt(reactContainer.querySelector(".message-react-count").innerHTML) -
      1;
    reactContainer.querySelector(".message-reactors").innerHTML = reactContainer
      .querySelector(".message-reactors")
      .innerHTML.replace(
        ", " + document.getElementById("user-name").innerHTML,
        ""
      );
    reactContainer.querySelector(".message-reactors").innerHTML = reactContainer
      .querySelector(".message-reactors")
      .innerHTML.replace(
        document.getElementById("user-name").innerHTML + ", ",
        ""
      );
    if (reactContainer.querySelector(".message-react-count").innerHTML == 0) {
      reactContainer.remove();
    }
  }
  storeMessagesInFirebase(getAllMessages());
}

function createReplyIcon() {
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
    document.getElementById("message-input").focus();
  };

  return replyIcon;
}

function createEditIcon() {
  let editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen";

  editIcon.onclick = function () {
    let message = this.parentElement.parentElement;
    let messageText = message.querySelector(".message-text bdi");
    let editInput = document.createElement("textarea");
    editInput.classList = "message-edit-input";
    editInput.value = messageText.innerHTML;
    messageText.remove();
    message.querySelector(".message-text").appendChild(editInput);
    editInput.focus();
    editInput.onblur = function () {
      messageText.innerHTML = editInput.value;
      message.querySelector(".message-text").appendChild(messageText);
      storeMessagesInFirebase(getAllMessages());
      editInput.remove();
    };
    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        editInput.blur();
      }
    });
  };

  return editIcon;
}

function createDeleteIcon() {
  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";
  deleteIcon.style = "color: rgb(255, 50, 50)";
  deleteIcon.onclick = function () {
    let message = this.parentElement.parentElement;
    document
      .getElementById("confirm-container")
      .classList.add("confirm-active");
    let clonedMessage = this.parentElement.parentElement.cloneNode(true);
    if (clonedMessage.querySelector(".message-reply"))
      clonedMessage.querySelector(".message-reply").remove();
    clonedMessage.classList = "confirm-message";
    document
      .getElementById("confirm-message-container")
      .appendChild(clonedMessage);
    document.getElementById("delete-button").onclick = function () {
      message.remove();
      storeMessagesInFirebase(getAllMessages());
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

  return deleteIcon;
}
