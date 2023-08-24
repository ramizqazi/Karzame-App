import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Constraints from '../Constraints/Constraints';

const SkipBtn = props => {
  return (
    <TouchableOpacity style={styles.skipBtn} onPress={props.skipOnPress}>
      <Text style={styles.skipTxt}>{Constraints.SKIP}</Text>
    </TouchableOpacity>
  );
};
export default SkipBtn;

const styles = StyleSheet.create({
  skipTxt: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  skipBtn: {top: 16, position: 'absolute', right: 16},
});
