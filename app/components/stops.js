import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const stopList = require('../../stops.json');

const styles = StyleSheet.create({
  stop: {
    color: 'black',
    fontSize: 18,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
  }
});

class Stop extends React.PureComponent {
  handlePress = () => this.props.onItemPress(this.props.name);

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View>
          <Text style={styles.stop}>
            {this.props.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class Stops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      stops: Object.keys(stopList),
    };
  }

  handleSearchChange = (text) => {
    let newStops = Object.keys(stopList);
    if (text) {
      const searchText = text.toLowerCase();
      newStops = newStops.filter((stop) => stop.toLowerCase().includes(searchText));
    }
    this.setState({stops: newStops, search: text});
  };

  keyExtractor = (item) => item;

  onStopPress = (name) => {
    console.log(name);
  };

  renderStop = ({item}) => (
    <Stop onItemPress={this.onStopPress} name={item}/>
  );

  render() {
    return (
      <View>
        <TextInput
          style={{height: 50, marginLeft: 10, marginRight: 10, fontSize: 20}}
          onChangeText={this.handleSearchChange}
          value={this.state.search}
          placeholder={'Wyszukaj'}
        />
        <FlatList
          data={this.state.stops}
          renderItem={this.renderStop}
          keyExtractor={this.keyExtractor}
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
