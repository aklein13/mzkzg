import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

const stopList = require('../../stops.json');

class Stops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      stops: Object.keys(stopList),
    };
  }

  render() {
    console.log(this.state.stops);
    return (
      <View>
        <Text>Jello</Text>
        <FlatList
          data={this.state.stops}
          renderItem={({item}) => <Text key={item}>{item}</Text>}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  first: null,
});

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(Stops);
