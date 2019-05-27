import json

with open('./downloaded/stopsintrips.json', encoding="utf8") as f:
    data = json.load(f)
    trips = {}
    # Output in format: {"route_id": ["stop_id", "stop_id"]}
    for date_key in data.keys():
        current_data = data[date_key]['stopsInTrip']
        for trip in current_data:
            new_route = {}
            route_id = trip.get('routeId')
            trip_id = trip.get('tripId')
            trips_key = f'{trip_id}:{route_id}'
            if not trips.get(trips_key):
                trips[trips_key] = {}
            stop_id = trip.get('stopId')
            route_id = trip.get('routeId')
            stop_sequence = trip.get('stopSequence')
            trips[trips_key].update({stop_sequence: stop_id})
    for key, item in trips.items():
        trips[key] = [item[sequence] for sequence in sorted(item.keys())]
    print(f'Found {len(trips.keys())} trips')
    should_save = input('Do you want to save? (y/n)\n').lower() == 'y'
    if should_save:
        with open('trips.json', 'w') as output:
            json.dump(trips, output)
