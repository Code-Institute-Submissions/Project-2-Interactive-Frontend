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
    })
})

// for Map loading ****
let singapore = [ 1.29,103.85]
// no zoom control options
let map = L.map("map", {zoomControl: false}).setView(singapore, 12);
// Setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

