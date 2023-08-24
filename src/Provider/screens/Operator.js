import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import Colors from '../../Constraints/Colors';
import Agent from '../../assets/PopularServices/modalAssets/Agent.svg';
import Star from '../../assets/PopularServices/modalAssets/Star.svg';
import Support from '../../assets/PopularServices/modalAssets/Support.svg';
import Constraints from '../../Constraints/Constraints';
import PopSerModItem from '../../reuseable/popSerModItem';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, addScreenName} from '../../Redux/Action/actions';
import {handleSignOut, updateProviderStatus} from '../../Utils/Functions';
import CusButton from '../../reuseable/cusButton';
import LoadingModal from '../../reuseable/LoadingModal';
import Header from '../../reuseable/Header';
import Fonts from '../../Constraints/Fonts';
import {updateUserLatLong} from '../../Utils/Functions';
import DataPath from '../../Utils/DataPath';

const Operator = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    userId,
    userImg,
    verifyOp,
    operatorTypeWorker,
    userObjectKey,
    currentLat,
    currentLong,
  } = useSelector(reducer => reducer.allReducer);

  const handleMode = () => {
    setShowModal(true);
    dispatch(addScreenName('go_to_User'));
    navigation.replace('MyDrawer');
    setShowModal(false);
  };

  useEffect(() => {
    updateProviderStatus(userObjectKey, true);

    return () => {
      updateProviderStatus(userObjectKey, false);
    };
  }, []);

  useEffect(() => {
    if (userObjectKey) {
      setShowModal(true);

      setTimeout(() => {
        updateUserLatLong(
          DataPath.ALL_OPERATORS2,
          userObjectKey,
          currentLat,
          currentLong,
        );
        setShowModal(false);
      }, 1000);
    }
  }, []);

  return (
    <SafeAreaView style={styles.centeredView}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Header txtStyle={{marginLeft: 0}} txt={Constraints.OPERATOR} />
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

            <View style={{marginStart: 10}}>
              <View
                style={[
                  styles.veifyCont,
                  {backgroundColor: verifyOp !== true ? 'red' : '#27AE60'},
                ]}>
                {verifyOp === true ? (
                  <>
                    <Star style={{marginTop: 'auto', marginBottom: 'auto'}} />
                    <View>
                      <Text style={[styles.verifyTxt, {marginLeft: 4}]}>
                        Verified by Admin
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text style={styles.verifyTxt}>Verification pending </Text>
                )}
              </View>

              <Text style={[styles.serviceNameTxt, {fontWeight: '700'}]}>
                {operatorTypeWorker}
              </Text>
              <Text
                style={[
                  styles.serviceNameTxt,
                  {marginTop: 0, fontWeight: '700'},
                ]}>
                Operator
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.GREY,
              height: 0.5,
              width: '100%',
              marginTop: '5%',
              marginBottom: '2%',
            }}
          />
          {/* <PopSerModItem
            icon={<Inbox style={{}} />}
            txt={'Inbox'}
            txtStyle={{...styles.headStyle}}
          /> */}
          {/* <PopSerModItem
            icon={<Call style={{}} />}
            txt={'Phone Number'}
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
            icon={<Location style={{}} />}
            txt={'Address'}
            txtStyle={{...styles.headStyle}}
          /> */}
          {/* <PopSerModItem
            handlePress={() => {
              handleSignOut(navigation, dispatch);
            }}
            txt={'Log out'}
            txtStyle={{
              textAlignVertical: 'center',
              ...styles.headStyle,
              color: Colors.GREEN,
            }}
          /> */}

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
            btntxt={Constraints.USER_MODE}
          />
        </View>
      </ScrollView>
      <LoadingModal showModal={showModal} navigate={navigation} />
    </SafeAreaView>
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
    marginTop: 50,
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
    backgroundColor: '#27AE60',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {width: 88, height: 88, marginTop: 10, borderRadius: 24},
  verifyTxt: {
    fontSize: 12,

    color: '#FFFF',
  },
  serviceNameTxt: {
    fontSize: 18,
    marginTop: 6,
    color: Colors.BLACK,
    fontFamily: Fonts.FIGTREE,
  },
});
export default Operator;
