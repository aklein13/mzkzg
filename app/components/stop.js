import React, {Component} from 'react';
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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {fetchArrivalTimes, clearArrivalTimes, manageFavourite, setCurrentStop} from '../actions/stop';
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

class Stop extends Component {
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
    this.props.clearArrivalTimes();
    this.fetchData();
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

  renderArrival = ({item}) => {
    let routeName = routeList[item.routeId];
    routeName = routeName ? routeName.name : '';
    return (
      <View style={styles.arrival}>
        <Text style={styles.arrivalText}>
          {routeName}
        </Text>
        <Text style={[styles.arrivalText, {flex: 2}]}>
          {item.headsign}
        </Text>
        <Text style={styles.arrivalText}>
          {item.estimatedTime}
        </Text>
      </View>
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
  favourites: state.stopReducer.favourites,
  fetchingStops: state.stopReducer.fetchingStops,
});

const mapDispatch = {
  fetchArrivalTimes,
  clearArrivalTimes,
  manageFavourite,
  setCurrentStop,
};

export default connect(mapStateToProps, mapDispatch)(Stop);
