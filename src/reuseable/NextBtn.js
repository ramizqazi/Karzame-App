import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Constraints from '../Constraints/Constraints';

const NextBtn = props => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.btnStyle}
      onPress={props.onPress}>
      {props.loader ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <Text style={props.btnTxtStyle}>{props.txtBtn}</Text>
      )}
    </TouchableOpacity>
  );
};
export default NextBtn;

const styles = StyleSheet.create({});
