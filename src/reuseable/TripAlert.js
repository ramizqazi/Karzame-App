import React from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../Constraints/Colors';
import VerifyIcon from '../assets/VerifyModal/VerifyIcon.svg';

const TripAlert = ({showModal, hideModal, actionBtn, title, desc, btnTxt}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={hideModal}
      visible={showModal}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />

      <View onPress={hideModal} style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          {/* <VerifyIcon /> */}
          <Text style={[styles.modalText, {marginBottom: 13, fontSize: 20}]}>
            {title}
          </Text>
          <Text style={styles.modalText}>{desc}</Text>
          <View
            style={{
              width: '90%',
              height: 1.4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor: 'grey',
              marginBottom: 10,
            }}
          />

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Pressable style={styles.verifyButton} onPress={hideModal}>
              <Text style={styles.verifyButtonText}>Cancle</Text>
            </Pressable>
            <Pressable style={styles.verifyButton} onPress={actionBtn}>
              <Text style={styles.verifyButtonText}>{btnTxt}</Text>
            </Pressable>
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000B2',
  },
  earningView: {
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '75%',
    paddingVertical: 40,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.BLACK,
    marginBottom: 20,
  },
  verifyButton: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.BLACK,
  },
  verifyButtonText: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TripAlert;
