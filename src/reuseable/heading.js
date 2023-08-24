import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Heading = ({styl, txt}) => {
  return (
    <View>
      <Text style={styl}>{txt}</Text>
    </View>
  );
};

export default Heading;
const styles = StyleSheet.create({});
