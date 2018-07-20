import json

with open('stops.json') as f:
    data = json.load(f)
    data = data[list(data.keys())[0]]
    stops = {}
    for stop in data['stops']:
        print(stop)
        stops[stop.get('stopId')] = stop
    with open('input.json', 'w') as output:
        json.dump(stops, output)
