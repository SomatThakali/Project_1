var apiKey ="3d417d7301e01b19487632797e821439";
var searchTerm = "Glamping";
var queryURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + 
apiKey + "&per_page=10&format=json&nojsoncallback=1&safe_search=3&content_type=1&sort=relevance&text=" + searchTerm;

console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log("response", response.photos.photo);
    var photos = response.photos.photo;
    photos.forEach(function(photo) {
        var {farm, id, secret, server} = photo;  // var farm = photo.farm;  var id = photo.id;
        // console.log("vars", farm, id, secret, server)
        var imgSrc = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg` // 'https://farm' + farm + '.staticflickr.com/' + server + ...
        // console.log("img", imgSrc)
        var image = $("<img>").attr('src', imgSrc);
        $("#photo").append(image);
    })    
  });


