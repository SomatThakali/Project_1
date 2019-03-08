// var apiKey = "&APPID=1ecca3d6aa68eb3f48c0901d21f45a04";
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?id=5128581&units=imperial&APPID=1ecca3d6aa68eb3f48c0901d21f45a04";
console.log(weatherUrl);
axios.get(weatherUrl).then(function (response) {
  //DATE
  var dateRaw = new Date(response.data.list[0].dt * 1000);
  var date = dateRaw.toDateString().slice(0, 10);
  console.log("date:");
  console.log(date);
  //TEMPERATURE
  console.log("temp:");
  console.log(response.data.list[0].main.temp);
  var temps = (response.data.list[0].main.temp).toString();
  //FORECAST
  console.log("forecast:")
  console.log(response.data.list[0].weather[0].main);

  $("#date1").html(date);
  $("#tempDisplay").html(temps);

  var forecast1 = response.data.list[0].weather[0].main;
  var forecast2 = response.data.list[7].weather[0].main;
  var forecast3 = response.data.list[14].weather[0].main;
  var forecast4 = response.data.list[21].weather[0].main;
  var forecast5 = response.data.list[28].weather[0].main;


  console.log("DEBUG  " + response.data.list[28].weather[0].main.toString());

  function weatherIcons() {
    var forecastArray = [forecast1, forecast2, forecast3, forecast4, forecast5];
    for (var i = 0; i < forecastArray.length; i++) {
      if (forecastArray[i] === "Clouds") {
        console.log(forecastArray[i].indexOf())
        $("img").attr("src", "../assets/images/Cloud.svg")
      }
      if (forecastArray[i] === "Sun" || forecastArray[i] === "Clear") {
        $("img").attr("src", "../assets/images/Sun.svg")
      }
      if (forecastArray[i] === "Rain") {
        $("img").attr("src", "../assets/images/Rain.svg");
      }
    };
  };

  weatherIcons();

})