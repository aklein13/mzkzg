import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TabIcon from './TabIcon';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 49,
    width: '100%',
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const tabs = {
  favourites: 'Ulubione',
  stops: 'Przystanki',
};

const TabBar = ({ navigationState, jumpTo }) => {
  return (
    <View style={styles.tabBarContainer}>
      {Object.entries(tabs).map(([key, label], index) => {
        const isFocused = navigationState.index === index;
        return (
          <TouchableOpacity
            onPress={() => jumpTo(key)}
            key={key}
            style={[
              styles.tab,
              { backgroundColor: isFocused ? 'white' : COLORS.main },
            ]}
          >
            <TabIcon title={label} focused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
