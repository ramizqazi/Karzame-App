import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';
import Maps from '../../reuseable/Maps';
import Sharee from '../../assets/PopularServices/modalAssets/Sharee.svg';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Path from './../../Utils/DataPath';
import ArrowBack from '../../assets/MapService/ArrowBack.svg';
import {useNavigation} from '@react-navigation/native';
import {
  getWorkersWithinDistance,
  requestPermission,
  shareLoc,
} from '../../Utils/Functions';

import Colors from '../../Constraints/Colors';
import BottomSheet from '../../reuseable/BottomSheet';
import Header from '../../reuseable/Header';
import Constraints from '../../Constraints/Constraints';
import {
  addDestinationLocation,
  addCurrentLocation,
} from '../../Redux/Action/actions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MapService = ({props, route}) => {
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [latDelta, setLatDelta] = useState(0.1);
  const [longDelta, setLongDelta] = useState(0.1);
  const [workers, setWorkers] = useState([]);
  const [distance, setDistance] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const navigation = useNavigation();

  const mapRef = useRef(null);

  useEffect(() => {
    requestPermission(setLocation);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        // get workers within 500 kilometers of the user's location
        try {
          const workers = await getWorkersWithinDistance(
            Path.ALL_OPERATORS,
            location.latitude,
            location.longitude,
            500,
          );
          dispatch(addCurrentLocation(location.latitude, location.longitude));
          setWorkers(workers);
          setLoading(false);
        } catch (e) {
          alert(`Error fetching operators: ${e.message}`);
        }
      }
    };

    fetchData();
  }, [location]);

  const onPress = () => {
    if (showInfo) {
      setShowInfo(false);
    } else {
      navigation.goBack();
    }
  };

  const {serviceNaem} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      {loading || !location ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </View>
      ) : (
        <View style={styles.container}>
          <Header
            navigation={navigation}
            icon={<ArrowBack />}
            txt={serviceNaem}
            onPress={onPress}
          />
          <Maps
            mapRef={mapRef}
            showsMyLocationButton={true}
            zoomTapEnabled={true}
            zoomEnabled={true}
            scrollEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            latitude={location.latitude}
            longitude={location.longitude}
            location={location}
            latitudeDelta={latDelta}
            longitudeDelta={longDelta}
            map={{flex: 1}}
            data={workers}
            setShowInfo={setShowInfo}
            showInfo={showInfo}
          />
          <Pressable
            onPress={() => shareLoc()}
            style={{
              position: 'absolute',
              bottom: screenHeight / 2.2,
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

          <BottomSheet
            containerStyle={styles.containerStyle}
            cardStyle={styles.cardStyle}
            cardStyle2={styles.cardStyle2}
            loading={loading}
            data={workers}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MapService;
