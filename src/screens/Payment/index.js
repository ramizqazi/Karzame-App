import React, {useEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import Header from '../../reuseable/Header';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import Constraints from '../../Constraints/Constraints';
import InpWithIcon from '../../reuseable/InpWithIcon';
import Master from './../../assets/Payment/Master.svg';
import Stripe from './../../assets/Payment/Stripe.svg';
import Paystackk from './../../assets/Payment/Paystackk.svg';
import {useDispatch, useSelector} from 'react-redux';
import Vida from './../../assets/Payment/Vida.svg';
import CusButton from '../../reuseable/cusButton';
import Heading from '../../reuseable/heading';
import {Paystack} from 'react-native-paystack-webview';
import Fonts from '../../Constraints/Fonts';
import {updateCurrentUserHour} from '../../Redux/Action/actions';

const Payment = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userMailP, userName} = useSelector(reducers => reducers.allReducer);

  const paystackWebViewRef = useRef();
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonPress = button => {
    if (button == 'paystackk') {
      setSelectedButton(button);
    } else {
      alert(`Comming soon`);
    }
  };

  const handleBtn = () => {
    if (selectedButton === '') {
      alert('Please select Payment via Paystack');
    } else if (selectedButton === 'paystackk') {
      paystackWebViewRef.current.startTransaction();
    } else {
      alert(`${selectedButton} payment coming soon`);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePaymentSuccess = res => {
    const enteredTime = new Date();
    dispatch(updateCurrentUserHour(numHours, enteredTime));
    setTotalPrice('');
    setNumHours('');
    navigation.replace('WellbeingCheckServices');
    alert(
      `Paid for ${numHours} hours Kindly switch on Wellbeing check  button to start hours for checking.`,
    );
    // console.log('Success==>' + res);
  };

  const {totalPrice, numHours, setTotalPrice, setNumHours} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <Header
        navigation={navigation}
        icon={<ArrowBack />}
        txt={Constraints.PAYMENT}
        onPress={handleBack}
      />
      <ScrollView
        style={{height: '100%', backgroundColor: Colors.PRIMARY_WHITE}}>
        <View style={{...styles.container, marginTop: '5%'}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <Heading
              txt={Constraints.BANK_TRANSFER}
              styl={{
                fontFamily: Fonts.FIGTREE,
                color: Colors.BLACK,
                fontSize: 22,
                fontWeight: '600',
                lineHeight: 26,
              }}
            />
            <Heading
              txt={Constraints.BANK_TRANSFER_SUB}
              styl={{
                fontFamily: Fonts.FIGTREE,
                color: Colors.BLACK,
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 17,
                marginTop: 10,
                marginBottom: 20,
              }}
            />
          </View>
          <InpWithIcon
            onpress={() => handleButtonPress('master')}
            title={Constraints.MASTER}
            subTitle={Constraints.MASTER_SUB}
            icon={<Master />}
            subTitleColor={{color: '#646464', marginStart: 0}}
            TitleColor={{marginStart: 0}}
            mainContainer={{
              height: 72,
              borderWidth: selectedButton === 'master' ? 0.7 : null,
              borderColor: selectedButton === 'master' ? 'blue' : null,
              paddingVertical: 0,
              paddingHorizontal: '5%',
            }}
            ContStyle={{
              width: '100%',
              alignItems: 'center',
            }}
            subContainer={{
              marginLeft: '13%',
              width: '60%',

              flexDirection: 'column',
            }}
          />
          <InpWithIcon
            onpress={() => handleButtonPress('visa')}
            title={Constraints.VISA}
            subTitle={Constraints.VISA_SUB}
            icon={<Vida />}
            subTitleColor={{color: '#646464', marginStart: 0}}
            TitleColor={{marginStart: 0}}
            mainContainer={{
              height: 72,
              paddingVertical: 0,
              paddingHorizontal: '5%',
              borderWidth: selectedButton === 'visa' ? 0.7 : null,
              borderColor: selectedButton === 'visa' ? 'blue' : null,
            }}
            ContStyle={{
              width: '100%',
              alignItems: 'center',
            }}
            subContainer={{
              marginLeft: '7%',
              width: '60%',

              flexDirection: 'column',
            }}
          />
          <InpWithIcon
            onpress={() => handleButtonPress('stripe')}
            title={Constraints.STRIPE}
            icon={<Stripe />}
            subTitleColor={{color: Colors.PRIMARY_WHITE, marginStart: 0}}
            TitleColor={{marginStart: 0}}
            mainContainer={{
              height: 72,
              paddingVertical: 0,
              paddingHorizontal: '5%',
              borderWidth: selectedButton === 'stripe' ? 0.7 : null,
              borderColor: selectedButton === 'stripe' ? 'blue' : null,
            }}
            ContStyle={{
              width: '100%',
              alignItems: 'center',
            }}
            subContainer={{
              marginLeft: '7%',
              width: '60%',

              flexDirection: 'row',
              alignItems: 'center',
            }}
          />

          <InpWithIcon
            onpress={() => handleButtonPress('paystackk')}
            title={Constraints.PAYSTACK}
            icon={<Paystackk />}
            subTitleColor={{color: Colors.PRIMARY_WHITE, marginStart: 0}}
            TitleColor={{marginStart: 0}}
            mainContainer={{
              height: 72,
              paddingVertical: 0,
              paddingHorizontal: '5%',
              borderWidth: selectedButton === 'paystackk' ? 0.7 : null,
              borderColor: selectedButton === 'paystackk' ? 'blue' : null,
            }}
            ContStyle={{
              width: '100%',
              alignItems: 'center',
            }}
            subContainer={{
              marginLeft: '7%',
              width: '60%',

              flexDirection: 'row',
              alignItems: 'center',
            }}
          />
        </View>
        <CusButton
          onPress={handleBtn}
          btnStyle={styles.btnstyle}
          textStyle={styles.btnTxt}
          btntxt={Constraints.CONTINUE}
        />

        <Paystack
          paystackKey="pk_test_3f9b51361e9b46f31e9293bb9eddc5dc3cd91c5b"
          paystackSecretKey="sk_test_bbd2aaa82b57aa4564666d6410484735e70a36fb"
          billingEmail={userMailP}
          billingName={userName}
          amount={totalPrice}
          onCancel={e => {
            setTotalPrice(''), setNumHours('');
            navigation.goBack();
            // console.log('Canceleed' + JSON.stringify(e));
          }}
          onSuccess={handlePaymentSuccess}
          currency="NGN"
          ref={paystackWebViewRef}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
