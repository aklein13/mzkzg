import json

useful_keys = ['stopId', 'stopShortName', 'stopDesc', 'stopName', 'stopLat', 'stopLon']

with open('downloaded.json', encoding="utf8") as f:
    data = json.load(f)
    data = data[list(data.keys())[0]]
    stops = {}
    for stop in data['stops']:
        stop_id = stop.get('stopId')
        if stops.get(stop_id):
            continue
        new_stop = {}
        for key, value in stop.items():
            if key in useful_keys:
                if key == 'stopId':
                    key = 'id'
                new_stop[key] = value
        print(new_stop)
        stops[stop_id] = new_stop
    should_save = input('Do you want to save? (y/n)\n') == 'y'
    if should_save:
        with open('stops.json', 'w') as output:
            json.dump(stops, output)
