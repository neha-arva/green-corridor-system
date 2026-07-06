# Integrated Emergency Vehicle Routing and Green Corridor Management System

## Overview

This project is a prototype of an intelligent emergency response system designed to reduce ambulance travel time by coordinating hospitals, ambulance drivers, and traffic police through a unified platform.

The system provides:

- Real-time ambulance tracking
- Hospital monitoring dashboard
- Traffic signal coordination for green corridors
- Dynamic route optimization and rerouting
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
- REST APIs

---

## Project Structure

```
Project/
│
├── app.py
├── simulate.py
├── templates/
│   └── index.html
├── static/
├── README.md
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
- Push notifications to drivers
- Database support for trip history

---

## Contributors

- Neha Sree Arvapalli
