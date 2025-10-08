export const ACTIONS = {
  FETCH_ARRIVAL_TIMES: 'fetch_arrival_times',
  START_FETCH_ARRIVAL_TIMES: 'start_fetch_arrival_times',
  FAILED_FETCH_ARRIVAL_TIMES: 'failed_fetch_arrival_times',
  CLEAR_FETCHING_STOPS: 'clear_fetching_stops',
  CLEAR_ARRIVAL_TIMES: 'clear_arrival_times',
  LOAD_FAVOURITES: 'load_favourites',
  CHANGE_FOLLOWED: 'change_followed',
  LOAD_FOLLOWED: 'load_followed',
};

export const API_URL = 'https://ckan2.multimediagdansk.pl/departures?stopId=';

export const COLORS = {
  main: '#1A237E',
  dark: '#212121',
  fav: '#ffc900',
  red: '#A71B16',
};

export const mapStyles = {
  day: [
    {
      'featureType': 'poi',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.business',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'poi.business',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.medical',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'poi.medical',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.school',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.sports_complex',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'poi.sports_complex',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'road',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'transit',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
  ],
  night: [
    {
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#1d2c4d',
        },
      ],
    },
    {
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#8ec3b9',
        },
      ],
    },
    {
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#1a3646',
        },
      ],
    },
    {
      'featureType': 'administrative.country',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#4b6878',
        },
      ],
    },
    {
      'featureType': 'administrative.land_parcel',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#64779e',
        },
      ],
    },
    {
      'featureType': 'administrative.province',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#4b6878',
        },
      ],
    },
    {
      'featureType': 'landscape.man_made',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#334e87',
        },
      ],
    },
    {
      'featureType': 'landscape.natural',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#023e58',
        },
      ],
    },
    {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#283d6a',
        },
      ],
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#6f9ba5',
        },
      ],
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#1d2c4d',
        },
      ],
    },
    {
      'featureType': 'poi.business',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'poi.business',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.medical',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'poi.medical',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#023e58',
        },
      ],
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#3C7680',
        },
      ],
    },
    {
      'featureType': 'poi.school',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.sports_complex',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'poi.sports_complex',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#304a7d',
        },
      ],
    },
    {
      'featureType': 'road',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'road',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#98a5be',
        },
      ],
    },
    {
      'featureType': 'road',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#1d2c4d',
        },
      ],
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#2c6675',
        },
      ],
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#255763',
        },
      ],
    },
    {
      'featureType': 'road.highway',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#b0d5ce',
        },
      ],
    },
    {
      'featureType': 'road.highway',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#023e58',
        },
      ],
    },
    {
      'featureType': 'transit',
      'stylers': [
        {
          'visibility': 'on',
        },
      ],
    },
    {
      'featureType': 'transit',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#98a5be',
        },
      ],
    },
    {
      'featureType': 'transit',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#1d2c4d',
        },
      ],
    },
    {
      'featureType': 'transit.line',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#283d6a',
        },
      ],
    },
    {
      'featureType': 'transit.station',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#3a4762',
        },
      ],
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#0e1626',
        },
      ],
    },
    {
      'featureType': 'water',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#4e6d70',
        },
      ],
    },
  ],
};
