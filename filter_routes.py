import json

useful_keys = ['routeId', 'agencyId', 'routeShortName', 'routeLongName']

with open('./downloaded/routes.json', encoding="utf8") as f:
    data = json.load(f)
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
            print(new_route)
            routes[route_id] = new_route
    print(f'Found {len(routes.keys())} routes')
    should_save = input('Do you want to save? (y/n)\n').lower() == 'y'
    if should_save:
        with open('routes.json', 'w') as output:
            json.dump(routes, output)
