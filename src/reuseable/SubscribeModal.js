import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Keyboard,
  View,
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Checkk from '../assets/Subcription/Checkk.svg';
import * as Animatable from 'react-native-animatable';
import Constraints from '../Constraints/Constraints';
import VerifyIcon from '../assets/VerifyModal/VerifyIcon.svg';
import Colors from '../Constraints/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CurrentPin from '../assets/VirtualTravelGuard/CurrentPin.svg';
import DestinationPin from '../assets/VirtualTravelGuard/DestinationPin.svg';
const {height, width} = Dimensions.get('window');
import {addVirtualHomeLiveLoc, addVirtualLocTxt} from '../Redux/Action/actions';
import Keys from '../Utils/Keys';
import Calendar from './Calendar';
import CusButton from './cusButton';
import TimeModal from './TimeModal';
import database from '@react-native-firebase/database';
import TextInp from './textInput';
import Heading from './heading';
import Fonts from '../Constraints/Fonts';

const SubscribeModal = props => {
  const [loader, setLoader] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [numHours, setNumHours] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userId, catUser} = useSelector(reducer => reducer.allReducer);

  const hanleModal = () => {
    props.hideModal();
    navigation.navigate('Payment', {
      totalPrice: totalPrice,
      numHours: numHours,
      setTotalPrice: setTotalPrice,
      setNumHours: setNumHours,
    });
  };

  useEffect(() => {
    setLoader(true);
    // Fetch hourly rate from Firebase
    const fetchHourlyRate = () => {
      const hourlyRateRef = database().ref('HourlyRates');
      hourlyRateRef.on('value', snapshot => {
        const rate = snapshot.val();
        setHourlyRate(rate);
        setLoader(false);
      });
    };

    fetchHourlyRate();

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      const hourlyRateRef = database().ref('hourlyRates');
      hourlyRateRef.off();
    };
  }, []);

  const handleNumHoursChange = text => {
    // Remove non-digit characters
    const cleanedText = text.replace(/[^0-9]/g, '');
    setNumHours(cleanedText);

    const calculatedPrice = parseFloat(cleanedText) * hourlyRate;
    setTotalPrice(calculatedPrice);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        props.hideModal();
      }}
      visible={props.subsribleModal}>
      <StatusBar barStyle="default" backgroundColor={Colors.BLACK} />

      <Pressable onPress={() => {}} style={styles.container}>
        <View style={styles.earningView}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            {loader ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={Colors.BLACK} />
              </View>
            ) : (
              <>
                <Checkk />

                <Heading
                  txt={Constraints.SUBSCIPTION_TITLE}
                  styl={styles.headTxt}
                />

                <Heading
                  txt={Constraints.SUB_TITLE_SUBSCRPTION}
                  styl={[styles.subTxt3, {fontSize: 12}]}
                />

                <Heading
                  txt={Constraints.SUB_TITLE_SUBSCRPTION_WE_OFFER}
                  styl={[
                    styles.subTxt3,
                    {fontSize: 13, fontWeight: '600', color: Colors.GREEN},
                  ]}
                />

                <Heading
                  txt={Constraints.SUBSCRIBE_HOURLY}
                  styl={[
                    styles.subTxt3,
                    {
                      fontSize: 13,
                      fontWeight: '600',
                      color: Colors.RED,
                    },
                  ]}
                />

                <Heading txt={Constraints.subTxt3} styl={styles.subTxt2} />

                <Text style={[styles.subTxt2, {marginTop: 0, marginLeft: 5}]}>
                  {Constraints.PRICE}
                </Text>

                <TextInp
                  keyboardType={'numeric'}
                  inputContainer={styles.inputContainerPaas}
                  style={styles.inputStyle}
                  value={numHours}
                  placeholderTextColor={Colors.GREY}
                  placeholder={Constraints.NUM_HOURS}
                  onChangeText={handleNumHoursChange}
                  maxLength={2}
                />

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>
                    {Constraints.HOURLY_RATE}
                  </Text>
                  <Text style={styles.priceTextValue}>{'₦' + hourlyRate}</Text>
                </View>

                <View
                  style={[
                    styles.priceContainer,
                    {
                      backgroundColor: Colors.LIGHT_PINK,
                      height: 57,
                      paddingHorizontal: '3%',
                      borderRadius: 10,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.priceText,
                      {fontSize: 22, fontWeight: '700'},
                    ]}>
                    {Constraints.TOTAL_PRICE}
                  </Text>

                  <Text
                    style={[
                      styles.priceText,
                      {fontSize: 22, fontWeight: '700'},
                    ]}>
                    {isNaN(totalPrice) ? 0 : '₦' + totalPrice}
                  </Text>
                </View>

                <CusButton
                  disabled={!totalPrice}
                  onPress={hanleModal}
                  btnStyle={styles.btnstylePay}
                  textStyle={styles.btnTxt}
                  btntxt={
                    isNaN(totalPrice)
                      ? Constraints.PAY
                      : totalPrice !== 0
                      ? `${Constraints.PAY} ₦${totalPrice}`
                      : Constraints.PAY
                  }
                />

                <CusButton
                  onPress={() => {
                    setNumHours('');
                    setTotalPrice('');
                    props.hideModal();
                  }}
                  btnStyle={styles.btnstyle}
                  textStyle={styles.btnTxtCancel}
                  btntxt={Constraints.CANCEL}
                />
              </>
            )}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SubscribeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Add paddingBottom to ensure the content doesn't get cut off at the bottom
  },

  btnstyle: {
    height: 46,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.PRIMARY_WHITE,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    marginTop: '6%',
  },

  btnstylePay: {
    height: 46,
    width: '100%',
    marginTop: '6%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
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

  btnTxtCancel: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },

  earningView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '100%',
    height: '92%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
  },

  subTxt1: {
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 24,
    color: Colors.BLACK,
    marginTop: '5%',
    width: width / 1.2,
  },

  subTxt2: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'left',
    width: width / 1.2,
    color: Colors.BLACK,
    marginTop: '2%',
  },

  subTxt3: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    width: width / 1.2,
    color: '#4F4F4F',
    marginTop: '4%',
  },

  headTxt: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    color: Colors.BLACK,
    marginTop: '9%',
    width: '90%',
    alignSelf: 'flex-start',
  },

  inputStyle: {
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
  },

  inputContainer: {
    width: width / 1.2,
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
  },

  priceContainer: {
    flexDirection: 'row',
    width: width / 1.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '6%',
  },

  priceText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
    color: Colors.GREY1,
  },
  priceTextValue: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
    color: Colors.GREY1,
  },
  inputContainerPaas: {
    marginTop: '4%',
    paddingHorizontal: '5%',
    width: '90%',
    height: 50,
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
    borderStartWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  inputStyle: {
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
  },
});
