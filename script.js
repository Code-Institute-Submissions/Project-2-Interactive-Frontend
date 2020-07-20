// For buttons to control switching of pages
function hidePages() {
    let pages = $(".page");
    for (let p of pages) {
        $(p).removeClass("shown");
        $(p).addClass("hidden")
    }
}
$(".nav-button").click(function(){
    let pageNumber = $(this).data("page");
    hidePages();
    $(`#page-${pageNumber}`).addClass("shown");
    $(`#page-${pageNumber}`).removeClass("hidden");
})
// end of Page Control

// Start of Game Page

$(function() {
// Create random position
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

// for Map loading ****
let singapore = [ 1.376950, 103.806926];
// no zoom control options
let map = L.map("map").setView(singapore, 12);
// Setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// For adding pokemon picture and name into status bar
let url = "https://pokeapi.co/api/v2/pokemon/";
let wantedPokemonNumber = Math.floor((Math.random()*152)+1);

let start = document.querySelector("#start-btn");
start.addEventListener('click', function(){
    // only take out random pokemon from generation 1 only
    axios.get(url+wantedPokemonNumber).then(function(response){
        let HTMLfragment = `<h1>${response.data.name}</h1>
        <img src="${response.data.sprites.front_default}"/>`
        let identityDiv = document.querySelector("#pokemon-profile");
        identityDiv.innerHTML = HTMLfragment;
        let wantedPokemonMarkerPositon = getRandomLatLng(map);
        let wantedPokemonMarker=L.marker(wantedPokemonMarkerPositon);
        wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
        // wantedPokemonMarker = L.marker([getRandomLatLng(map)]);
        wantedPokemonMarker.addTo(map);
        })
    })
})
 