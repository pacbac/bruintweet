  var session= "http://api.ucladevx.com/courses/";

$(document).ready(function(){

  $.getJSON("http://api.ucladevx.com/courses/all/all", function(ucla){

  })

})

function btnWin() {
$.getJSON(session + "Winter/all", function(win){
    
    alert(JSON.stringify(win[0]['sections']));
})}
function btnSpr() {
  $.getJSON(session + "Spring/all", function(spr){
    alert(JSON.stringify(spr[0]['sections']));
})}
