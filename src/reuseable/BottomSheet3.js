import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  BackHandler,
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CusButton from './cusButton';
import {useDispatch, useSelector} from 'react-redux';
import Fonts from '../Constraints/Fonts';
import CurrentPin from '../assets/StartTrio/CurrentPin.svg';
import DestinationPin from '../assets/StartTrio/DestinationPin.svg';
import Colors from '../Constraints/Colors';
import {
  addScreenName,
  addItemPropOfOperator,
  switchLIveLoc,
  doStopTrp,
  doResumeTrip,
} from '../Redux/Action/actions';
import Constraints from '../Constraints/Constraints';
import Heading from '../reuseable/heading';
import TripAlert from './TripAlert';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const DRAG_THRESHOLD = 100;
const SPRING_CONFIG = {tension: 1, friction: 1};
const DECAY_SPEED = 0.001;
const MIN_SHEET_HEIGHT = screenHeight * 0.2; // Adjust t
const MIN_SHEET_VISIBLE_HEIGHT = screenHeight * 0.2; // Minimum visible height
const MAX_SHEET_HEIGHT = screenHeight * 0.8; // Maximum height for the sheet

const BottomSheet3 = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [btnTxt, setBtnTxt] = useState('');
  const [val, setVal] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const {currentLocTxt, destLocTxt, tripStop, tripResume} = useSelector(
    reducers => reducers.allReducer,
  );
  const [height, setHeight] = useState(screenHeight * 0.2); // Set initial height to 20% of screen height

  const [dragging, setDragging] = useState(false);
  const animation = useRef(new Animated.Value(height)).current;

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    animation.setValue(height);
  }, []);

  const handleRelease = () => {
    setDragging(false);
    const currentHeight = animation._value;
    const toValue =
      currentHeight < screenHeight / 2 + DRAG_THRESHOLD
        ? screenHeight / 2
        : screenHeight;
    Animated.timing(animation, {
      toValue,
      useNativeDriver: false,
      ...SPRING_CONFIG,
    }).start();
    setHeight(toValue);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (event, gestureState) => {
      const newHeight = height - gestureState.dy;
      setDragging(true);

      // Calculate the new height, ensuring it stays within the limits
      const clampedHeight = Math.max(
        MIN_SHEET_VISIBLE_HEIGHT,
        Math.min(MAX_SHEET_HEIGHT, newHeight),
      );

      setHeight(clampedHeight);
      animation.setValue(clampedHeight);
    },
    onPanResponderRelease: (event, gestureState) => {
      setDragging(false);

      // Set the sheet height based on the release position
      const newHeight = height - gestureState.dy;
      const clampedHeight = Math.max(
        MIN_SHEET_VISIBLE_HEIGHT,
        Math.min(MAX_SHEET_HEIGHT, newHeight),
      );

      setHeight(clampedHeight);
      animation.setValue(clampedHeight);
    },
    onPanResponderTerminate: (event, gestureState) => {
      handleRelease();
    },
  });

  const handleStopTrp = () => {
    setVal('1');
    setBtnTxt('Stop');

    setShowModal(true);
    setTitle('Stop drive');
    setDesc('Your trip will be stopped');
  };

  const handleResumeTrp = () => {
    setVal('2');
    setBtnTxt('Resume');

    setShowModal(true);
    setTitle('Resume drive');
    setDesc('Your trip will be resumed');
  };

  const handleEndTrp = () => {
    setVal('3');

    setBtnTxt('Yes');
    setShowModal(true);
    setTitle('Warning');
    setDesc('Are you sure to end the trip?');
    // Alert.alert(
    //   'Alert',
    //   'Are you sure to End the trip?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //       onPress: () => {
    //         // console.log('Cancel Pressed');
    //       },
    //     },
    //     {
    //       text: 'Confirm',
    //       onPress: () => handleEnd(),
    //     },
    //   ],
    //   {cancelable: false},
    // );
  };

  const actionBtn = () => {
    if (val === '1') {
      dispatch(doStopTrp(false, true));
      dispatch(switchLIveLoc(false));
      setShowModal(false);
    } else if (val === '2') {
      dispatch(doResumeTrip(true, false));
      dispatch(switchLIveLoc(true));
      setShowModal(false);
    } else {
      dispatch(switchLIveLoc(true));
      dispatch(doResumeTrip(true, false));
      setShowModal(false);
      navigation.goBack();
      alert('Your trip has ended now');
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
      }}>
      <Animated.View
        style={{
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          height: animation,
          backgroundColor: Colors.PRIMARY_WHITE,
        }}>
        <View
          style={{
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
          }}
          {...panResponder.panHandlers}>
          <View style={styles.smallBar} />
        </View>
        <ScrollView
          horizontal={props.listDirection}
          contentContainerStyle={props.containerStyle}>
          <View style={props.cardStyleInfo}>
            <CusButton
              disabled={!tripStop}
              onPress={handleStopTrp}
              btnStyle={{
                height: 46,
                borderRadius: 8,
                marginTop: 1,
                width: '90%',
                backgroundColor: tripStop ? Colors.BLACK : Colors.PRIMARY_WHITE,
                borderColor: Colors.BLACK,
              }}
              textStyle={{
                color: tripStop ? Colors.PRIMARY_WHITE : Colors.BLACK,
                fontSize: 16,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 19,
                fontFamily: Fonts.FIGTREE,
              }}
              btntxt={Constraints.STOP_TRIP}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
                marginTop: '6%',
              }}>
              <View style={{height: 112}}>
                <CurrentPin />
                <View style={styles.dotLinesContainer}>
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                </View>
                <DestinationPin />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 110,
                  marginLeft: '3%',
                }}>
                <Heading txt={currentLocTxt} styl={styles.headerStyl} />
                <Heading txt={destLocTxt} styl={styles.headerStyl} />
              </View>
            </View>

            <CusButton
              disabled={!tripResume}
              onPress={handleResumeTrp}
              btnStyle={{
                height: 46,
                borderRadius: 8,
                marginTop: 20,
                width: '90%',
                backgroundColor: tripResume
                  ? Colors.BLACK
                  : Colors.PRIMARY_WHITE,
                borderColor: Colors.BLACK,
              }}
              textStyle={{
                color: tripResume ? Colors.PRIMARY_WHITE : Colors.BLACK,
                fontSize: 16,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 19,
                fontFamily: Fonts.FIGTREE,
              }}
              btntxt={Constraints.RESUME_TRIP}
            />
            <CusButton
              onPress={handleEndTrp}
              btnStyle={styles.btnStyleEndtRIP}
              textStyle={styles.btnTxt}
              btntxt={Constraints.END_TRIP}
            />
            <View style={styles.subContainer2}>
              <Text style={styles.contactNum}>{Constraints.NOTE}</Text>
              <Text style={styles.contactNum2}>{Constraints.NOTE_SUB}</Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
      <TripAlert
        showModal={showModal}
        hideModal={hideModal}
        actionBtn={actionBtn}
        title={title}
        desc={desc}
        btnTxt={btnTxt}
      />
    </View>
  );
};
export default BottomSheet3;
const styles = StyleSheet.create({
  label: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 23,
  },
  smallBar: {
    marginTop: '5%',
    marginBottom: '5%',
    width: 37,
    borderRadius: 3,
    height: 5,
    backgroundColor: Colors.GREY,
    alignSelf: 'center',
  },
  phone: {
    color: '#9B9B9B',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.FIGTREE,
  },
  distanceStyle: {
    color: '#27AE60',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.FIGTREE,
  },
  contactNum: {
    color: Colors.BLACK,
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 18,
    fontFamily: Fonts.FIGTREE,
    marginTop: '2%',
  },
  contactNum2: {
    color: Colors.BLACK,
    fontWeight: '400',
    fontSize: 16,
    fontFamily: Fonts.FIGTREE,
    marginTop: '2%',
    paddingBottom: '5%',
  },
  workerNameStyle: {
    color: Colors.BLACK,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: Fonts.FIGTREE,
  },
  img: {marginLeft: '2%', height: 62, width: 62, borderRadius: 10},
  subContainer: {
    height: 62,
    marginLeft: '4%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  subContainer2: {
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  btnStyle: {
    height: 46,
    borderRadius: 8,
    marginTop: 1,
    width: '90%',
    backgroundColor: Colors.BLACK,
    borderColor: Colors.BLACK,
  },
  btnStyleEndtRIP: {
    height: 46,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    backgroundColor: '#EB5757',
    borderWidth: 0,
  },
  btnStylerResumeTRIP: {
    height: 46,
    borderRadius: 8,
    marginTop: 20,
    width: '90%',
    backgroundColor: Colors.PRIMARY_WHITE,
    borderColor: Colors.BLACK,
  },
  btnTxt: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
  btnTxtResume: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
  dotLinesContainer: {
    flexDirection: 'column',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: 3.2,
    height: 9,
    borderRadius: 2,
    backgroundColor: '#C8C7CC',
  },
  headerStyl: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    fontStyle: 'normal',
    fontFamily: Fonts.FIGTREE,
    width: '55%',
  },
});
