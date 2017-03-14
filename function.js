//------- Mine variabler ---------

var image = {
    url: 'kim.svg'
};

// Variabel for tekst
var map;


// Koordinaterne, der fortæller hvor de forskellige markers skal være
// Lattitude: x-aksen
// Longittude: y-aksen

function initMap() {
    console.log("Kortet bliver vist");
    var myLatLng1 = {
        lat: 55.706510,
        lng: 12.539087
    };


    //        Markers med deres properties

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng1
    });

    // vi loader JSON
    $.getJSON("data.json", visListen);



    //             document.querySelector("#infoboks").appendChild(klon);





    //Variabler til SVG Overlay
    //     var bounds = {
    //         north: 55.70852292366827,
    //         south: 55.7044969726319,
    //         east: 12.549826564895625,
    //         west: 12.528347435104365
    //     }
    //
    //     var overlay = new google.maps.GroundOverlay('overlay-01.svg', bounds);
    //     overlay.setMap(map);

}


function visListen(listen) {
    console.log("json er loadet");
    console.table(listen);
    listen.forEach(lavEnMarker);
}


function lavEnMarker(interessepunkt) {
    console.log("lavEnMarker:", interessepunkt);
    var marker = new google.maps.Marker({
        //                Position referere til var "myLatLng" længere oppe på siden, hvor koordinaterne står
        position: interessepunkt.position,
        map: map,

        //         icon: image,
        title: interessepunkt.navn
    });



    marker.addListener("click", clickPaaIkon);


    function clickPaaIkon() {
        console.log("klik på ikon");


        //        Når man klikker på ikon, skal infoboks komme frem


        var infowindow = new google.maps.InfoWindow({
            //            content: "Kom og besøg KEA",

        });

        //Vi kloner template class
        var klon = document.querySelector("#infoboks").content.cloneNode(true);

        //Sæt data ind i klon, så alt data komemr med - brug div class fra HTML
        klon.querySelector(".data_navn").textContent = interessepunkt.navn;
        klon.querySelector(".data_beskrivelse").textContent = interessepunkt.beskrivelse;
        klon.querySelector(".data_billede").src = interessepunkt.billede;
        // Vi siger, at infowindow skal sætte content til det, vi har clonet
        infowindow.setContent(klon);
        //                Vi lader infowindow åbne i denne function
        infowindow.open(map, marker);

    }

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
    }


}
