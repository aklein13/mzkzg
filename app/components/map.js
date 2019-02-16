import React, {Component} from 'react';
import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import MapView, {Polyline, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {allStops} from './stops';
import {COLORS, mapStyles} from '../constants';

const trips = require('../../trips.json');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    const {active, activeRoute} = this.props;

    let latitude = 54.516842;
    let longitude = 18.541941;
    if (active && active.length) {
      latitude = active[0].stopLat;
      longitude = active[0].stopLon;
    }

    let line = null;
    if (activeRoute) {
      // activeRoute = 'tripId:routeId'
      line = [];
      trips[activeRoute].forEach((stop) => {
        const current = allStops[stop];
        if (!current) {
          return;
        }
        line.push({latitude: current.stopLat, longitude: current.stopLon});
      });
    }

    const hour = new Date().getHours();
    const nightTheme = hour > 20 || hour < 7;

    this.state = {
      position: {
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      nightTheme,
      loading: true,
      line,
    };
    this.stops = {};
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.state.loading !== nextState.loading;
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'MZKZG',
          'message': 'MZKZG wants to access your geolocation.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the geolocation');
        navigator.geolocation.watchPosition((r) => console.log(r));
      } else {
        console.log('Geolocation permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  handleMapLoaded = () => {
    if (this.state.loading) {
      this.setState({loading: false});
      const {active} = this.props;
      if (active && active.length) {
        active.some((activeStop) => {
          if (this.stops[activeStop.id]) {
            console.log('show');
            this.stops[activeStop.id].showCallout();
            return true;
          }
        });
      }
    }
  };

  setPosition = (position) => this.setState({position});

  render() {
    const {loading, nightTheme, position, line} = this.state;
    console.log('line', line);

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={position}
          // onRegionChange={this.setPosition}
          customMapStyle={nightTheme ? mapStyles.night : mapStyles.day}
          showsUserLocation
          // loadingEnabled={true}
          onRegionChangeComplete={this.handleMapLoaded}
        >
          {Object.values(allStops).map(marker => (
            <Marker
              ref={(ref) => this.stops[marker.id] = ref}
              key={marker.id}
              coordinate={{latitude: marker.stopLat, longitude: marker.stopLon}}
              title={marker.name}
            />
          ))}
          {line && <Polyline
            coordinates={line}
            strokeColor={COLORS.main}
            strokeWidth={4}
          />
          }
        </MapView>
      </View>
    );
  }
}
