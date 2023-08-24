import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import Logo1 from '../../assets/Splash/Logo1.svg';
import {useDispatch, useSelector} from 'react-redux';
import {requestPermission, updateUserLatLong} from '../../Utils/Functions';
import {addCurrentLocation} from '../../Redux/Action/actions';
import DataPath from '../../Utils/DataPath';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);
  const {userId, screen, currentLat, currentLong, userObjectKey} = useSelector(
    reducer => reducer.allReducer,
  );
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function getLocation() {
      requestPermission(location => {
        setLocation(location);
        dispatch(addCurrentLocation(location.latitude, location.longitude));
      }).then(() => {
        if (userObjectKey) {
          updateUserLatLong(
            DataPath.ALL_USERS2,
            userObjectKey,
            currentLat,
            currentLong,
          );
        }
      });
    }
    getLocation();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userId) {
        if (screen === 'go_to_Operator') {
          navigation.replace('Operator');
        } else if (screen === 'MapTrack') {
          navigation.replace('MapTrack');
        } else {
          navigation.replace('MyDrawer');
        }
      } else {
        navigation.replace('UserAuth');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.BLACK} />
      <Logo1 />
    </SafeAreaView>
  );
};

export default Splash;
