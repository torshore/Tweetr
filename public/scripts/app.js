const ROOT_URL = "http://localhost:8080";

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready( () => {
  loadTweets();
  $(".new-tweet form").on('submit', (ev) => {
    ev.preventDefault();
    if (!$(".new-tweet textarea").val()) {
     alert("You forgot your words");
     return;
   }
  // read the data from the form inputs
  const data_obj = {};
  $(".new-tweet form").serializeArray().forEach((elm) => {
    data_obj[elm.name] = elm.value;
  });
  // // submit the info
  $.ajax({
    method: 'POST',
    url: `${ROOT_URL}/tweets`,
    data: data_obj
  })
  .done((new_post) => {
    $(".new-tweet form").find("input[type=text], textarea").val('');
    loadTweets();
  })
  })
  $(".compose").click(function() {
    $(".new-tweet").slideDown().css("display", "block");
    $(".new-tweet textarea").focus();
  });
  });

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

         <footer>${tweetObj.created_at}
           <div id="icons">
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

const loadTweets = () => {
  $.ajax({
    method: 'GET',
    url: `${ROOT_URL}/tweets`
  })
  .done(renderTweets)
  .fail(console.error);
};







