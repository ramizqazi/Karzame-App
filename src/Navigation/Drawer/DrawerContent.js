import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Share from 'react-native-share';
import Colors from '../../Constraints/Colors';
import RightArrow from '../../assets/PopularServices/RightArrow.svg';
import Agent from '../../assets/PopularServices/modalAssets/Agent.svg';
import Star from '../../assets/PopularServices/modalAssets/Star.svg';
import Sharee from '../../assets/PopularServices/modalAssets/Sharee.svg';
import Call from '../../assets/PopularServices/modalAssets/Call.svg';
import Gsm from '../../assets/PopularServices/modalAssets/Gsm.svg';
import Logout from '../../assets/PopularServices/modalAssets/Logout.svg';
import Support from '../../assets/PopularServices/modalAssets/Support.svg';
// import Message from '../../assets/PopularServices/modalAssets/Message.svg'
import Location from '../../assets/PopularServices/modalAssets/Location.svg';
import VehicleReg from '../../assets/PopularServices/modalAssets/VehicleReg.svg';
import Alarm from '../../assets/PopularServices/modalAssets/Alarm.svg';
import Constraints from '../../Constraints/Constraints';
import PopSerModItem from '../../reuseable/popSerModItem';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import InpWithIcon from '../../reuseable/InpWithIcon';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, addScreenName} from '../../Redux/Action/actions';
import auth from '@react-native-firebase/auth';
import {handleSignOut} from '../../Utils/Functions';
import CusButton from '../../reuseable/cusButton';
import LoadingModal from '../../reuseable/LoadingModal';
import files from '../../assets/PopularServices/modalAssets/FileBase64';
import {requestPermission} from '../../Utils/Functions';
import Fonts from '../../Constraints/Fonts';

