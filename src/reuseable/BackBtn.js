import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Backk from '../assets/OTP/Backk.svg';

const BackBtn = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Backk
        width={29}
        height={29}
        style={{paddingHorizontal: '3%', alignSelf: 'flex-start'}}
      />
    </TouchableOpacity>
  );
};
export default BackBtn;

const styles = StyleSheet.create({});
