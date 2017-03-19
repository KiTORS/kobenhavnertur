// -- VARIABLER -- //
var map;
var list;
var list_groups;
var company_clicked = false;
var currentpost = 0;
var question_window_open = true;
var questionboard = false;
var question_answer = false;
var directionsService;
var directionsDisplay;

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
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

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
    $.getJSON("data.json", showList);
    $.getJSON("data_groups.json", showList_groups);
}

// -- JSON DATA -- //

function showList(data) {
    console.log("JSON Loadet");
    data.forEach(createMarker);
    list = data;
    list.forEach(each => {
        each.position = new google.maps.LatLng(each.position.lat, each.position.lng);
    });
    calculateAndDisplayRoute(directionsService, directionsDisplay);
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
// -- SCORE & SPØRGSMÅL KNAP -- //
$(".score_button").on("click", score_toggle);
$(".question_button").on("click", question_toggle);

function score_toggle() {
    console.log("score knap togglet");
    $(".scoreboard").toggleClass("scoretoggle");
    score_group();
}

function question_toggle() {
    console.log("question knap klikket på")
    if ((questionboard == true) && (question_answer == false)) {
        console.log("fjerner questionboard fordi questionboard=", questionboard, "question_answer=", question_answer)
        $(".questionboard").removeClass("question_open");
        $(".questionboard").on("click", question_answer_open);
        questionboard = false;
        console.log("questionboard bliver sat til", questionboard);
    } else
    if ((questionboard == false) && (question_answer == false)) {
        console.log("åbner questionboard fordi questionboard=", questionboard, "question_answer=", question_answer)
        $(".questionboard").addClass("question_open");
        questionboard = true;
        console.log("questionboard bliver sat til", questionboard);
        questions();
    } else
    if ((questionboard == false) && (question_answer == true)) {
        console.log("fjerner question answer fordi question_answer=", question_answer, "questionboard=", questionboard)
        $(".question_answer_window").css("display", "none");
        $(".questionboard").removeClass("question_open");
        question_answer = false;
        console.log("question_answer bliver sat til", question_answer);
    };
}

// -- SCORE -- //

function score_group(e) {
    console.log("click on score");

    // -- KLONER RAMMER -- //
    var windowklon = document.querySelector("#score_window").content.cloneNode(true);
    list_groups.forEach(scoreclone_group);

    // -- KLONER INDHOLD -- //
    function scoreclone_group(e) {
        console.log("kloner group score");
        // -- CLONE -- //
        var klon = windowklon.querySelector("#score_row").content.cloneNode(true);

        klon.querySelector(".data_gruppe").textContent = e.group;
        klon.querySelector(".data_points").textContent = e.group_point;

        windowklon.querySelector(".score_table_body").appendChild(klon);
    }

    // -- INDSÆTTER INDHOLD I DIV -- //
    document.querySelector(".scoreboard").innerHTML = "";
    document.querySelector(".scoreboard").appendChild(windowklon);

    // -- TAB KLIK -- //
    $(".tab_company").on("click", score_company);

}

function score_company(e) {
    console.log("click on score");

    // -- KLONER RAMMER -- //
    var windowklon = document.querySelector("#score_window").content.cloneNode(true);
    list_groups.forEach(scoreclone_company);

    // -- KLONER INDHOLD -- //
    function scoreclone_company(e) {
        console.log("kloner company score");

        // -- CLONE -- //
        var klon = windowklon.querySelector("#score_row").content.cloneNode(true);

        klon.querySelector(".data_gruppe").textContent = e.company;
        klon.querySelector(".data_points").textContent = e.company_point;

        windowklon.querySelector(".score_table_body").appendChild(klon);
    }

    // -- INDSÆTTER INDHOLD I DIV -- //
    document.querySelector(".scoreboard").innerHTML = "";
    document.querySelector(".scoreboard").appendChild(windowklon);

    // -- TAB KLIK -- //
    $(".tab_group").on("click", score_group);
}

// -- SPØRGSMÅL -- //

function questions(e) {

    console.log("viser spørgsmål");

    // -- KLONER RAMMER -- //
    var windowklon = document.querySelector("#question_window").content.cloneNode(true);
    console.log("windowklon er defineret");
    list.forEach(questionclone);
    currentpost = list[0].id;
    // -- KLONER INDHOLD -- //
    function questionclone(postdata) {
        console.log("kloner før if");
        if (postdata.id == currentpost) {
            test = postdata;
            console.log("kloner spørgsmål");
            var klon = windowklon.querySelector("#question").content.cloneNode(true);

            klon.querySelector(".data_qtitle").textContent = postdata.qtitle;
            klon.querySelector(".data_question").textContent = postdata.question;
            klon.querySelector(".data_a1").textContent = postdata.a1;
            klon.querySelector(".data_a2").textContent = postdata.a2;
            klon.querySelector(".data_a3").textContent = postdata.a3;
            klon.querySelector(".data_a4").textContent = postdata.a4;

            windowklon.querySelector(".window").appendChild(klon);

            // -- INDSÆTTER INDHOLD I DIV -- //
            document.querySelector(".questionboard").innerHTML = "";
            document.querySelector(".questionboard").appendChild(windowklon);
        };
    };
}

// -- TAK FOR SVAR PÅ SPØRGSMÅL -- //

function question_answer_open() {
    if (question_answer == false) {
        console.log("question answer åbner fordi den er", question_answer, "og questionboard=", questionboard)
        $(".question_answer_window").css("display", "block");
        $(".questionboard").removeClass("question_open");
        questionboard = false;
        question_answer = true;
        console.log("question answer bliver sat til", question_answer, "og questionboard bliver sat til", questionboard);
    } else {
        console.log("gør ingenting da question answer er åben")
    }
}

// -- DIRECTIONS / RUTEVEJLEDNING -- //

function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    directionsService.route({
        origin: list[0].position,
        destination: list[1].position,


        optimizeWaypoints: true,
        travelMode: 'WALKING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            //  var route = response.routes[0];

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
