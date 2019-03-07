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
  showHideButtonsForForgotPassword();
  console.log("I am clicked");
  $("#password-reset").on("click", function(event) {
    var email = $("#email").val();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        Swal.fire({
          type: "success",
          text: "Password Reset Email Sent!!"
        });
      })
      .catch(function(error) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: errorMessage
        });
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
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Wrong password!"
        });
      } else {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: errorMessage
        });
      }
      // console.log(error);
    });
  $("#forgot-password").show();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // $("#userMessage").text("Welcome " + myUserIdEmail);
    $("#account").show();
    $("#signIn").hide();

    window.location = "../templates/booking.html";
    console.log("I am logged in");
  } else {
    // findlink.href = "../templates/signUp.html";
    // link.setAttribute('href', "../templates/signUp.html");
    console.log("not logged in");
  }
});

$("#createAccount").on("click", function(event) {
  showHideButtonsForSignUp();
  $("#signUp").on("click", function(event) {
    console.log("signUp clicked! ");

    var email = $("#email").val();
    var password = $("#password").val();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "The password is too weak."
          });
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: errorMessage
          });
        }
        // console.log(error);
      });
  });
});

function showHideButtonsForForgotPassword() {
  $(".password").hide();
  $(".signup").hide();
  $("#login").hide();
  $("#forgot-password").hide();
  $("#password-reset").show();
  $("#please-login").hide();
  $("#passwordReset").show();
}

function showHideButtonsForSignUp() {
  $("#signUp").show();
  $(".name").show();
  $("#createAccount").hide();
  $("#login").hide();
  $("#forgot-password").hide();
  $("#please-login").hide();
  $("#register").show();
  $("#passwordReset").hide();
}
function hidePasswordReset() {
  $("#password-reset").hide();
  $("#forgot-password").hide();
  $(".name").hide();
  $("#signUp").hide();
  $("#register").hide();
  $("#passwordReset").hide();
  // $("#account").hide();
}

hidePasswordReset();

function makeFormEmpty() {
  $("#email").val("");
  $("#password").val("");
}

makeFormEmpty();
