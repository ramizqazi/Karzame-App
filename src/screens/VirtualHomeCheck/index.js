import React, {useEffect, useState} from 'react';
import {
  Switch,
  View,
  Alert,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Linking,
  Platform,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {Picker} from '@react-native-picker/picker';
import PickerBtn from '../../reuseable/PickerBtn';
import CusButton from '../../reuseable/cusButton';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import {useDispatch, useSelector} from 'react-redux';
import ArrowBack from '../../assets/WellbeingCheckServices/ArrowBack.svg';
import Header from '../../reuseable/Header';
import Constraints from '../../Constraints/Constraints';
import {virtualHomeBtns} from '../../DataStore/genderBtns';
import Heading from '../../reuseable/heading';
import Forward_Icon from '../../assets/WellbeingCheckServices/Forward_Icon.svg';
import Help from '../../assets/VirtualHomeCheck/Help.svg';

import {switchLIveLoc, addVirtualHomeLiveLoc} from '../../Redux/Action/actions';
import VirtuaHomeModal from '../../reuseable/VirtuaHomeModal';
import Keys from '../../Utils/Keys';
import {getCountry} from '../../Utils/Functions';
import CusPicker from '../../reuseable/CusPicker';
import TimeDateModal from '../../reuseable/TimeDateModal';
import {
  uploadVirtualHomeData,
  fetchData,
  requestPermission,
} from '../../Utils/Functions';
import LoadingModal from '../../reuseable/LoadingModal';

const VirtualHomeCheck = ({navigation}) => {
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(AppState.currentState);
  const [SOSInterval, setSOSInterval] = useState('');
  const [savedDate, setSavedDate] = useState('');
  const [onSelect, setOnSelect] = useState('');
  const [expandedCataegory1, setExpandedCategory1] = useState(false);
  const [homeWellBeingItems, setHomeWellBeingItems] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [showTimeDateModal, setShowTimeDateModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [countryName, setCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    userId,
    userObjectKey,
    switchBool,
    currentLat,
    currentLong,
    currentLiveLatVirtual,
    currentLiveLogVirtual,
    userSelfie,
    userVehicle,
    virtualLocTxt,
  } = useSelector(reducer => reducer.allReducer);

  const [selectedValue, setSelectedValue] = useState('lodging');

  const handleValueChange = value => {
    setSelectedValue(value);
  };

  useEffect(() => {
    getCountry(currentLat, currentLong, Keys, setCountry, setLoader);
  }, []);

  const updateUserVirtualCheckLoc = (userObjectKey, lat, long) => {
    database()
      .ref(`users/${userObjectKey}/VirtualHomeCheck`)
      .update({
        currentLiveLatVirtual: lat,
        currentLiveLogVirtual: long,
      })
      .then(() => {
        // console.log('User location updated successfully!');
      })
      .catch(error => {
        // console.log('Error updating user location: ', error);
      });
  };

  async function getLocation() {
    requestPermission(location => {
      updateUserVirtualCheckLoc(
        userObjectKey,
        location.latitude,
        location.longitude,
      );
    });
  }

  React.useEffect(() => {
    const timeIn = SOSInterval.split(' ')[0];
    let intervalId;

    if (switchBool) {
      intervalId = setInterval(() => {
        getLocation();
      }, timeIn * 60 * 1000);
    } else {
      // console.log('No location updates happening');
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [switchBool]);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    dispatch(switchLIveLoc(newValue));
  };

  const onPress = () => {
    navigation.goBack();
  };

  const handleBtn = () => {
    if (virtualLocTxt === '') {
      alert('Please select place');
    } else if (selectedDate === null) {
      alert('Please select interval');
    } else if (userSelfie === '') {
      alert('Update SOS signal selfie');
    } else if (userVehicle === '') {
      alert('Update SOS signal vehicle');
    } else if (onSelect === '') {
      alert('Select Interval');
    } else if (isEnabled === false) {
      alert('Please turn ON wellbeing check');
    } else {
      uploadVirtualHomeData(
        userObjectKey,
        currentLiveLatVirtual,
        currentLiveLogVirtual,
        selectedValue,
        selectedDate,
        selectedTime,
        userSelfie,
        userVehicle,
        setShowModal,
        virtualLocTxt,
        onSelect,
        navigation,
        dispatch,
      );
    }
  };

  const hideModal = () => {
    setShowModalLoading(false);
  };

  const hideModalTime = () => {
    setShowTimeDateModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </View>
      ) : (
        <>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: '5%',
            }}>
            <Header
              navigation={navigation}
              icon={<ArrowBack />}
              txt={Constraints.VIRTUAL_HOME_CHECK}
              onPress={onPress}
              style={{marginBottom: '10%'}}
            />

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Heading
                txt={Constraints.Well_Being_check2}
                styl={{
                  color: Colors.BLACK,
                  fontSize: 22,
                  fontWeight: '600',
                  fontStyle: 'normal',
                  lineHeight: 26,
                  fontFamily: Fonts.FIGTREE,
                }}
              />
              <Switch
                style={{}}
                trackColor={{false: Colors.GREY, true: Colors.GREEN}}
                thumbColor={
                  isEnabled ? Colors.PRIMARY_WHITE : Colors.PRIMARY_WHITE
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <Heading
              txt={Constraints.REG_WHERE_YOU_NEED}
              styl={{
                width: '90%',
                alignSelf: 'center',
                marginTop: '8%',
                color: Colors.BLACK,
                fontSize: 22,
                fontWeight: '600',
                fontStyle: 'normal',
                lineHeight: 26,
                fontFamily: Fonts.FIGTREE,
              }}
            />
            <View>
              <CusPicker
                data={virtualHomeBtns}
                onValueChange={handleValueChange}
                setShowModalLoading={setShowModalLoading}
                setSelectedValue={setSelectedValue}
                navigation={navigation}
                selectedValue={selectedValue}
                countryName={countryName}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowTimeDateModal(true);
              }}
              style={styles.cardStyle}>
              <Text style={styles.title}>
                {Constraints.SET_WELLEING_CHECK_INTERVAL}
              </Text>

              <Forward_Icon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SOSAlertSettingDaily');
              }}
              style={styles.cardStyle}>
              <Text style={styles.title}>
                {Constraints.UPDATE_SOSO_SETTING}
              </Text>

              <Forward_Icon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginTop: '30%',
                alignSelf: 'center',
                width: '90%',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'white'}}>Hello</Text>
              <Help />
            </TouchableOpacity>

            <CusButton
              onPress={handleBtn}
              btnStyle={styles.btnstyle}
              textStyle={styles.btnTxt}
              btntxt={Constraints.DONE}
            />
          </ScrollView>

          <TimeDateModal
            navigation={navigation}
            showTimeDateModal={showTimeDateModal}
            hideModalTime={hideModalTime}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            showTime={showTime}
            setShowTime={setShowTime}
            onSelect={onSelect}
            setOnSelect={setOnSelect}
          />
        </>
      )}
      <LoadingModal navigation={navigation} showModal={showModal} />
    </SafeAreaView>
  );
};

export default VirtualHomeCheck;
