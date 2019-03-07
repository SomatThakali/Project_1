var map, popup, Popup;
var latVal = [40.774309349999996, 40.75361345, 40.74770384999999];
var lngVal = [-73.9708367973161, -73.97658004429898, -74.00489117085408];
var locId = ["loc1", "loc2", "loc3"];
var locTitle = ["Central Park", "Grand Central Station", "The High Line"];
console.log("map initialized");
/** Initializes the map and the custom popup. */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.762009349999996, lng: -73.9858367973161},
    zoom: 13,
  });
for (i = 0; i < locTitle.length; i++){
  Popup = createPopupClass();
  popup = new Popup(
      new google.maps.LatLng(latVal[i], lngVal[i]),
      document.getElementById(locId[i]));
  popup.setMap(map);
}
};

var bookBtn = "<a href='signUp.html' class='btn btn-warning book-now'>Book Now</a>";
var learnBtn = "<a href='learn_gc.html' class='btn btn-dark learn-more'>Learn More</a>";
 
$("#loc1Btn").on('click', function() {
    console.log("part 1 init");
    $("#loc1").html(
      bookBtn + "<span>" + learnBtn
    );
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