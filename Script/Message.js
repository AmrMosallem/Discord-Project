let chat = document.getElementById("chat");
const firebaseConfig = {
  apiKey: "AIzaSyDi5ZhyC7rltDlSf9LgfWlDh3Cb3_eE4fA",
  authDomain: "discord-e7e5b.firebaseapp.com",
  databaseURL:
    "https://discord-e7e5b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "discord-e7e5b",
  storageBucket: "discord-e7e5b.appspot.com",
  messagingSenderId: "82964440731",
  appId: "1:82964440731:web:808091c777f6532b8ec83e",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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

function getCurrentDate() {
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
  return `${month}/${day}/${year} ${hour}:${minute} ${apm}`;
}
let messageInput = document.getElementById("message-input");
document.getElementById("send").onclick = function () {
  if (!messageInput.value == "") sendMessage();
};

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && !messageInput.value == "") {
    sendMessage();
  }
});

function sendMessage() {
  let replyimg, replyname, replytext;
  if (MessageReply) {
    replyimg = MessageReply.querySelector(".message-img img").src;
    replyname = MessageReply.querySelector(".message-name").innerHTML;
    replytext = MessageReply.querySelector(".message-text bdi").innerHTML;
    document.getElementById("cancel-reply").click();
  }
  // imgsrc = document.getElementById("user-img").src;
  // imgsrc = imgsrc.slice(imgsrc.indexOf("Images"), imgsrc.length);
  // console.log(imgsrc);
  let messageObject = {
    replyImg: replyimg,
    replyName: replyname,
    replyText: replytext,
    img: document.getElementById("user-img").src,
    name: document.getElementById("user-name").innerHTML,
    date: getCurrentDate(),
    text: document.getElementById("message-input").value,
  };

  chat.appendChild(createMessage(messageObject));
  document.getElementById("last-message").scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
  // saveToLocalStorage();
  storeMessagesInFirebase(getAllMessages());
  setTimeout(function () {
    document.getElementById("message-input").value = "";
    document.getElementById("last-message").scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, 0);
}

function createMessage(messageObject) {
  if (document.getElementById("last-message"))
    document.getElementById("last-message").removeAttribute("id");

  let reply = createReply(messageObject);

  let messageIcons = document.createElement("div");
  messageIcons.className = "message-icons";

  let reactIcon = createReactIcon();

  let replyIcon = createReplyIcon();
  let editIcon = createEditIcon();

  let deleteIcon = createDeleteIcon();

  messageIcons.appendChild(reactIcon);
  messageIcons.appendChild(replyIcon);

  if (document.getElementById("user-name").innerHTML == messageObject.name)
    messageIcons.appendChild(editIcon);
  if (
    document.getElementById("user-name").innerHTML == messageObject.name ||
    document.getElementById("user-name").innerHTML == "amr"
  ) {
    messageIcons.appendChild(deleteIcon);
  }
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
  let messageTextP = document.createElement("bdi");
  messageTextP.innerHTML = messageObject.text;
  messageText.appendChild(messageTextP);

  let messageMedia = document.createElement("div");
  messageMedia.className = "message-media";
  let messageReactions = document.createElement("div");
  messageReactions.className = "message-reactions";
  if (messageObject.reactions)
    messageObject.reactions.forEach((react) => {
      let reactContainer = document.createElement("div");
      reactContainer.className = "message-react-container " + react.emoji;
      let emoji = document.createElement("span");
      emoji.className = "emoji";
      emoji.innerHTML = react.emoji;
      let reactCount = document.createElement("span");
      reactCount.className = "message-react-count";
      reactCount.innerHTML = react.count;
      let reactors = document.createElement("span");
      reactors.className = "message-reactors";
      reactors.innerHTML = react.reactors;
      reactContainer.appendChild(emoji);
      reactContainer.appendChild(reactCount);
      reactContainer.appendChild(reactors);
      reactContainer.addEventListener("click", function () {
        toggleReact(reactContainer);
      });
      if(react.reactors.includes(document.getElementById("user-name").innerHTML)) {
        reactContainer.style.borderColor = "#4752c4";
      }
      messageReactions.appendChild(reactContainer);
    });

  messageContent.appendChild(messageHeader);
  messageContent.appendChild(messageText);
  messageContent.appendChild(messageMedia);
  messageContent.appendChild(messageReactions);

  let message = document.createElement("div");
  message.className = "message";
  message.setAttribute("id", "last-message");

  if (messageObject.replyName) {
    message.appendChild(reply);
    if (messageObject.replyName == localStorage.getItem("signedUserName")) {
      message.style.backgroundColor = "rgba(255, 200, 0, 0.1)";
    }
  }
  message.appendChild(messageIcons);
  message.appendChild(messageImgContainer);
  message.appendChild(messageContent);
  return message;
}

function getAllMessages() {
  let messagesArray = [];
  document.querySelectorAll(".message").forEach((message) => {
    let replyimg,
      replyname,
      replytext,
      reactions = [];
    if (message.querySelector(".message-reply")) {
      replyimg = getRawSource(message.querySelector(".message-reply img").src);
      replyname = message.querySelector(".message-reply-name").innerHTML;
      replytext = message.querySelector(".message-reply-text").innerHTML;
    }

    if (message.querySelector(".message-react-container")) {
      let messageReactions = message.querySelector(".message-reactions");
      messageReactions
        .querySelectorAll(".message-react-container")
        .forEach((react) => {
          reactions.push({
            emoji: react.querySelector(".emoji").innerHTML,
            count: react.querySelector(".message-react-count").innerHTML,
            reactors: react.querySelector(".message-reactors").innerHTML,
          });
        });
    }

    let messageObject = {
      img: getRawSource(message.querySelector(".message-img img").src),
      name: message.querySelector(".message-header .message-name").innerHTML,
      date: message.querySelector(".message-header .message-date").innerHTML,
      text: message.querySelector(".message-text bdi").innerHTML,
    };
    if (message.querySelector(".message-reply")) {
      messageObject.replyName = replyname;
      messageObject.replyText = replytext;
      messageObject.replyImg = replyimg;
    }

    if (reactions.length > 0) {
      messageObject.reactions = reactions;
    }
    messagesArray.push(messageObject);
  });

  return messagesArray;
}

function storeMessagesInFirebase(messagesArray) {
  let channelName = localStorage.getItem("active-channel");
  const messagesRef = database.ref("channels/" + channelName);
  messagesRef
    .set(messagesArray)
    .then(() => {
      // console.log('Messages stored successfully in Firebase.');
    })
    .catch((error) => {
      console.error("Error storing messages in Firebase:", error);
    });
}

function retrieveMessagesFromFirebase(channelName) {
  // Reference to the "frontend-discussions" key in Firebase Realtime Database

  const messagesRef = database.ref(
    "channels/" + localStorage.getItem("active-channel")
  );
  return messagesRef.on("value", (snapshot) => {
    const messages = snapshot.val();
    if (channelName != localStorage.getItem("active-channel")) {
      // console.log("Returned");
      return;
    }
    let messagesLength = getAllMessages().length;
    let chat = document.getElementById("chat");
    document.querySelectorAll(".message").forEach((message) => {
      message.remove();
    });
    if (messages) {
      document.getElementById("loading-messages").style.display = "none";
      messages.forEach((messageObject) => {
        chat.appendChild(createMessage(messageObject));
      });
    }
    else {
      document.getElementById("loading-messages").innerHTML = "Channel is Empty";}
    if (messagesLength!= getAllMessages().length && document.getElementById("last-message"))
    {  document.getElementById("last-message").scrollIntoView({ block: "end" });
  }
    // return messages ? messages : [];
  });
}


function getRawSource(source) {
  source = source.slice(source.indexOf("Images"), source.length);
  return source;
}

// function saveToLocalStorage() {
//   let messagesArray = [];
//   document.querySelectorAll(".message").forEach((message) => {
//     let replyimg, replyname, replytext;
//     if (message.querySelector(".message-reply")) {
//       replyimg = message.querySelector(".message-reply img").src;
//       replyname = message.querySelector(".message-reply-name").innerHTML;
//       replytext = message.querySelector(".message-reply-text").innerHTML;
//     }
//     let messageObject = {
//       replyImg: replyimg,
//       replyName: replyname,
//       replyText: replytext,
//       img: message.querySelector(".message-img img").src,
//       name: message.querySelector(".message-header .message-name").innerHTML,
//       date: message.querySelector(".message-header .message-date").innerHTML,
//       text: message.querySelector(".message-text bdi").innerHTML,
//     };
//     messagesArray.push(messageObject);
//   });

//   localStorage.setItem(
//     document.querySelector(".channels-active").id,
//     JSON.stringify(messagesArray)
//   );
// }
// function getMessagesFromFirebase(callback) {
//   let channelName = localStorage.getItem("active-channel");
//   const messagesRef = database.ref("channels/" + channelName);
//   messagesRef.on("value", (snapshot) => {
//     const data = snapshot.val();
//     callback(data);
//   });
// }

// function retrieveMessagesFromFirebase(channelName) {
//   // Reference to the "frontend-discussions" key in Firebase Realtime Database
//   const messagesRef = database.ref("channels/" + channelName);
//   return messagesRef
//     .once("value")
//     .then((snapshot) => {
//       const messages = snapshot.val();
//       return messages ? messages : [];
//     })
//     .catch((error) => {
//       console.error("Error retrieving messages from Firebase:", error);
//       return [];
//     });
// }
// function listenForMessages() {
//   let channelName = localStorage.getItem("active-channel");
//   const messagesRef = database.ref("channels/" + channelName);
//   // Attach an event listener for changes in the value
//   messagesRef.on("value", (snapshot) => {
//     const data = snapshot.val();
//     console.log("Messages updated:", data);
//     document.querySelectorAll(".message").forEach((message) => {
//       message.remove();
//     });
//     retrieveMessagesFromFirebase(channelName)
//       .then((messagesArray) => {
//         // console.log("Retrieved messages:", messagesArray);
//         return messagesArray;
//       })
//       .then((messagesArray) => {
//         document.getElementById("loading-messages").style.display = "none";
//         if (messagesArray) {
//           messagesArray.forEach((messageObject) => {
//             chat.appendChild(createMessage(messageObject));
//           });
//         }
//       });
//   });
// }

// Example usage
// retrieveMessagesFromFirebase().then((messagesArray) => {
//   console.log('Retrieved messages:', messagesArray);
// });
