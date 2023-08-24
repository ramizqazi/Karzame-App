import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Modal,
  Dimensions,
  View,
  Pressable,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Constraints from '../Constraints/Constraints';
import Colors from '../Constraints/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
const {height, width} = Dimensions.get('window');
import Calendar from './Calendar';
import CusButton from './cusButton';
import TimeModal from './TimeModal';

const TimeDateModal = props => {
  const [showIntevalTime, setShowIntevalTime] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userId, catUser} = useSelector(reducer => reducer.allReducer);
  const minDate = new Date();

  const hanleModal = () => {
    props.hideModalTime();
  };

  const hideIntervalModal = () => {
    setShowIntevalTime(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideModalTime();
      }}
      visible={props.showTimeDateModal}>
      <StatusBar barStyle="default" backgroundColor={Colors.BTN_TXT_WHITE} />
      <Pressable onPress={() => {}} style={styles.container}>
        <View style={styles.earningView}>
          <Calendar
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
            showPicker={props.showCalendar}
            setShowPicker={props.setShowCalendar}
            txt={Constraints.DATE}
            mode={'date'}
            minimumDate={minDate}
            setErrorMessage={setErrorMessage}
            styl={{width: width / 2}}
          />
          <Calendar
            selectedDate={props.selectedTime}
            setSelectedDate={props.setSelectedTime}
            showPicker={props.showTime}
            setShowPicker={props.setShowTime}
            txt={Constraints.TIME}
            mode={'time'}
            minimumDate={minDate}
            setErrorMessage={setErrorMessage}
            styl={{width: width / 2}}
          />
          <Pressable
            onPress={() => {
              setShowIntevalTime(true);
            }}
            style={{
              paddingHorizontal: '5%',
              width: width / 2,
              height: 50,
              marginTop: '3%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              alignSelf: 'center',
              borderRadius: 10,
              borderColor: Colors.GREY,
              borderWidth: 1,
            }}>
            {props.onSelect ? (
              <Text style={{color: Colors.BLACK}}>{props.onSelect}</Text>
            ) : (
              <Text style={{color: Colors.GREY}}>Interval</Text>
            )}
          </Pressable>
          <TimeModal
            hideIntervalModal={hideIntervalModal}
            visible={showIntevalTime}
            setOnSelect={props.setOnSelect}
            styl={{width: width / 2}}
          />
          <CusButton
            onPress={hanleModal}
            btnStyle={styles.btnstyle}
            textStyle={styles.btnTxt}
            btntxt={Constraints.DONE}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default TimeDateModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '100%',
    height: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    padding: 20,
  },
  sub1: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: Colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locTxtSty: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.FIGTREE,
  },
  locTxtSty2: {
    color: '#828282',
    fontWeight: '500',
    fontSize: 12,
    marginTop: 2,
    fontFamily: Fonts.FIGTREE,
  },
  subCon: {marginLeft: 11, flexDirection: 'column', justifyContent: 'center'},
  btnstyle: {
    height: 46,
    borderRadius: 8,
    width: '90%',
    backgroundColor: Colors.BLACK,
    borderColor: Colors.BLACK,
    marginTop: '15%',
  },
  btnTxt: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
});
