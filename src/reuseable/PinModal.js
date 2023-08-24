import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  View,
  Pressable,
  StatusBar,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constraints from '../Constraints/Constraints';
import Colors from '../Constraints/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
const {height, width} = Dimensions.get('window');
import {
  addVirtualHomeLiveLoc,
  addUserDeviceToken,
} from '../Redux/Action/actions';
import {
  fetchUserData,
  handleNumberPress,
  fetchOperatorData,
} from '../Utils/Functions';
import Heading from './heading';
import Fonts from '../Constraints/Fonts';
import LoadingModal from './LoadingModal';

const PinModal = props => {
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [numHours, setNumHours] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigation();
  const [passcode, setPasscode] = useState('');
  const dispatch = useDispatch();
  const {userId, userObjectKey, catUser} = useSelector(
    reducer => reducer.allReducer,
  );

  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (props.subsribleModal) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [slideAnim, props.subsribleModal]);

  const handleCloseModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.hideModal();
    });
  };

  const handleNumberPress = async (
    number,
    userObjectKey,
    setShowModal,
    passcode,
    setPasscode,
  ) => {
    if (passcode.length < 6) {
      const updatedPasscode = passcode + number;
      setPasscode(updatedPasscode);
      if (updatedPasscode.length === 6) {
        // setShowModal(true);
        let savedData = await AsyncStorage.getItem('userData');
        const [userEmail, userPass] = JSON.parse(savedData);
        const usersRef = database().ref('users');
        usersRef
          .orderByChild('userEmail')
          .equalTo(userEmail)
          .once('value', snapshot => {
            const userData = snapshot.val();
            if (userData) {
              const userKey = Object.keys(userData)[0];
              const user = userData[userKey];
              if (user) {
                const paramsData = {
                  email: userEmail,
                  password: updatedPasscode,
                };
                signInWithPhoneNumber(paramsData);
                // alert('Passcode is correct: ' + user.userPassword);
              } else {
                alert('Passcode is incorrect: ' + updatedPasscode);
                setPasscode('');
                setShowModal(false);
              }
            } else {
              alert('User not found');
              setShowModal(false);
              setPasscode('');
            }
          });
      }
    }
  };

  const onFingerPrint = async () => {
    let savedData = await AsyncStorage.getItem('userData');
    savedData = savedData != null ? JSON.parse(savedData) : null;
    if (savedData !== null) {
      var [userEmail, userPass] = savedData;
    }

    const optionalConfigObject = {
      title: 'Touch Id Login', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: 'red', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false,
      backgroundColor: Colors.PRIMARY_WHITE,
    };

    if (userEmail && userPass) {
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          if (biometryType === 'FaceID') {
            // console.log('FaceID is supported ');
          } else {
            // this.setState({ btnloading: true });
            TouchID.authenticate('Confirm Your Identity', optionalConfigObject)
              .then(success => {
                const paramsData = {email: userEmail, password: userPass};
                signInWithPhoneNumber(paramsData);
              })
              .catch(error => {
                // console.log(error);
              });
          }
        })
        .catch(error => {
          // Failure code
          // console.log(error);
          alert('Touch ID is not supported');
        });
    } else {
      alert('Enter email with Password');
    }
  };

  const signInWithPhoneNumber = async e => {
    try {
      setShowModal(true);
      setAllDisableLoader(true);

      const tokenDevice = await messaging().getToken();
      dispatch(addUserDeviceToken(tokenDevice));
      // console.log('Token generated:', tokenDevice);

      const userCredential = await auth().signInWithEmailAndPassword(
        e.email,
        e.password,
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          await AsyncStorage.removeItem('userData');
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify([e.email, e.password]),
          );
        } else {
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify([e.email, e.password]),
          );
        }
        const [userDataGot, operatorDataGot] = await Promise.all([
          fetchUserData(user, dispatch, tokenDevice),
          fetchOperatorData(user, dispatch, tokenDevice),
        ]);

        setShowModal(false);
        setAllDisableLoader(false);
        props.hideModal();
        setTimeout(() => {
          navigation.replace('MyDrawer');
        }, 500);

        return {user};
      } else {
        setShowModal(false);
        setAllDisableLoader(false);
        // setShowMailVerify(true);
      }

      setShowModal(false);
      setAllDisableLoader(false);
    } catch (error) {
      setShowModal(false);
      setPasscode('');
      setAllDisableLoader(false);
      let errorMessage = 'An error occurred';
      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = 'The password is invalid';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found';
          break;
        default:
          errorMessage += ': ' + error.message;
          break;
      }
      alert(errorMessage);
      // console.error(error);
      return {
        error: error.message,
      };
    } finally {
      setShowModal(false);
      setAllDisableLoader(false);
    }
  };

  const handleDeletePress = () => {
    if (passcode.length > 0) {
      setPasscode(prevPasscode => prevPasscode.slice(0, -1));
    }
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      onRequestClose={handleCloseModal}
      visible={props.subsribleModal}>
      <StatusBar barStyle="default" backgroundColor={Colors.BLACK} />

      <Animated.View
        style={[
          styles.earningView,
          {
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <View style={styles.earningView}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            <Heading txt={Constraints.ENTER_YOUR_PASS} styl={styles.headTxt} />

            <View style={styles.passcodeContainer}>
              {Array.from({length: 6}).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    passcode.length > index && styles.filledDot,
                  ]}
                />
              ))}
            </View>
            <View style={styles.keypadContainer}>
              {Array.from({length: 3}).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {Array.from({length: 3}).map((_, colIndex) => {
                    const number = rowIndex * 3 + colIndex + 1;
                    return (
                      <TouchableOpacity
                        disabled={passcode.length === 6 ? true : false}
                        key={number}
                        style={styles.keypadButton}
                        onPress={() =>
                          handleNumberPress(
                            number,
                            userObjectKey,
                            setShowModal,
                            passcode,
                            setPasscode,
                          )
                        }>
                        <Text style={styles.keypadButtonText}>{number}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.keypadButton, styles.specialButton]}
                  onPress={onFingerPrint}>
                  <Image
                    source={require('./../assets/Login/Bio.png')}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={passcode.length === 6 ? true : false}
                  style={[styles.keypadButton, styles.specialButton]}
                  onPress={() =>
                    handleNumberPress(
                      0,
                      userObjectKey,
                      setShowModal,
                      passcode,
                      setPasscode,
                    )
                  }>
                  <Text style={styles.keypadButtonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.keypadButton, styles.deleteButton]}
                  onPress={handleDeletePress}>
                  <Image
                    source={require('./../assets/Login/Del.png')}
                    style={[styles.deleteIcon, {width: 30, height: 30}]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
      <LoadingModal showModal={showModal} navigate={navigation} />
    </Modal>
  );
};

export default PinModal;

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
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '100%',
    height: '100%',
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
    fontSize: 17,
    marginBottom: 20,
    fontWeight: '600',
    lineHeight: 24,
    color: Colors.BLACK,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  passcodeContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    marginHorizontal: 9,
  },
  filledDot: {
    backgroundColor: 'black',
  },
  keypadContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },

  keypadButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  keypadButtonText: {
    fontSize: 25,
    color: Colors.BLACK,
  },

  deleteIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: Colors.BLACK,
  },
});
