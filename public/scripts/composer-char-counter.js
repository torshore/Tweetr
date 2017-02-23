$(document).ready(function($){
  $("textarea").keydown(updateCountdown);
});

function updateCountdown () {
  var remaining = 140 - $(this).val().length;
  $(this).siblings(".counter").text(remaining);
  if (remaining < 0) {
    $(".counter").css("color", "red");
    alert("You seem very verbose! Please use fewer words!")
  }
};