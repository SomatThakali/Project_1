// //booking page - submit button funtionality

// //firebase config
// var config = {
//     apiKey: "AIzaSyAKTJreq0OZgWl8ktgzhd2FvPyYyCYhN1M",
//     authDomain: "blue-lama-retreat-7a0c6.firebaseapp.com",
//     databaseURL: "https://blue-lama-retreat-7a0c6.firebaseio.com",
//     projectId: "blue-lama-retreat-7a0c6",
//     storageBucket: "",
//     messagingSenderId: "106620423709"
//     };firebase.initializeApp(config);
//     //define variables
//     var database = firebase.database();
//         //guest info
//         var firstName = "";
//         var lastName = "";
//         var email = "";
//         var phoneNumber = "";
//         //dates
//         var bookingDate = "";
//         var tripDate = "";
//         //location & room
//         var locationBooked = "";
//         var roomBooked = "";
//         //price
//         var bookingPrice = 0;

//     //on submit button click
//     $("#submitButton").on("click", function(event) {
//         event.preventDefault();
//         //guest info
//         firstName = $("#firstNameInput").val().trim();
//         lastName = $("#lastNameInput").val().trim();
//         email = $("#emailInput").val().trim();
//          phoneNumber = $("#phoneNumberInput").val().trim();
//         //dates
//          bookingDate = $("#bookingDate").val().trim();
//          tripDate = $("#tripDate").val().trim();
//         //location & room
//          locationBooked = $("#locationBooked").val().trim();
//          roomBooked = $("#roomBooked").val().trim();
//         //price
//          bookingPrice = $("#bookingPrice").val().trim();

//     //push to firebase
//     database.ref().push({
//         //guest info
//         First_name: firstName,
//         Last_name: lastName,
//         Email: email,
//         Phone_number: phoneNumber,
//         //dates
//         Date_purchased: bookingDate,
//         Trip_date: tripDate,
//         //location & room
//         Location: locationBooked,
//         Room: roomBooked,
//         //price
//         Total_price: bookingPrice
//         });
//     });
//     //update html on value change in firebase
//     database.ref().on("value", function(snapshot) {
//         //guest info
//         $("#firstNameDisplay").text(snapshot.val().firstName);
//         $("#lastNameDisplay").text(snapshot.val().lastName);
//         $("#emailDisplay").text(snapshot.val().email);
//         $("#phoneNumberDisplay").text(snapshot.val().phoneNumber);
//         //dates
//         $("bookingDateDisplay").text(snapshot.val().bookingDate);
//         $("tripDateDisplay").text(snapshot.val().tripDate);
//         //location & room
//         $("locationBookedDisplay").text(snapshot.val().locationBooked);
//         $("roomBookedDisplay").text(snapshot.val().roomBooked);
//         //price
//         $("bookingPriceDisplay").text(snapshot.val().bookingPrice);

//     //errors
//     }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
// });
