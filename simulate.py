from services.ors import get_route

START = (17.4358, 78.4846)
END = (17.4418003, 78.4971353)

route = get_route(START, END)["coordinates"]

# -----------------------------------
# Create smoother movement
# -----------------------------------

smooth_route = []

for i in range(len(route)-1):

    lat1, lon1 = route[i]
    lat2, lon2 = route[i+1]

    # 10 intermediate points
    for j in range(10):

        t = j / 10

        lat = lat1 + (lat2-lat1)*t
        lon = lon1 + (lon2-lon1)*t

        smooth_route.append((lat, lon))

smooth_route.append(route[-1])

current_index = 0


def get_current_location():

    global current_index

    location = smooth_route[current_index]

    current_index += 1

    if current_index >= len(smooth_route):

        current_index = len(smooth_route)-1

    return {

        "lat": location[0],

        "lng": location[1]

    }