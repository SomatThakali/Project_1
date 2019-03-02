var config = {
  apiKey: "AIzaSyAKTJreq0OZgWl8ktgzhd2FvPyYyCYhN1M",
  authDomain: "blue-lama-retreat-7a0c6.firebaseapp.com",
  databaseURL: "https://blue-lama-retreat-7a0c6.firebaseio.com",
  projectId: "blue-lama-retreat-7a0c6",
  storageBucket: "blue-lama-retreat-7a0c6.appspot.com",
  messagingSenderId: "106620423709"
};
firebase.initializeApp(config);

var database = firebase.database();

//guest info
var firstName = "";
var lastName = "";
var email = "";
var phoneNumber = "";
//dates
var bookingDate = "";
var tripDate = "";
//location & room
var locationBooked = "";
var roomBooked = "";
//price
var bookingPrice = 0;
var currentUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
    console.log(currentUser);
    console.log(user.uid);
  } else {
    console.log("not logged in");
  }
});
$("#logOut").on("click", function() {
  console.log("I am log out");
  window.location = "../templates/index.html";
  firebase.auth().signOut();
  $(".container").hide();
});
//on submit button click
$("#submitButton").on("click", function(event) {
  event.preventDefault();
  //guest info
  firstName = $("#firstNameInput")
    .val()
    .trim();
  lastName = $("#lastNameInput")
    .val()
    .trim();
  email = $("#emailInput")
    .val()
    .trim();
  phoneNumber = $("#phoneNumberInput")
    .val()
    .trim();
  //dates
  bookingDate = $("#bookingDate")
    .val()
    .trim();
  tripDate = $("#tripDate")
    .val()
    .trim();
  //location & room
  locationBooked = $("#locationBooked")
    .val()
    .trim();
  roomBooked = $("#roomBooked")
    .val()
    .trim();
  //price
  bookingPrice = $("#bookingPrice")
    .val()
    .trim();

  //push to firebase
  database.ref().push({
    //guest info
    First_name: firstName,
    Last_name: lastName,
    Email: email,
    Phone_number: phoneNumber,
    //dates
    Date_purchased: bookingDate,
    Trip_date: tripDate,
    //location & room
    Location: locationBooked,
    Room: roomBooked,
    //price
    Total_price: bookingPrice,
    userId: currentUser.uid
  });

  window.location = "../templates/confirmation.html";
});

database
  .ref()
  .orderByChild("userId")
  .limitToLast(1)
  .on(
    "child_added",
    function(snapshot) {
      // renderRow(snapshot);
      console.log("in here");
      $("#firstNameDisplay").text(snapshot.val().First_name);
      $("#lastNameDisplay").text(snapshot.val().Last_name);
      $("#emailDisplay").text(snapshot.val().Email);
      $("#tripDateDisplay").text(snapshot.val().Trip_date);
      $("#phoneNumberDisplay").text(snapshot.val().Phone_number);
      //dates
      $("#bookingDateDisplay").text(snapshot.val().Date_purchased);

      //location & room
      $("#locationBookedDisplay").text(snapshot.val().Location);
      $("#roomBookedDisplay").text(snapshot.val().roomBooked);
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
