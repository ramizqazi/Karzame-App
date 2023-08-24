import React, {useEffect, useState} from 'react';
import {
  Text,
  Modal,
  Dimensions,
  Pressable,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import TextInp from './textInput';

import LoadingModal from './LoadingModal';
import VerifyIcon from '../assets/VerifyModal/VerifyIcon.svg';
import DocScan from '../assets/VirtualTravelGuard/DocScan.svg';
import Colors from '../Constraints/Colors';
import Constraints from '../Constraints/Constraints';

const {height, width} = Dimensions.get('window');

const ReportModal = props => {
  const navigation = useNavigation();
  const [kidnapInp, setKidnapInp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [vehicleName, setVehicleName] = useState('');
  const dispatch = useDispatch();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Get the date part
  // Get hours, minutes, and seconds
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  // Convert to 12-hour clock format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm} - ${formattedDate}`;

  const {userId, catUser, userObjectKey, currentLat, currentLong} = useSelector(
    reducer => reducer.allReducer,
  );

  const handleSubmit = () => {
    setShowModal(true);
    if (kidnapInp.length > 0) {
      const whistleRef = database()
        .ref('users/' + userObjectKey + '/Whistle_Blow')
        .push();

      whistleRef
        .set({
          key: whistleRef.key,
          Report: kidnapInp,
          Type: props.type,
          currentLat: currentLat ? currentLat : 0,
          currentLong: currentLong ? currentLong : 0,
          Date: formattedTime,
        })
        .then(() => {
          // console.log('Report saved to DB');
          setKidnapInp('');
          setShowModal(false);
          props.hideModal();
        })
        .catch(error => {
          // console.log(error);
          setShowModal(false);
        });
    } else {
      setShowModal(false);
      alert('Field should not be empty');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideModal();
      }}
      visible={props.showModal}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />

      <TouchableOpacity
        onPress={() => {
          props.hideModal();
          setTimeout(() => {
            props.hideModal();
          }, 400);
        }}
        style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          <View onPress={() => {}} style={styles.touchableView}>
            <Text style={styles.subTxt1}>{props.type}</Text>

            <TextInp
              inputContainer={styles.inputContainer}
              style={styles.inputStyle}
              placeholder={'Type here'}
              placeholderTextColor={Colors.GREY}
              value={kidnapInp}
              onChangeText={txt => setKidnapInp(txt)}
              icon={<DocScan />}
              multiline={true}
              numberOfLines={5}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.btnStyle}>
              <Text style={styles.textStyle}>{Constraints.POST_TO_ADMIN}</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <LoadingModal showModal={showModal} navigation={navigation} />
      </TouchableOpacity>
    </Modal>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000B2',
  },
  subTxt1: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 20,
    marginBottom: 10,
  },
  earningView: {
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '75%',
    paddingVertical: 20,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    padding: 5,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GREY,
  },
  inputStyle: {
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    padding: 10,
    textAlignVertical: 'top',
  },
  btnStyle: {
    height: 49,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
});
