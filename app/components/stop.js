import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {fetchArrivalTimes, clearArrivalTimes} from '../actions/stop';

const {height, width} = Dimensions.get('window');

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
    marginHorizontal: 20,
  },
  closeBtnContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  arrival: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});

class Stop extends Component {
  componentWillMount() {
    console.log(this.props.data);
    this.props.data.forEach((stop) => this.props.fetchArrivalTimes(stop.id));
  }

  componentWillUnmount() {
    this.props.clearArrivalTimes();
  }

  renderClose = () => {
    return (
      <View style={styles.closeBtnContainer}>
        <TouchableOpacity onPress={Actions.pop}>
          <Text>Zamknij</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderArrival = ({item}) => {
    console.log('arrival', item);
    console.log(routeList[item.routeId]);
    let routeName = routeList[item.routeId];
    routeName = routeName ? routeName.name : '';
    return (
      <View style={styles.arrival}>
        <Text>
          {routeName}
        </Text>
        <Text>
          {item.headsign}
        </Text>
        <Text>
          {item.estimatedTime}
        </Text>
      </View>
    );
  };

  render() {
    console.log('props', this.props.arrivalTimes);
    return (
      <View style={[styles.container, {height, width}]}>
        {this.renderClose()}
        <View flex={1} style={styles.inner}>
          <Text>Przystanek</Text>
          <Text>{this.props.stopName}</Text>
          {this.props.arrivalTimes &&
          <FlatList renderItem={this.renderArrival} data={this.props.arrivalTimes}/>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  first: null,
  arrivalTimes: state.stopReducer.arrivalTimes,
});

const mapDispatch = {
  fetchArrivalTimes,
  clearArrivalTimes,
};

export default connect(mapStateToProps, mapDispatch)(Stop);
