var config = {
  apiKey: "AIzaSyAKTJreq0OZgWl8ktgzhd2FvPyYyCYhN1M",
  authDomain: "blue-lama-retreat-7a0c6.firebaseapp.com",
  databaseURL: "https://blue-lama-retreat-7a0c6.firebaseio.com",
  projectId: "blue-lama-retreat-7a0c6",
  storageBucket: "blue-lama-retreat-7a0c6.appspot.com",
  messagingSenderId: "106620423709"
};
firebase.initializeApp(config);

$("#forgot-password").on("click", function() {
  showHideButtons();
  console.log("I am clicked");
  $("#password-reset").on("click", function(event) {
    var email = $("#email").val();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        alert("Password Reset Email Sent!");
      })
      .catch(function(error) {
        alert(error.message);
      });
  });
});
//call back function
$("#login").on("click", function() {
  var email = $("#email").val();
  var password = $("#password").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else if (errorCode === "auth/user-not-found") {
        alert("User not found.");
      } else if (errorCode == "auth/invalid-email") {
        alert("The email is invalid.");
      }
      // console.log(error);
    });
  $("#forgot-password").show();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location = "../templates/bookNowModal.html";
    console.log("I am logged in");
  } else {
    console.log("not logged in");
  }
});

$("#signUp").on("click", function(event) {
  console.log("signUp clicked! ");
  $(".name").show();
  var email = $("#email").val();
  var password = $("#password").val();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
        // } else if (errorCode == "auth/invalid-email") {
        //   alert("The email is invalid.");
        // } else if (errorCode == "auth/email-already-in-use") {
        alert("This email is already in use.");
      } else if (errorCode == "auth/operation-not-allowed") {
        alert("The operation is not allowed.");
      }
      // console.log(error);
    });
});

function showHideButtons() {
  $(".password").hide();
  $(".signup").hide();
  $("#login").hide();
  $("#forgot-password").hide();
  $("#password-reset").show();
}

function hidePasswordReset() {
  $("#password-reset").hide();
  $("#forgot-password").hide();
  $(".name").hide();
}

hidePasswordReset();

function makeFormEmpty() {
  $("#email").val("");
  $("#password").val("");
}
