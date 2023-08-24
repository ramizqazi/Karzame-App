import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Linking,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import Header from '../../reuseable/Header';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import Constraints from '../../Constraints/Constraints';
import {supportBtns} from '../../DataStore/genderBtns';
import Mail from '../../assets/Support/Mail.svg';
import Mobile from '../../assets/Support/Mobile.svg';
import WhatsappIconl from '../../assets/Support/WhatsappIconl.svg';

const Support = ({navigation}) => {
  const phoneNumber = '+234 812 636 8887';
  const recipientEmail = 'recipient@example.com';
  const mailtoUrl = `mailto:${recipientEmail}`;

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePress = item => {
    if (item.key === '0') {
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    } else if (item.key === '1') {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Linking.openURL(mailtoUrl);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <Header
        navigation={navigation}
        icon={<ArrowBack />}
        txt={Constraints.CUSTOMER_SUPPORT}
        onPress={handleBack}
      />

      {supportBtns.map(item => {
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.btnsContainer}
            onPress={() => {
              handlePress(item);
            }}>
            {item.icon}
            <Text
              style={{
                marginLeft: '4%',
                fontFamily: Fonts.FIGTREE,
                color: Colors.BLACK,
                fontSize: 18,
                fontWeight: '600',
                lineHeight: 29,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default Support;
