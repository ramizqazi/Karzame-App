import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  PermissionsAndroid,
  Keyboard,
} from 'react-native';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import CurrentPin from '../../assets/VirtualTravelGuard/CurrentPin.svg';
import DestinationPin from '../../assets/VirtualTravelGuard/DestinationPin.svg';
import My_Location2 from '../../assets/VirtualTravelGuard/My_Location2.svg';
import My_Location from '../../assets/VirtualTravelGuard/My_Location.svg';
import HeaderTwo from '../../reuseable/HeaderTwo';
import Constraints from '../../Constraints/Constraints';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Keys from '../../Utils/Keys';
import {
  requestPermission,
  getCountry,
  getLocation,
} from '../../Utils/Functions';
import {
  addDestinationLocation,
  addCurrentLocation,
  addCurrentLocTxt,
  addDestLocTxt,
  addCurrenLivetLocation,
} from '../../Redux/Action/actions';
import {useDispatch, useSelector} from 'react-redux';
import Maps from '../../reuseable/Maps';
import CusButton from '../../reuseable/cusButton';
import WellBeingCheckForm from '../../reuseable/WellBeingCheckForm';
import {getCurrentLatLng, locationPermission} from '../../Utils/LocationFun';

const {height} = Dimensions.get('window');
const DEFAULT_HEIGHT = height * 0.7;
const SNAP_TOP = 0;
const SNAP_BOTTOM = DEFAULT_HEIGHT;

