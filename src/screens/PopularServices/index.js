import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Colors from '../../Constraints/Colors';
import CheckServices from '../../assets/PopularServices/CheckServices.svg';
import AmbServices from '../../assets/PopularServices/AmbServices.svg';
import FireServices from '../../assets/PopularServices/FireServices.svg';
import TowingServices from '../../assets/PopularServices/TowingServices.svg';
import Police from '../../assets/PopularServices/Police.svg';
import WhistleBlower from '../../assets/PopularServices/WhistleBlower.svg';
import Menu from '../../assets/StartTrio/Menu.svg';
import Constraints from '../../Constraints/Constraints';
const {height, width} = Dimensions.get('window');
import Header from '../../reuseable/Header';
import InpWithIcon from '../../reuseable/InpWithIcon';
import RightArrow from '../../assets/PopularServices/RightArrow.svg';
import database from '@react-native-firebase/database';
import KeyEvent from 'react-native-keyevent';
import {useDispatch, useSelector} from 'react-redux';
import {
  addOperatorsType,
  updateCurrentUserHour,
  isModalOpen,
  isModalOpenRate,
  addApppFirstDate,
} from '../../Redux/Action/actions';
import {
  sendSMSToAllExistingUser,
  sendNotifyToAllExisting,
  checkUserExists,
  getAllUsers,
  fetchIsActive,
  handleSignOut,
} from '../../Utils/Functions';
import LoadingModal from '../../reuseable/LoadingModal';
import ReminderPopUp from '../../reuseable/ReminderPopUp';
import SubscribeModal from '../../reuseable/SubscribeModal';
import Rating from '../../reuseable/Ratings';

