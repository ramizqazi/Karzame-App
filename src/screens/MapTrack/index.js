import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../Constraints/Colors';
import {useDispatch, useSelector} from 'react-redux';
import Maps from '../../reuseable/Maps';
import styles from './styles';
import Heading from '../../reuseable/heading';
import CusButton from '../../reuseable/cusButton';
import Constraints from '../../Constraints/Constraints';
import {dispatchScreen} from '../../Navigation/NavigationService';

const MapTrack = ({route}) => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  // const {notificationData} = route.params;
  const [latDelta, setLatDelta] = useState(0.1);
  const [longDelta, setLongDelta] = useState(0.1);
  const [showTrackMap, setShowTrackMap] = useState(false); // Set initial state to false
  // const {title, message, data} = notificationData;
  const {currentLat, currentLong, notiPhone, userObjectKey} = useSelector(
    reducers => reducers.allReducer,
  );

  useEffect(() => {
    // Wait for coordinates to be available before showing the map
    if (currentLat !== null && currentLong !== null) {
      setTimeout(() => {
        setShowTrackMap(true);
      }, 1400);
    }
  }, [currentLat, currentLong]);

  const handlePess = () => {
    Promise.all([dispatchScreen('MyDrawer')]).then(() => {
      navigation.replace('MyDrawer');
    });
  };
console.log(currentLat, currentLong)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.PRIMARY_WHITE}
      />
      <View style={styles.topContainer}>
        <Heading txt={notiPhone} styl={styles.headerStyl} />
        <View style={styles.topBar} />
      </View>
      {showTrackMap ? (
        <View style={{flex: 1}}>
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
            // location={data}
            latitudeDelta={latDelta}
            longitudeDelta={longDelta}
            mapConatiner={styles.mapConatiner}
            setShowTrackMap={setShowTrackMap}
            showTrackMap={showTrackMap}
          />
          <CusButton
            activeOpacity={0.7}
            onPress={handlePess}
            btnStyle={styles.btnStyle}
            textStyle={styles.btnTxtStyle}
            btntxt={Constraints.BACK_TO_HOME}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MapTrack;
