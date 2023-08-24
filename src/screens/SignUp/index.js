import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Linking,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import messaging from '@react-native-firebase/messaging';
import Calendar from '../../reuseable/Calendar';
import {userGender, GSMNetworks, userCat} from '../../DataStore/genderBtns';
import Calendarr from '../../assets/SignUp/Calendarr.svg';
import Cam from '../../assets/SignUp/Cam.svg';
import Eye from '../../assets/SignUp/Eye.svg';
import Eye_closed from '../../assets/SignUp/Eye_closed.svg';
import database from '@react-native-firebase/database';
import TextInp from '../../reuseable/textInput';
import CusButton from '../../reuseable/cusButton';
import PickerBtn from '../../reuseable/PickerBtn';
import auth from '@react-native-firebase/auth';
import Heading from '../../reuseable/heading';
import {useDispatch, useSelector} from 'react-redux';
import {addUserid} from '../../Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal';
import {genderBtns} from '../../DataStore/genderBtns';
import Fonts from '../../Constraints/Fonts';
import Images from '../../Constraints/Images';
import Colors from '../../Constraints/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {uploadImage} from '../../Utils/Functions';
import FastImage from 'react-native-fast-image';
import LoadingModal from '../../reuseable/LoadingModal';
import {addUserDeviceToken, addUserCategory} from '../../Redux/Action/actions';
import {uploadToDatabase, phoneNumberExists} from '../../Utils/Functions';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNum: Yup.string()
    .min(7, 'Too short!')
    .max(15, 'Too Long!')
    .matches(/^[^.,-]*$/, 'No period')
    .matches(/^[^!@#$%^&*=<>:;|~]*$/, 'No symbols')
    .matches(/^\S+$/, 'No Space allowed')
    .required('Required'),
  address: Yup.string().min(3, 'Too Short!').required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .matches(/^[0-9]+$/, 'Only numeric characters allowed')
    .required('Please enter your Pin'),
  confirmPassword: Yup.string()
    .min(6, 'Too Short!')
    .matches(/^[0-9]+$/, 'Only numeric characters allowed')
    .oneOf([Yup.ref('password')], 'Pin do not match')
    .required('Please enter your Pin'),
});

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);
  const [countryCode, setCountryCode] = useState('NG');
  const [country, setCountry] = useState(234);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const [visibleCoutry, setVisibleCoutry] = useState(false);
  const [secureEntry, setSecureEntry] = useState(false);
  const [checked, setChecked] = useState(false);
  const [expandedCataegory1, setExpandedCategory1] = useState(false);
  const [expandedCataegory2, setExpandedCategory2] = useState(false);
  const [expandedCataegory3, setExpandedCategory3] = useState(false);
  // const [PhoneIMEI, setPhoneImei] = useState('');
  const [category, setCategory] = useState('');
  const [categoryGSM, setCategoryGSM] = useState('');
  const [categoryUser, setCategoryUser] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userCatError, setUserCatError] = useState(false);
  const [GsmCatError, setGsmCatError] = useState(false);
  const [ImageError, setImageError] = useState(false);
  const [DobError, setDobError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [CheckedError, setCheckedError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imgProfile, setImgProfile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deviceToken, setDeviceToken] = useState('');
  const [date, setDate] = useState(new Date());

  const Checkbox = ({checked, onPress}) => {
    return (
      <Pressable onPress={onPress}>
        <View style={styles.outer}>
          {checked && <View style={[styles.center, styles.checked]} />}
        </View>
      </Pressable>
    );
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageQuality: 0.7,
    })
      .then(img => {
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        uploadImage(
          imageUri,
          setProgress,
          setUploading,
          setImgProfile,
          setImageError,
        );
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country.callingCode);
  };

  const signUpUser = async e => {
    if (category === '') {
      setGenderError(true);
    } else if (selectedDate === null) {
      setDobError(true);
    } else if (checked === false) {
      setCheckedError(true);
    } else if (imgProfile === '') {
      alert('Profile pic is required');
    } else if (categoryUser === '') {
      setUserCatError(true);
    } else {
      signInWithPhoneNumber(e);
    }
  };

  const signInWithPhoneNumber = async e => {
    const age = date.getFullYear() - selectedDate.getFullYear();
    if (selectedDate.getFullYear() === date.getFullYear()) {
      alert('please enter valid date of birth');
      return;
    } else if (selectedDate.getFullYear() > date.getFullYear()) {
      alert('please enter valid date of birth');
      return;
    } else if (age < 16) {
      alert('You must be at least 16 years old to use this app.');
      return;
    } else {
      // const Num = '+12345678990';
      const sliceNum = e.phoneNum.slice(0);
      const countryCode = '+';
      const FinalPhoneNum = countryCode + country + sliceNum;
      // console.log(FinalPhoneNum);
      try {
        setShowModal(true);
        const tokenDevice = await messaging()
          .getToken()
          .then(token => {
            dispatch(addUserDeviceToken(token));
            // console.log('token generated' + token);
            setDeviceToken(token);
          });
        dispatch(addUserCategory(categoryUser));
        const userExists = await phoneNumberExists(FinalPhoneNum, e.email);
        if (userExists.phoneExists) {
          alert(
            'Phone number already exists, please log in or use a different phone number',
          );
          setShowModal(false);
        } else if (userExists.emailExists) {
          alert(
            'Email already exists, please log in or use a different email address.',
          );
          setShowModal(false);
        } else {
          const confirmation = await auth().signInWithPhoneNumber(
            FinalPhoneNum,
          );
          setShowModal(false);
          navigation.navigate('Otp', {
            confirmation: confirmation,
            // userPhone: FinalPhoneNum,
            userPhone: FinalPhoneNum,
            userSignData: e,
            userImage: imgProfile,
            categoryUserGender: category,
            selectedDateUser: selectedDate,
            // categoryGSMUser: categoryGSM,
            // PhoneIMEIUser: PhoneIMEI,
            categoryUser: categoryUser,
          });
        }
      } catch (error) {
        if (error.code === 'auth/network-request-failed') {
          alert('Network Error');
          setShowModal(false);
        } else if (error.code === 'auth/invalid-phone-number') {
          alert('Invalid phone number.');
          setShowModal(false);
        } else if (error.code === 'auth/missing-client-identifier') {
          alert('Authentication failed. Please try again.');
          setShowModal(false);
        } else {
          alert(error);
          setShowModal(false);
        }
      }
    }
  };

  const togglePasswordVisibility = fieldName => {
    if (fieldName === 'password') {
      setShowPassword(!showPassword);
    } else if (fieldName === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleCheck = () => {
    setChecked(!checked);
    setCheckedError(false);
  };

  const ImageLoader = ({source}) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    return (
      <View style={styles.imgContainerLoad}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          priority={FastImage.priority.high}
          style={styles.image}
          source={{
            uri: source,
            cache: FastImage.cacheControl.immutable,
          }}
          onLoad={handleImageLoad}
        />
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </View>
    );
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phoneNum: '',
        address: '',
        password: '',
        confirmPassword: '',
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

          {!uploading ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              <View style={styles.topContainer}>
                <Heading txt={Constraints.SIGN_UP} styl={styles.headerStyl} />
                <View style={styles.topBar} />
              </View>

              <TouchableOpacity
                onPress={() => {
                  takePhotoFromCamera();
                }}
                style={[styles.camImg, {}]}>
                {imgProfile === '' ? (
                  <Cam />
                ) : (
                  <ImageLoader source={imgProfile} />
                )}
              </TouchableOpacity>
              {/* {ImageError && (
                <Text style={[styles.errTxt, {textAlign: 'center'}]}>
                  Profile pic is required
                </Text>
              )} */}

              <TextInp
                inputContainer={styles.inputContainerPaas}
                style={styles.inputStyle}
                value={values.name}
                placeholderTextColor={Colors.GREY}
                placeholder={Constraints.USER_NAME}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
              />
              {errors.name && touched.name && (
                <Text style={styles.errTxt}>{errors.name}</Text>
              )}
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

              <View style={styles.phoneInputView}>
                <View style={styles.pickerStyle}>
                  <CountryPicker
                    containerButtonStyle={{
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onSelect={onSelect}
                    {...{
                      countryCode,
                      withFilter,
                      withFlag,
                      withCountryNameButton,
                      withAlphaFilter,
                      withCallingCode,
                      withEmoji,
                      onSelect,
                    }}
                    visible={visibleCoutry}
                  />
                  <Text>+{country}</Text>
                </View>
                <TextInp
                  // inputContainer={styles.phoneInputContainer}
                  // style={styles.phoneInput}
                  inputContainer={{
                    ...styles.inputContainerPaas,
                    marginTop: 0,
                    width: '72%',
                  }}
                  style={{...styles.inputStyle, width: '70%'}}
                  keyboardType="number-pad"
                  placeholder={Constraints.CONTACT_NUNM}
                  placeholderTextColor={Colors.GREY}
                  value={values.phoneNum}
                  onChangeText={handleChange('phoneNum')}
                  onBlur={() => setFieldTouched('phoneNum')}
                />
              </View>

              {errors.phoneNum && touched.phoneNum && (
                <Text style={styles.errTxt}>{errors.phoneNum}</Text>
              )}
              <PickerBtn
                dynamicBtn={userGender}
                expandedCataegory={expandedCataegory1}
                setExpandedCategory={setExpandedCategory1}
                txt={Constraints.GENDER}
                category={category}
                setCategory={setCategory}
                setErrorMessage={setGenderError}
              />
              {genderError === true && (
                <Text style={styles.errTxt}>Please select your gender</Text>
              )}

              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                showPicker={showPicker}
                setShowPicker={setShowPicker}
                txt={Constraints.DATE_OF_BIRTH}
                icon={<Calendarr />}
                mode={'date'}
                setErrorMessage={setDobError}
              />
              {DobError === true && (
                <Text style={styles.errTxt}>
                  Please select your Date of birth
                </Text>
              )}
              {/* <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                keyboardType="number-pad"
                value={PhoneIMEI}
                placeholderTextColor={Colors.GREY}
                placeholder={Constraints.PHONE_IMEI}
                onChangeText={text => setPhoneImei(text)}
              /> */}

              {/* <PickerBtn
                dynamicBtn={GSMNetworks}
                expandedCataegory={expandedCataegory2}
                setExpandedCategory={setExpandedCategory2}
                txt={Constraints.GSM_NETWORK}
                category={categoryGSM}
                setCategory={setCategoryGSM}
                setErrorMessage={setGsmCatError}
              />
              {GsmCatError === true && (
                <Text style={styles.errTxt}>Please select Network</Text>
              )} */}
              <TextInp
                inputContainer={styles.inputContainerPaas}
                style={styles.inputStyle}
                value={values.address}
                placeholderTextColor={Colors.GREY}
                placeholder={Constraints.ADDRESS}
                onChangeText={handleChange('address')}
                onBlur={() => setFieldTouched('address')}
              />
              {errors.address && touched.address && (
                <Text style={styles.errTxt}>{errors.address}</Text>
              )}
              <PickerBtn
                dynamicBtn={userCat}
                expandedCataegory={expandedCataegory3}
                setExpandedCategory={setExpandedCategory3}
                txt={Constraints.USER_CATEGORIES}
                category={categoryUser}
                setCategory={setCategoryUser}
                setErrorMessage={setUserCatError}
              />
              {userCatError === true && (
                <Text style={styles.errTxt}>Please select user categories</Text>
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
                maxLength={6}
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
              <TextInp
                inputContainer={styles.inputContainerPaas}
                style={styles.inputStyle}
                placeholderTextColor={Colors.GREY}
                placeholder={Constraints.CONFIRM_PASSWORD}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                iconEye={<Eye />}
                maxLength={6}
                keyboardType="numeric"
                iconEyeClosed={<Eye_closed />}
                secureTextEntry={!showConfirmPassword}
                showConfirmPassword={showConfirmPassword}
                mode={'confirmPassword'}
                togglePasswordVisibility={togglePasswordVisibility}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errTxt}>{errors.confirmPassword}</Text>
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
              </View>

              <View style={styles.checkBoxContainer}>
                <Pressable
                  onPress={handleCheck}
                  style={[styles.checkBox, checked && styles.checked]}>
                  {checked && (
                    <Image source={Images.TICK} style={styles.checkedIcon} />
                  )}
                </Pressable>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() =>
                    Linking.openURL(
                      `https://www.freeprivacypolicy.com/live/44f54218-416c-484f-a83d-4317a03b75f4`,
                    )
                  }>
                  <Heading
                    txt={Constraints.TERMS_COND}
                    styl={[styles.rememberMe, {}]}
                  />
                </TouchableOpacity>
              </View>

              {CheckedError === true && (
                <Text style={styles.errTxt}>
                  Please select Terms and conditions
                </Text>
              )}
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
                btntxt={Constraints.SIGN_UP}
              />

              <View style={styles.dontHaveAccStyle}>
                <Heading
                  txt={Constraints.DONT_HAVE_ACCOUNT}
                  styl={{
                    fontFamily: Fonts.FIGTREE,
                    color: '#000000',
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 17,
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Heading
                    txt={Constraints.LOGIN}
                    styl={{
                      color: '#000000',
                      fontSize: 14,
                      fontWeight: 'bold',
                      lineHeight: 17,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Progress.Bar
                animated={true}
                color={Colors.BLACK}
                progress={progress / 100}
                width={200}
              />
              {/* <Progress.Bar progress={progress / 100} width={200} /> */}
              <Text style={{marginTop: '2%'}}>
                {`${progress.toFixed(0)}% Uploaded`}
              </Text>
            </View>
          )}
          <LoadingModal showModal={showModal} navigate={navigation} />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default SignUp;
