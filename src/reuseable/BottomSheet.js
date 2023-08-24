import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  Linking,
  ScrollView,
} from 'react-native';
import CusButton from './../reuseable/cusButton';
import {useDispatch, useSelector} from 'react-redux';
import Fonts from '../Constraints/Fonts';
import Colors from '../Constraints/Colors';
import {addScreenName, addItemPropOfOperator} from './../Redux/Action/actions';
import Constraints from '../Constraints/Constraints';
import Call from '../assets/MapService/Call.svg';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const DRAG_THRESHOLD = 100; // threshold for when to animate the sheet back to its original position
const SPRING_CONFIG = {tension: 1, friction: 1}; // spring animation configuration
const DECAY_SPEED = 0.001; // speed at which the sheet animates back to its original position

const BottomSheet = props => {
  const dispatch = useDispatch();
  const {
    workerName,
    workerDistance,
    workerPhoneNumber,
    workerLocation,
    workerImage,
    operatorType,
  } = useSelector(reducers => reducers.allReducer);
  const [height, setHeight] = useState(screenHeight / 2.4);
  const [dragging, setDragging] = useState(false);
  const animation = useRef(new Animated.Value(height)).current;
  const matchingItems = props.data.filter(
    item => item.workerType === operatorType,
  );
  // console.log('loooopppp' + JSON.stringify(matchingItems));

  useEffect(() => {
    animation.setValue(height);
  }, []);

  const handleRelease = () => {
    setDragging(false);
    const currentHeight = animation._value;
    const toValue =
      currentHeight < screenHeight / 2.4 + DRAG_THRESHOLD
        ? screenHeight / 2.4
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
      setHeight(Math.min(screenHeight, Math.max(screenHeight / 2, newHeight)));
      animation.setValue(newHeight);
    },
    onPanResponderRelease: (event, gestureState) => {
      handleRelease();
    },
    onPanResponderTerminate: (event, gestureState) => {
      handleRelease();
    },
  });

  const handleBack = () => {
    props.setShowInfo(false);
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
          backgroundColor: 'white',
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
          {props.showInfo ? (
            <View style={props.cardStyleInfo}>
              <View style={props.cardStyle2}>
                <Image style={styles.img} source={{uri: workerImage}} />
                <View style={styles.subContainer}>
                  <Text style={styles.workerNameStyle}>{workerName}</Text>
                  <Text style={styles.phone}>
                    {workerDistance.toFixed(1)} KM Away From You
                  </Text>
                </View>
              </View>
              <View style={styles.subContainer2}>
                <Text style={styles.contactNum}>
                  {Constraints.CONTACT_NUNM}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${workerPhoneNumber}`);
                  }}
                  style={{
                    height: 70,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Call />
                  <Text style={styles.contactNum2}>{workerPhoneNumber}</Text>
                </TouchableOpacity>
              </View>
              <CusButton
                onPress={handleBack}
                btnStyle={styles.btnStyle}
                textStyle={styles.btnTxt}
                btntxt={Constraints.BACK_TO_HOME}
              />
            </View>
          ) : matchingItems.length > 0 ? (
            matchingItems.map(item => (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  props.setShowInfo(true);
                  dispatch(
                    addItemPropOfOperator(
                      item.workerName,
                      item.distance,
                      item.workerPhoneNumber,
                      item.workerLocation,
                      item.workerImage,
                      item.Latitude,
                      item.Longitude,
                    ),
                  );
                }}
                style={props.cardStyle}>
                <Image style={styles.img} source={{uri: item.workerImage}} />
                <View style={styles.subContainer}>
                  <Text style={styles.workerNameStyle}>{item.workerName}</Text>
                  <Text style={styles.phone}>{item.workerPhoneNumber}</Text>
                  <Text style={styles.distanceStyle}>
                    {item.distance.toFixed(1)} KM Away From You
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={[
                styles.containerStyle,
                {flex: 1, alignItems: 'center', justifyContent: 'center'},
              ]}>
              <Text style={styles.noProviderText}>
                No operator Available within your location
              </Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};
export default BottomSheet;
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
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
  contactNum2: {
    color: Colors.GREEN,
    fontWeight: '700',
    fontSize: 18,

    fontFamily: Fonts.FIGTREE,
    marginLeft: '4%',
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
    marginTop: 20,
    width: '90%',
    backgroundColor: Colors.BLACK,
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
  noProviderText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.GREY,
    fontFamily: Fonts.FIGTREE,
  },
  containerStyle: {
    width: '100%',
  },
});
