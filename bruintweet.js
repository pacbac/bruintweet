$(document).ready(function(){
  $.getJSON("api.ucladevx.com/courses/<quarter>/<subject>", function(json){
    alert(json);
  })
})
