  var session= "http://api.ucladevx.com/courses/";
var tweetJson;
var courseList = []
var subjectList = []
var similarList = []

screenName = ""
$(document).ready(function(){

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
    $.getJSON(session + "winter/all", function(win){
      var courseJSON = win
      //alert(JSON.stringify(courseJSON[0]["course"]))
      for(var i = 0; i < courseJSON.length; i++){
        subjectList.push(courseJSON[i]["subject"])
        //alert(courseJSON[i]["subject"])
        courseList.push(courseJSON[i]["course"])

      }
      console.log(JSON.stringify(win[0]['sections']));
      twitterData()
    })
  }
  else if (document.getElementById("springbtn").checked == true) {
    $.getJSON(session + "spring/all", function(spr){
      var courseJSON = spr
      for(var i = 0; i < courseJSON.length; i++){
        courseList.push(courseJSON[i]["course"])
        subjectList.push(courseJSON[i]["subject"])
      }
      console.log(JSON.stringify(spr[0]['sections']));
      twitterData()
    })
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
            $(".crse").text("Loading...")
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
      var keywordArr = []
      for (var i = 0; i < keywordJSON.length; i++){
        keywordArr.push(keywordJSON[i][["keyword"]])
      }
      $(".crse").text("Loading some more...")
      compareArr(keywordArr, courseList)
      $(".crse").html("")
      //alert(similarList[0])
      for ( var i = 0; i < similarList.length; i++) {
          $(".crse").append("<p>" + similarList[i] + "</p>")
      }
      courseList = []
      subjectList = []
      similarList = []
    },
    error: function(){
      alert("Cannot get data");
    }
  });
}


$("#linkJSON").click(function(){
  $("#tweetscontent").text(tweetJson);
});

function compareArr(keywordArr, courseList){
  for(var i = 0; i < keywordArr.length; i++){
    for(var j = 0; j < courseList.length;j++){
      console.log(courseList[j])
      var isSimilar = similarity(keywordArr[i],courseList[j])
      //alert(isSimilar)
      if(isSimilar > 0.3) {
        similarList.push(courseList[j]);
      }
    }
  }
}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
