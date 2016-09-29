var limit = 15;
var isActive = false;
$(function (){
  $(document).on("scroll",function (){
    if(($("body").scrollTop() + $(window).height() - $(document).height()) > -100){
      if(!isActive){
        isActive = true;
        getJSON();
      }
    }
  })
});
function getJSON(){
  var url = "http://www.stellarbiotechnologies.com/media/press-releases/json?limit="+ limit +"&offset="+ $("#newsList li").length;
  jQuery.ajax({
    type: "GET",
    url: url,
    success: function (result){
      isActive = !(result.news && result.news.length > 0);
      displayResult(result.news);
    }
  });
}
var monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function formatDate(dateString){
  var dateObj = new Date(dateString);
  var ampm = "am";
  var hours = dateObj.getHours();
  var mins = dateObj.getMinutes();
  if(hours > 12){
    hours = hours-12;
    ampm = "pm";
  }
  if(mins < 10){
    mins = "0"+ mins;
  }
  return monthList[dateObj.getMonth()] +" "+ dateObj.getDate() +", "+ dateObj.getFullYear() +" - "+ hours +":"+ mins + ampm;
}
function displayResult(data){
  var listHtml = "";
  for(var x in data){
    listHtml += '<li class="well well-sm" ><a href="#">'+ data[x].title +'<br><i>'+ formatDate(data[x].published) +'</i></a></li>'
  }
  $("#newsList").append(listHtml).listview("refresh");
}
