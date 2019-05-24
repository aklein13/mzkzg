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

const markerDay = '#e51d1d';
const markerActiveDay = '#85e11a';
const markerNight = '#720e0e';
const markerActiveNight = '#44720f';

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
    const activeStops = {};
    if (activeRoute) {
      // activeRoute = 'tripId:routeId'
      line = [];
      trips[activeRoute].forEach((stop) => {
        const current = allStops[stop];
        if (!current) {
          return;
        }
        activeStops[current.id] = true;
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
      activeStops,
    };
    this.stops = {};
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
        // navigator.geolocation.watchPosition((r) => console.log(r));
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

  // setPosition = (position) => this.setState({position});

  render() {
    const {loading, nightTheme, position, line, activeStops} = this.state;
    const size = 30 - position.longitudeDelta * 800;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={position}
          // onRegionChange={this.setPosition}
          customMapStyle={nightTheme ? mapStyles.night : mapStyles.day}
          showsUserLocation
          onRegionChangeComplete={this.handleMapLoaded}
        >
          {!loading && Object.values(allStops).map(marker => (
            <Marker
              ref={(ref) => this.stops[marker.id] = ref}
              key={`${marker.id}-${size}`}
              coordinate={{latitude: marker.stopLat, longitude: marker.stopLon}}
              title={marker.name}
            >
              <View style={{
                height: size,
                width: size,
                backgroundColor: activeStops[marker.id]
                  ? nightTheme ? markerActiveNight : markerActiveDay
                  : nightTheme ? markerNight : markerDay,
                borderRadius: size / 2,
              }}/>
            </Marker>
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
