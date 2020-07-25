import React, {Component} from 'react';
import {PermissionsAndroid, Text, View, StyleSheet} from 'react-native';
import {Polyline, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import {allStops, stopList} from './stops';
import {COLORS, mapStyles} from '../constants';
import {Actions} from 'react-native-router-flux';

const trips = require('../../trips.json');

const markerSize = 18;

const markerDay = '#e51d1d';
const markerActiveDay = '#85e11a';
const markerNight = '#720e0e';
const markerActiveNight = '#44720f';

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  marker: {
    height: markerSize,
    width: markerSize,
    borderRadius: markerSize / 2,
  },
  cluster: {
    height: markerSize,
    width: markerSize,
    borderRadius: markerSize / 2,
  },
  clusterText: {
    color: 'white',
    textAlign: 'center',
  },
});

const markers = Object.values(allStops).map((stop) => ({
  ...stop,
  location: {latitude: stop.stopLat, longitude: stop.stopLon},
}));

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
      if (trips[activeRoute]) {
        trips[activeRoute].forEach((stop) => {
          const current = allStops[stop];
          if (!current) {
            return;
          }
          activeStops[current.id] = true;
          line.push({latitude: current.stopLat, longitude: current.stopLon});
        });
      }
    }

    const hour = new Date().getHours();
    const nightTheme = hour > 20 || hour < 7;

    this.state = {
      position: {
        latitude,
        longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
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
          'title': 'TriStop',
          'message': 'TriStop wants to access your geolocation.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
            this.stops[activeStop.id].showCallout();
            return true;
          }
        });
      }
    }
  };

  renderCluster = (cluster, onPress) => {
    const {pointCount, coordinate, clusterId} = cluster;
    const clusteringEngine = this.map.getClusteringEngine();
    const clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);
    const {nightTheme} = this.state;
    const isActive = clusteredPoints.some((point) => this.state.activeStops[point.properties.item.id]);
    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={[styles.cluster, {
          backgroundColor: isActive
            ? nightTheme ? markerActiveNight : markerActiveDay
            : nightTheme ? markerNight : markerDay,
        },
        ]}>
          <Text style={styles.clusterText}>
            {pointCount}
          </Text>
        </View>
      </Marker>
    );
  };

  renderMarker = (marker) => (
    <Marker
      ref={(ref) => this.stops[marker.id] = ref}
      key={marker.id}
      coordinate={marker.location}
      title={marker.name}
      onCalloutPress={() => Actions.stop({stopName: marker.name, data: stopList[marker.name]})}
    >
      <View
        style={[styles.marker, {
          backgroundColor: this.state.activeStops[marker.id]
            ? this.state.nightTheme ? markerActiveNight : markerActiveDay
            : this.state.nightTheme ? markerNight : markerDay,
        }]}
      />
    </Marker>
  );

  render() {
    const {nightTheme, position, line} = this.state;
    return (
      <ClusteredMapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        data={markers}
        initialRegion={position}
        customMapStyle={nightTheme ? mapStyles.night : mapStyles.day}
        showsUserLocation
        onRegionChangeComplete={this.handleMapLoaded}
        renderMarker={this.renderMarker}
        renderCluster={this.renderCluster}
        maxZoom={13}
        ref={(r) => this.map = r}
      >
        {line && <Polyline
          coordinates={line}
          strokeColor={COLORS.main}
          strokeWidth={4}
        />
        }
      </ClusteredMapView>
    );
  }
}
