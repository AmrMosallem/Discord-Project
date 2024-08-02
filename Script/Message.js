let chat = document.getElementById("chat");
chat.innerHTML += `<span id="last-message"></span>`;
console.log(document.getElementById("user-name").innerHTML);
document.getElementById("last-message").scrollIntoView();
document
  .getElementById("message-input")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (document.getElementById("last-message"))
        document.getElementById("last-message").id = "";
      let message = document.getElementById("message-input").value;
      let now = new Date(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        year = now.getFullYear(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        apm = hour > 12 ? "PM" : "AM";
      hour %= 12;
      hour = hour ? hour : 12;
    let userImg=document.getElementById("user-img").src,
    userName=document.getElementById("user-name").innerHTML;

      chat.innerHTML += ` 
      <div class="message" id="last-message">
            <div class="message-icons">
              <i class="fa-solid fa-face-smile"></i>
              <i class="fa-solid fa-reply"></i>
              <i class="fa-solid fa-share"></i>
              <i class="fa-solid fa-ellipsis"></i>
          </div>

            <div class="message-img"><img src="${userImg}"></div>
            <div class="message-content">
              <div class="message-header">
                <span class="message-name">${userName}</span>
                <span class="message-date">${month}/${day}/${year} ${hour}:${minute} ${apm}</span>
              </div>
              <div class="message-text" >
                <p>${message}</p>
              </div>
              <div class="message-media"></div>
              <div class="message-reactions">
             
              </div>
            </div>
          </div>`;
      document.getElementById("message-input").value = "";
      document.getElementById("last-message").scrollIntoView();
    }
  });
