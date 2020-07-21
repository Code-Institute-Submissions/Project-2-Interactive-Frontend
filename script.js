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
    let map = L.map("map", {zoomControl: false}).setView(singapore, 12);
    // Prevent map from zooming using mouse
    map.scrollWheelZoom.disable();
    // map.dragging.disable();

    // Setup the tile layers
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 12,
        minzoom: 12,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);




// start of pokemon marker

    // Add all pokemon marker to a layer group so that can be removed by quit button
    let pokeMarker = L.layerGroup();
    // For adding pokemon picture and name into status bar
    let url = "https://pokeapi.co/api/v2/pokemon/";
    // only take out random pokemon from generation 1 only
    let pokemonNumber = Math.floor((Math.random()*151)+1);

    // Start of start button
    let start = document.querySelector("#start-btn");
    start.addEventListener("click", function(){
        axios.get(url + pokemonNumber).then(function(response){
            // axios.get(url + 147).then(function(response){
            // to add in #pokemon-profile
            let HTMLfragment = `<h1>${response.data.name}</h1>
            <img src="${response.data.sprites.front_default}"/>`
            let identityDiv = document.querySelector("#pokemon-profile");
            identityDiv.innerHTML = HTMLfragment;
            let wantedPokemonMarkerPositon = getRandomLatLng(map);
        // Conditions to change marker color according to pokemon type
            if (response.data.types[0].type.name == "normal"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 255"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            } else if (response.data.types[0].type.name == "fire"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 0, 0"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            } else if (response.data.types[0].type.name == "water"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 0, 255"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "electric"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 0"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "grass"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 128, 0"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "psychic"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 165, 0"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "bug"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 255, 0"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "poison"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(178, 102, 255"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "ground"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 76, 0"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "fighting"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 153"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "rock"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(64, 64, 64"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "ghost"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 0, 102"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "ice"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 255, 153"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "dragon"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 178, 255"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "fairy"){
                let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 204"}});
                wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }
            // let wantedPokemonMarker=L.marker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(211, 33, 45"}})
            // wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
            // wantedPokemonMarker.addTo(map);
            })
    // Make start button disabled during gameplay
        start.disabled = true;
        randomPokemon();
        countdown();
        roundCounter();
    })
    // add 29 random pokemon to map
     function randomPokemon (){
         
        //  need to make url and pokemonNumber in scope if not pokemon generated will be same as wantedPokemon
        let url = "https://pokeapi.co/api/v2/pokemon/";
        for (let r = 0; r < 30; r++){
            let pokemonNumber = Math.floor((Math.random()*151)+1);
            axios.get(url + pokemonNumber).then(function(response){
                let randomPokemonMarkerPositon = getRandomLatLng(map);
            // Conditions to change marker color according to pokemon type
            if (response.data.types[0].type.name == "normal"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            } else if (response.data.types[0].type.name == "fire"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 0, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            } else if (response.data.types[0].type.name == "water"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 0, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "electric"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "grass"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 128, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "psychic"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 165, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "bug"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 255, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "poison"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(178, 102, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "ground"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 76, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "fighting"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 153"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "rock"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(64, 64, 64"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "ghost"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 0, 102"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "ice"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 255, 153"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "dragon"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 178, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "fairy"){
                let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 204"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }
                // let randomPokemonMarker=L.marker(randomPokemonMarkerPositon) 
                // randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                pokeMarker.addTo(map);
            })

        }
    }
    // end of pokemon marker

    // Start of timer
    let timer = {};
    function countdown(){
        // 30 seconds countdown
        timer.end = 31;
        timer.sec = document.querySelector("#seconds");
        // start if not 0
        if (timer.end > 0) {
            // hold timer object that repeats every 1 sec
            timer.ticker = setInterval(function(){
                timer.end--;
                if (timer.end <= 0){
                    // clears timer with setInterval
                    clearInterval(timer.ticker);
                    timer.end = 0;
                    // enable start button
                    // start.disabled = false;
                }
                // To ensure start button stay disabled
                if (round == 5){
                    start.disabled = true;
                }
                let secs = timer.end;
                timer.sec.innerHTML = secs
            },1000)
        }
    }
    // end of timer

    // start of round
    let round = 0
    // to increase round and prevent start button enabling after 5 rounds
    function increaseRound(n) {
        if (round < 5){
            round += 1;  
        } 
        if (round == 5){
            start.disabled = true;
        }
    }
    // increase and update in real time
    function roundCounter(){
        increaseRound(0);
        updateRound();
    }
    // update the rounds in the status bar
    function updateRound(){
        // round = document.querySelector("#round-count").innerText;
         $("#round-count").text(round);
    }
    // end of round

// Start of quit button
    function removeMarkers(){
        map.removeLayer(pokeMarker);
    }

    let quit = document.querySelector("#quit-btn");
    quit.addEventListener("click", function(){
        if (round == 5){
            start.disabled = true;
        } else {
            start.disabled = false;
        }
        removeMarkers()
        timer.end = 0;
    })
    // End of quit button

// Start of reset button
    let restart = document.querySelector("#reset-btn");
    restart.addEventListener("click", function(){
        round = 0;
        updateRound()
        timer.end = 0;
        removeMarkers()
        start.disabled = false;
        alert("Start of New Game!")

    })
})
 
