var config = {
  apiKey: "AIzaSyAKTJreq0OZgWl8ktgzhd2FvPyYyCYhN1M",
  authDomain: "blue-lama-retreat-7a0c6.firebaseapp.com",
  databaseURL: "https://blue-lama-retreat-7a0c6.firebaseio.com",
  projectId: "blue-lama-retreat-7a0c6",
  storageBucket: "",
  messagingSenderId: "106620423709"
};
firebase.initializeApp(config);

//call back function
$("#login").on("click", function() {
  var email = $("#email").val();
  var password = $("#password").val();

  const promise = firebase.auth().signInWithEmailAndPassword(email, password);
  promise.catch(function(event) {
    console.log(event.message);
  });
});

$("#signUp").on("click", function(event) {
  var email = $("#email").val();
  var password = $("#password").val();

  const promise = firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  promise.catch(function(event) {
    console.log(event.message);
  });
});

$("#password-reset").on("click", function(event) {
  var email = $("#email").val();
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function() {
      alert("Password Reset Email Sent!");
    })
    .catch(function(error) {
      console.log(error.message);
    });
});

$("#logOut").on("click", function(event) {
  firebase.auth().signOut();
  $(".container").hide();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // TODO
    // make a other functions that wil take
    // Display confirmation
    // Display name
    // include Josh code
    // window.location = "../templates/booking.html"; // Redirecting to other page
    // testing. this should direct to the new page
    var email_id = user.email;
    $("#paragraph1").text("Welcome " + email_id);
    $("#paragraph2").text("Your booking date is 2019-03-01");

    console.log(user);
    logOut.classList.remove("d-none");
  } else {
    console.log("not logged in");
  }
});
