  var session= "http://api.ucladevx.com/courses/";
var tweetJson;
$(document).ready(function(){
  $.getJSON("http://api.ucladevx.com/courses/winter/computer science/", function(json){
    alert(JSON.stringify(json));

  })

  $(".submit").click(function(){
    sub()
  })

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
    twitterData()
  }
  else if (document.getElementById("springbtn").checked == true) {
    $.getJSON(session + "Spring/all", function(spr){
      console.log(JSON.stringify(spr[0]['sections']));
    })
    twitterData()
  }
  else {
    alert("Please select a quarter.");
    return;
  }
  $(".result").show();
}

function twitterData(){
  $.ajax({
      url: "http://localhost:8081/",
      dataType: "script",
      cache: true,
      success: function() {
          $.getJSON("home.json", function(json){
            alert("a")
            //alert(JSON.stringify(json))
            tweetJson = JSON.stringify(json)
            getTags(json[0]["text"])
            console.log(tweetJson);
          })
      },
      error: function(){
        alert("Doesn't work")
      }
  });
}

function getTags(input){
  $.ajax({
    url: "https://apis.paralleldots.com/v2/keywords?text="+input+"&api_key=og78FIM6RTpSOv3kiRdHzWFstb7OdcVdEvao5jImHhQ",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa("username:password"));
    },
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: '{"foo":"bar"}',
    success: function (data) {
      var keywordJSON = data["keywords"]
      for (var i = 0; i < keywordJSON.length; i++){
        $(".c1").append(keywordJSON[i][["keyword"]]+" ")
      }
    },
    error: function(){
      alert("Cannot get data");
    }
  });
}


$("#linkJSON").click(function(){
  $("#tweetscontent").text(tweetJson);
});
