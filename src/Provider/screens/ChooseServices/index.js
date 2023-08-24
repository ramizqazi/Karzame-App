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
import Colors from '../../../Constraints/Colors';
import CheckServices from '../../../assets/PopularServices/CheckServices.svg';
import AmbServices from '../../../assets/PopularServices/AmbServices.svg';
import FireServices from '../../../assets/PopularServices/FireServices.svg';
import TowingServices from '../../../assets/PopularServices/TowingServices.svg';
import RoadSafety from '../../../assets/PopularServices/RoadSafety.svg';
import WhistleBlower from '../../../assets/PopularServices/WhistleBlower.svg';
import Menu from '../../../assets/StartTrio/Menu.svg';
import Constraints from '../../../Constraints/Constraints';
const {height, width} = Dimensions.get('window');
import Header from '../../../reuseable/Header';
import InpWithIcon from '../../../reuseable/InpWithIcon';
import RightArrow from '../../../assets/PopularServices/RightArrow.svg';
import database from '@react-native-firebase/database';
import KeyEvent from 'react-native-keyevent';
import {useDispatch, useSelector} from 'react-redux';
import {addOperatorsType, addScreenName} from '../../../Redux/Action/actions';
import ArrowBack from '../../../assets/VirtualTravelGuard/ArrowBack.svg';

const ChooseServices = ({navigation}) => {
  const dispatch = useDispatch();
  const {userObjectKey} = useSelector(reducers => reducers.allReducer);

  const updateUserData = () => {
    database()
      .ref('users/' + userObjectKey + '/SOS')
      .push({Emergency: 'A user needs emergency service', isRead: false})
      .then(() => {
        // console.log('done--- sos notify');
      })
      .catch(error => {
        // console.log(error);
      });
  };

  useEffect(() => {
    const volumeUpSubscription = KeyEvent.onKeyUpListener(keyEvent => {
      if (keyEvent.keyCode === 24) {
        alert(
          'Emergency alert sent to company, you will be entertained shortly',
        );
        updateUserData();
      }
    });

    const volumeDownSubscription = KeyEvent.onKeyDownListener(keyEvent => {
      if (keyEvent.keyCode === 25) {
        alert(
          'Emergency alert sent to company, you will be entertained shortly',
        );
        updateUserData();
      }
    });

    return () => {
      volumeUpSubscription.remove();
      volumeDownSubscription.remove();
    };
  }, []);

  const toggleDrawerFun = () => {
    navigation.toggleDrawer();
  };

  const onPress = () => {
    navigation.navigate('WellbeingCheckServices');
  };

  const goToOtherScreens = (name, serviceNaem) => {
    navigation.navigate('RegisterService');
    dispatch(addOperatorsType(serviceNaem));
  };

  const handleBack = () => {
    dispatch(addScreenName('MyDrawer'));
    navigation.navigate('MyDrawer');
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <Header
        onPress={handleBack}
        icon={<ArrowBack />}
        navigation={navigation}
        txt={Constraints.CHOOSE_SERVICE}
      />
      <ScrollView
        style={{height: '100%', backgroundColor: Colors.PRIMARY_WHITE}}>
        <View style={{...styles.container, marginTop: '10%'}}>
          {/* <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.Well_Being_check);
            }}
            title={Constraints.Well_Being_check}
            subTitle={Constraints.CHOOSE_THIS_SERVICE}
            icon={<CheckServices />}
            icon2={<RightArrow />}
          /> */}
          <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.TOWING_SERVICE);
            }}
            title={Constraints.TOWING_SERVICE}
            subTitle={Constraints.CHOOSE_THIS_SERVICE}
            icon={<TowingServices />}
            icon2={<RightArrow />}
          />
          <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.AMBULANCE_SERVICE);
            }}
            title={Constraints.AMBULANCE_SERVICE}
            subTitle={Constraints.CHOOSE_THIS_SERVICE}
            icon={<AmbServices />}
            icon2={<RightArrow />}
          />
          <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.FIRE_SERVICE);
            }}
            title={Constraints.FIRE_SERVICE}
            subTitle={Constraints.CHOOSE_THIS_SERVICE}
            icon={<FireServices />}
            icon2={<RightArrow />}
          />
          {/* <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.ROAD_SAFETY);
            }}
            title={Constraints.ROAD_SAFETY}
            subTitle={Constraints.CHOOSE_THIS_SERVICE}
            icon={<RoadSafety />}
            icon2={<RightArrow />}
          /> */}
          <InpWithIcon
            onpress={() => {
              goToOtherScreens('MapService', Constraints.WHISTLEBLOWER);
            }}
            title={Constraints.WHISTLEBLOWER}
            subTitle={Constraints.CHOOSE_THIS_SERVICE}
            icon={<WhistleBlower style={{marginStart: 0}} />}
            icon2={<RightArrow style={{marginStart: 5}} />}
          />
        </View>
      </ScrollView>
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
export default ChooseServices;
