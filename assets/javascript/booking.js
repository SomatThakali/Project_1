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

// database.ref().on(
//   "child_added",
//   function(snapshot) {
//     $("#firstNameDisplay").text(snapshot.val().First_name);
//     $("#lastNameDisplay").text(snapshot.val().Last_name);
//     $("#emailDisplay").text(snapshot.val().Email);
//     $("#tripDateDisplay").text(snapshot.val().Trip_date);
//     $("#phoneNumberDisplay").text(snapshot.val().Phone_number);
//     //dates
//     $("#bookingDateDisplay").text(snapshot.val().Date_purchased);

//     //location & room
//     $("#locationBookedDisplay").text(snapshot.val().Location);
//     $("#roomBookedDisplay").text(snapshot.val().roomBooked);
//     //price
//     $("#bookingPriceDisplay").text(snapshot.val().bookingPrice);
//   },
//   function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
//   }
// );

// var email = $("#emailInput").val();
// database
//   .ref()
//   .child("bookings")
//   .orderByChild("Email")
//   .equalTo("somatthakali89@gmail.com")
//   .once("value", function(snapshot) {
//     console.log(snapshot.val());
//     snapshot.forEach(function(childSnapshot) {
//       console.log("in here");
//       $("#firstNameDisplay").text(childSnapshot.val().First_name);
//       $("#lastNameDisplay").text(childSnapshot.val().Last_name);
//       $("#emailDisplay").text(childSnapshot.val().Email);
//       $("#tripDateDisplay").text(childSnapshot.val().Trip_date);
//       $("#phoneNumberDisplay").text(childSnapshot.val().Phone_number);
//       //dates
//       $("#bookingDateDisplay").text(childSnapshot.val().Date_purchased);

//       //location & room
//       $("#locationBookedDisplay").text(childSnapshot.val().Location);
//       $("#roomBookedDisplay").text(childSnapshot.val().roomBooked);
//       //price
//       $("#bookingPriceDisplay").text(childSnapshot.val().bookingPrice);
//     });
//   });
// var ref = new Firebase();
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

// function renderRow(snap) {
//   var child = snap.val();
//   var childRef = snap.key;
//   // console.log("child ", child, childRef);

//   var tRow = $("<tr>");
//   // tRow.attr("data-ref", childRef);

//   // Methods run on jQuery selectors return the selector they we run on
//   var firstNameTd = $("<td id='firstName-display'>").text(child.First_name);
//   var lastNameTd = $("<td id='lastName-display'>").text(child.Last_name);
//   var startDateTd = $("<td id='startDate-display'>").text(child.Email);
//   var salaryTd = $("<td id='salary-display'>").text(child.Trip_date);
//   var deginationTd = $("<td id='degination-display'>").text(child.Phone_number);
//   var emailTd = $("<td id='email-display'>").text(child.Date_purchased);
//   var deleteTd = $("<td id='delete-display'>").text(child.Location);

//   // Append the newly created table data to the table row
//   tRow.append(
//     firstNameTd,
//     lastNameTd,
//     startDateTd,
//     salaryTd,
//     deginationTd,
//     emailTd,
//     deleteTd
//   );
//   // Append the table row to the table body
//   $("tbody").append(tRow);
// }
