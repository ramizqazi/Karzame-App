import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Linking,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import Header from '../../reuseable/Header';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import Constraints from '../../Constraints/Constraints';
import {supportBtns} from '../../DataStore/genderBtns';
import {
  getEmergencyContacts,
  checkUserExists,
  sendSMS,
  sendNotification,
} from '../../Utils/Functions';
import LoadingModal from '../../reuseable/LoadingModal';
import {useDispatch, useSelector} from 'react-redux';

const ListContacts = ({navigation}) => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contactToken, setContactToken] = useState('');
  const {userObjectKey, userName, userPhone, token, currentLat, currentLong} =
    useSelector(reducers => reducers.allReducer);

  useEffect(() => {
    setTimeout(() => {
      getEmergencyContacts(setEmergencyContacts, setShowModal, userObjectKey);
    }, 150);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  // const showScheduleNotification = async () => {
  //   PushNotification.localNotificationSchedule({
  //     channelId: 'test-channel',
  //     title: 'Mr.Fix',
  //     message: 'Thank You for Placing Order 😃',
  //     date: new Date(Date.now() + 1 * 100),
  //     allowWhileIdle: false,
  //   });
  // };

  const handleSendSMS = item => {
    const recipient = item.phoneNumber;
    const message = `${userName} is in emergency. Please contact him/her as soon as possible at ${userPhone}.`;
    sendSMS(recipient, message, item, setShowModal);
  };

  const handlePress = async item => {
    Alert.alert(
      'Alert',
      'Are you sure to send emergency alert to people?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Confirm',
          onPress: () => handleMessage(item),
        },
      ],
      {cancelable: false},
    );
  };

  const handleMessage = async item => {
    try {
      const userExists = await checkUserExists(item, setShowModal);
      if (userExists) {
        sendNotification(item, userExists, setShowModal, userName, userPhone);
        // alert(userExists.deviceToken);
      } else {
        handleSendSMS(item, setShowModal);
      }
    } catch (error) {
      console.log(error);
      setShowModal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Header
          navigation={navigation}
          icon={<ArrowBack />}
          txt={Constraints.EMERGENCY_CONTACT}
          onPress={handleBack}
        />

        {emergencyContacts.map(item => {
          let initial = item.Name.match(/\b(\w)/g)
            .join('')
            .toUpperCase();

          return (
            <>
              <Pressable
                key={`id${item.Name}`}
                onPress={() => {
                  handlePress(item);
                }}
                style={styles.servicesContain}>
                <View style={styles.card}>
                  <View style={styles.picContainer}>
                    <View
                      style={[
                        styles.pic,
                        {
                          backgroundColor: Colors.GREEN,
                        },
                      ]}>
                      <Text style={styles.nameInitials}>{initial}</Text>
                    </View>
                  </View>
                  <View style={styles.cardSubContainer}>
                    <Text style={styles.name}>{item.Name}</Text>
                    <Text style={[styles.name, {fontWeight: '600'}]}>
                      {item.phoneNumber}
                    </Text>
                    <Text style={[styles.name, {fontSize: 12}]}>
                      {item.relation}
                    </Text>
                  </View>
                </View>
              </Pressable>
              <View
                style={{
                  backgroundColor: Colors.GREY,
                  height: 0.8,
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: '5%',
                }}
              />
            </>
          );
        })}
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => {
            navigation.navigate('Emergency');
          }}>
          <Text style={styles.bottomBtnTxt}>+</Text>
        </TouchableOpacity>
      </ScrollView>
      <LoadingModal showModal={showModal} navigate={navigation} />
    </SafeAreaView>
  );
};

export default ListContacts;
