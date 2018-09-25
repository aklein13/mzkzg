import json

with open('./downloaded/trips.json', encoding="utf8") as f:
    data = json.load(f)
    trips = {}
    # Output in format: {"route_id": ["stop_id", "stop_id"]}
    for date_key in data.keys():
        current_data = data[date_key]['stopsInTrip']
        for trip in current_data:
            new_route = {}
            route_id = trip.get('routeId')
            if not trips.get(route_id):
                trips[route_id] = {}
            stop_id = trip.get('stopId')
            # Can somehow get order here later
            # stop_sequence = trip.get('stopSequence')
            trips[route_id].update({stop_id: True})
    for key, item in trips.items():
        trips[key] = list(item.keys())
    print(f'Found {len(trips.keys())} trips')
    should_save = input('Do you want to save? (y/n)\n').lower() == 'y'
    if should_save:
        with open('trips.json', 'w') as output:
            json.dump(trips, output)
