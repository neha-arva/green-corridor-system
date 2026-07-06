// Create the map
const map = L.map("map").setView([12.9770, 77.6010], 14);

// OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Get route from Flask
fetch("/api/route")
.then(response => response.json())
.then(data => {

    const coords = data.coordinates;

    // Draw the ORS route
    const route = L.polyline(coords, {
        color: "blue",
        weight: 5
    }).addTo(map);

    map.fitBounds(route.getBounds());

    // Ambulance marker (red)
    const ambulance = L.circleMarker(coords[0], {
    radius: 10,
    color: "red",
    fillColor: "red",
    fillOpacity: 1
    })
    .addTo(map)
    .bindPopup("🚑 Ambulance");

    // Hospital marker (Default Leaflet marker)
    L.marker(coords[coords.length - 1])
        .addTo(map)
        .bindPopup("🏥 Hospital");

    // Update dashboard cards
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

}, 300);

})
.catch(error => console.error(error));