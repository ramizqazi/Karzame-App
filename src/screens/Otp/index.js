import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import Logo from '../../assets/Login/Logo.svg';
import CusButton from '../../reuseable/cusButton';
import auth from '@react-native-firebase/auth';
import Heading from '../../reuseable/heading';
import {useDispatch, useSelector} from 'react-redux';
import {addUserid} from '../../Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Fonts from '../../Constraints/Fonts';
import Images from '../../Constraints/Images';
import Colors from '../../Constraints/Colors';
import VerifyModal from '../../reuseable/VerifyModal';
import database from '@react-native-firebase/database';
import LoadingModal from '../../reuseable/LoadingModal';
import {uploadToDatabase, phoneNumberExists} from './../../Utils/Functions';
import DataPath from '../../Utils/DataPath';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const Otp = ({navigation, route}) => {
  const {
    confirmation,
    userSignData,
    userImage,
    categoryUserGender,
    selectedDateUser,
    categoryGSMUser,
    PhoneIMEIUser,
    userPhone,
    deviceToken,
  } = route.params;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);
  const [isValid, setValid] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const {userId, currentLat, currentLong, token} = useSelector(
    reducer => reducer.allReducer,
  );

  useEffect(() => {
    if (
      otp[0].length > 0 &&
      otp[1].length > 0 &&
      otp[2].length > 0 &&
      otp[3].length > 0 &&
      otp[4].length > 0 &&
      otp[5].length > 0
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [otp]);

  const hideModal = () => {
    setShowModal(false);
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputs.current[index - 1].focus();
        let newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        let newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (index === 5) {
      setValid(true);
      return;
    } else {
      inputs.current[index + 1].focus();
    }
  };

  const signInWithPhoneNumber = async () => {
    setShowModalLoading(true);
    const trimedOtp = otp.join('');
    try {
      if (trimedOtp.length <= '6') {
        await confirmation.confirm(trimedOtp);

        // Create a new account with email and password
        const user = await auth().createUserWithEmailAndPassword(
          userSignData.email,
          userSignData.password,
        );

        // Perform any other necessary actions after successful account creation
        uploadToDatabase(
          user,
          setShowModalLoading,
          setAllDisableLoader,
          selectedDateUser,
          navigation,
          DataPath.ALL_USERS,
          userImage,
          userSignData,
          categoryUserGender,
          userPhone,
          PhoneIMEIUser,
          categoryGSMUser,
          dispatch,
          currentLat,
          currentLong,
          token,
        );

        setShowModalLoading(false);
        setShowModal(true);
      } else {
        alert('Please enter a valid OTP code.');
        setShowModalLoading(false);
      }
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert(
          'Email is already in use. Please try logging in or use a different email.',
        );
      } else if (errorCode === 'auth/too-many-requests') {
        alert('Too many requests. Please try again later.');
      } else if (errorCode === 'auth/invalid-verification-code') {
        alert('Invalid code. Please enter a valid code to proceed further.');
      } else if (errorCode === 'auth/session-expired') {
        alert('Session has expired. Please try again.');
      } else if (errorCode === 'auth/invalid-phone-number') {
        alert('Invalid phone number.');
      } else {
        alert('An error occurred. Please try again.');
      }
      navigation.navigate('SignUp');
      setShowModalLoading(false);
    }
  };

  return (
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
            <Heading txt={Constraints.VERIFICATION} styl={styles.headerStyl} />
            <View style={styles.topBar} />
          </View>

          <View style={[styles.dontHaveAccStyle, {marginTop: 0}]}>
            <Heading
              txt={Constraints.ENTER_CODE_TO_SEND}
              styl={{
                fontFamily: Fonts.FIGTREE,
                color: '#000000',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 24,
              }}
            />

            <Heading
              txt={userSignData.phoneNum}
              styl={{
                fontFamily: Fonts.FIGTREE,
                color: '#2F80ED',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 24,
              }}
            />
          </View>

          <View style={styles.OTPcontainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={[styles.input, {}]}
                keyboardType="number-pad"
                maxLength={1}
                value={value}
                ref={input => (inputs.current[index] = input)}
                onChangeText={text => {
                  let newOtp = [...otp];
                  newOtp[index] = text;
                  setOtp(newOtp);
                  // setValid(true);
                }}
                onKeyPress={event => handleKeyPress(index, event)}
              />
            ))}
          </View>

          <CusButton
            allDisableloader={allDisableloader}
            loader={loader}
            disabled={!isValid || loader}
            onPress={signInWithPhoneNumber}
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
            btntxt={Constraints.DONE}
          />

          <View style={styles.dontHaveAccStyle}>
            <Heading
              txt={Constraints.DIDNT_RECEIVE_SMS}
              styl={{
                fontFamily: Fonts.FIGTREE,
                color: '#000000',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 24,
              }}
            />

            <TouchableOpacity
              onPress={() => {}}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Heading
                txt={Constraints.RESEND_SMS}
                styl={{
                  fontFamily: Fonts.FIGTREE,
                  color: '#27AE60',
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 24,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <VerifyModal
        txt={Constraints.VERIFIED}
        txt2={Constraints.OTP_VERIFIED}
        showModal={showModal}
        hideModal={hideModal}
        navigation={navigation}
      />
      <LoadingModal showModal={showModalLoading} navigate={navigation} />
    </SafeAreaView>
  );
};

export default Otp;
