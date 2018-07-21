import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
} from 'react-native';

class Stops extends Component {
  render() {
    return (
      <View>
        <Text>Jello</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  first: null,
});

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(Stops);
