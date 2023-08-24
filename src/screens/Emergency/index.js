import React, {useEffect, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  Text,
  Linking,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Colors from '../../Constraints/Colors';
import Header from '../../reuseable/Header';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import Constraints from '../../Constraints/Constraints';
import LoadingModal from '../../reuseable/LoadingModal';
import TextInp from '../../reuseable/textInput';
import CusButton from '../../reuseable/cusButton';
import Contacts from 'react-native-contacts';
import CountryPicker from 'react-native-country-picker-modal';

const contactScheme = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  relation: Yup.string().min(2, 'Too Short!').required('Required'),
  contact: Yup.string()
    .min(7, 'Too short!')
    .max(15, 'Too Long!')
    .matches(/^[^.,-]*$/, 'No period')
    .matches(/^[^!@#$%^&*=<>:;|~]*$/, 'No symbols')
    .matches(/^\S+$/, 'No Space allowed')
    .required('Required'),
});

const Emergency = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [countryCode, setCountryCode] = useState('NG');
  const [withFilter, setWithFilter] = useState(true);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const [visibleCoutry, setVisibleCoutry] = useState(false);
  const [country, setCountry] = useState(234);
  const {userObjectKey, token} = useSelector(reducers => reducers.allReducer);

  // const message = {
  //   notification: {
  //     title: 'New message',
  //     body: 'You have a new message from John',
  //   },
  //   token: token,
  // };

  const uploadContactToDB = (e, FinalPhoneNum) => {
    database()
      .ref('users/' + userObjectKey + '/EmergencyContacts')
      .push({Name: e.name, phoneNumber: FinalPhoneNum, relation: e.relation})
      .then(() => {
        // console.log('Contact saved to DB');
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country.callingCode);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const addContact = async e => {
    setShowModal(true);
    const sliceNum = e.contact.slice(0);
    const countryCode = '+';
    const FinalPhoneNum = countryCode + country + sliceNum;
    const contactP = {
      givenName: e.name,
      phoneNumbers: [{label: 'mobile', number: FinalPhoneNum}],
    };

    await Contacts.addContact(contactP)
      .then(() => {
        uploadContactToDB(e, FinalPhoneNum);
      })
      .then(() => {
        setShowModal(false);
        alert('Contact saved successfully');
        navigation.navigate('ListContacts');
      })
      .catch(e => {
        // console.log(e);
        setShowModal(false);
      });
  };

  const addEmergencyContact = async e => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions, {
        title: 'Contacts Permission',
        message: 'This app needs access to your contacts',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      if (
        granted['android.permission.READ_CONTACTS'] === 'granted' &&
        granted['android.permission.WRITE_CONTACTS'] === 'granted'
      ) {
        addContact(e);
      } else {
        setShowModal(false);
        alert('Contacts permission denied');
      }
    } catch (err) {
      setShowModal(false);
      alert(err);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        contact: '',
        relation: '',
      }}
      validationSchema={contactScheme}
      onSubmit={e => {
        addEmergencyContact(e);
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
            barStyle={'light-content'}
            backgroundColor={Colors.BLACK}
          />
          <Header
            navigation={navigation}
            txt={Constraints.ADD_EMERGENCY_CONTACT}
            onPress={handleBack}
            icon={<ArrowBack />}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <TextInp
              inputContainer={{...styles.inputContainerPaas, marginTop: '10%'}}
              style={styles.inputStyle}
              value={values.name}
              placeholderTextColor={Colors.GREY}
              placeholder={Constraints.NAME}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
            />
            {errors.name && touched.name && (
              <Text style={styles.errTxt}>{errors.name}</Text>
            )}
            <TextInp
              inputContainer={styles.inputContainerPaas}
              style={styles.inputStyle}
              value={values.relation}
              placeholderTextColor={Colors.GREY}
              placeholder={Constraints.RELATION}
              onChangeText={handleChange('relation')}
              onBlur={() => setFieldTouched('relation')}
            />
            {errors.relation && touched.relation && (
              <Text style={styles.errTxt}>{errors.relation}</Text>
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
                onChangeText={handleChange('contact')}
                onBlur={() => setFieldTouched('contact')}
              />
            </View>

            {/* <TextInp
              inputContainer={styles.inputContainerPaas}
              style={styles.inputStyle}
              placeholder={Constraints.CONTACT_NUNM}
              placeholderTextColor={Colors.GREY}
              value={values.contact}
              onChangeText={handleChange('contact')}
              onBlur={() => setFieldTouched('contact')}
            /> */}
            {errors.contact && touched.contact && (
              <Text style={styles.errTxt}>{errors.contact}</Text>
            )}

            <CusButton
              allDisableloader={showModal}
              loader={showModal}
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
              btntxt={Constraints.SAVE}
            />
          </ScrollView>
          <LoadingModal showModal={showModal} navigate={navigation} />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Emergency;
