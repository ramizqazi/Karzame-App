import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import DestinationPin from '../assets/VirtualTravelGuard/DestinationPin.svg';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import Keys from '../Utils/Keys';
import Colors from './../Constraints/Colors';
import CusButton from './cusButton';
import Constraints from '../Constraints/Constraints';
import {useDispatch} from 'react-redux';
import {addVirtualLocTxt} from '../Redux/Action/actions';
import {useNavigation} from '@react-navigation/native';

const VirtualHomeModal = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [geocodingInProgress, setGeocodingInProgress] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    Geocoder.init(Keys.GOOGLE_MAPS_APIKEY);
    requestPermission();
  }, []);

  const requestPermission = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setMarkerPosition({latitude, longitude});
        reverseGeocode(latitude, longitude);
      },
      error => {
        // console.log('Error', error.message);
        setLoading(false);
      },
    );
  };

  const reverseGeocode = (latitude, longitude) => {
    setGeocodingInProgress(true);
    Geocoder.from(latitude, longitude)
      .then(response => {
        const address = response.results[0].formatted_address;
        setCurrentAddress(address);
        dispatch(addVirtualLocTxt(address));
        setLoading(false);
        setGeocodingInProgress(false);
      })
      .catch(error => {
        // console.error(error);
        setLoading(false);
        setGeocodingInProgress(false);
      });
  };

  const handlePlaceSelect = (data, details) => {
    const {lat: latitude, lng: longitude} = details.geometry.location;
    setMarkerPosition({latitude, longitude});

    reverseGeocode(latitude, longitude);

    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    mapRef.current.animateToRegion(region);
  };

  const onMapPanDrag = () => {
    setIsPanning(true);
  };

  const onMapPress = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setMarkerPosition({latitude, longitude});
    setIsPanning(false);
    reverseGeocode(latitude, longitude);
  };

  const onMapRelease = () => {
    setIsPanning(false);
    const {latitude, longitude} = markerPosition;
    reverseGeocode(latitude, longitude);
  };

  const onRegionChangeComplete = region => {
    if (!isPanning) {
      const {latitude, longitude} = region;
      setMarkerPosition({latitude, longitude});
      reverseGeocode(latitude, longitude);
    }
  };

  const initialRegion = {
    latitude: markerPosition?.latitude,
    longitude: markerPosition?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

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

  const {countryName} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Search Places"
        textInputProps={{
          placeholderTextColor: Colors.GREY,
        }}
        minLength={2}
        fetchDetails={true}
        query={{
          key: Keys.GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: `country:${countryName}`,
        }}
        onPress={handlePlaceSelect}
        renderRow={renderRow}
        styles={{
          container: styles.autoContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        listViewDisplayed={false}
        enablePoweredByContainer={false}
      />

      <View style={styles.mapContainer}>
        {loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.BLACK} />
          </View>
        ) : (
          <MapView
            ref={mapRef}
            initialRegion={initialRegion}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            onMapReady={requestPermission}
            onRegionChangeComplete={onRegionChangeComplete}
            onPanDrag={onMapPanDrag}
            onPress={onMapPress}
            onPanDragEnd={onMapRelease}>
            {markerPosition && <Marker coordinate={markerPosition} />}
          </MapView>
        )}
      </View>
      {!loading && (
        <View style={styles.addressContainer}>
          {geocodingInProgress ? (
            <ActivityIndicator size="small" color={Colors.BLACK} />
          ) : (
            <>
              <Text style={styles.addressText}>{currentAddress}</Text>

              <CusButton
                onPress={() => {
                  navigation.goBack();
                }}
                btnStyle={{
                  height: 46,
                  borderRadius: 8,
                  marginTop: 20,
                  width: '90%',
                  backgroundColor: Colors.BLACK,
                  borderColor: Colors.BLACK,
                }}
                textStyle={styles.btnTxt}
                btntxt={Constraints.DONE}
              />
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default VirtualHomeModal;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sub1: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  addressContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.PRIMARY_WHITE,
    borderRadius: 8,
    padding: 8,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.BLACK,
    alignSelf: 'center',
  },
  btnTxt: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: Fonts.FIGTREE,
  },
  textInputContainer: {},
  textInput: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.FIGTREE,
    borderRadius: 8,
  },

  autoContainer: {
    marginTop: 10,
    flex: 0,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },

  listView: {},
  description: {
    fontSize: 16,
  },
  row: {
    padding: 10,
    height: 44,
    flexDirection: 'row',
  },
  rowText: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'column',
  },
  locIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: Colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locTxtSty: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.FIGTREE,
  },
  locTxtSty2: {
    color: '#828282',
    fontWeight: '500',
    fontSize: 12,
    marginTop: 2,
    fontFamily: Fonts.FIGTREE,
  },
});
