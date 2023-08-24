import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StatusBar,
  BackHandler,
  SafeAreaView,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import Sharee from '../../assets/PopularServices/modalAssets/Sharee.svg';
import Maps from '../../reuseable/Maps';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Path from '../../Utils/DataPath';
import Menu from '../../assets/StartTrio/Menu.svg';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {
  getWorkersWithinDistance,
  requestPermission,
  shareLoc,
} from '../../Utils/Functions';
import Colors from '../../Constraints/Colors';
import BottomSheet3 from '../../reuseable/BottomSheet3';
import Header from '../../reuseable/Header';
import Constraints from '../../Constraints/Constraints';
import {addCurrenLivetLocation, doResumeTrip} from '../../Redux/Action/actions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StartTrio = props => {
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [latDelta, setLatDelta] = useState(0.1);
  const [longDelta, setLongDelta] = useState(0.1);
  const [workers, setWorkers] = useState([]);
  const [distance, setDistance] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showTripMap, setShowTripMap] = useState(true);
  const mapRef = useRef(null);
  const {
    workerName,
    workerLat,
    workerLong,
    currentLat,
    currentLong,
    switchBool,
    userObjectKey,
  } = useSelector(reducers => reducers.allReducer);

  const backAction = () => {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to go back? because this action will end your trip',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            navigation.goBack();
            dispatch(doResumeTrip(true, false));
          },
        },
      ],
    );
    return true;
  };

  const addBackHandler = () => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
  };

  const removeBackHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', backAction);
  };

  useEffect(() => {
    addBackHandler();
    return () => removeBackHandler();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      removeBackHandler();
    });

    const resubscribe = navigation.addListener('focus', () => {
      addBackHandler();
    });

    return () => {
      unsubscribe();
      resubscribe();
    };
  }, [navigation]);

  const onPress = () => {
    navigation.toggleDrawer();
  };

  const updateUserLiveLocation = (userObjectKey, lat, long, heading) => {
    database()
      .ref('users/' + userObjectKey)
      .update({
        LiveLatitude: lat,
        LiveLongitude: long,
      })
      .then(() => {
        dispatch(addCurrenLivetLocation(lat, long, heading));
        // console.log('User location updated successfully!');
      })
      .catch(error => {
        // console.log('Error updating user location: ', error);
      });
  };

  async function getLocation() {
    requestPermission(location => {
      updateUserLiveLocation(
        userObjectKey,
        location.latitude,
        location.longitude,
        location.heading,
      );
    });
  }

  React.useEffect(() => {
    // const timeIn = SOSInterval.split(' ')[0];
    // console.log('switch status new ---->' + switchBool);
    if (switchBool) {
      const interval = setInterval(async () => {
        getLocation();
        // console.log('New Bot ');
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    } else {
      console.log('Nothing location happening');
    }
  }, [switchBool]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <Header
        navigation={navigation}
        // icon={<Menu />}
        txt={'Trip Started'}
        // onPress={onPress}
      />
      <Maps
        mapRef={mapRef}
        showsMyLocationButton={true}
        zoomTapEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        latitude={currentLat}
        longitude={currentLong}
        location={location}
        latitudeDelta={latDelta}
        longitudeDelta={longDelta}
        map={{flex: 1}}
        setShowTripMap={setShowTripMap}
        showTripMap={showTripMap}
      />

      <Pressable
        onPress={() => shareLoc()}
        style={{
          position: 'absolute',
          bottom: screenHeight / 1.9,
          alignSelf: 'flex-end',
          right: 10,
          width: 60,
          height: 60,
          alignItems: 'center',
          borderRadius: 60 / 2,
          justifyContent: 'center',
          backgroundColor: Colors.PRIMARY_WHITE,
        }}>
        <Sharee />
      </Pressable>

      <BottomSheet3
        containerStyle={styles.containerStyle}
        cardStyle={styles.cardStyle}
        cardStyle2={styles.cardStyle2}
        loading={loading}
      />
    </SafeAreaView>
  );
};

export default StartTrio;
