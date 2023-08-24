import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../../reuseable/heading';

import TextInp from '../../reuseable/textInput';
import CusButton from '../../reuseable/cusButton';
import styles from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
const {height, width} = Dimensions.get('screen');
import {addUserid, addUserObjectKey} from '../../Redux/Action/actions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Constraints from '../../Constraints/Constraints';
import LoadingModal from '../../reuseable/LoadingModal';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);

  const forgotPasswordBtn = e => {
    setShowModal(true);
    auth()
      .sendPasswordResetEmail(e.email)
      .then(() => {
        setShowModal(false);
        alert('Please check your email...');
      })
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(function (e) {
        setShowModal(false);
        alert(
          'You Can Not Reset Your Passwoord Because There Is No Record Found Of This Email Adress',
          e,
        );
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={e => {
        forgotPasswordBtn(e);
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
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.topContainer}>
              <Heading
                txt={Constraints.FORGOT_PASSWORD}
                styl={styles.headerStyl}
              />
              <View style={styles.topBar} />
            </View>
            <TextInp
              inputContainer={styles.inputContainer}
              style={styles.inputStyle}
              value={values.email}
              placeholderTextColor={Colors.GREY}
              placeholder={Constraints.EMAIL}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {errors.email && touched.email && (
              <Text style={styles.errTxt}>{errors.email}</Text>
            )}

            <CusButton
              allDisableloader={allDisableloader}
              loader={loader}
              disabled={!isValid}
              onPress={handleSubmit}
              btnStyle={{
                height: 46,
                borderRadius: 8,
                marginTop: '5%',
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
          </ScrollView>
          <LoadingModal showModal={showModal} navigate={navigation} />
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default ForgotPassword;
