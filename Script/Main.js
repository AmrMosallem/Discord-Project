// if (!localStorage.getItem("signedUserName")) {
//   window.location.href = "index.html";
// }
const auth = firebase.auth();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    console.log("User is signed in:", user);
  } else {
    // No user is signed in.
    console.log("No user is signed in.");
    // Redirect to login page
  }
});

let channels = document.querySelectorAll(".channels");
let activeChannel = "community-announcements";

if (localStorage.getItem("active-channel")) {
  activeChannel = localStorage.getItem("active-channel");
}
else {
  localStorage.setItem("active-channel", activeChannel);
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
  document.getElementById("loading-messages").style.display = "block";
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
  document.getElementById(
    "message-input"
  ).placeholder = `Message #${channelName}`;
  checkGuest();
  retrieveMessagesFromFirebase(channelName);
  /*  document.querySelectorAll(".message").forEach((message) => {
    message.remove();
  });
  let chat = document.getElementById("chat");

  let messagesArray = retrieveMessagesFromFirebase(channelName)
    .then((messagesArray) => {
      // console.log("Retrieved messages:", messagesArray);
      return messagesArray;
    })
    .then((messagesArray) => {
      document.getElementById("loading-messages").style.display = "none";
      if (messagesArray) {
        messagesArray.forEach((messageObject) => {
          chat.appendChild(createMessage(messageObject));
        });
      }
    });
  listenForMessages();*/
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
      regex.test(message.querySelector(".message-text bdi").innerHTML) ||
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

function hidePlusMenu(event) {
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

document.getElementById("log-out").onclick = () => {
  localStorage.removeItem("signedUserName");
  localStorage.removeItem("signedUserImg");
  firebase.auth().signOut().then(() => {
    console.log('User signed out.');
    window.location.href = 'index.html'; // Redirect to login page after sign-out
  }).catch((error) => {
    console.error('Sign out error:', error);
  });

};

function checkGuest() {
  if (localStorage.getItem("signedUserName") == "Guest") {
    if (document.getElementById("frontend-role"))
      document.querySelector(".role-text").remove();
    document.getElementById("message-input").placeholder =
      "You cannot send messages as Guest.";
    document.getElementById("message-input").disabled = true;
    document.getElementById("message-input").style.cursor = "not-allowed";
  }
}
