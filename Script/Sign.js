let users = document.querySelectorAll(".user");
let isSignedIn = false;
function checkSignedIn() {
  if (!isSignedIn) return;

  for (let i = 0; i < users.length; i++) {
    if (
      localStorage.getItem("signedUserName") ==
      users[i].querySelector(".user-name").innerHTML
    ) {

      let signedUserName = localStorage.getItem("signedUserName");
      let signedUserImg = localStorage.getItem("signedUserImg");
      document.querySelector(".signed-in").style.display = "flex";
      document
        .querySelector(".signed-in")
        .querySelector(".user-name").innerHTML = signedUserName;
      document.querySelector(".signed-in").querySelector(".user-img").src =
        signedUserImg;
      users[i].style.display = "none";
      document.getElementById("continue").addEventListener("click", () => {
        window.location.href = "main.html";
      });
      document.getElementById("sign-out").addEventListener("click", () => {
        localStorage.removeItem("signedUserName");
        localStorage.removeItem("signedUserImg");
        window.location.href = "index.html";
      });
      break;
    }
  }
}

let userName, UserImg;
let backButton = document.getElementById("back-button");
backButton.onclick = () => {
  document.getElementById("users").style.display = "flex";
  document.getElementById("sign-in-container").style.display = "none";
  document.getElementById("title").innerHTML = "Discord";
  backButton.style.display = "none";
  checkSignedIn();
  // document.querySelector(".signed-in").style.display = "none";
  // document.querySelector(".signed-in").querySelector(".user-name").innerHTML = "";
  // document.querySelector(".signed-in").querySelector(".user-img").src = "";
};
users.forEach((user) => {
  user.addEventListener("click", () => {
    userName = user.querySelector(".user-name").innerHTML;
    UserImg = user.querySelector(".user-img").src;
    document.querySelector("#sign-in-user .user-img").src =
      getRawSource(UserImg);
    document.querySelector("#sign-in-user .user-name").innerHTML = userName;
    document.getElementById("title").innerHTML = "Sign In";
    document.getElementById("users").style.display = "none";
    document.querySelector(".signed-in").style.display = "none";
    document.getElementById("sign-in-container").style.display = "flex";
    backButton.style.display = "block";

    // if()
    // let signedUserName = user.querySelector(".user-name").innerHTML;
    // let signedUserImg = user.querySelector(".user-img").src;
    // localStorage.setItem("signedUserName", signedUserName);
    // localStorage.setItem("signedUserImg", signedUserImg);
    // console.log(
    //   `signedUserName: ${signedUserName}, signedUserImg: ${signedUserImg}`
    // );
    // window.location.href = "main.html";
  });
});
let email = document.getElementById("email");
let password = document.getElementById("password");

password.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    document.getElementById("sign-in-button").click();
  }
});

document.getElementById("sign-in-button").addEventListener("click", () => {
  // if (password.value == "1234") {
  //   localStorage.setItem("signedUserName", userName);
  //   localStorage.setItem("signedUserImg", getRawSource(UserImg));
  //   backButton.style.display = "none";
  //   window.location.href = "main.html";
  // } else {
  //   if (!document.getElementById("sign-in-form").querySelector("span")) {
  //     let wrong = document.createElement("span");
  //     wrong.innerHTML = "Wrong Password";
  //     wrong.style.color = "rgb(255,100,100)";
  //     document.getElementById("sign-in-form").appendChild(wrong);
  //   }
  // }
  signInWithEmail(email.value, password.value);
});

document.getElementById("guest").addEventListener("click", () => {
  localStorage.setItem("signedUserName", "Guest");
  localStorage.setItem("signedUserImg", "Images/guest.png");
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User signed out.");
    })
    .catch((error) => {
      console.error("Sign out error:", error);
    });
  window.location.href = "main.html";
});

function getRawSource(source) {
  source = source.slice(source.indexOf("Images"), source.length);
  return source;
}

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
const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    console.log("User is signed in:", user);
    isSignedIn = true;
    checkSignedIn();
  } else {
    // No user is signed in.
    console.log("No user is signed in.");
    isSignedIn = false;
    // Redirect to login page
  }
});

function signInWithEmail(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      emailInfo = email;
      passwordInfo = password;
      localStorage.setItem("signedUserName", userName);
      localStorage.setItem("signedUserImg", getRawSource(UserImg));
      backButton.style.display = "none";
      emailInfo = email;
      passwordInfo = password;
      window.location.href = "main.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
      if (!document.getElementById("sign-in-form").querySelector("span")) {
        let wrong = document.createElement("span");
        wrong.innerHTML = "Wrong Email or Password";
        wrong.style.color = "rgb(255,50,25)";
        document.getElementById("sign-in-form").appendChild(wrong);
      }
    });
}

// window.onload = function() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in.
//       console.log('User is signed in:', user);
//       document.getElementById('welcome-message').innerText = `Welcome, ${user.email}`;
//     } else {
//       // No user is signed in.
//       console.log('No user is signed in.');
//       // Redirect to login page
//       window.location.href = '/login.html';
//     }
//   });
// };
