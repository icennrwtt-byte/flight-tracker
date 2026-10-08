// Ohio
const start = [39.9612, -82.9988];

// South Dakota
const destination = [43.5476, -96.7294];

// Create map
const map = L.map("map").setView(start, 4);

// Add map tiles
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);

// Draw flight route
const route = L.polyline(
    [start, destination],
    {
        color: "blue",
        weight: 3,
        dashArray: "8, 8"
    }
).addTo(map);

// Aircraft icon
const planeIcon = L.divIcon({
    html: "✈️",
    className: "plane-marker",
    iconSize: [30, 30]
});

// Put plane at starting point
const plane = L.marker(start, {
    icon: planeIcon
}).addTo(map);

// Calculate movement
let progress = 0;

function movePlane() {

    progress += 0.5;

    if (progress >= 100) {
        progress = 100;
    }

    const latitude =
        start[0] +
        (destination[0] - start[0]) * (progress / 100);

    const longitude =
        start[1] +
        (destination[1] - start[1]) * (progress / 100);

    plane.setLatLng([latitude, longitude]);

    document.getElementById("progress").textContent =
        Math.round(progress) + "%";

    if (progress >= 100) {
        document.getElementById("status").textContent =
            "AWAITING PAYMENT";
    }
}

// Move every second
setInterval(movePlane, 1000);