import gzip
import json

useful_keys = ['stopId', 'stopDesc', 'stopName', 'stopLat', 'stopLon']

# http://ckan.multimediagdansk.pl/dataset/tristar/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b
with gzip.GzipFile('./downloaded/stops.json.gz', 'r') as fin:
    data = json.loads(fin.read().decode('utf-8'))
    dict_stops = []
    for day_data in data.values():
        dict_stops = [*dict_stops, *day_data['stops']]
    stops = {}
    for stop in dict_stops:
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
    print(f'Found {len(stops_new)} stops')
    should_save = input('Do you want to save? (y/n)\n').lower() == 'y'
    if should_save:
        with open('stops.json', 'w') as output:
            json.dump(stops_new, output, separators=(',', ':'))
