import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

const {height, width} = Dimensions.get('window');

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
});

class Stop extends Component {
  renderClose = () => {
    return (
      <View style={styles.closeBtnContainer}>
        <TouchableOpacity onPress={Actions.pop}>
          <Text>Zamknij</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={[styles.container, {height, width}]}>
        {this.renderClose()}
        <View flex={1} style={styles.inner}>
          <Text>Przystanek</Text>
          <Text>{this.props.stopName}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  first: null,
});

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(Stop);
