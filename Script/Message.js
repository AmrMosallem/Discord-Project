let chat = document.getElementById("chat");
if (!document.getElementById("last-message"))
  chat.innerHTML += `<span id="last-message"></span>`;

window.onload = setTimeout(function () {
  document.getElementById("last-message").scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}, 200);

document.getElementById("message-input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    chat.appendChild(addMessage());
    document.getElementById("message-input").value = "";
    document.getElementById("last-message").scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    saveToLocalStorage();
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
  messageIcons.innerHTML = `<i class="fa-solid fa-face-smile"></i>
  <i class="fa-solid fa-reply"></i>
  <i class="fa-solid fa-share"></i>
  <i class="fa-solid fa-ellipsis"></i>`;

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

  if (replyMessage) message.appendChild(reply);
  message.appendChild(messageIcons);
  message.appendChild(messageImgContainer);
  message.appendChild(messageContent);

  return message;
}

function saveToLocalStorage() {
  let messagesArray = [];
  document.querySelectorAll(".message").forEach((message) => {
    let messageObject = {
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
