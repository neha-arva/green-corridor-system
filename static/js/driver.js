const map = L.map("map").setView([12.9770, 77.6010], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

let signal = 1;
let updates = 0;

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

    const list = document.getElementById("steps");

    data.steps.forEach(step => {

        const li = document.createElement("li");

        li.innerHTML = step.instruction;

        list.appendChild(li);

    });

    setInterval(() => {

        fetch("/api/location")
        .then(response => response.json())
        .then(location => {

            ambulance.setLatLng([location.lat, location.lng]);

            updates++;

            if (updates >= 20) {

                signal++;

                if (signal > 3)
                    signal = 3;

                updates = 0;
            }

            document.getElementById("nextSignal").innerHTML =
                "Signal " + signal;

            document.getElementById("signalDistance").innerHTML =
                 Math.max(0, 500 - (updates * 25)) + " m";

            document.getElementById("signalETA").innerHTML =
                Math.max(0, 20 - updates) + " sec";

            fetch("/api/signals")

.then(response => response.json())

.then(signals => {

    if(signals[signal] == "GREEN"){

        document.getElementById("signalStatus").innerHTML="🟢 GREEN";

    }

    else{

        document.getElementById("signalStatus").innerHTML="🔴 RED";

    }

});
        });

    }, 300);

});

function notifyPolice() {

    fetch("/api/notify/" + signal)
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            alert("Police have been notified.");

        }

    });

}

function reroute() {

    fetch("/api/reroute")
    .then(response => response.json())
    .then(data => {

        if(data.success){

            location.reload();

        }

    });

}