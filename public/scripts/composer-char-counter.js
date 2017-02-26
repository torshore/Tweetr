$(document).ready(function($){
  $("textarea").keyup(updateCountdown);
});

function updateCountdown () {
  var remaining = 140 - $(this).val().length;
  $(this).siblings(".counter").text(remaining);
  if (remaining < 0) {
    $(".counter").css("color", "red");
  }
};