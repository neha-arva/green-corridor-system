// -----------------------------
// Create Map
// -----------------------------

const map = L.map("map").setView([17.438, 78.489], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

const ambulanceDetails = {

    AMB001: {
        patient: "Rahul Sharma",
        age: 42,
        bloodGroup: "O+",
        status: "Critical",
        heartRate: "86 bpm",
        spo2: "98%",
        bp: "118 / 76 mmHg",
        temp: "37.1 °C"
    },

    AMB002: {
        patient: "Priya Singh",
        age: 29,
        bloodGroup: "B+",
        condition: "Trauma",
        priority: "Stable",
        heartRate: "79 bpm",
        spo2: "99%",
        bp: "120 / 80 mmHg",
        temp: "36.8 °C"
    },

    AMB003: {
    patient: "Mohammed Khan",
    age: 51,
    bloodGroup: "A-",

    status: "Critical",

    condition: "Chest Pain",
    priority: "Critical",

    heartRate: "94 bpm",
    spo2: "95%",
    bp: "135 / 90 mmHg",
    temp: "38.2 °C"
    }

};
let currentRoute = null;

let hospitalMarker = null;

let selectedAmbulance = "AMB001";
// -----------------------------
// Route
// -----------------------------

function updateRoute(ambulanceId){

    console.log("Updating route for:", ambulanceId);
    fetch("/api/route/" + ambulanceId)

    .then(response => response.json())

    .then(data => {

        const coords = data.coordinates;

        if(currentRoute){

            map.removeLayer(currentRoute);

        }

        currentRoute = L.polyline(coords,{
            color:"blue",
            weight:5
        }).addTo(map);

        if(!hospitalMarker){

            hospitalMarker = L.marker(
                coords[coords.length-1]
            )
            .addTo(map)
            .bindPopup("🏥 Hospital");

        }

        document.getElementById("distance").innerHTML =
            (data.distance/1000).toFixed(2) + " km";

        document.getElementById("eta").innerHTML =
            Math.ceil(data.duration/60) + " mins";

        document.getElementById("etaSide").innerHTML =
            Math.ceil(data.duration/60) + " mins";

    });

}

// -----------------------------
// Multiple Ambulance Markers
// -----------------------------

const markers = {};

const ambulanceNames = [
    "AMB001",
    "AMB002",
    "AMB003"
];

// -----------------------------
// Live Tracking
// -----------------------------

setInterval(() => {

    fetch("/api/location")

    .then(response => response.json())

    .then(locations => {

        ambulanceNames.forEach(id => {

            let location = locations[id];

            if(!location) return;

            if(!markers[id]){

                markers[id] = L.circleMarker(
                    [location.lat, location.lng],
                    {
                        radius:10,
                        color:"red",
                        fillColor:"red",
                        fillOpacity:1
                    }
                )

                .addTo(map)

                .bindPopup(
                          "<b>🚑 " + id + "</b><br>" +
                          "Patient: " + ambulanceDetails[id].patient + "<br>" +
                          "Status: " + ambulanceDetails[id].status + "<br>" +
                          "Heart Rate: " + ambulanceDetails[id].heartRate
                );

            }

            else{

                markers[id].setLatLng(
                    [location.lat, location.lng]
                );


            }

        });

    });

},700);

// -----------------------------
// Dropdown
// -----------------------------

const select = document.getElementById("ambulanceSelect");

function updateDashboard(ambulanceId){

    const details = ambulanceDetails[ambulanceId];

    if(ambulanceId !== "AMB001"){

    document.getElementById("patientName").innerHTML =
        details.patient;

    document.getElementById("patientAge").innerHTML =
        details.age;

    document.getElementById("bloodGroup").innerHTML =
        details.bloodGroup;

    document.getElementById("patientStatus").innerHTML =
        details.status;

    document.getElementById("heartRate").innerHTML =
        details.heartRate;

    document.getElementById("spo2").innerHTML =
        details.spo2;

    document.getElementById("bp").innerHTML =
        details.bp;

    document.getElementById("temp").innerHTML =
        details.temp;

    document.getElementById("priority").innerHTML =
        details.priority;

    document.getElementById("condition").innerHTML =
        details.condition;
}

    document.getElementById("status").innerHTML =
        "Tracking " + ambulanceId;

    document.getElementById("patientName").innerHTML =
        details.patient;

    document.getElementById("heartRate").innerHTML =
        details.heartRate;

    document.getElementById("spo2").innerHTML =
        details.spo2;

    document.getElementById("bp").innerHTML =
        details.bp;

    document.getElementById("temp").innerHTML =
        details.temp;

    document.getElementById("patientAge").innerHTML =
        details.age;

    document.getElementById("bloodGroup").innerHTML =
        details.bloodGroup;

    document.getElementById("patientStatus").innerHTML =
        details.status;

}

// Update whenever dropdown changes
select.addEventListener("change", function(){

    selectedAmbulance = this.value;

    updateDashboard(selectedAmbulance);

    updateRoute(selectedAmbulance);

});

// Show AMB001 details when page loads
updateDashboard("AMB001");

// Draw AMB001 route once
updateRoute("AMB001");

// -----------------------------
// Live Patient Data (AMB001)
// -----------------------------

function updatePatientData(){

    if(selectedAmbulance !== "AMB001"){
        return;
    }

    fetch("/api/patient")

    .then(response => response.json())

    .then(data => {

        document.getElementById("patientName").innerHTML =
            data.patientName;

        document.getElementById("patientAge").innerHTML =
            data.age;

        document.getElementById("bloodGroup").innerHTML =
            data.bloodGroup;

        document.getElementById("priority").innerHTML =
            data.priority;

        document.getElementById("condition").innerHTML =
            data.condition;

        document.getElementById("patientStatus").innerHTML =
            data.status;

        document.getElementById("heartRate").innerHTML =
            data.heartRate;

        document.getElementById("spo2").innerHTML =
            data.spo2;

        document.getElementById("bp").innerHTML =
            data.bp;

        document.getElementById("temp").innerHTML =
            data.temp;

    });

}

// Load immediately
updatePatientData();

// Refresh every second
setInterval(updatePatientData,1000);