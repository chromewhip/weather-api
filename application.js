jQuery(document).ready(function($) {

  // $.ajax({
  //   url : "http://api.wunderground.com/api/b871068c9689844c/forecast/q/Canada/Vancouver Hillcr.json",
  //   dataType : "jsonp",
  //   success : function(parsed_json) {
  //     socks = parsed_json.forecast;
  //   }
  // });

  var getWeather = function(city){
    $.ajax({
      url : "http://api.wunderground.com/api/b871068c9689844c/forecast/q/Canada/"+city+".json",
      dataType : "jsonp",
      success : function(parsed_city) {
        if (parsed_city.hasOwnProperty("forecast")){
          $('<li>').append("<a href='#' data-city='" + city + "'>" +city+ "</a>").appendTo('.list-of-cities');
        }
      }
    });
  }


$('form').on("submit", function(e){
  e.preventDefault();
  city = $('input[name="city"]').val();

  $.ajax({
    url : "http://autocomplete.wunderground.com/aq?query="+city+"&c=CA",
    dataType : "jsonp",
    jsonp:    "cb",
    success : function(parsed_json) {
      $('.list-of-cities').text("");
      for (var i = 0; i < parsed_json.RESULTS.length; i++) {
        docks = parsed_json.RESULTS[i].name.split(',')[0];
        getWeather(docks)
      }
    }
  });
});

  $('.list-of-cities').on("click", "a", function(e){
     $.ajax({
      url : "http://api.wunderground.com/api/b871068c9689844c/forecast/q/Canada/"+$(this).data("city")+".json",
      dataType : "jsonp",
      success : function(parsed_json) {
        bugs = parsed_json;
        console.log(parsed_json);
      }
    });
  });




});