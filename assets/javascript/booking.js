var database = firebase.database();

//guest info
var firstName = "";
var lastName = "";
var email = "";
var phoneNumber = "";
//booking info
var locationChoice = "";
var room = 0;
var numberOfGuest = 0;
var checkInDate = "";
var checkOutDate = "";
var comments = "";

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
  locationChoice = $("#locationInput")
    .val()
    .trim();
  room = $("#roomInput")
    .val()
    .trim();
  numberOfGuest = $("#peopleInput")
    .val()
    .trim();
  checkInDate = $("#checkInDate")
    .val()
    .trim();
  checkOutDate = $("#checkOutDate")
    .val()
    .trim();
  comments = $("#comments")
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
    // Details
    location: locationChoice,
    room: room,
    Number_Of_Guest: numberOfGuest,
    check_In_Date: checkInDate,
    check_Out_Date: checkOutDate,
    special_Request: comments
  });

  window.location = "../templates/confirmation.html";
});

// recheck
database.ref().on(
  "value",
  function(snapshot) {
    if (firebase.auth().currentUser) {
      var myUserId = firebase.auth().currentUser.uid;
      // console.log(currentUser);
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

      database.ref("Images/" + myUserId).on(
        "child_added",
        function(snapshot) {
          renderImage(snapshot);
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
  $("#list-name").text("Name: " + child.First_name + " " + child.Last_name);
  $("#emailDisplay").text("Email: " + child.Email);
  $("#phoneNumber").text("Phone Number : " + child.Phone_number);
  $("#locationDisplay").text("Location: " + child.location);
  $("#roomDisplay").text("Rooms: " + child.room);
  $("#numberOfGuestDisplay").text("Number of Guests: " + child.Number_Of_Guest);
  $("#checkInDateDisplay").text("Check In: " + child.check_In_Date);
  $("#checkOutDateDisplay").text("Check Out: " + child.check_Out_Date);
  $("#specialRequestDisplay").text(
    "Special Requests: " + child.special_Request
  );
}

$("#logOut").on("click", function() {
  console.log("I am log out");
  firebase.auth().signOut();
  window.location = "../templates/index.html";
});

$("#signIn").hide();
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // $("#account").show();
//     // $("#signIn").hide();
//     // console.log("I am logged in");
//   } else {
//     console.log("not logged in");
//   }
// });
