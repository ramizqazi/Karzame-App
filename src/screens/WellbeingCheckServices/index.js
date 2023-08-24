import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import ArrowBack from '../../assets/WellbeingCheckServices/ArrowBack.svg';
import My_Location from '../../assets/WellbeingCheckServices/My_Location.svg';
import Header from '../../reuseable/Header';
import Constraints from '../../Constraints/Constraints';
import {WELL_BEING_BTNS} from '../../DataStore/genderBtns';

const WellbeingCheckServices = ({navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <Header
        navigation={navigation}
        icon={<ArrowBack />}
        txt={Constraints.WELLBEING_CHECK}
        onPress={onPress}
        style={{marginBottom: '10%'}}
      />

      {WELL_BEING_BTNS.map(item => {
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => {
              if (item.key === '0') {
                navigation.navigate('VirtualTravelGuard');
              } else {
                navigation.navigate('VirtualHomeCheck');
              }
            }}
            style={styles.cardStyle}>
            <View style={styles.cardSubStyle}>
              <View style={styles.imgView}>{item.icon}</View>
              <View style={styles.subContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subTitile}>{item.subTitile}</Text>
              </View>
            </View>
            <View style={{marginRight: 13}}>{item.icon2}</View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default WellbeingCheckServices;
