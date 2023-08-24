import React, {useEffect, useRef} from 'react';
import {
  Text,
  Modal,
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../Constraints/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import VerifyIcon from '../assets/VerifyModal/VerifyIcon.svg';
const {height, width} = Dimensions.get('window');

const VerifyModal = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userId, catUser, userObjectKey} = useSelector(
    reducer => reducer.allReducer,
  );

  const handleModalHide = () => {
    setTimeout(() => {
      if (catUser === 'Standard User') {
        navigation.replace('Login');
      } else if (catUser === 'NYSC Member') {
        navigation.replace('Login');
        alert('hi');
      } else {
        navigation.replace('OperatorMode');
      }
    }, 400);
  };

  useEffect(() => {
    if (props.showModal) {
      const timer = setTimeout(() => {
        props.hideModal();
        handleModalHide();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [props.showModal]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        // props.hideModal();
      }}
      visible={props.showModal}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />

      <Pressable
        onPress={() => {
          // props.hideModal();
          // setTimeout(() => {
          //   if (catUser === 'A Common User') {
          //     navigation.replace('Login');
          //   } else {
          //     navigation.replace('OperatorMode');
          //   }
          // }, 400);
        }}
        style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          <VerifyIcon />
          <Text style={styles.subTxt1}>{props.txt}</Text>
          <Text style={styles.subTxt2}>{props.txt2}</Text>
        </Animatable.View>
      </Pressable>
    </Modal>
  );
};

export default VerifyModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#A2A2A2',
  },

  congratTxt: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FD6B22',
  },
  subTxt1: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: '7%',
  },
  subTxt2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: '5%',
  },
  containerr: {
    width: '75%',
    height: '30%',
    backgroundColor: Colors.PRIMARY_WHITE,
    borderRadius: 33,
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
});