const DrawerContent = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);
  const {userId, userImg, userName, regDone, userObjectKey} = useSelector(
    reducer => reducer.allReducer,
  );

  const handleMode = () => {
    setShowModal(true);
    dispatch(addScreenName('go_to_Operator'));
    if (regDone === true) {
      navigation.replace('Operator');
    } else {
      navigation.replace('OperatorMode');
    }

    setShowModal(false);
  };

  const shareApp = async () => {
    const options = {
      message: 'Karzame App',
      url: files.appLogo,
    };
    try {
      const shareRes = await Share.open(options);
      if (shareRes.action === Share.sharedAction) {
        console.log('Share was successful');
      } else if (shareRes.action === Share.dismissedAction) {
        console.log('Share was dismissed');
      }
    } catch (error) {
      console.log('Error sharing: ' + error.message);
    }
  };

  const shareLoc = () => {
    async function getLocation() {
      requestPermission(location => {
        setLocation(location);
        const url = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

        const shareOptions = {
          url: url,
        };

        Share.open(shareOptions)
          .then(res => {
            alert('Location shared successfully');
          })
          .catch(err => {
            console.log('Error sharing location:', err.data);
          });
      });
    }
    getLocation();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.imgCon}>
            {userImg ? (
              <Image style={styles.img} source={{uri: userImg}} />
            ) : (
              <Image
                style={{width: 88, height: 88, marginTop: 10}}
                source={require('../../assets/PopularServices/modalAssets/profile.png')}
              />
            )}

            <View style={{marginLeft: 10}}>
              {/* <View style={styles.veifyCont}>
                <Star style={{marginTop: 'auto', marginBottom: 'auto'}} />
                <View>
                  <Text style={styles.verifyTxt}>Verify By Admin </Text>
                </View>
              </View> */}
              <Text style={styles.serviceNameTxt}>{userName} </Text>
            </View>
          </View>
          {/* <InpWithIcon
            onpress={() => {
              navigation.navigate('WellbeingCheckServices');
            }}
            mainContainer={{borderRadius: 20}}
            ContStyle={{height: 60}}
            title={'Well Being Check'}
            subTitle={'Virtual Travel Guard Virtual Home Services'}
            icon2={<RightArrow style={{marginStart: 20}} />}
          /> */}

          <InpWithIcon
            onpress={() => {
              navigation.navigate('SOSAlertSettingDaily');
            }}
            // subContainer={{ width: '75%' }}
            ContStyle={{height: 80}}
            mainContainer={{borderRadius: 20, paddingVertical: '7%'}}
            title={'SOS Alert Setting Daily'}
            icon2={<RightArrow style={{marginStart: 20}} />}
            subTitle={'Take full selfie and vehicle\nphoto for identification'}
            icon={<Alarm />}
          />

          {/* <PopSerModItem
            icon={<Call style={{}} />}
            txt={'Phone Modal'}
            txtStyle={{...styles.headStyle}}
          /> */}
          <PopSerModItem
            handlePress={() => {
              navigation.navigate('ListContacts');
            }}
            icon={<Support style={{}} />}
            txt={'Emergency Contact'}
            txtStyle={[styles.headStyle, {marginLeft: 14}]}
          />
          <PopSerModItem
            handlePress={() => {
              navigation.navigate('Support');
            }}
            icon={<Agent style={{}} />}
            txt={'Support'}
            txtStyle={{
              textAlignVertical: 'center',
              ...styles.headStyle,
            }}
          />
          {/* <PopSerModItem
            icon={<Gsm style={{}} />}
            txt={'Gsm Network'}
            txtStyle={{...styles.headStyle}}
          /> */}
          <PopSerModItem
            handlePress={() => {
              navigation.navigate('AddVehicle', {camParam: 'Cam'});
            }}
            icon={<VehicleReg style={{}} />}
            txt={'Vehicle Registration'}
            txtStyle={{...styles.headStyle}}
          />
          <PopSerModItem
            handlePress={() => {
              navigation.navigate('Profile_police_alerts');
            }}
            icon={<Support style={{}} />}
            txt={'Police Alert'}
            txtStyle={{...styles.headStyle, marginLeft: 15}}
          />

          <PopSerModItem
            handlePress={() => {
              shareLoc();
            }}
            icon={<Sharee style={{}} />}
            txt={'Share Location'}
            txtStyle={{...styles.headStyle}}
          />
          <PopSerModItem
            handlePress={() => {
              shareApp();
            }}
            icon={<Sharee style={{}} />}
            txt={'Share App'}
            txtStyle={{...styles.headStyle}}
          />
          <PopSerModItem
            handlePress={() => {
              handleSignOut(navigation, dispatch, setShowModal, userObjectKey);
            }}
            txt={'Log out'}
            txtStyle={{
              textAlignVertical: 'center',
              ...styles.headStyle,
              color: Colors.GREEN,
            }}
          />

          <View
            style={{
              backgroundColor: Colors.GREY,
              height: 0.5,
              width: '100%',
              marginTop: '5%',
            }}
          />
          <CusButton
            onPress={handleMode}
            btnStyle={styles.btnStyle}
            textStyle={styles.btnTxtStyle}
            btntxt={Constraints.PROVER_MODE}
          />
        </View>
      </View>
      <LoadingModal showModal={showModal} navigate={navigation} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
  },
  itemContainer: {
    borderWidth: 0.3,
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
    fontSize: 18,
    marginLeft: 18,
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
    width: '100%',
    marginRight: 'auto',
  },
  imgCon: {
    width: '90%',
    alignItems: 'center',
    height: 95,
    flexDirection: 'row',
    marginBottom: 20,
  },
  btnStyle: {
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    backgroundColor: Colors.GREEN,
    borderColor: '#C4C4C466',
  },
  btnTxtStyle: {
    color: Colors.PRIMARY_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
  veifyCont: {
    backgroundColor: Colors.PRIMARY_WHITE,
    height: 30,
    width: 138,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {width: 88, height: 88, marginTop: 10, borderRadius: 24},
  verifyTxt: {
    fontSize: 12,
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#FFFF',
  },
  serviceNameTxt: {
    fontSize: 18,
    marginTop: 6,
    color: '#000000',
    fontFamily: Fonts.FIGTREE,
  },
});
export default DrawerContent;
