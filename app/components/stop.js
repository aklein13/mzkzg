import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {fetchArrivalTimes, clearArrivalTimes, manageFavourite, setCurrentStop, changeFollowed} from '../actions/stop';
import {COLORS} from '../constants';

const {height, width} = Dimensions.get('window');
const refreshTimeout = 1000 * 30;
const routeList = require('../../routes.json');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
  },
  inner: {
    alignItems: 'center',
    paddingTop: 10,
    flex: 1,
  },
  closeBtnContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  stopName: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 24,
    color: COLORS.dark,
    textAlign: 'center',
  },
  arrival: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  arrivalText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  noArrivals: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.dark,
  },
});

const fontSize = 26;

class Stop extends PureComponent {
  constructor(props) {
    super(props);
    this.refresher = null;
  }

  fetchData = () => this.props.data.forEach((stop) => this.props.fetchArrivalTimes(stop.id, stop.name));

  componentWillMount() {
    this.props.setCurrentStop(this.props.data[0]);
    this.fetchData();
  }

  componentDidMount() {
    this.refresher = setInterval(this.refresh, refreshTimeout);
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
    this.props.setCurrentStop(null);
    this.props.clearArrivalTimes();
  }

  refresh = () => {
    if (this.props.fetchingStops) {
      return;
    }
    clearInterval(this.refresher);
    this.props.clearArrivalTimes();
    this.fetchData();
    this.refresher = setInterval(this.refresh, refreshTimeout);
  };

  setFav = () => this.props.manageFavourite(this.props.stopName);

  renderNav = () => {
    const isFav = this.props.favourites[this.props.stopName];
    return (
      <View style={styles.closeBtnContainer}>
        <TouchableOpacity onPress={this.setFav} style={{paddingLeft: 10, flex: 1}}>
          <FontAwesome5 solid={isFav} name="star" color={isFav ? COLORS.fav : 'black'} size={fontSize}/>
        </TouchableOpacity>
        {!this.props.fetchingStops
          ? <TouchableOpacity onPress={this.refresh} style={{flex: 1, alignItems: 'center'}}>
            <FontAwesome5 name="sync" color={COLORS.main} size={fontSize}/>
          </TouchableOpacity>
          : <ActivityIndicator size="large" color={COLORS.main} style={{flex: 1, height: 27.5}}/>
        }
        <TouchableOpacity onPress={Actions.pop} style={{paddingRight: 10, flex: 1, alignItems: 'flex-end'}}>
          <FontAwesome5 name="times" color={COLORS.red} size={fontSize}/>
        </TouchableOpacity>
      </View>
    );
  };

  handleLongPress = (routeName) => {
    const isFollowed = this.props.followed[routeName];
    Alert.alert(
      routeName,
      `${isFollowed ? 'Usunąć' : 'Dodać'} ${routeName} ${isFollowed ? 'z' : 'do'} ulubionych linii?`,
      [
        {text: 'Anuluj', onPress: null, style: 'cancel'},
        {text: 'Tak', onPress: () => this.props.changeFollowed(routeName)},
      ],
    );
  };

  renderArrival = ({item}) => {
    let routeName = routeList[item.routeId];
    routeName = routeName ? routeName.name : '';
    const textStyle = this.props.followed[routeName] ? {fontWeight: 'bold'} : {};
    return (
      <TouchableOpacity onLongPress={() => this.handleLongPress(routeName)}>
        <View style={styles.arrival}>
          <Text style={[styles.arrivalText, textStyle]}>
            {routeName}
          </Text>
          <Text style={[styles.arrivalText, {flex: 2}, textStyle]}>
            {item.headsign}
          </Text>
          <Text style={[styles.arrivalText, textStyle]}>
            {item.estimatedTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {arrivalTimes, fetchingStops} = this.props;
    return (
      <View style={[styles.container, {height, width}]}>
        {this.renderNav()}
        <View style={styles.inner}>
          <Text style={{marginTop: 5, fontSize: 18}}>
            Przystanek
          </Text>
          <Text style={styles.stopName}>
            {this.props.stopName}
          </Text>
          {arrivalTimes &&
          <FlatList
            renderItem={this.renderArrival}
            data={arrivalTimes}
            keyExtractor={(item, index) => item.id + index}
            refreshControl={
              <RefreshControl
                refreshing={fetchingStops !== 0}
                onRefresh={this.refresh}
                colors={[COLORS.main]}
                tintColor={COLORS.main}
              />
            }
          />
          }
          {(!arrivalTimes || arrivalTimes.length === 0) && fetchingStops === 0 &&
          <Text style={styles.noArrivals}>Brak odjazdów</Text>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  first: null,
  arrivalTimes: state.stopReducer.arrivalTimes,
  followed: state.stopReducer.followed,
  favourites: state.stopReducer.favourites,
  fetchingStops: state.stopReducer.fetchingStops,
});

const mapDispatch = {
  fetchArrivalTimes,
  clearArrivalTimes,
  manageFavourite,
  setCurrentStop,
  changeFollowed,
};

export default connect(mapStateToProps, mapDispatch)(Stop);
