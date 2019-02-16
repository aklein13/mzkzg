import React, {Component} from 'react';
import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {allStops} from './stops';
import {mapStyles} from '../constants';

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
    console.log('active', this.props.active);
    const {active} = this.props;
    let latitude = 54.516842;
    let longitude = 18.541941;
    if (active && active.length) {
      latitude = active[0].stopLat;
      longitude = active[0].stopLon;
    }
    this.state = {
      position: {
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      nightTheme: false,
      loading: true,
    };
    this.stops = {};
  }

  componentWillMount() {
    const hour = new Date().getHours();
    if (hour > 20 || hour < 7) {
      this.setState({nightTheme: true});
    }
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
    const {loading, nightTheme, position} = this.state;
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
        </MapView>
      </View>
    );
  }
}
