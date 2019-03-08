function renderNavBar(accountText, accountURL) {
  var navContainer = document.getElementById("nav-container");
  console.log("RENDERING NAVBAR IN...", navContainer);
  navContainer.innerHTML = `
    <nav class="navbar navbar-expand-md">
            <a class="navbar-brand" href="index.html">
            <h1 id="blue-llama-heading" class="display-4">
                BLUE LLAMA <span id="retreats-heading">Retreats</span>
            </h1>
            </a>
            <button
            class="navbar-toggler navbar-light"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span class="navbar-toggler-icon"></span>
            </button>
            <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
            >
            <div class="navbar-nav nav">
                <a class="nav-item nav-link display-4" id="home" href="index.html"
                >Home</a
                >
                <a
                class="nav-item nav-link display-4"
                id="location"
                href="location.html"
                >Location</a
                >
                <a
                class="nav-item nav-link display-4"
                id="retreats"
                href="retreats.html"
                >The Retreats</a
                >
                <a
                class="nav-item nav-link display-4"
                id="book"
                href="retreats.html"
                >Book Now</a
                >
                <a
                class="nav-item nav-link display-4"
                id="signIn"
                href=${accountURL}
                >${accountText}</a
                >
            </div>
            </div>
        </nav>
    `;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("I am logged in");
    renderNavBar("Account", "confirmation.html");
  } else {
    console.log("not logged in");
    renderNavBar("Signup/Login", "signUp.html");
  }
});
