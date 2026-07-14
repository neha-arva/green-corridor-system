from services.ors import get_route

# -----------------------------
# Hospital Destination
# -----------------------------

END = (17.4418003, 78.4971353)

# -----------------------------
# Ambulance Start Locations
# -----------------------------

STARTS = {

    "AMB001": (17.4358, 78.4846),

    "AMB002": (17.4330, 78.4820),

    "AMB003": (17.4375, 78.4895)

}

# -----------------------------
# Create Routes
# -----------------------------

routes = {}
current_indices = {}

for ambulance_id, start in STARTS.items():

    route = get_route(start, END)["coordinates"]

    smooth_route = []

    for i in range(len(route)-1):

        lat1, lon1 = route[i]
        lat2, lon2 = route[i+1]

        for j in range(10):

            t = j/10

            lat = lat1 + (lat2-lat1)*t
            lon = lon1 + (lon2-lon1)*t

            smooth_route.append((lat, lon))

    smooth_route.append(route[-1])

    routes[ambulance_id] = smooth_route
    current_indices[ambulance_id] = 0


# -----------------------------
# Return ALL Ambulances
# -----------------------------

def get_all_locations():

    locations = {}

    for ambulance_id in routes:

        index = current_indices[ambulance_id]

        location = routes[ambulance_id][index]

        current_indices[ambulance_id] += 2

        if current_indices[ambulance_id] >= len(routes[ambulance_id]):

            current_indices[ambulance_id] = len(routes[ambulance_id]) - 1

        locations[ambulance_id] = {

            "lat": location[0],
            "lng": location[1],

            "speed": 60,
            "index": index

        }

    return locations

def get_routes():

    return routes