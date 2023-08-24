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

const VerifyMail = ({showModal, hideModalMail, verifyEmail}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={hideModalMail}
      visible={showModal}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />

      <View onPress={hideModalMail} style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          <VerifyIcon />

          <Text style={styles.modalText}>Please verify your email address</Text>

          <Pressable style={styles.verifyButton} onPress={verifyEmail}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </Pressable>
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
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 20,
  },
  verifyButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.BLACK,
  },
  verifyButtonText: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default VerifyMail;
