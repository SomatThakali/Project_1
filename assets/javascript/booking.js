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
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     currentUser = user;
//     console.log(currentUser);
//     console.log(user.uid);
//   } else {
//     console.log("not logged in");
//   }
// });

//on submit button click
$("#submitButton").on("click", function(event) {
  console.log("submit button clicked");
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
  var myUserId = firebase.auth().currentUser.uid;
  console.log("submitting booking for", myUserId);
  database.ref("bookings/" + myUserId).push({
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
    Total_price: bookingPrice
    // userId: currentUser.uid
  });

  window.location = "../templates/confirmation.html";
});

// recheck
database.ref().once(
  "value",
  function(snapshot) {
    if (firebase.auth().currentUser) {
      var myUserId = firebase.auth().currentUser.uid;
      console.log(myUserId);
      var myUserIdEmail = firebase.auth().currentUser.email;
      $("#userMessage").text("Welcome " + myUserIdEmail);

      database.ref("bookings/" + myUserId).on(
        "child_added",
        function(snapshot) {
          renderRow(snapshot);
          console.log("in here");
        },
        function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }
      );
    } else {
      console.log("user not logged in");
    }
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);

function renderRow(snap) {
  var child = snap.val();

  var tRow = $("<tr>");

  var firstNameTd = $("<td id='firstNameDisplay'>").text(child.First_name);
  var lastNameTd = $("<td id='lastNameDisplay'>").text(child.Last_name);
  var emailTd = $("<td id='emailDisplay'>").text(child.Email);
  var tripDateTd = $("<td id='tripDateDisplay'>").text(child.Trip_date);
  var phoneNumberTd = $("<td id='tripDateDisplay'>").text(child.Phone_number);
  var datePurchasedTd = $("<td id='bookingDateDisplay'>").text(
    child.Date_purchased
  );
  var locationTd = $("<td id='locationBookedDisplay'>").text(child.Location);
  var roomBookedTd = $("<td id='roomBookedDisplay'>").text(child.roomBooked);

  // Append the newly created table data to the table row
  tRow.append(
    firstNameTd,
    lastNameTd,
    emailTd,
    tripDateTd,
    phoneNumberTd,
    datePurchasedTd,
    locationTd,
    roomBookedTd
  );
  // Append the table row to the table body
  $("tbody").append(tRow);
}

$("#logOut").on("click", function() {
  console.log("I am log out");
  firebase.auth().signOut();
  window.location = "../templates/index.html";
});
