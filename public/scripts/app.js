const ROOT_URL = "http://localhost:8080";

$(document).ready( () => {
  //////// tweets
  loadTweets();
  $(".new-tweet form").on('submit', (ev) => {
    ev.preventDefault();

    let textData = $(".new-tweet form").find("textarea").val()
    if (!textData.length) {
     alert("You forgot your words!");
     return;
   } else if (textData.length > 140) {
     alert("You seem very verbose! Please use fewer words!");
     return;
   }

  $.ajax({
    method: 'POST',
    url: `${ROOT_URL}/tweets`,
    data: {text: textData}
  })
  .done((new_post) => {
    loadTweets();
  })
  });
////////// users register
  $(".register form").on("submit", ev =>{
    ev.preventDefault();

    let usernameData = $("#username").val();
    let handleData   = $("#handle").val();
    let passwordData = $("#password").val()

    if (!usernameData.length && !handleData.length && !passwordData.length) {
      console.log(usernameData.length)
      alert("Please enter a valid username, handle and password!");
      return;
    } else {
      $("#register").click( function() {
        $(".register").slideUp();
      $.ajax({
        method: "POST",
        url:`${ROOT_URL}/users`,
        data: {username: usernameData,
          handle: handleData,
          password: passwordData}
      })
      .done((new_user) => {
      })
    })
    };
  });

  $(".compose").click(function() {
    $(".new-tweet").slideToggle(600);
    $(".new-tweet textarea").focus();
  });
  $(".reg-button").click(function(){
    $(".register").slideToggle(600);
  })
  $(".log-button").click(function(){
    $(".login").slideToggle(600);
  })
});

const loadTweets = () => {
  $.ajax({
    method: 'GET',
    url: `${ROOT_URL}/tweets`
  })
  .done(renderTweets)
  .fail(console.error);
};

function renderTweets(tweets) {
  const $tweets = $("#tweets-container");
  tweets.forEach(function(tweet) {
    $($tweets).prepend(createTweetElement(tweet))
  });
}

function createTweetElement(tweetObj) {
  var output = "";
  output += `<article class="tweets">

         <header class="tweet-head">
           <img class="avatar" src="${tweetObj.user.avatars.small}">
           <span class="username">${tweetObj.user.name}</span>
           <h5>${tweetObj.user.handle}</h5>
         </header>

         <p class="text">${escape(tweetObj.content.text)}</p>

         <footer class="tweet-foot">
           <span class="tweet-age">${timeDifference(Date.now(),tweetObj.created_at)}</span>
           <div class="icons">
             <i class="fa fa-heart"></i>
             <i class="fa fa-retweet"></i>
             <i class="fa fa-flag"></i>
          </div>
         </footer>

        </article>`;
  return output;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function timeDifference(current, previous) {
 let msPerMinute = 60 * 1000;
 let msPerHour = msPerMinute * 60;
 let msPerDay = msPerHour * 24;
 let msPerMonth = msPerDay * 30;
 let msPerYear = msPerDay * 365;
 let elapsed = current - previous;
 if (elapsed < msPerMinute) {
     return Math.round(elapsed/1000) + ' seconds ago';
 }
 else if (elapsed < msPerHour) {
     return Math.round(elapsed/msPerMinute) + ' minutes ago';
 }
 else if (elapsed < msPerDay ) {
     return Math.round(elapsed/msPerHour ) + ' hours ago';
 }
 else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
 }
 else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
 }
 else {
    return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
 }
}











