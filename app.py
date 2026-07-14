from flask import Flask, render_template, jsonify, request
from services.ors import get_route
from simulate import get_all_locations, get_routes

app = Flask(__name__)

# -----------------------------
# Test locations (Secunderabad)
# -----------------------------

# -----------------------------
# Test locations (Hyderabad)
# -----------------------------

# Start: KIMS Hospital, Secunderabad
START = (17.4358, 78.4846)

# Destination: Yashoda Hospital, Secunderabad
END = (17.4418003, 78.4971353)
# -----------------------------
# Notification Storage
# -----------------------------
notification = "No notifications."

# -----------------------------
# Live Patient Data (AMB001)
# -----------------------------
patient_data = {
    "patientName": "Rahul Sharma",
    "age": 42,
    "bloodGroup": "O+",
    "status": "Critical",
    "heartRate": "86 bpm",
    "spo2": "98%",
    "bp": "118 / 76 mmHg",
    "temp": "37.1 °C"
}

signals = {
    1: "RED",
    2: "RED",
    3: "RED"
}
# Rerouting state
reroute = False

# Alternate waypoint (example location)
# Alternate route waypoint (Minister Road area)
WAYPOINT = (17.4388, 78.4928)
# -----------------------------
# Pages
# -----------------------------
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/hospital")
def hospital():
    return render_template("hospital.html")


@app.route("/police")
def police():
    return render_template("police.html")


@app.route("/driver")
def driver():
    return render_template("driver.html")


# -----------------------------
# Route API
# -----------------------------
@app.route("/api/route/<ambulance_id>")
def route(ambulance_id):

    ambulances = get_all_locations()

    if ambulance_id not in ambulances:
        return jsonify({"error": "Ambulance not found"}), 404

    current = ambulances[ambulance_id]

    start = (
        current["lat"],
        current["lng"]
    )

    if reroute:
        route_data = get_route(start, END, WAYPOINT)
    else:
        route_data = get_route(start, END)

    return jsonify(route_data)

# -----------------------------
# Ambulance Location API
# -----------------------------
@app.route("/api/location")
def location():

    return jsonify(get_all_locations())
# -----------------------------
# All Routes API
# -----------------------------
@app.route("/api/routes")
def routes():

    return jsonify(get_routes())

# -----------------------------
# Driver -> Police Notification
# -----------------------------
@app.route("/api/notify/<signal>")
def notify(signal):

    global notification

    notification = f"🚨 Ambulance approaching Signal {signal}"

    return jsonify({
        "success": True
    })


# -----------------------------
# Police reads notification
# -----------------------------
@app.route("/api/notification")
def get_notification():

    return jsonify({
        "message": notification
    })

@app.route("/api/signal/<int:signal>/<status>")
def update_signal(signal, status):

    signals[signal] = status.upper()

    return jsonify({
        "success": True
    })


@app.route("/api/signals")
def get_signals():

    return jsonify(signals)

@app.route("/api/reroute")
def reroute_route():

    global reroute

    reroute = True

    return jsonify({
        "success": True
    })


# -----------------------------
# Driver updates patient data
# -----------------------------
@app.route("/api/patient", methods=["POST"])
def update_patient():

    global patient_data

    patient_data = request.json

    return jsonify({
        "success": True
    })


# -----------------------------
# Hospital reads patient data
# -----------------------------
@app.route("/api/patient")
def get_patient():

    return jsonify(patient_data)


if __name__ == "__main__":
    app.run(debug=True)