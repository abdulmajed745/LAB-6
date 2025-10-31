    let likeCount = 0;
    let dislikeCount = 0;
    let comments = [];
    let userChoice = null;

    function setCookie(name, value, days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = name + "=" + JSON.stringify(value) + "; expires=" + date.toUTCString() + "; path=/";
    }

    function getCookie(name) {
      let cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return JSON.parse(value);
      }
      return null;
    }

    window.onload = function() {
      likeCount = getCookie("likes") || 0;
      dislikeCount = getCookie("dislikes") || 0;
      comments = getCookie("comments") || [];
      userChoice = getCookie("userChoice");

      document.getElementById("likeCount").textContent = likeCount;
      document.getElementById("dislikeCount").textContent = dislikeCount;

      displayComments();
    };

    document.getElementById("likeBtn").onclick = function() {
      if (userChoice === "like" || userChoice === "dislike") {
        alert("You already voted!");
        return;
      }

      likeCount++;
      userChoice = "like";
      setCookie("likes", likeCount, 7);
      setCookie("userChoice", userChoice, 7);
      document.getElementById("likeCount").textContent = likeCount;
    };

    document.getElementById("dislikeBtn").onclick = function() {
      if (userChoice === "like" || userChoice === "dislike") {
        alert("You already voted!");
        return;
      }

      dislikeCount++;
      userChoice = "dislike";
      setCookie("dislikes", dislikeCount, 7);
      setCookie("userChoice", userChoice, 7);
      document.getElementById("dislikeCount").textContent = dislikeCount;
    };

    document.getElementById("submitBtn").onclick = function() {
     let commentText = document.getElementById("commentBox").value.trim();
     if (commentText === "") {
      alert("Please enter a comment before submitting.");
       return;
     }

     if (comments.includes(commentText)) {
       alert("You already added this comment!");
       return;
     }

     comments.push(commentText);
     setCookie("comments", JSON.stringify(comments), 7); 
     displayComments();
     document.getElementById("commentBox").value = "";
};


    document.getElementById("clearBtn").onclick = function() {
     if (confirm("Are you sure you want to clear all likes, dislikes, and comments?")) {
     likeCount = 0;
     dislikeCount = 0;
     comments = [];
     userChoice = null;
     setCookie("likes", likeCount, 7);
     setCookie("dislikes", dislikeCount, 7);
     setCookie("comments", comments, 7);
     setCookie("userChoice", userChoice, 7);
     document.getElementById("likeCount").textContent = likeCount;
     document.getElementById("dislikeCount").textContent = dislikeCount;
     displayComments();

     alert("All data has been reset successfully.");
     }
    };

    function displayComments() {
      let commentList = document.getElementById("commentList");
      commentList.innerHTML = "";
      comments.forEach(c => {
        let p = document.createElement("p");
        p.textContent = c;
        commentList.appendChild(p);
      });
    }