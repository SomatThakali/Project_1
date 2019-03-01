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
    // TODO
    // make a other functions that wil take
    // Display confirmation
    // Display name
    // include Josh code
    // window.location = "../templates/booking.html"; // Redirecting to other page
    // testing. this should direct to the new page
    // var email_id = user.email;
    // $("#paragraph1").text("Welcome " + email_id);
    // $("#paragraph2").text("Your booking date is 2019-03-01");
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
  database.ref("/bookings").push({
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

// if (window.location.href.indexOf("confirmation") > -1) {
firebase
  .database()
  .ref()
  .child("bookings")
  .orderByChild("Email")
  .equalTo("somatthakali89@gmail.com")
  .once("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot) {
      console.log("in here");
      $("#firstNameDisplay").text(childSnapshot.val().First_name);
      $("#lastNameDisplay").text(childSnapshot.val().Last_name);
      $("#emailDisplay").text(childSnapshot.val().Email);
      $("#tripDateDisplay").text(childSnapshot.val().Trip_date);
      $("#phoneNumberDisplay").text(childSnapshot.val().Phone_number);
      //dates
      $("#bookingDateDisplay").text(childSnapshot.val().Date_purchased);

      //location & room
      $("#locationBookedDisplay").text(childSnapshot.val().Location);
      $("#roomBookedDisplay").text(childSnapshot.val().roomBooked);
      //price
      $("#bookingPriceDisplay").text(childSnapshot.val().bookingPrice);
    });
  });
// }
