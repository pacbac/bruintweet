  var session= "http://api.ucladevx.com/courses/";

$(document).ready(function(){
  $.getJSON("http://api.ucladevx.com/courses/winter/computer science/", function(json){
    alert(JSON.stringify(json));

  })

  $.ajax({
    url: "https://apis.paralleldots.com/v2/keywords?text=%22Prime%20Minister%20Narendra%20Modi%20tweeted%20a%20link%20to%20the%20speech%20Human%20Resource%20Development%20Minister%20Smriti%20Irani%20made%20in%20the%20Lok%20Sabha%20during%20the%20debate%20on%20the%20ongoing%20JNU%20row%20and%20the%20suicide%20of%20Dalit%20scholar%20Rohith%20Vemula%20at%20the%20Hyderabad%20Central%20University.&api_key=og78FIM6RTpSOv3kiRdHzWFstb7OdcVdEvao5jImHhQ",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password"));
    },
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: '{"foo":"bar"}',
    success: function (data) {
      alert(JSON.stringify(data));
    },
    error: function(){
      alert("Cannot get data");
    }
  });

  $.getJSON("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=c9mang0", function(data){
    alert(JSON.stringify(data))
  })

  $.ajax({
      url: "get-tweets.js",
      dataType: "script",
      cache: true,
      success: function() {
          alert("t")
          $.getJSON("home.json", function(json){
            alert(JSON.stringify(json))
          })
      }
  });

})

function sub() {
  var username = document.getElementById("handle");
  if (username.value == "") {
    alert("Please enter a Twitter handle.");
    return;
  }
  //else enter it into Twitter API

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
    return;
  }
  $(".result").show();
}
