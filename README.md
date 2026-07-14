# Integrated Emergency Vehicle Routing and Green Corridor Management System

An intelligent emergency response system that creates a digital green corridor for ambulances through real-time tracking, hospital monitoring, and traffic police coordination.

---

## Features

### 🏥 Hospital Dashboard
- Live ambulance tracking on map
- Multiple ambulance selection
- ETA and distance to destination
- Live patient details received from the driver dashboard
- Patient vitals monitoring
- Route visualization

### 🚓 Police Dashboard
- Monitor approaching ambulances
- Receive emergency notifications from ambulance drivers
- Traffic signal control (Red/Green)
- Support rerouting requests

### 🚑 Driver Dashboard
- Live ambulance navigation
- Upcoming signal information
- Notify police before intersections
- Request route rerouting
- Enter patient details manually
- Send patient information directly to hospital dashboard

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Leaflet.js

### Backend
- Python
- Flask

### APIs
- OpenRouteService API
- OpenStreetMap Tiles

---

## Project Structure

```
Green-Corridor-System/
│
├── app.py
├── config.py
├── simulate.py
│
├── services/
│   └── ors.py
│
├── templates/
│   ├── index.html
│   ├── hospital.html
│   ├── police.html
│   └── driver.html
│
├── static/
│   ├── css/
│   │   ├── home.css
│   │   └── style.css
│   │
│   └── js/
│       ├── hospital.js
│       ├── police.js
│       └── driver.js
│
└── README.md
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/neha-arva/green-corridor-system.git
```

```bash
cd green-corridor-system
```

---

## 2. Create a virtual environment

Windows

```bash
python -m venv .venv
```

Activate it

```bash
.venv\Scripts\activate
```

---

## 3. Install dependencies

```bash
pip install flask
pip install requests
pip install polyline
```

Or install all at once

```bash
pip install flask requests polyline
```

---

## 4. Configure OpenRouteService

Create a file named

```
config.py
```

Add your OpenRouteService API key

```python
ORS_API_KEY = "YOUR_API_KEY"
```

You can obtain a free API key from:

https://openrouteservice.org/dev/#/signup

---

## 5. Run the application

```bash
python app.py
```

Open your browser and visit

```
http://127.0.0.1:5000
```

---

# Workflow

1. Open the Hospital Dashboard.
2. Open the Driver Dashboard.
3. Track ambulance movement in real time.
4. Driver enters patient information.
5. Hospital dashboard receives live patient details.
6. Driver notifies police before upcoming intersections.
7. Police updates traffic signals.
8. Driver can request rerouting if required.

---

# Current Prototype Features

- Multiple ambulance simulation
- Live ambulance tracking
- Dynamic route visualization
- Hospital patient monitoring
- Driver-to-hospital patient data synchronization
- Police notification system
- Traffic signal management
- Route rerouting
- OpenRouteService integration

---

# Future Improvements

- Google Maps Navigation integration
- Live GPS tracking
- Real-time traffic congestion
- Automatic rerouting
- Multiple live patient synchronization
- Authentication and user roles

---

# Contributors

- Neha Sree Arvapalli
