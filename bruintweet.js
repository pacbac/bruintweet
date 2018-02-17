$(document).ready(function(){
  $.getJSON("http://api.ucladevx.com/courses/winter/computer science", function(json){
      alert(JSON.stringify(json[0]['sections']));
  })
})
