import requests
import polyline
from config import ORS_API_KEY

BASE_URL = "https://api.openrouteservice.org/v2/directions/driving-car"


def get_route(start, end, waypoint=None):

    headers = {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
    }

    # Build the coordinates list
    coordinates = [
        [start[1], start[0]]
    ]

    # Add waypoint only if rerouting
    if waypoint is not None:
        coordinates.append([waypoint[1], waypoint[0]])

    coordinates.append([end[1], end[0]])

    body = {
        "coordinates": coordinates
    }

    response = requests.post(
        BASE_URL,
        json=body,
        headers=headers
    )

    data = response.json()

    if "routes" not in data:
        print("ORS Error:", data)

        return {
            "coordinates": [],
            "distance": 0,
            "duration": 0,
            "steps": []
        }

    route = data["routes"][0]
    geometry = polyline.decode(route["geometry"])

    distance = route["summary"]["distance"]

    duration = route["summary"]["duration"]

    steps = route["segments"][0]["steps"]

    return {
        "coordinates": geometry,
        "distance": distance,
        "duration": duration,
        "steps": steps
    }