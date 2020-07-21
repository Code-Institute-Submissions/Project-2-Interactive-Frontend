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

    // waterIcon = L.icon({
    //     iconUrl: "icon/water.png",
    //     iconSize: [50,20]
    // });


//  to remove markers from maps
    function removeMarkers(){
        map.removeLayer(pokeMarker);
    }

// Start the game and generate pokemon
    function startGame(){
        // get new pokemon every start
        pokemonNumber = Math.floor((Math.random()*151)+1);
        axios.get(url + pokemonNumber).then(function(response){
            // axios.get(url + 9).then(function(response){
            // to add in #pokemon-profile
            let HTMLfragment = `<h3>${response.data.name}</h3>
            <img src="${response.data.sprites.front_default}"/>`
            let identityDiv = document.querySelector("#pokemon-profile");
            identityDiv.innerHTML = HTMLfragment;
            let wantedPokemonMarkerPositon = getRandomLatLng(map);
        // Conditions to change marker color according to pokemon type
            if (response.data.types[0].type.name == "normal"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: normalIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 255"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            } else if (response.data.types[0].type.name == "fire"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fireIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 0, 0"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            } else if (response.data.types[0].type.name == "water"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: waterIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 0, 255"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "electric"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: electricIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 0"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "grass"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: grassIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 128, 0"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "psychic"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: psychicIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 165, 0"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "bug"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: bugIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 255, 0"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "poison"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: posionIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(178, 102, 255"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "ground"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: groundIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 76, 0"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "fighting"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fightingIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 153"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "rock"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: rockIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(64, 64, 64"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "ghost"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: ghostIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 0, 102"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "ice"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: iceIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 255, 153"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "dragon"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: dragonIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 178, 255"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }  else if (response.data.types[0].type.name == "fairy"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fairyIcon});
                // let wantedPokemonMarker = new L.Marker.SVGMarker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 204"}});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(map);
            }
            // let wantedPokemonMarker=L.marker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(211, 33, 45"}})
            // wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
            // wantedPokemonMarker.addTo(map);
            })
    // Make start button disabled during gameplay
        if (map.hasLayer(pokeMarker))
        {
            removeMarkers();
        } else {
            pokeMarker.addTo(map);
        }
        start.disabled = true;
        randomPokemon();
        countdown();
        roundCounter();
        
        // if (map.hasLayer(pokeMarker))
        // {
        //     removeMarkers()
        // }
    }


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
        removeMarkers();
        startGame();
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
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: normalIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            } else if (response.data.types[0].type.name == "fire"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fireIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 0, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            } else if (response.data.types[0].type.name == "water"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: waterIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 0, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "electric"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: electricIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 255, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "grass"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: grassIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 128, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "psychic"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: psychicIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 165, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "bug"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: bugIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(0, 255, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "poison"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: poisonIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(178, 102, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "ground"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: groundIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 76, 0"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "fighting"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fightingIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 153"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "rock"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: rockIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(64, 64, 64"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "ghost"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: ghostIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 0, 102"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "ice"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: iceIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(153, 255, 153"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "dragon"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: dragonIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(102, 178, 255"}});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                // randomPokemonMarker.addTo(map);
                randomPokemonMarker.addTo(pokeMarker);
            }  else if (response.data.types[0].type.name == "fairy"){
                let  randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fairyIcon});
                // let randomPokemonMarker = new L.Marker.SVGMarker(randomPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(255, 204, 204"}});
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
    // function removeMarkers(){
    //     map.removeLayer(pokeMarker);
    // }

    let quit = document.querySelector("#quit-btn");
    quit.addEventListener("click", function(){
        if (round == 5){
            start.disabled = true;
        } else {
            start.disabled = false;
        }
        removeMarkers()
        timer.end = 0;
        map.setView(singapore, 12);
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
        map.setView(singapore, 12);
        alert("Start of New Game!")

    })

 
})