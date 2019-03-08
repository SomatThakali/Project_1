//location selection button

//firebase config
// var config = {
//   apiKey: "AIzaSyAKTJreq0OZgWl8ktgzhd2FvPyYyCYhN1M",
//   authDomain: "blue-lama-retreat-7a0c6.firebaseapp.com",
//   databaseURL: "https://blue-lama-retreat-7a0c6.firebaseio.com",
//   projectId: "blue-lama-retreat-7a0c6",
//   storageBucket: "",
//   messagingSenderId: "106620423709"
// };
// firebase.initializeApp(config);
//assign firebase to database var
var database = firebase.database();

//on button click
$("#btnGetValue").click(function() {
  //assign the id of the selected radio btn to a variable
  var selectedLocation = $("input[name=radioBtn]:checked").attr("id");
  //display selectedLocation in locationDisplay
  $("#locationDisplay").html("<br/>Selected location: " + selectedLocation);

  //push to firebase
  database.ref().push({
    //push radio btn location to Location
    Location: selectedLocation
  });

  //update html on value change in firebase
  database.ref().on(
    "value",
    function(snapshot) {
      //populate locationDisplay id
      $("#locationDisplay").text(snapshot.val().selectedLocation);
      console.log(firebase.auth().currentUser);

      //errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});
