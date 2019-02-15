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

export const API_URL = 'http://87.98.237.99:88/delays?stopId=';

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
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.medical',
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
          'color': '#242f3e',
        },
      ],
    },
    {
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#746855',
        },
      ],
    },
    {
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#242f3e',
        },
      ],
    },
    {
      'featureType': 'administrative.locality',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#d59563',
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
          'color': '#d59563',
        },
      ],
    },
    {
      'featureType': 'poi.business',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.medical',
      'stylers': [
        {
          'visibility': 'off',
        },
      ],
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#263c3f',
        },
      ],
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#6b9a76',
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
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#38414e',
        },
      ],
    },
    {
      'featureType': 'road',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#212a37',
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
          'color': '#9ca5b3',
        },
      ],
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#746855',
        },
      ],
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#1f2835',
        },
      ],
    },
    {
      'featureType': 'road.highway',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#f3d19c',
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
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#2f3948',
        },
      ],
    },
    {
      'featureType': 'transit.station',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#d59563',
        },
      ],
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#17263c',
        },
      ],
    },
    {
      'featureType': 'water',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#515c6d',
        },
      ],
    },
    {
      'featureType': 'water',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#17263c',
        },
      ],
    },
  ],
};
