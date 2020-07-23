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
    // Create random position for markers
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

// All global variables

// For adding pokemon picture and name into status bar
let url = "https://pokeapi.co/api/v2/pokemon/";
// Only take out random pokemon from generation 1
let pokemonNumber = Math.floor((Math.random()*151)+1);
// Use featureGroup rather than layerGroup so that markers can be clicked on individually
let randomMarker = L.featureGroup();
let wantedMarker = L.featureGroup();
// To display pokemon profiles in captured gallery
let capturedDiv = document.querySelector("#captured-gallery");
let capturedDivChild;
// To count marker clicks and present it bar chart
let totalCounterData = []
let totalCounter = 0

//  To remove markers from maps
    function removeMarkers(){
        //  Use clearLayers() as there will delete marker from map memory
        randomMarker.clearLayers();
        wantedMarker.clearLayers();
    }
//  When wanted marker is clicked on the round ends
function endRound(){
    // this event is only possible if using featureGroup()
    wantedMarker.on("click", function(){
        timer.end = 0;
        totalCounter += 1;
    });
}
 // Start of 30 seconds countdown
    let timer = {};
    function countdown(){
        // 30 seconds countdown + 1 second reaction time
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
                    // Add number of clicks array
                    totalCounterData.push(totalCounter)
                    // Reveal the position of wanted Pokemon when timer is 0
                    randomMarker.clearLayers();
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
    function increaseRound() {
        if (round < 5){
            round += 1;
        } 
        if (round == 5){
            start.disabled = true;
        }
    }
    // increase and update in round on display
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

// Generate wanted pokemon and other follow up functions when start pressed
    function startGame(){
        // get new pokemon every start
        pokemonNumber = Math.floor((Math.random()*151)+1);
        axios.get(url + pokemonNumber).then(function(response){
            // to add in #pokemon-profile
            let HTMLfragment = `<h3>${response.data.name.toUpperCase()}</h3>
            <img src="${response.data.sprites.front_default}"/>`
            let identityDiv = document.querySelector("#pokemon-profile");
            identityDiv.innerHTML = HTMLfragment;
            let wantedPokemonMarkerPositon = getRandomLatLng(map);
        // Conditions to change marker color according to pokemon type
            if (response.data.types[0].type.name == "normal"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: normalIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            } else if (response.data.types[0].type.name == "fire"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fireIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            } else if (response.data.types[0].type.name == "water"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: waterIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "electric"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: electricIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "grass"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: grassIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "psychic"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: psychicIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "bug"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: bugIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "poison"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: poisonIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "ground"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: groundIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "fighting"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fightingIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "rock"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: rockIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "ghost"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: ghostIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "ice"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: iceIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "dragon"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: dragonIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }  else if (response.data.types[0].type.name == "fairy"){
                let wantedPokemonMarker = L.marker(wantedPokemonMarkerPositon, {icon: fairyIcon});
                wantedPokemonMarker.bindPopup(`<p>Captured!<p><p>${response.data.name.toUpperCase()}</p>`)
                wantedPokemonMarker.addTo(wantedMarker);
            }
            // Add pokemon profiles to captured gallery
            let capturedHTML = `<div class="card row"><h3>${response.data.name.toUpperCase()}</h3>
            <img src="${response.data.sprites.front_default}"/></div>`
            capturedDivChild = document.createElement("div");
            capturedDivChild.innerHTML = capturedHTML
            capturedDiv.appendChild(capturedDivChild);
            wantedMarker.addTo(map);
        })
    // Make start button disabled during gameplay
        start.disabled = true;
        randomPokemon();
        countdown();
        roundCounter();
        endRound();
    }

    // Start Game
    let start = document.querySelector("#start-btn");
    start.addEventListener("click", function(){
        startGame();
    })

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
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            } else if (response.data.types[0].type.name == "fire"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fireIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            } else if (response.data.types[0].type.name == "water"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: waterIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "electric"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: electricIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "grass"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: grassIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "psychic"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: psychicIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "bug"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: bugIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "poison"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: poisonIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "ground"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: groundIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "fighting"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fightingIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "rock"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: rockIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "ghost"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: ghostIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "ice"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: iceIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "dragon"){
                let randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: dragonIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }  else if (response.data.types[0].type.name == "fairy"){
                let  randomPokemonMarker = L.marker(randomPokemonMarkerPositon, {icon: fairyIcon});
                randomPokemonMarker.bindPopup(`<p>${response.data.name.toUpperCase()}</p>`)
                randomPokemonMarker.addTo(randomMarker);
            }
                randomMarker.addTo(map);
            })
        }
    } 
// Count of markers clicked on
    randomMarker.on("click", function(){
        totalCounter += 1;
    })

// Start of quit button
    let quit = document.querySelector("#quit-btn");
    quit.addEventListener("click", function(){
        // start button to be disabled after 5 rounds to prompt user to reset
        if (round == 5){
            start.disabled = true;
        } else {
            start.disabled = false;
        }
        removeMarkers()
        timer.end = 0;
        // set map back to origin after each round
        map.setView(singapore, 12);
        // updates the number of marker clicks after each round
        barChart.update();
    })
    // End of quit button

// Start of reset button
    let reset = document.querySelector("#reset-btn");
    reset.addEventListener("click", function(){
        // sets round to zero
        round = 0;
        updateRound();
        timer.end = 0;
        removeMarkers();
        // Enables start button
        start.disabled = false;
        // set map back to origin after each round
        map.setView(singapore, 12);
        alert("Start of New Game!");
        // Removes all marker click data on bar chart
        totalCounterData.length = 0;
        // Removes all pokemon profile on captured gallery
        capturedDiv.querySelectorAll("div").forEach(n => n.remove());
    })

// End of reset button
// End of Games Page

// Start of Stats Page
let options = {
    scales: {yAxes:[{
        ticks: {
            beginAtZero: true
        }
    }]}
};
// start of bar chart
let barContext = document.querySelector("#bar-chart").getContext("2d");
let barChart = new Chart(barContext, {
    type: "bar",
    data: {
        labels: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"],
        datasets: [{
            label: "Total Pokemon Marker Clicks",
            data: totalCounterData,
            backgroundColor: ["blue", "blue", "blue", "blue", "blue"]
        }]
    },
    options: options
});

// start of line chart

// let lineContext =document.querySelector("#line-chart").getContext("2d");
// let lineChart = new Chart(lineContext, {
//     type: "line",
//     data: {
//         labels: ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"],
//         datasets: [{
//             label: "Total Pokemon Marker Clicks",
//             // data: totalCounterData,
//             data: [200, 300, 400, 0, 20],
//             // color the line
//             // backgroundColor: "red",
//             // borderColor: "red",
//             // borderWidth: 1
//         }]
//     },
//     options: options
// });


})
