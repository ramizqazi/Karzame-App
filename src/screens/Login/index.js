import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Modal,
} from 'react-native';
import styles from './styles';
import PinModal from '../../reuseable/PinModal';
import database from '@react-native-firebase/database';
import Apple from '../../assets/Login/Apple.svg';
import Logo from '../../assets/Login/Logo.svg';
import Fb from '../../assets/Login/Fb.svg';
import Google from '../../assets/Login/Google.svg';
import TextInp from '../../reuseable/textInput';
import CusButton from '../../reuseable/cusButton';
import auth from '@react-native-firebase/auth';
import Eye from '../../assets/SignUp/Eye.svg';
import Eye_closed from '../../assets/SignUp/Eye_closed.svg';
import Heading from '../../reuseable/heading';
import {useDispatch, useSelector} from 'react-redux';
import {addUserid, addUserDeviceToken} from '../../Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {genderBtns} from '../../DataStore/genderBtns';
import Fonts from '../../Constraints/Fonts';
import Images from '../../Constraints/Images';
import Colors from '../../Constraints/Colors';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import LoadingModal from '../../reuseable/LoadingModal';
import messaging from '@react-native-firebase/messaging';
GoogleSignin.configure({
  webClientId:
    '1097450382217-4ol5t98b3h4s3und5mol204ggq9chbfo.apps.googleusercontent.com',
});
import {
  onGoogleButtonPress,
  onFacebookButtonPress,
  fetchUserData,
  fetchOperatorData,
} from '../../Utils/Functions';
import VerifyMail from '../../reuseable/VerifyMail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from 'react-native-touch-id';
import Understand from 'twilio/lib/rest/preview/Understand';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .matches(/^[0-9]+$/, 'Only numeric characters allowed')
    .required('Please enter your password'),
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);
  const [showMailVerify, setShowMailVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [biometric, setBiometric] = useState();
  const [pinCodeModal, setPinCodeModal] = useState(false);
  const {userId, token, userObjectKey} = useSelector(
    reducer => reducer.allReducer,
  );
  // console.log('userObjectKey:', userObjectKey);

  const togglePasswordVisibility = fieldName => {
    if (fieldName === 'password') {
      setShowPassword(!showPassword);
    } else if (fieldName === 'confirmPassword') {
    }
  };

  React.useEffect(() => {
    AsyncStorage.getItem('userData').then(res => {
      if (res) {
        setBiometric(true);
      }
    });
  }, []);

  const signUpUser = async e => {
    signInWithPhoneNumber(e);
  };

  const hideModalMail = () => {
    setShowMailVerify(false);
  };

  const updateTokenUser = async () => {
    database()
      .ref('users/' + userObjectKey)
      .update({deviceToken: token})
      .then(() => {
        // console.log('token added to DB ');
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const sendVerificationLink = async () => {
    setShowModal(true);
    setAllDisableLoader(true);
    try {
      const user = auth().currentUser;
      await user.sendEmailVerification();
      setShowModal(false);
      setAllDisableLoader(false);
      alert(
        'Verification email sent successfully to your mail, please verify, return to the app and login in ',
      );
      setShowMailVerify(false);
    } catch (error) {
      setShowModal(false);
      setAllDisableLoader(false);
      alert(
        'Error sending verification email, please try again by pressing verify. ',
        error,
      );
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
            console.log('FaceID is supported ');
          } else {
            // this.setState({ btnloading: true });
            TouchID.authenticate('Confirm Your Identity', optionalConfigObject)
              .then(success => {
                const paramsData = {email: userEmail, password: userPass};
                signInWithPhoneNumber(paramsData);
              })
              .catch(error => {
                console.log(error);
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

  const openPinModal = React.useCallback(() => {
    setPinCodeModal(!pinCodeModal);
  }, [pinCodeModal]);

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
        await Promise.all([
          fetchUserData(user, dispatch, tokenDevice),
          fetchOperatorData(user, dispatch, tokenDevice),
        ]);
        setShowModal(false);
        setAllDisableLoader(false);
        navigation.replace('MyDrawer');

        return {user};
      } else {
        setShowModal(false);
        setAllDisableLoader(false);
        setShowMailVerify(true);
      }

      setShowModal(false);
      setAllDisableLoader(false);
    } catch (error) {
      setShowModal(false);
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
      console.error(error);
      return {
        error: error.message,
      };
    } finally {
      setShowModal(false);
      setAllDisableLoader(false);
    }
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const hideModalPin = () => {
    setPinCodeModal(false);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={e => {
        signUpUser(e);
      }}>
      {({
        values,
        errors,
        touched,
        isValid,
        setFieldTouched,
        handleChange,
        handleSubmit,
      }) => (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={Colors.PRIMARY_WHITE}
          />

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <ImageBackground
              resizeMode="cover"
              style={styles.imgContainer}
              source={Images.CITY_IMG}>
              <Logo height={91} />
            </ImageBackground>

            <View
              style={{
                flex: 1,
                marginTop: -40,
                backgroundColor: Colors.PRIMARY_WHITE,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              }}>
              <View style={styles.topContainer}>
                <Heading txt={Constraints.LOGIN} styl={styles.headerStyl} />
                <View style={styles.topBar} />
              </View>

              <TextInp
                inputContainer={styles.inputContainerPaas}
                style={styles.inputStyle}
                value={values.email}
                placeholderTextColor={Colors.GREY}
                placeholder={Constraints.EMAIL_PHONE_NUMBER}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {errors.email && touched.email && (
                <Text style={styles.errTxt}>{errors.email}</Text>
              )}
              <TextInp
                inputContainer={styles.inputContainerPaas}
                style={styles.inputStyle}
                placeholderTextColor={Colors.GREY}
                placeholder={Constraints.PASSWORD}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                iconEye={<Eye />}
                keyboardType="numeric"
                iconEyeClosed={<Eye_closed />}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                mode={'password'}
                togglePasswordVisibility={togglePasswordVisibility}
              />
              {errors.password && touched.password && (
                <Text style={styles.errTxt}>{errors.password}</Text>
              )}

              <View style={styles.forgotStyle}>
                <TouchableOpacity
                  disabled
                  onPress={() => {}}
                  style={{
                    backgroundColor: Fonts.PRIMARY_WHITE,
                  }}>
                  <Heading
                    txt={Constraints.FORGOT_PASSWORD}
                    styl={{
                      fontFamily: Fonts.FIGTREE,
                      color: Colors.PRIMARY_WHITE,
                      fontSize: 12,
                      fontWeight: '500',
                      lineHeight: 15,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ForgotPassword');
                  }}
                  style={{}}>
                  <Heading
                    txt={Constraints.FORGOT_PASSWORD}
                    styl={{
                      fontFamily: Fonts.FIGTREE,
                      color: '#000000',
                      fontSize: 12,
                      fontWeight: '500',
                      lineHeight: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <CusButton
                allDisableloader={allDisableloader}
                loader={loader}
                disabled={!isValid}
                onPress={handleSubmit}
                btnStyle={{
                  height: 46,
                  borderRadius: 8,
                  marginTop: 20,
                  width: '90%',
                  backgroundColor: isValid ? Colors.BLACK : '#C4C4C466',
                  borderColor: isValid ? Colors.BLACK : '#C4C4C466',
                }}
                textStyle={{
                  color: Colors.BTN_TXT_WHITE,
                  fontSize: 16,
                  fontWeight: '500',
                  fontStyle: 'normal',
                  lineHeight: 19,
                  fontFamily: Fonts.FIGTREE,
                }}
                btntxt={Constraints.LOGIN}
              />
              {biometric && (
                <View style={styles.bottomBottons}>
                  {genderBtns.map(item => {
                    return (
                      <TouchableOpacity
                        key={item.key}
                        onPress={() => {
                          item.key == '0' ? onFingerPrint() : openPinModal();
                        }}
                        style={[
                          styles.btnGender2,
                          {
                            borderColor: Colors.BLACK,
                            borderWidth: item.key === '0' ? 1 : 0,
                            backgroundColor:
                              item.key === '0'
                                ? Colors.PRIMARY_WHITE
                                : Colors.GREEN,
                          },
                        ]}>
                        <Text
                          style={
                            item.key === '0' ? styles.NextTxt2 : styles.NextTxt
                          }>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              <View style={styles.orTxtContaiber}>
                <View style={styles.orViewLine} />
                <Heading
                  txt={Constraints.OR}
                  styl={{
                    fontFamily: Fonts.FIGTREE,
                    color: '#000000',
                    fontSize: 14,
                    fontWeight: '600',
                    lineHeight: 17,
                  }}
                />

                <View style={styles.orViewLine} />
              </View>
              <View style={styles.socialBtnsConatiner}>
                <TouchableOpacity
                  onPress={() => {
                    alert('Please sign in with your Email and Pin');
                    // onFacebookButtonPress(
                    //   setShowModal,
                    //   navigation,
                    //   hideModal,
                    //   dispatch,
                    //   token,
                    // );
                  }}
                  style={styles.socialBtn}>
                  <Fb />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    alert('Please sign in with your Email and Pin');
                    // onGoogleButtonPress(
                    //   setShowModal,
                    //   navigation,
                    //   hideModal,
                    //   dispatch,
                    //   token,
                    // );
                  }}
                  style={styles.socialBtn}>
                  <Google />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // alert('Please sign in with your Email and Pin')
                    // SignOutFun();
                  }}
                  style={styles.socialBtn}>
                  <Apple />
                </TouchableOpacity>
              </View>
              <View style={styles.dontHaveAccStyle}>
                <Heading
                  txt={Constraints.DONT_HAVE_ACCOUNT}
                  styl={{
                    // fontFamily: Fonts.FIGTREE,

                    color: '#000000',
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 17,
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Heading
                    txt={Constraints.SIGN_UP}
                    styl={{
                      color: '#000000',
                      fontSize: 14,
                      fontWeight: 'bold',
                      lineHeight: 17,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <LoadingModal showModal={showModal} navigate={navigation} />
          <VerifyMail
            showModal={showMailVerify}
            verifyEmail={sendVerificationLink}
            hideModalMail={hideModalMail}
          />

          <PinModal
            navigation={navigation}
            subsribleModal={pinCodeModal}
            hideModal={hideModalPin}
          />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Login;
