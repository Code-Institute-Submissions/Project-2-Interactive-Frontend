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

    // for Map loading 
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

//  to remove markers from maps
    function removeMarkers(){
        // map.removeLayer(pokeMarker);
        //  Use clearLayers() as there will delete marker from map memory
        randomMarker.clearLayers();
        wantedMarker.clearLayers();
    }

// let wantedMarker = L.layerGroup();
let wantedMarker = L.featureGroup();
let capturedPokemon = [];
// Start the game and generate pokemon
    function startGame(){
        // get new pokemon every start
        pokemonNumber = Math.floor((Math.random()*151)+1);
        axios.get(url + pokemonNumber).then(function(response){
            // axios.get(url + 16).then(function(response){
            // to add in #pokemon-profile
            let HTMLfragment = `<h3>${response.data.name}</h3>
            <img src="${response.data.sprites.front_default}"/>`
            let identityDiv = document.querySelector("#pokemon-profile");
            identityDiv.innerHTML = HTMLfragment;
            let wantedPokemonMarkerPositon = getRandomLatLng(map);
        // Conditions to change marker color according to pokemon type
            if (response.data.types[0].type.name == "normal"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: normalIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            } else if (response.data.types[0].type.name == "fire"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fireIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            } else if (response.data.types[0].type.name == "water"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: waterIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "electric"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: electricIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "grass"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: grassIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "psychic"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: psychicIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "bug"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: bugIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "poison"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: poisonIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "ground"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: groundIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "fighting"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fightingIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "rock"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: rockIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "ghost"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: ghostIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "ice"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: iceIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "dragon"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: dragonIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "fairy"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fairyIcon});
                wantedPokemonMarker.bindPopup(`<p>WANTED!<p><p>${response.data.name}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }
            wantedMarker.addTo(map);
            // let wantedPokemonMarker=L.marker(wantedPokemonMarkerPositon, {iconOptions: {fillColor: "rgb(211, 33, 45"}})
            // wantedPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
            // wantedPokemonMarker.addTo(map);
        })
    // Make start button disabled during gameplay
        start.disabled = true;
        randomPokemon();
        countdown();
        roundCounter();
        endRound();
        
    }
    // End of startGame()

timeData = [];
// let begin = "";
// let stop = "";

// function endRoundTime(){
//     let date = new Date();
//     let timeTaken = date.getSeconds();
//     timeData.push(timeTaken);
// }


// Start of endRound
//  When wanted marker is clicked on the round ends
function endRound(){
    // this event is only possible if using featureGroup()
    wantedMarker.on("click", function(){
        timer.end = 0;
        // endRoundTime();
 
        // alert("Captured!")
    });

}





// start of pokemon marker

    // For adding pokemon picture and name into status bar
    let url = "https://pokeapi.co/api/v2/pokemon/";
    // only take out random pokemon from generation 1 only
    let pokemonNumber = Math.floor((Math.random()*151)+1);

    // Start of start button
    let start = document.querySelector("#start-btn");
    start.addEventListener("click", function(){
        // removeMarkers();
        startGame();
    })

    // Add all random pokemon markers to a layer group so that can be removed by quit button
    // let randomMarker = L.layerGroup();
    let randomMarker = L.featureGroup();
    // add 29 random pokemon to map
     function randomPokemon (){
         
        //  need to make url and pokemonNumber in scope if not pokemon generated will be same as wantedPokemon
        // let url = "https://pokeapi.co/api/v2/pokemon/";
        for (let r = 0; r < 30; r++){
            let pokemonNumber = Math.floor((Math.random()*151)+1);
            axios.get(url + pokemonNumber).then(function(response){
                let randomPokemonMarkerPositon = getRandomLatLng(map);
            // Conditions to change marker color according to pokemon type
            if (response.data.types[0].type.name == "normal"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: normalIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            } else if (response.data.types[0].type.name == "fire"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fireIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            } else if (response.data.types[0].type.name == "water"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: waterIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "electric"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: electricIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "grass"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: grassIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "psychic"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: psychicIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "bug"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: bugIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "poison"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: poisonIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "ground"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: groundIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "fighting"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fightingIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "rock"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: rockIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "ghost"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: ghostIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "ice"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: iceIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "dragon"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: dragonIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "fairy"){
                let  randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fairyIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }
                // let randomPokemonMarker=L.marker(randomPokemonMarkerPositon) 
                // randomPokemonMarker.bindPopup(`<p>${response.data.name}</p>`)
                randomMarker.addTo(map);
            })
        }
    }

    randomCounterData = []
    randomCounter = 0
// function randomCount(){
    randomMarker.on("click", function(){
        randomCounter += 1
    })
// }
// randomCounterData.push(randomCounter);
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
                }
                // To ensure start button stay disabled
                // if (round == 5){
                //     start.disabled = true;
                // }
                let secs = timer.end;
                timer.sec.innerHTML = secs
            },1000)
        }
    }
    // end of timer

    // start of round

    let round = 0
    // to increase round and prevent start button enabling after 5 rounds
    function increaseRound() {
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
        randomCounterData.push(randomCounter);
    })

    // End of quit button

// Start of reset button
    let restart = document.querySelector("#reset-btn");
    restart.addEventListener("click", function(){
        round = 0;
        updateRound();
        timer.end = 0;
        removeMarkers();
        start.disabled = false;
        map.setView(singapore, 12);
        alert("Start of New Game!");
        randomCounterData.length = 0;

    })

// End of reset button

console.log(randomCounterData)

})