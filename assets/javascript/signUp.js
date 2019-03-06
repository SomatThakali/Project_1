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
          text: "Please enter your information"
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
          text: "Please enter your information"
        });
      }
      // console.log(error);
    });
  $("#forgot-password").show();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // $("#userMessage").text("Welcome " + myUserIdEmail);
    window.location = "../templates/bookNowModal.html";
    console.log("I am logged in");

  } else {
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
            text: "Please enter your information"
          });
        }
        // console.log(error);
      });
  });
});

// function sendVerification() {
//   var user = firebase.auth().currentUser;
//   user
//     .sendEmailVerification()
//     .then(function() {
//       Swal.fire({
//         type: "success",
//         title: "Verification sent",
//         text: "Please verify your email!"
//       });
//     })
//     .catch(function(error) {
//       Swal.fire({
//         type: "error",
//         title: "Oops...",
//         text: error
//       });
//     });
// }

function showHideButtonsForForgotPassword() {
  $(".password").hide();
  $(".signup").hide();
  $("#login").hide();
  $("#forgot-password").hide();
  $("#password-reset").show();
}

function showHideButtonsForSignUp() {
  $("#signUp").show();
  $(".name").show();
  $("#createAccount").hide();
  $("#login").hide();
  $("#forgot-password").hide();
}
function hidePasswordReset() {
  $("#password-reset").hide();
  $("#forgot-password").hide();
  $(".name").hide();
  $("#signUp").hide();
}

hidePasswordReset();

function makeFormEmpty() { 
  $("#email").val("");
  $("#password").val("");
}

function hideAccount() {
  $("#account").hide()
  $("#signIn").show()
};

hideAccount();


// $("#account").hide();

// $("#google-sign-in").on("click", function() {
//   var provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
//   console.log("google log in");
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then(function(result) {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = result.credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//       console.log(user);
//       // ...
//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
// });

// $("#facebook-sign-in").on("click", function() {
//   var provider = new firebase.auth.FacebookAuthProvider();
//   // [END createprovider]
//   // [START addscopes]
//   provider.addScope("user_birthday");
//   // [END addscopes]
//   // [START signin]
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then(function(result) {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//       // [START_EXCLUDE]
//       document.getElementById("quickstart-oauthtoken").textContent = token;
//       // [END_EXCLUDE]
//     })
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // [START_EXCLUDE]
//       if (errorCode === "auth/account-exists-with-different-credential") {
//         alert(
//           "You have already signed up with a different auth provider for that email."
//         );
//         // If you are using multiple auth providers on your app you should handle linking
//         // the user's accounts here.
//       } else {
//         console.error(error);
//       }
//       // [END_EXCLUDE]
//     });
// });
