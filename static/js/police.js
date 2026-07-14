const map = L.map("map").setView([12.9770, 77.6010], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

fetch("/api/route")
.then(response => response.json())
.then(data => {

    const coords = data.coordinates;

    const polyline = L.polyline(coords, {
        color: "blue",
        weight: 5
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    const ambulance = L.circleMarker(coords[0], {
        radius: 10,
        color: "red",
        fillColor: "red",
        fillOpacity: 1
    }).addTo(map);

    L.marker(coords[coords.length - 1])
        .addTo(map)
        .bindPopup("🏥 Hospital");

    document.getElementById("distance").innerHTML =
        (data.distance / 1000).toFixed(2) + " km";

    document.getElementById("eta").innerHTML =
        Math.ceil(data.duration / 60) + " mins";

    setInterval(() => {

        fetch("/api/location")
        .then(response => response.json())
        .then(location => {

            ambulance.setLatLng([location.lat, location.lng]);

        });

    }, 1000);

});

function turnGreen(signal){

    fetch("/api/signal/" + signal + "/GREEN")
    .then(response=>response.json())
    .then(data=>{

        document.getElementById("status"+signal).innerHTML="🟢 GREEN";

    });

}

function turnRed(signal){

    fetch("/api/signal/" + signal + "/RED")
    .then(response=>response.json())
    .then(data=>{

        document.getElementById("status"+signal).innerHTML="🔴 RED";

    });

}


// ------------------------------
// Check for notifications
// ------------------------------

setInterval(() => {

    fetch("/api/notification")

    .then(response => response.json())

    .then(data => {

        document.getElementById("notification").innerHTML =
            data.message;

    });

},700);