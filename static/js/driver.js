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

    setInterval(() => {

        fetch("/api/location")
        .then(response => response.json())
.then(locations => {

    const location = locations["AMB001"];

    if(!location) return;

    ambulance.setLatLng([location.lat, location.lng]);

    updates++;

    if (updates >= 25) {

        signal++;

        if (signal > 3)
            signal = 3;

        updates = 0;
    }

    document.getElementById("nextSignal").innerHTML =
        "Signal " + signal;

    document.getElementById("signalDistance").innerHTML =
        Math.max(0, 625 - (updates * 25)) + " m";

    document.getElementById("signalETA").innerHTML =
        Math.max(0, 25 - updates) + " sec";

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

    }, 700);

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

// -----------------------------
// Send Patient Details to Hospital
// -----------------------------

document.getElementById("sendPatientBtn").addEventListener("click", function () {

    const patientData = {

        patientName: document.getElementById("patientNameInput").value,

        age: document.getElementById("patientAgeInput").value,

        bloodGroup: document.getElementById("bloodGroupInput").value,

        priority: document.getElementById("priorityInput").value,

        condition: document.getElementById("conditionInput").value,

        status: document.getElementById("patientStatusInput").value,

        heartRate: document.getElementById("heartRateInput").value + " bpm",

        spo2: document.getElementById("spo2Input").value + "%",

        bp: document.getElementById("bpInput").value + " mmHg",

        temp: document.getElementById("tempInput").value + " °C"

    };

    fetch("/api/patient", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(patientData)

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            alert("✅ Patient details sent to Hospital Dashboard.");

        }

    });

});