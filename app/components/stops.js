import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {loadFavourites, loadFollowed} from '../actions/stop';
import {COLORS} from '../constants';

export const stopList = require('../../stops.json');
export let allStops = {};
Object.values(stopList).forEach(currentStops => {
  currentStops.forEach((stop) => allStops[stop.id] = stop);
});

const STOP_HEIGHT = 39.6;

const styles = StyleSheet.create({
  stop: {
    color: 'black',
    fontSize: 18,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 7,
    paddingBottom: 7,
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
});

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

class Stops extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      stops: Object.keys(stopList),
      isFavScreen: false,
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
    this.setState({stops: newStops, search: text});
  };

  keyExtractor = (item) => item;

  onStopPress = (name) => Actions.stop({stopName: name, data: stopList[name]});

  onStopLongPress = (name) => Actions.map({active: stopList[name]});

  renderStop = ({item}) => (
    <StopItem onItemPress={this.onStopPress} name={item} onLongPress={this.onStopLongPress}/>
  );

  render() {
    const {isFavScreen} = this.state;
    const ifFavEmpty = isFavScreen && Object.keys(this.props.favourites).length === 0;
    return (
      <View>
        {!isFavScreen &&
        <TextInput
          style={styles.input}
          onChangeText={this.handleSearchChange}
          value={this.state.search}
          placeholder={'Wyszukaj'}
        />
        }
        <FlatList
          data={isFavScreen ? Object.keys(this.props.favourites) : this.state.stops}
          renderItem={this.renderStop}
          keyExtractor={this.keyExtractor}
          getItemLayout={(data, index) => ({length: STOP_HEIGHT, offset: STOP_HEIGHT * index, index})}
        />
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
