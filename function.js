// -- VARIABLER -- //
var map;
var list;
var list_groups;
var company_clicked = false;

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
}
$(".score_button").on("click", score_toggle);

function score_toggle() {
    console.log("score knap togglet")
    $(".scoreboard").toggleClass("scoretoggle");
    score_group();
}

function score_group(e) {

    console.log("click on score");

    var windowklon = document.querySelector("#score_window").content.cloneNode(true);
    list_groups.forEach(scoreclone_group);

    function scoreclone_group(e) {
        console.log("kloner group score");
        // -- CLONE -- //
        var klon = windowklon.querySelector("#score_row").content.cloneNode(true);

        klon.querySelector(".data_gruppe").textContent = e.group;
        klon.querySelector(".data_points").textContent = e.group_point;

        windowklon.querySelector(".score_table_body").appendChild(klon);
    }

    document.querySelector(".scoreboard").innerHTML = "";
    document.querySelector(".scoreboard").appendChild(windowklon);

    $(".tab_company").on("click", score_company);

}

function score_company(e) {

    console.log("click on score");

    var windowklon = document.querySelector("#score_window").content.cloneNode(true);
    list_groups.forEach(scoreclone_company);

    function scoreclone_company(e) {
        console.log("kloner company score");
        // -- CLONE -- //
        var klon = windowklon.querySelector("#score_row").content.cloneNode(true);

        klon.querySelector(".data_gruppe").textContent = e.company;
        klon.querySelector(".data_points").textContent = e.company_point;

        windowklon.querySelector(".score_table_body").appendChild(klon);
    }

    document.querySelector(".scoreboard").innerHTML = "";
    document.querySelector(".scoreboard").appendChild(windowklon);

    $(".tab_group").on("click", score_group);
}