const VirtualTravelGuard = ({navigation}) => {
  const {currentLat, currentLong} = useSelector(
    reducers => reducers.allReducer,
  );
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [latDelta, setLatDelta] = useState(0.1);
  const [longDelta, setLongDelta] = useState(0.1);
  const [location, setLocation] = useState(null);
  const [countryName, setCountry] = useState('');
  const [showVirtualTravelGuardMap, setShowVirtualTravelGuardMap] =
    useState(true);
  const mapRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currLoc, setCurrLoc] = useState('');
  const [desLoc, setDesLoc] = useState('');

  useEffect(() => {
    getCountry(currentLat, currentLong, Keys, setCountry, setLoader);
  }, []);

  const onPress = () => {
    navigation.goBack();
  };

  const handleCurrentLocation = async () => {
    const locationPer = await locationPermission();
    if (locationPer) {
      const {latitude, longitude} = await getCurrentLatLng();
      setLocation(latitude, longitude);
      // console.log(latitude, longitude);

      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      dispatch(addCurrentLocTxt(Constraints.USE_MY_CURRENT_LOCATION));
      setCurrLoc(Constraints.USE_MY_CURRENT_LOCATION);
      dispatch(addCurrentLocation(latitude, longitude));
    }

    // const rr = await requestPermission(setLocation);
    // mapRef.current.animateToRegion({
    //   latitude: location ? location.latitude : currentLat,
    //   longitude: location ? location.longitude : currentLong,
    //   latitudeDelta: 0.1,
    //   longitudeDelta: 0.1,
    // });
    // console.log("Location >>>>", location)
    // dispatch(addCurrentLocTxt(Constraints.USE_MY_CURRENT_LOCATION));
    // setCurrLoc(Constraints.USE_MY_CURRENT_LOCATION);
    // if (rr) {
    //   dispatch(addCurrentLocation(location.latitude, location.longitude));
    // }
  };

  const handleCurrLocation = (data, details = null) => {
    const Name = data.description.split(',');
    const sliceName = Name;
    setCurrLoc(sliceName);
    // console.log(sliceName);
    dispatch(
      addCurrentLocation(
        details.geometry.location.lat,
        details.geometry.location.lng,
      ),
    );
    dispatch(addCurrentLocTxt(sliceName));
  };

  const handleDesLocation = (data, details = null) => {
    const Name = data.description.split(',');
    const sliceName = Name;
    setDesLoc(sliceName);
    dispatch(
      addDestinationLocation(
        details.geometry.location.lat,
        details.geometry.location.lng,
      ),
    );
    dispatch(addDestLocTxt(sliceName));
  };

  const handleWellBeing = useCallback(() => {
    if (currLoc === '') {
      alert('Enter Current location');
    } else if (desLoc === '') {
      alert('Enter destination location');
    } else {
      setModalVisible(true);
    }
  }, [desLoc, modalVisible, currLoc]);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, [modalVisible]);

  const renderRow = rowData => {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.locIcon}>
            <DestinationPin />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.locTxtSty}>
              {rowData.structured_formatting.main_text}
            </Text>
            <Text style={styles.locTxtSty2}>
              {rowData.structured_formatting.secondary_text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </View>
      ) : (
        <>
          <HeaderTwo
            navigation={navigation}
            icon={<ArrowBack />}
            txt={Constraints.VIRTUAL_TRAVEL_GUARD}
            icon2={<My_Location />}
            txt2={Constraints.REGISTER_YOUR_JOUNEY}
            onPress={onPress}
          />

          <View style={styles.locationContainer}>
            <View style={styles.locationSubContainer}>
              {location ? (
                <View style={[styles.sub1, {alignItems: 'center'}]}>
                  <View
                    style={{
                      width: '54%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}>
                    <CurrentPin />
                    <TouchableOpacity
                      onPress={() => {
                        setLocation(null);
                      }}>
                      <Text
                        style={{
                          color: Colors.BLACK,
                          fontWeight: '500',
                          fontSize: 16,
                          lineHeight: 19,
                          fontFamily: Fonts.FIGTREE,
                        }}>
                        {Constraints.USE_MY_CURRENT_LOCATION}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <My_Location />
                </View>
              ) : (
                <View style={[styles.sub1, {marginBottom: -10}]}>
                  <GooglePlacesAutocomplete
                    placeholder="Current Location"
                    fetchDetails={true}
                    query={{
                      key: Keys.GOOGLE_MAPS_APIKEY,
                      language: 'en',
                      components: `country:${countryName}`,
                    }}
                    onPress={handleCurrLocation}
                    renderRow={renderRow}
                    renderLeftButton={() => {
                      return <CurrentPin />;
                    }}
                    renderRightButton={() => {
                      return (
                        <TouchableOpacity
                          onPress={handleCurrentLocation}
                          style={{}}>
                          <My_Location />
                        </TouchableOpacity>
                      );
                    }}
                    styles={{
                      textInputContainer: styles.textInputContainer,
                      textInput: styles.textInput,
                      listView: styles.listView,
                    }}
                    listViewDisplayed={false}
                    enablePoweredByContainer={false}
                  />
                </View>
              )}

              <View style={styles.sub2}>
                <View style={styles.dotLinesContainer}>
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                  <View style={styles.line} />
                </View>
                <View style={styles.LongBar} />
              </View>

              <View style={[styles.sub1, {marginTop: -10}]}>
                <GooglePlacesAutocomplete
                  placeholder="Destination"
                  minLength={2}
                  fetchDetails={true}
                  query={{
                    key: Keys.GOOGLE_MAPS_APIKEY,
                    language: 'en',
                    components: `country:${countryName}`,
                  }}
                  onPress={handleDesLocation}
                  renderRow={renderRow}
                  styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    predefinedPlacesDescription:
                      styles.predefinedPlacesDescription,
                  }}
                  renderLeftButton={() => {
                    return <DestinationPin />;
                  }}
                  listViewDisplayed={false}
                  enablePoweredByContainer={false}
                />
              </View>
            </View>
          </View>
          <Maps
            mapRef={mapRef}
            showsMyLocationButton={true}
            zoomTapEnabled={true}
            zoomEnabled={true}
            scrollEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            latitude={location ? location.latitude : currentLat}
            longitude={location ? location.longitude : currentLong}
            location={location}
            latitudeDelta={latDelta}
            longitudeDelta={longDelta}
            map={{flex: 1}}
            showVirtualTravelGuardMap={showVirtualTravelGuardMap}
            setShowVirtualTravelGuardMap={setShowVirtualTravelGuardMap}
          />

          <TouchableOpacity
            onPress={() => {
              mapRef.current.animateToRegion({
                latitude: location ? location.latitude : currentLat,
                longitude: location ? location.longitude : currentLong,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              });
            }}
            style={{
              position: 'absolute',
              bottom: 100,
              right: 20,
            }}>
            <My_Location2 />
          </TouchableOpacity>

          <CusButton
            activeOpacity={0.9}
            onPress={handleWellBeing}
            btnStyle={{
              height: 46,
              borderRadius: 8,
              width: '90%',
              backgroundColor: Colors.BLACK,
              borderColor: Colors.BLACK,
              position: 'absolute',
              bottom: 20,
            }}
            textStyle={{
              color: Colors.BTN_TXT_WHITE,
              fontSize: 16,
              fontWeight: '500',
              fontStyle: 'normal',
              lineHeight: 19,
              fontFamily: Fonts.FIGTREE,
            }}
            btntxt={Constraints.WELL_BEING_CHECK_INTERVAL}
          />

          <WellBeingCheckForm
            modalVisible={modalVisible}
            hideModal={hideModal}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default VirtualTravelGuard;
