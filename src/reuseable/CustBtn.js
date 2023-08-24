import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustBtn = props => {
  return (
    <TouchableOpacity style={props.btnStyle} onPress={props.onPress}>
      <Text style={props.btnTxtStyle}>{props.txtBtn}</Text>
    </TouchableOpacity>
  );
};
export default CustBtn;

const styles = StyleSheet.create({});