const PopularServices = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    userObjectKey,
    token,
    userName,
    modalOpen,
    userPhone,
    userHour,
    enteredTimeUser,
    modalOpenRate,
    appFirstOpenDate,
    currentLat,
    currentLong,
  } = useSelector(reducers => reducers.allReducer);
  const [showModal, setShowModal] = useState(false);
  const [subsribleModal, setSubsribleModal] = useState(false);
  const [isActiveAcc, setActiveAcc] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpRate, setShowPopUpRate] = useState(false);
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

  const updateUserData = () => {
    database()
      .ref(`users/${userObjectKey}/SOS`)
      .push({
        Emergency: 'A user needs emergency service',
        isRead: false,
        Date: formattedTime,
      })
      .then(() => {
        // console.log('done--- sos notify');
        alert('Emergency alert sent, you will be entertained shortly');
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const handlePress = async () => {
    Alert.alert(
      'Alert',
      'Are you sure to send emergency alert to people?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // console.log('Cancel Pressed');
          },
        },
        {
          text: 'Confirm',
          onPress: () => handleMessage(),
        },
      ],
      {cancelable: false},
    );
  };

  const handleMessage = async () => {
    updateUserData();
    try {
      setShowModal(true);
      const currentUser = await getAllUsers(userObjectKey);
      const emergencyContacts = currentUser.EmergencyContacts;
      if (!emergencyContacts) {
        setShowModal(false);
        alert('Please add emergency contacts first.');
        return;
      }
      const existingUsers = [];
      const nonExistingUsers = [];

      for (const contactKey in emergencyContacts) {
        const contact = emergencyContacts[contactKey];
        const userExists = await checkUserExists(contact, setShowModal);
        if (userExists) {
          existingUsers.push(userExists);
        } else {
          nonExistingUsers.push(contact);
        }
      }

      setShowModal(false);
      if (existingUsers.length > 0) {
        sendNotifyToAllExisting(
          existingUsers,
          userName,
          userPhone,
          setShowModal,
        );
      }

      if (nonExistingUsers.length > 0) {
        sendSMSToAllExistingUser(
          nonExistingUsers,
          userName,
          userPhone,
          setShowModal,
          currentLat,
          currentLong,
        );
      }
    } catch (error) {
      setShowModal(false);
      alert(error);
    }
  };

  useEffect(() => {
    const volumeUpSubscription = KeyEvent.onKeyUpListener(keyEvent => {
      if (keyEvent.keyCode === 24) {
        handlePress();
      }
    });

    return () => {
      volumeUpSubscription.remove();
    };
  }, []);

  const toggleDrawerFun = () => {
    navigation.toggleDrawer();
  };

  const onPress = () => {
    navigation.navigate('WellbeingCheckServices');
    // const enteredTimeUserr = new Date(enteredTimeUser);
    // // console.log('enteredTimeUser=--->', enteredTimeUserr);

    // const currentTime = new Date();
    // // console.log('current time=--->', currentTime);

    // const timeDiff = currentTime.getTime() - enteredTimeUserr.getTime();
    // // console.log('timeDiff', timeDiff);

    // const hoursPassed = Math.floor(timeDiff / (1000 * 60 * 60));

    // // console.log('hoursPassed--->', hoursPassed);

    // // console.log('user hour--->', userHour);

    // if (!enteredTimeUserr || !userHour) {
    //   // console.log('empty-----');
    //   setSubsribleModal(true);
    // } else if (hoursPassed >= userHour) {
    //   setSubsribleModal(true);
    // } else {
    //   navigation.navigate('WellbeingCheckServices');
    // }
  };

  const hideModal = () => {
    setSubsribleModal(false);
  };

  const goToOtherScreens = (name, serviceNaem) => {
    navigation.navigate(name, {serviceNaem: serviceNaem});
    dispatch(addOperatorsType(serviceNaem));
  };

  const registerVehicle = () => {
    setShowPopUp(false);
    setTimeout(() => {
      navigation.navigate('AddVehicle', {camParam: 'Cam'});
    }, 300);
  };

  const closeModal = () => {
    setShowPopUp(false);
  };

  const closeModalRate = () => {
    setShowPopUpRate(false);
  };

  useEffect(() => {
    const enteredTime = new Date();
    const timer = setTimeout(() => {
      if (!modalOpen) {
        dispatch(addApppFirstDate(enteredTime));
        setShowPopUp(true);
        dispatch(isModalOpen(true));
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [modalOpen]);

  useEffect(() => {
    const installationDate = new Date(appFirstOpenDate);
    const currentTime = new Date();

    const timeDiff = currentTime.getTime() - installationDate.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

    if (timeDiff >= oneWeek && !modalOpenRate) {
      setShowPopUpRate(true);
      dispatch(isModalOpenRate(true));
    }
  }, [modalOpenRate]);

  useEffect(() => {
    fetchIsActive(userObjectKey, setShowModal, navigation, dispatch);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />

      <Header
        navigation={navigation}
        icon={<Menu />}
        txt={Constraints.POPULAR_SERVICES}
        onPress={toggleDrawerFun}
      />
      <ScrollView
        style={{
          height: '100%',
          backgroundColor: Colors.PRIMARY_WHITE,
        }}>
        <View style={{...styles.container, marginTop: '10%'}}>
          <InpWithIcon
            onpress={() => {
              onPress();
            }}
            title={Constraints.Well_Being_check}
            subTitle={Constraints.WELLBEING_DETAIL}
            icon={<CheckServices />}
            icon2={<RightArrow />}
          />

          <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.TOWING_SERVICE);
            }}
            title={Constraints.TOWING_SERVICE}
            subTitle={Constraints.TOWING_DETAIL}
            icon={<TowingServices />}
            icon2={<RightArrow />}
          />

          <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.AMBULANCE_SERVICE);
            }}
            title={Constraints.AMBULANCE_SERVICE}
            subTitle={Constraints.AMBULANCE_DETAIL}
            icon={<AmbServices />}
            icon2={<RightArrow />}
          />

          <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.FIRE_SERVICE);
            }}
            title={Constraints.FIRE_SERVICE}
            subTitle={Constraints.FIRE_DETAIL}
            icon={<FireServices />}
            icon2={<RightArrow />}
          />

          <InpWithIcon
            onpress={() => {
              navigation.navigate('RegisteredVehicles');
            }}
            title={Constraints.ROAD_SAFETY}
            subTitle={Constraints.RdSafety_Detail}
            icon={<Police />}
            icon2={<RightArrow />}
          />

          <InpWithIcon
            onpress={() => {
              navigation.navigate('WhistleBlow');
            }}
            title={Constraints.WHISTLEBLOWER}
            subTitle={Constraints.WHISTLEBLOWERDETAIL}
            icon={<WhistleBlower style={{marginStart: 0}} />}
            icon2={<RightArrow style={{marginStart: 5}} />}
          />
        </View>
      </ScrollView>
      <LoadingModal showModal={showModal} navigate={navigation} />
      {modalOpen && (
        <ReminderPopUp
          navigate={navigation}
          visible={showPopUp}
          onClose={closeModal}
          onRegister={registerVehicle}
        />
      )}

      {modalOpenRate && (
        <Rating
          navigate={navigation}
          visible={showPopUpRate}
          onClose={closeModalRate}
        />
      )}

      <SubscribeModal
        navigation={navigation}
        subsribleModal={subsribleModal}
        hideModal={hideModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    height: height,
  },
  itemContainer: {
    borderWidth: 0.3,
    height: '100%',
    borderColor: '#A3A3A3',
    height: 82,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headStyle: {
    color: 'black',
    marginStart: 20,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0,
    height: '100%',
    width: '80%',
    marginRight: 'auto',
  },
});

export default PopularServices;
