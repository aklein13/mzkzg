import React from 'react';
import {Text} from 'react-native';
import {COLORS} from '../constants';

const TabIcon = (props) => {
  return (
    <Text
      style={{
        color: props.focused ? COLORS.main : 'white',
        fontWeight: 'bold',
        fontSize: 24,
      }}
    >
      {props.title}
    </Text>
  );
};

export default TabIcon;
