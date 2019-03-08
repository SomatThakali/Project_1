// var apiKey = "&APPID=1ecca3d6aa68eb3f48c0901d21f45a04";
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?id=5128581&units=imperial&APPID=1ecca3d6aa68eb3f48c0901d21f45a04";
console.log(weatherUrl);
axios.get(weatherUrl).then(function(response){
        //DATE
        var dateRaw = new Date(response.data.list[0].dt*1000);
        var date1 = dateRaw.toDateString().slice(0,10);

        var dateRaw = new Date(response.data.list[7].dt*1000);
        var date2 = dateRaw.toDateString().slice(0,10);

        var dateRaw = new Date(response.data.list[14].dt*1000);
        var date3 = dateRaw.toDateString().slice(0,10);

        var dateRaw = new Date(response.data.list[21].dt*1000);
        var date4 = dateRaw.toDateString().slice(0,10);

        var dateRaw = new Date(response.data.list[28].dt*1000);
        var date5 = dateRaw.toDateString().slice(0,10);
        //TEMPERATURE
        var temp1 = (response.data.list[0].main.temp).toString();
        var temp2 = (response.data.list[7].main.temp).toString();
        var temp3 = (response.data.list[14].main.temp).toString();
        var temp4 = (response.data.list[21].main.temp).toString();
        var temp5 = (response.data.list[28].main.temp).toString();
        //FORECAST
        var forecast1 = response.data.list[0].weather[0].main;
        var forecast2 = response.data.list[7].weather[0].main;
        var forecast3 = response.data.list[14].weather[0].main;
        var forecast4 = response.data.list[21].weather[0].main;
        var forecast5 = response.data.list[28].weather[0].main;

        $("#date1").html(date1);
        $("#date2").html(date2);
        $("#date3").html(date3);
        $("#date4").html(date4);
        $("#date5").html(date5);

        $("#temp1").html(temp1 + "° F");
        $("#temp2").html(temp2 + "° F");
        $("#temp3").html(temp3 + "° F");
        $("#temp4").html(temp4 + "° F");
        $("#temp5").html(temp5 + "° F");

        $("#forecast1").html(forecast1);
        $("#forecast2").html(forecast2);
        $("#forecast3").html(forecast3);
        $("#forecast4").html(forecast4);
        $("#forecast5").html(forecast5);



      })