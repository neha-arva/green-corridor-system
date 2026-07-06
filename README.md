# Integrated Emergency Vehicle Routing and Green Corridor Management System

## Overview

This project is a prototype of an intelligent emergency response system designed to reduce ambulance travel time by coordinating hospitals, ambulance drivers, and traffic police through a unified platform to create a green corridor.

The system provides:

- Real-time ambulance tracking
- Hospital monitoring dashboard
- Traffic signal coordination for green corridors
- Manual traffic signal control
- Driver notifications and decision support

---

## Features

### Hospital Dashboard
- Live ambulance GPS tracking
- Speed monitoring
- Route history visualization
- Destination hospital tracking

### Traffic Police Dashboard
- Monitor approaching ambulances
- Change traffic signals
- Create green corridors

### Driver Dashboard
- Route guidance
- Signal status notifications
- Rerouting recommendations
- Emergency signal request system

### Login Portal
- Role-based authentication
- Separate dashboards for Hospital, Driver, and Traffic Police

---

## Tech Stack

- Python
- Flask
- HTML
- CSS
- JavaScript
- Leaflet.js
- OpenStreetMap

---

## Project Structure

```
ambulance_navigation/
│
├── .venv/
│
├── services/
│   └── ors.py                   
│
├── static/
│   ├── css/
│   │   ├── home.css
│   │   ├── style.css
│   │
│   ├── js/
│   │   ├── hospital.js
│   │   ├── driver.js
│   │   └── police.js
│   │
├── templates/
│   ├── index.html
│   ├── hospital.html
│   ├── driver.html
│   └── police.html
│
├── app.py
├── config.py
├── simulate.py
├── README.md
├── .gitignore
└── requirements.txt
```

---

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Create a virtual environment

```bash
python -m venv .venv
```

3. Activate the environment

Windows:

```bash
.venv\Scripts\activate
```

4. Install dependencies

```bash
pip install -r requirements.txt
```

5. Run the Flask server

```bash
python app.py
```

6. Run the ambulance simulator

```bash
python simulate.py
```

---

## Future Enhancements

- Integration with real GPS devices
- Live traffic data using mapping APIs
- Automatic route optimization
- Smart traffic signal control
- Reroute option for drivers

---
Prototype Limitation: The current implementation focuses on validating the system architecture and inter-module communication. Real-world deployment would require integration with live GPS hardware, traffic management systems, intelligent traffic signals, mapping APIs, and secure backend services.

---

## Contributors

- Neha Sree Arvapalli
