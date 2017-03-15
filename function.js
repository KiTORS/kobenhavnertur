// -- VARIABLER -- //
var map;
var list;
var list_groups;

// -- GOOGLE MAP -- //
function initMap() {
    console.log("Google Map Loadet");
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {
            lat: 55.706510,
            lng: 12.539087
        },
        disableDefaultUI: true,
    });

    // -- GEOLOCATION - MY LOCATION -- //
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var minPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(minPos);
            var mig = new google.maps.Marker({
                position: minPos,
                map: map,
            });
        });
        console.log("my location loadet")
    }
}

// -- JSON DATA -- //
$.getJSON("data.json", showList);
$.getJSON("data_groups.json", showList_groups);

function showList(data) {
    console.log("JSON Loadet");
    data.forEach(createMarker);
    list = data;
}

function showList_groups(data) {
    console.log("JSON groups Loadet");
    list_groups = data;
}

// -- LAV EN MARKER -- //
function createMarker(post) {

    // -- MARKER VARIABEL --//
    console.log("Marker Made");
    var marker = new google.maps.Marker({
        position: post.position,
        map: map,
        title: post.name
    });
    marker.addListener("click", clickOnMarker);


    // -- CLICK ON MARKER -- //
    function clickOnMarker() {
        console.log("click on marker");
        var infowindow = new google.maps.InfoWindow({});

        // -- CLONE -- //
        var klon = document.querySelector("#infobox").content.cloneNode(true);

        klon.querySelector(".data_name").textContent = post.name;
        klon.querySelector(".data_about").textContent = post.about;

        infowindow.setContent(klon);
        infowindow.open(map, marker);

    }
};
$(".score_button").on("click", score);

function score() {
    list_groups.forEach(scoreclone);
    console.log("click on score");

    function scoreclone(post) {
        console.log("kloner score");
        // -- CLONE -- //
        var klon = document.querySelector("#score_window").content.cloneNode(true);

        klon.querySelector(".data_gruppe01").textContent = post.group;
        klon.querySelector(".data_gruppe02").textContent = post.group;
        klon.querySelector(".data_gruppe03").textContent = post.group;
        klon.querySelector(".data_gruppe04").textContent = post.group;
        klon.querySelector(".data_gruppe05").textContent = post.group;

        document.querySelector(".scoreboard").innerHTML = "";
        document.querySelector(".scoreboard").appendChild(klon);

        $(".scoreboard").toggleClass("scoretoggle");
    }
};
