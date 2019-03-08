var map, popup, Popup;
var latVal = [40.774309349999996, 40.75361345, 40.688769199999996];
var lngVal = [-73.9708367973161, -73.97658004429898, -74.01820132326577];
var locId = ["loc1", "loc2", "loc3"];
var locTitle = ["Central Park", "Grand Central Station", "Governors Island"];
/** Initializes the map and the custom popup. */
function initMap() {
  console.log("map initialized");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.738009349999996, lng: -73.9858367973161},
    zoom: 12,
  });
  for (i = 0; i < locTitle.length; i++){
    console.log("popup " + i + " created");
    Popup = createPopupClass();
    popup = new Popup(
      new google.maps.LatLng(latVal[i], lngVal[i]),
      document.getElementById(locId[i]));

      popup.setMap(map);
    }
  }
  /* map btn functionality
    
    loc1 = Central Park
    loc2 = Grand Central Station
    loc3 = Governor's Island
  
  */

 //map button variables
  var bookBtn = "<a href='signUp.html' class='btn btn-warning book-now'>Book Now</a>";
  var learnBtn1 = "<a href='learn_cp.html' class='btn btn-dark learn-more'>Learn More</a>";
  var learnBtn2 = "<a href='learn_gc.html' class='btn btn-dark learn-more'>Learn More</a>";
  var learnBtn3 = "<a href='learn_gov.html' class='btn btn-dark learn-more'>Learn More</a>";

  var cpBtn = "<button id='loc1Btn' type='button' class='btn btn-primary'>";
  var gctBtn = "<button id='loc2Btn' type='button' class='btn btn-primary'>";
  var govBtn = "<button id='loc3Btn' type='button' class='btn btn-primary'>";
  var closeBtn1 = "<button id='loc1Close' type='button' class='btn btn-primary'>X</button>";
  var closeBtn2 = "<button id='loc2Close' type='button' class='btn btn-primary'>X</button>";
  var closeBtn3 = "<button id='loc3Close' type='button' class='btn btn-primary'>X</button>";

  var locList = ["Central Park", "Grand Central Station", "Governors Island"];
   
  //map buttons
    //Central Park
    $("#loc1Btn").click(function(){
      $('#loc1').html(bookBtn + learnBtn1 + closeBtn1);
      $("#loc1Close").click(function(){
          $('#loc1').html(cpBtn + locList[0] + "</button>");
        });
      });
    //Grand Central Station
    $("#loc2Btn").click(function(){
      $('#loc2').html(bookBtn + learnBtn2 + closeBtn2);
      $("#loc2Close").click(function(){
        $('#loc2').html(gctBtn + locList[1] + "</button>");
      });
    });
    //Governors Island
    $("#loc3Btn").click(function(){
      $('#loc3').html(bookBtn + learnBtn3 + closeBtn3);
      $("#loc3Close").click(function(){
        $('#loc3').html(govBtn + locList[2] + "</button>");
      });
    });
 
/**
 * Returns the Popup class.
 *
 * Unfortunately, the Popup class can only be defined after
 * google.maps.OverlayView is defined, when the Maps API is loaded.
 * This function should be called by initMap.
 */
function createPopupClass() {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content The bubble div.
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  function Popup(position, content) {
    this.position = position;

    content.classList.add('popup-bubble');

    // This zero-height div is positioned at the bottom of the bubble.
    var bubbleAnchor = document.createElement('div');
    bubbleAnchor.classList.add('popup-bubble-anchor');
    bubbleAnchor.appendChild(content);

    // This zero-height div is positioned at the bottom of the tip.
    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('popup-container');
    this.containerDiv.appendChild(bubbleAnchor);

    // Optionally stop clicks, etc., from bubbling up to the map.
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  // ES5 magic to extend google.maps.OverlayView.
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  /** Called each frame when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

    // Hide the popup when it is far out of view.
    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px';
      this.containerDiv.style.top = divPosition.y + 'px';
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };

  return Popup;
}

