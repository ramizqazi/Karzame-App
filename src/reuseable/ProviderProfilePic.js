import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Provider from '../assets/ProviderDetails/Provider.svg';
import Msg from '../assets/ProviderDetails/Msg.svg';
import Call from '../assets/ProviderDetails/Call.svg';

const ProviderProfilePic = ({}) => {
  return (
    <View
      style={{
        marginBottom: '2%',
      }}>
      <View
        style={{
          marginTop: '2%',
          alignSelf: 'center',
          width: 200,
          height: 200,
          borderRadius: 200 / 2,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          borderColor: '#FD6B22',
          borderWidth: 3,
        }}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
          <Image
            resizeMode="contain"
            style={{
              width: 190,
              height: 190,
              borderRadius: 190 / 2,
            }}
            source={require('../assets/ProviderDetails/P.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: -30,
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          style={styles.notificationContainer}>
          <Msg />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          style={styles.notificationContainer}>
          <Call />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: '#FD6B22',
    width: 45,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ProviderProfilePic;
