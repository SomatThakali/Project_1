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
//booking info
var room = 0;
var numberOfGuest = 0;
var checkInDate = "";
var checkOutDate = "";
var comments = "";

//on submit button click
$("#submitButton").on("click", function (event) {
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
    room: room,
    Number_Of_Guest: numberOfGuest,
    check_In_Date: checkInDate,
    check_Out_Date: checkOutDate,
    special_Request: comments
  });

  window.location = "../templates/confirmation.html";

});

// recheck
database.ref().once(
  "value",
  function (snapshot) {
    if (firebase.auth().currentUser) {
      var myUserId = firebase.auth().currentUser.uid;
      // console.log(currentUser);

      var myUserIdEmail = firebase.auth().currentUser.email;
      $("#userMessage").text("Welcome " + myUserIdEmail);

      database.ref("bookings/" + myUserId).on(
        "child_added",
        function (snapshot) {
          renderRow(snapshot);

          console.log("in here");
        },
        function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }
      );

      database.ref("Images/" + myUserId).on(
        "child_added",
        function (snapshot) {

          renderImage(snapshot);
          console.log("in here");
        },
        function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
        }
      );

    } else {
      console.log("user not logged in");
    }
  },
  function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }


);

function renderRow(snap) {
  var child = snap.val();

  var tRow = $("<tr>");

  var firstNameTd = $("<td id='firstNameDisplay'>").text(child.First_name);
  var lastNameTd = $("<td id='lastNameDisplay'>").text(child.Last_name);
  var emailTd = $("<td id='emailDisplay'>").text(child.Email);
  var phoneNumberTd = $("<td id='tripDateDisplay'>").text(child.Phone_number);
  var roomTd = $("<td id='roomDisplay'>").text(child.room);
  var numberOfGuestTd = $("<td id='numberOfGuestDisplay'>").text(
    child.Number_Of_Guest
  );
  var checkInDateTd = $("<td id='checkInDateDisplay'>").text(
    child.check_In_Date
  );
  var checkOutDateTd = $("<td id='checkOutDateDisplay'>").text(
    child.check_Out_Date
  );
  var specialRequestTd = $("<td id='specialRequestDisplay'>").text(
    child.special_Request
  );
  console.log("room Number " + child.room);
  console.log("checkInDate " + child.check_In_Date);
  // var tripDateTd = $("<td id='tripDateDisplay'>").text(child.Trip_date);

  // Append the newly created table data to the table row

  tRow.append(
    firstNameTd,
    lastNameTd,
    emailTd,
    phoneNumberTd,
    roomTd,
    numberOfGuestTd,
    checkInDateTd,
    checkOutDateTd,
    specialRequestTd
  );
  // Append the table row to the table body
  $("tbody").append(tRow);

}


// function renderImage(snap) {
//   var uploadTask = firebase.storage().ref().child('/Images/' + selectedFile.name).put(selectedFile);
//   var downloadURL = uploadTask.snap.downloadURL;
//   console.log(downloadURL);
//   var profileImage = $("<img class = 'profile-image'>").attr("src", downloadURL);
//   $(".image").imageDiv.append(profileImage);

// }


$("#logOut").on("click", function () {
  console.log("I am log out");
  firebase.auth().signOut();
  window.location = "../templates/index.html";
});


var selectedFile;
$("#file").on("change", function (event) {
  // ("#uploadButton").show();
  selectedFile = event.target.files[0];
});

var user;

function upLoadFile() {
  var myUserId = firebase.auth().currentUser.uid;

  var uploadTask = firebase.storage().ref().child('/Images/' + selectedFile.name).put(selectedFile);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function (snapshot) {
    // Observe state change events such as progress, pause, and resume
    // See below for more detail
  }, function (error) {
    // Handle unsuccessful uploads
  }, function () {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    var postKey = firebase.database().ref("images/").push().key;
    var downloadURL = uploadTask.snapshot.downloadURL;

    var updates = {};
    var postData = {
      url: downloadURL,
      user: myUserId
    }
    updates['images/' + postKey] = postData;
    firebase.database().ref().update(updates);

    $(".upload-group")[0].before("Success!");
    $(".upload-group").hide();

  });

}
