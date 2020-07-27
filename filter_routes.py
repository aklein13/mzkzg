import gzip
import json

useful_keys = ['routeId', 'agencyId', 'routeShortName', 'routeLongName']

# http://ckan.multimediagdansk.pl/dataset/tristar/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851
with gzip.GzipFile('./downloaded/routes.json.gz', 'r') as fin:
    data = json.loads(fin.read().decode('utf-8'))
    routes = {}
    for date_key in data.keys():
        current_data = data[date_key]['routes']
    # data = data[list(data.keys())[0]]['routes']
        for route in current_data:
            new_route = {}
            route_id = route.get('routeId')
            for key, value in route.items():
                if key in useful_keys:
                    if key == 'routeId':
                        key = 'id'
                    elif key == 'routeShortName':
                        key = 'name'
                    new_route[key] = value
            routes[route_id] = new_route
    print(f'Found {len(routes)} routes')
    should_save = input('Do you want to save? (y/n)\n').lower() == 'y'
    if should_save:
        with open('routes.json', 'w') as output:
            json.dump(routes, output)
