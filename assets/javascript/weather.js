var apiKey = "&APPID=1ecca3d6aa68eb3f48c0901d21f45a04";
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?id=5128581&units=imperial&APPID=1ecca3d6aa68eb3f48c0901d21f45a04";
console.log(weatherUrl);
axios.get(weatherUrl).then(function(response){
        //DATE
        console.log(response);
        var dateRaw = new Date(response.data.list[0].dt*1000);
        var date1 = dateRaw.toDateString().slice(0,10);
        console.log("date:");
        console.log(date1);
        //TEMPERATURE
        console.log("temp:");
        console.log(response.data.list[0].main.temp);
        var temp1 = (response.data.list[0].main.temp).toString();
        //FORECAST
        console.log("forecast:")
        console.log(response.data.list[0].weather[0].main);
        var forecast1 = response.data.list[0].weather[0].main;

        $("#date1").html(date1);
        $("#temp1").html(temp1 + "° F");
        $("#forecast1").html(forecast1);
      })