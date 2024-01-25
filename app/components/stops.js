import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {loadFavourites, loadFollowed} from '../actions/stop';
import {COLORS} from '../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getDistanceFromLatLonInKm } from '../utils';

export const stopList = require('../../stops.json');
export let allStops = {};
Object.values(stopList).forEach(currentStops => {
  currentStops.forEach((stop) => allStops[stop.id] = stop);
});

const STOP_HEIGHT = 39.6;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 15,
  },
  stop: {
    color: 'black',
    fontSize: 18,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 1,
    paddingVertical: 7,
    paddingLeft: 5,
  },
  input: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    marginBottom: 5,
  },
  noFavourites: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.dark,
  },
  sortBar: {
    flexDirection: 'row',
    padding: 5,
    marginLeft: 10,
  },
  sortIcon: {
    marginRight: 10,
  },
});

const fontSize = 26;

class StopItem extends PureComponent {
  handlePress = () => this.props.onItemPress(this.props.name);

  handleLongPress = () => this.props.onLongPress(this.props.name);

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress} onLongPress={this.handleLongPress}>
        <View>
          <Text style={styles.stop}>
            {this.props.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const sortTypes = {
  name: 'name',
  distance: 'distance',
};

class Stops extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      stops: Object.keys(stopList),
      isFavScreen: false,
      sortBy: sortTypes.name,
      sortDesc: false,
      position: null,
      loading: false,
    };
    this.favourites = {};
  }

  async componentWillMount() {
    if (this.props.name === '_favourites') {
      this.props.loadFavourites();
      this.setState({isFavScreen: true});
      this.props.loadFollowed();
    }
  }

  handleSearchChange = (text) => {
    let newStops = Object.keys(stopList);
    if (this.state.isFavScreen) {
      newStops = newStops.filter((key) => this.props.favourites[key]);
    }
    if (text) {
      const searchText = text.toLowerCase();
      newStops = newStops.filter((stop) => stop.toLowerCase().includes(searchText));
    }
    if (this.state.sortDesc) {
      newStops = newStops.reverse();
    }
    this.setState({stops: newStops, search: text});
  };

  getCurrentPosition = () => {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          console.log(coords);
          this.setState({
            position: { lat: coords.latitude, lon: coords.longitude },
          });
          resolve(true);
        },
        () => {
          resolve(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 10000,
        }
      );
    });
  };

  handleSort = async (sortBy, desc) => {
    this.setState({ loading: true, search: '' });
    if (sortBy === sortTypes.distance) {
      this.setState({ position: null });
      await this.getCurrentPosition();
    }
    let newStops = Object.keys(stopList);
    if (sortBy === sortTypes.distance && this.state.position) {
      newStops = newStops.sort((a, b) => {
        const stopA = stopList[a][0];
        const stopB = stopList[b][0];
        return (
          getDistanceFromLatLonInKm(
            { lat: stopA.stopLat, lon: stopA.stopLon },
            this.state.position
          ) -
          getDistanceFromLatLonInKm(
            { lat: stopB.stopLat, lon: stopB.stopLon },
            this.state.position
          )
        );
      });
    }
    else if (desc) {
      newStops = newStops.reverse();
    }
    this.setState({ stops: newStops, sortBy: sortBy, sortDesc: desc, loading: false });
  };

  keyExtractor = (item) => item;

  onStopPress = (name) => Actions.stop({stopName: name, data: stopList[name]});

  onStopLongPress = (name) => Actions.map({active: stopList[name]});

  renderStop = ({item}) => (
    <StopItem onItemPress={this.onStopPress} name={item} onLongPress={this.onStopLongPress}/>
  );

  render() {
    const { isFavScreen, sortDesc, loading } = this.state;
    const ifFavEmpty = isFavScreen && Object.keys(this.props.favourites).length === 0;
    return (
      <View style={styles.wrapper}>
        {!isFavScreen && <View style={styles.sortBar}>
          {sortDesc ?
            <TouchableOpacity
              onPress={() => this.handleSort(sortTypes.name, false)}
              style={styles.sortIcon}
              disabled={loading}
            >
              <FontAwesome5 name="sort-alpha-up" color={COLORS.main} size={fontSize} />
            </TouchableOpacity> :
            <TouchableOpacity
              onPress={() => this.handleSort(sortTypes.name, true)}
              style={styles.sortIcon}
              disabled={loading}
            >
              <FontAwesome5 name="sort-alpha-down" color={COLORS.main} size={fontSize} />
            </TouchableOpacity>
          }
          <TouchableOpacity
            onPress={() => this.handleSort(sortTypes.distance, true)}
            style={styles.sortIcon}
            disabled={loading}
          >
            <FontAwesome5 name="location-arrow" color={COLORS.main} size={fontSize}/>
          </TouchableOpacity>
        </View>
        }
        {!isFavScreen &&
        <TextInput
          style={styles.input}
          onChangeText={this.handleSearchChange}
          value={this.state.search}
          placeholder={'Wyszukaj'}
          underlineColorAndroid={COLORS.main}
          editable={!loading}
        />
        }
        {loading
          ? <ActivityIndicator size="large" color={COLORS.main} style={{ marginTop: 15 }} />
          : <FlatList
            data={isFavScreen ? Object.keys(this.props.favourites) : this.state.stops}
            renderItem={this.renderStop}
            keyExtractor={this.keyExtractor}
            getItemLayout={(data, index) => ({ length: STOP_HEIGHT, offset: STOP_HEIGHT * index, index })}
          />
        }
        {ifFavEmpty && <Text style={styles.noFavourites}>Brak ulubionych</Text>}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  first: null,
  favourites: state.stopReducer.favourites,
});

const mapDispatch = {
  loadFavourites,
  loadFollowed,
};

export default connect(mapStateToProps, mapDispatch)(Stops);
