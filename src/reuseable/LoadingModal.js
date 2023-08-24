import React, {useEffect, useRef} from 'react';
import {
  Text,
  Modal,
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Constraints from '../Constraints/Constraints';
import VerifyIcon from '../assets/VerifyModal/VerifyIcon.svg';
import Colors from '../Constraints/Colors';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import Fonts from '../Constraints/Fonts';
const LoadingModal = props => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}}
      visible={props.showModal}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />
      <SafeAreaView onPress={() => {}} style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          <Text style={styles.subTxt1}>{Constraints.LOADING}</Text>

          <LottieView
            style={{height: 120}}
            source={require('./../assets/Login/Lod.json')}
            autoPlay
            loop={true}
          />
        </Animatable.View>
      </SafeAreaView>
    </Modal>
  );
};

export default LoadingModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  congratTxt: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FD6B22',
  },
  subTxt1: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: '7%',
    // fontFamily: Fonts.FIGTREE,
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
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '75%',
    paddingVertical: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
