import json

useful_keys = ['stopId', 'stopDesc', 'stopName', 'stopLat', 'stopLon']

with open('./downloaded/stops.json', encoding="utf8") as f:
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
                elif key == 'stopDesc':
                    key = 'name'
                new_stop[key] = value
        # print(new_stop)
        stops[stop_id] = new_stop
    # Iterate for 2nd time just in case I want to switch back to previous structure
    stops_new = {}
    for value in stops.values():
        name = value.get('name')
        if stops_new.get(name):
            stops_new[name].append(value)
        else:
            stops_new[name] = [value]
    stops_new = {key: stops_new[key] for key in sorted(stops_new)}
    print(stops_new)
    should_save = input('Do you want to save? (y/n)\n').lower() == 'y'
    if should_save:
        with open('stops.json', 'w') as output:
            json.dump(stops_new, output)
