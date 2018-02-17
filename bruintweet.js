  var session= "http://api.ucladevx.com/courses/";

$(document).ready(function(){
  $("button[type='submit']").on("click", function(){
      submit();
  })
  $.getJSON(session + "all/all", function(ucla){

  })

})

function sub() {
  var username = document.getElementById("handle");
  if (username.value == "") {
    alert("Please enter a Twitter handle.");
    return;
  }
  if (document.getElementById("winterbtn").checked == true) {
    $.getJSON(session + "Winter/all", function(win){
      console.log(JSON.stringify(win[0]['sections']));
    })
  }
  else if (document.getElementById("springbtn").checked == true) {
    $.getJSON(session + "Spring/all", function(spr){
      console.log(JSON.stringify(spr[0]['sections']));
    })
  }
  else {
    alert("Please select a quarter.");
  }
}
