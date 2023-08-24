import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, ScrollView, StatusBar} from 'react-native';
import styles from './styles';
import Check from '../../assets/Subcription/Check.svg';
import MemberIcon from '../../assets/Subcription/MemberIcon.svg';
import Star from '../../assets/Subcription/Star.svg';
import CusButton from '../../reuseable/cusButton';
import auth from '@react-native-firebase/auth';
import Heading from '../../reuseable/heading';
import {useDispatch, useSelector} from 'react-redux';
import {addUserid} from '../../Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';
import Fonts from '../../Constraints/Fonts';
import Colors from '../../Constraints/Colors';

const Subscription = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);

  const handleSubmitFree = async () => {
    navigation.navigate('MyDrawer');
  };
  const handleSubmitBasic = async () => {
    navigation.navigate('Payment');
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
          paddingBottom: '8%',
        }}>
        <View style={styles.topContainer}>
          <Heading
            txt={Constraints.SELECT_SUBSRICPTION}
            styl={styles.headerStyl}
          />
          <Heading
            txt={Constraints.SUBTITLE_SUBSCRIPTION}
            styl={styles.headerStyl2}
          />
        </View>

        <View style={styles.boxStyle}>
          <View style={styles.blackBox}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.icon}>
                <MemberIcon />
              </View>
              <Heading
                txt={Constraints.FREE_MEMBERSHIP}
                styl={styles.membershipTxt}
              />
            </View>
          </View>

          <View style={styles.subscriptionBox}>
            <Heading txt={Constraints.FEATURES} styl={styles.featureTxt} />
            <View style={styles.innerBox}>
              <View style={styles.CheckIconStyle}>
                <Check />
              </View>
              <Heading
                txt={Constraints.SEND_SOS_TO_EMERGENCY}
                styl={styles.headerStyl3}
              />
            </View>
            <View style={styles.innerBox}>
              <View style={styles.CheckIconStyle}>
                <Check />
              </View>
              <Heading
                txt={Constraints.SEND_LOCATION}
                styl={styles.headerStyl3}
              />
            </View>
          </View>

          <View style={styles.amountBox}>
            <View style={styles.innerAmountBox}>
              <Heading txt={'$0.00'} styl={styles.amountTxt} />
              <CusButton
                allDisableloader={allDisableloader}
                loader={loader}
                onPress={handleSubmitFree}
                btnStyle={styles.btnStyle}
                textStyle={styles.btnTxt}
                btntxt={Constraints.FREE}
              />
            </View>
          </View>
        </View>
        <View style={styles.boxStyle}>
          <View style={styles.blackBox}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.icon}>
                <Star />
              </View>
              <Heading
                txt={Constraints.PREMIUM_MEMBERSHIP}
                styl={styles.membershipTxt}
              />
            </View>
          </View>

          <View style={styles.subscriptionBox}>
            <Heading txt={Constraints.FEATURES} styl={styles.featureTxt} />
            <View style={styles.innerBox}>
              <View style={styles.CheckIconStyle}>
                <Check />
              </View>
              <Heading
                txt={Constraints.REGISTER_JOUNEY}
                styl={styles.headerStyl3}
              />
            </View>
            <View style={styles.innerBox}>
              <View style={styles.CheckIconStyle}>
                <Check />
              </View>
              <Heading
                txt={Constraints.REGISTER_WELLBEING_CHECK}
                styl={styles.headerStyl3}
              />
            </View>
            <View style={styles.innerBox}>
              <View style={styles.CheckIconStyle}>
                <Check />
              </View>
              <Heading
                txt={Constraints.CONTCT_NEAREST_TOWING_VEHICLE}
                styl={styles.headerStyl3}
              />
            </View>
            <View style={styles.innerBox}>
              <View style={styles.CheckIconStyle}>
                <Check />
              </View>
              <Heading txt={Constraints.OTHER} styl={styles.headerStyl3} />
            </View>
          </View>

          <View style={styles.amountBox}>
            <View style={styles.innerAmountBox}>
              <Heading txt={'$25.00'} styl={styles.amountTxt} />
              <CusButton
                allDisableloader={allDisableloader}
                loader={loader}
                onPress={handleSubmitBasic}
                btnStyle={styles.btnStyle}
                textStyle={styles.btnTxt}
                btntxt={Constraints.PAID}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Subscription;
