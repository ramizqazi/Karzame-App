import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const PopSerModItem = props => {
  return (
    <TouchableOpacity
      onPress={props.handlePress}
      style={{
        flexDirection: 'row',
        height: 40,
        width: '90%',
        marginTop: 7,
        alignItems: 'center',
      }}>
      {props.icon}
      <Text style={props.txtStyle}>{props.txt} </Text>
    </TouchableOpacity>
  );
};

export default PopSerModItem;
