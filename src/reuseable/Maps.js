/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  gyroscope,
  magnetometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from 'react-native-maps';
import LPF from 'lpf';

import MyPinn from '../assets/MapService/MyPinn.svg';
import MyPin from '../assets/MapService/MyPin.svg';
import Pin from '../assets/MapService/Pin.svg';
import MapViewDirections from 'react-native-maps-directions';
import Keys from '../Utils/Keys';
import Colors from '../Constraints/Colors';
import {useSelector} from 'react-redux';
import Images from '../Constraints/Images';

const screenHeight = Dimensions.get('window').height;

setUpdateIntervalForType(SensorTypes.magnetometer, 500);

const Maps = props => {
  const markerRef = useRef(null);
  const markerTrackRef = useRef(null);
  const [rotation, setRotation] = useState({x: 0, y: 0, z: 0});

  useEffect(() => {
    const gyroscopeSubscription = magnetometer.subscribe(
      sensorData => setRotation(_angle(sensorData)),
      error => console.log('The sensor is not available'),
    );

    return () => gyroscopeSubscription.unsubscribe();
  }, []);

  const _angle = _magnetometer => {
    let angle = 0;
    if (_magnetometer) {
      let {x, y} = _magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(LPF.next(angle));
  };

  console.log(rotation);

  const {
    workerName,
    workerLat,
    workerLong,
    currentLat,
    currentLong,
    destLat,
    destLong,
    currentLiveLong,
    currentLiveLat,
    operatorType,
    heading,
  } = useSelector(reducers => reducers.allReducer);
  const markerAnimation = useRef(
    new AnimatedRegion({
      latitude: currentLiveLat,
      longitude: currentLiveLong,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
  );

  const markerCoords = [
    {latitude: props.latitude, longitude: props.longitude}, // Marker 1
    {latitude: workerLat, longitude: workerLong}, // Marker 2
  ];

  const directionsCoords = [
    {latitude: props.latitude, longitude: props.longitude},
    {latitude: workerLat, longitude: workerLong},
  ];

  const markerCoordsTrip = [
    {
      latitude: currentLiveLat ? currentLiveLat : currentLat,
      longitude: currentLiveLong ? currentLiveLong : currentLong,
    }, // Marker 11
    {latitude: destLat, longitude: destLong}, // Marker 22
  ];

  const directionsCoordsTrip = [
    {latitude: currentLat, longitude: currentLong},
    {latitude: destLat, longitude: destLong},
  ];

  const markerCoordsTrack = [
    {
      latitude: currentLat,
      longitude: currentLong,
    }, // Marker 33
    {latitude: parseFloat(destLat), longitude: parseFloat(destLong)}, // Marker 44
  ];

  const directionsCoordsTrack = [
    {latitude: currentLat, longitude: currentLong},
    {latitude: parseFloat(destLat), longitude: parseFloat(destLong)},
  ];

  useEffect(() => {
    function showDirectionAndCenterMarkers() {
      const allCoords = [...markerCoords, ...directionsCoords];
      props.mapRef.current.fitToCoordinates(allCoords, {
        edgePadding: {
          top: 50, // adjust these values to center the markers and directions
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }

    function undoDirectionAndCenterMarkers() {
      props.mapRef.current.animateToRegion(
        {
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        1200, // set the duration of the animation in milliseconds
      );
    }
    if (props.showInfo === true) {
      showDirectionAndCenterMarkers();
    } else {
      undoDirectionAndCenterMarkers();
    }
  }, [props.showInfo]);

  useEffect(() => {
    function tripMap() {
      // const allCoordsTrip = [
      //   {
      //     latitude: currentLat,
      //     longitude: currentLong,
      //   },
      // ];

      // const allCoordsTrack = [...markerCoordsTrack, ...directionsCoordsTrack];

      //  mapRef.current.fitToCoordinates(allCoordsTrack, {
      //   edgePadding: {
      //     top: 50,
      //     right: 50,
      //     bottom: 50,
      //     left: 50,
      //   },
      //   animated: true,
      // });

      const yOffset = screenHeight * 0.1; // 20% of the screen height
      const region = {
        latitude: currentLiveLat ? currentLiveLat : currentLat,
        longitude: currentLiveLong ? currentLiveLong : currentLong,
        latitudeDelta: 0.002, // Adjust this value for zoom level
        longitudeDelta: 0.002, // Adjust this value for zoom level
      };
      region.latitude -= region.latitudeDelta * (yOffset / 256); // Map's zoom level scaling factor
      props.mapRef.current.animateToRegion(region, 2000);
    }

    if (props.showTripMap === true) {
      setTimeout(() => {
        tripMap();
      }, 700);
    }
  }, [props.showTripMap]);

  useEffect(() => {
    function tripMapTrack() {
      const allCoordsTrack = [...markerCoordsTrack, ...directionsCoordsTrack];

      props.mapRef.current.fitToCoordinates(allCoordsTrack, {
        edgePadding: {
          top: 50, // adjust these values to center the markers and directions
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }

    if (props.showTrackMap === true) {
      setTimeout(() => {
        tripMapTrack();
      }, 700);
    }
  }, [props.showTrackMap]);

  // useEffect(() => {
  //   if (markerRef.current) {
  //     markerRef.current.animateMarkerToCoordinate(
  //       {
  //         latitude: currentLiveLat ? currentLiveLat : currentLat,
  //         longitude: currentLiveLong ? currentLiveLong : currentLong,
  //       },
  //       500, // duration of animation in milliseconds
  //     );
  //   }
  // }, [
  //   currentLiveLat ? currentLiveLat : currentLat,
  //   currentLiveLong ? currentLiveLong : currentLong,
  // ]);

  useEffect(() => {
    if (markerTrackRef.current) {
      markerTrackRef.current.animateMarkerToCoordinate(
        {
          latitude: currentLat,
          longitude: currentLong,
        },
        500, // duration of animation in milliseconds
      );
    }
  }, [currentLat, currentLong]);

  // useEffect(() => {
  //   // Calculate the new coordinate
  //   const newCoordinate = {
  //     latitude: currentLiveLat ? currentLiveLat : currentLat,
  //     longitude: currentLiveLong ? currentLiveLong : currentLong,
  //   };

  //   // Update the marker animation
  //   markerAnimation.current
  //     .timing({
  //       latitude: newCoordinate.latitude,
  //       longitude: newCoordinate.longitude,
  //       duration: 4000,
  //       easing: Easing.linear,
  //     })
  //     .start();
  // }, [
  //   currentLiveLat ? currentLiveLat : currentLat,
  //   currentLiveLong ? currentLiveLong : currentLong,
  // ]);

  useEffect(() => {
    const time = setTimeout(() => {
      const newCoordinate = {
        latitude: currentLiveLat ? currentLiveLat : currentLat,
        longitude: currentLiveLong ? currentLiveLong : currentLong,
      };

      if (markerRef.current) {
        if (!markerRef.current._lastPosition) {
          markerRef.current._lastPosition = {
            latitude: currentLiveLat ? currentLiveLat : currentLat,
            longitude: currentLiveLong ? currentLiveLong : currentLong,
          };
        }

        const angle = Math.atan2(
          newCoordinate.latitude - markerRef.current._lastPosition.latitude,
          newCoordinate.longitude - markerRef.current._lastPosition.longitude,
        );

        props.mapRef.current.animateCamera(
          {
            center: newCoordinate,
            heading: angle,
            pitch: 0,
            // zoom: 18,
          },
          {duration: 3000},
        );

        markerAnimation.current
          .timing({
            latitude: newCoordinate.latitude,
            longitude: newCoordinate.longitude,
            duration: 3000,
          })
          .start();

        markerRef.current._lastPosition = newCoordinate;
      }
    }, 3000);
    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    const newCoordinate = {
      latitude: currentLiveLat ? currentLiveLat : currentLat,
      longitude: currentLiveLong ? currentLiveLong : currentLong,
    };

    if (markerRef.current) {
      if (!markerRef.current._lastPosition) {
        markerRef.current._lastPosition = {
          latitude: currentLiveLat ? currentLiveLat : currentLat,
          longitude: currentLiveLong ? currentLiveLong : currentLong,
        };
      }

      const angle = Math.atan2(
        newCoordinate.latitude - markerRef.current._lastPosition.latitude,
        newCoordinate.longitude - markerRef.current._lastPosition.longitude,
      );

      props.mapRef.current.animateCamera(
        {
          center: newCoordinate,
          heading: angle,
          pitch: 0,
          // zoom: 18,
        },
        {duration: 3000},
      );

      markerAnimation.current
        .timing({
          latitude: newCoordinate.latitude,
          longitude: newCoordinate.longitude,
          duration: 3000,
        })
        .start();

      markerRef.current._lastPosition = newCoordinate;
    }
  }, [
    props.showTripMap,
    currentLiveLat ? currentLiveLat : currentLat,
    currentLiveLong ? currentLiveLong : currentLong,
  ]);

  return (
    <>
      <MapView
        ref={props.mapRef}
        showsMyLocationButton={props.showsMyLocationButton}
        zoomTapEnabled={props.zoomTapEnabled}
        zoomEnabled={props.zoomEnabled}
        scrollEnabled={props.scrollEnabled}
        pitchEnabled={props.pitchEnabled}
        rotateEnabled={props.rotateEnabled}
        provider={PROVIDER_GOOGLE}
        style={props.map}
        region={{
          latitude: currentLat,
          longitude: currentLong,
          latitudeDelta: props.latitudeDelta,
          longitudeDelta: props.longitudeDelta,
        }}>
        <>
          {props.showTripMap ? (
            <>
              <MapViewDirections
                origin={{
                  latitude: currentLiveLat ? currentLiveLat : currentLat,
                  longitude: currentLiveLong ? currentLiveLong : currentLong,
                }}
                destination={{
                  latitude: destLat,
                  longitude: destLong,
                }}
                MapViewDirectionsMode={'DRIVING'}
                mode={'DRIVING'}
                lineCap={'round'}
                splitWaypoints={true}
                MapViewDirectionsPrecision={'high'}
                precision={'high'}
                apikey={Keys.GOOGLE_MAPS_APIKEY}
                strokeWidth={8}
                strokeColor={Colors.BLACK}
              />
              <Marker.Animated
                ref={markerRef}
                coordinate={markerAnimation.current}
                style={{}}
                identifier="marker11">
                <View
                  style={{
                    padding: 5,
                    backgroundColor: 'rgba(0, 0, 100,0.2)',
                    borderRadius: 40,
                  }}>
                  <Image
                    style={[
                      {
                        width: 30,
                        height: 30,
                        transform: [{rotateZ: `${360 - rotation}deg`}],
                      },
                    ]}
                    source={Images.ARROW}
                    resizeMode="contain"
                  />
                </View>
              </Marker.Animated>

              <Marker
                coordinate={{
                  latitude: destLat,
                  longitude: destLong,
                }}
                identifier="marker22">
                <Pin />
              </Marker>
            </>
          ) : null}
          {props.showTrackMap ? (
            <>
              <MapViewDirections
                origin={{
                  latitude: currentLat,
                  longitude: currentLong,
                }}
                destination={{
                  latitude: parseFloat(destLat),
                  longitude: parseFloat(destLong),
                }}
                apikey={Keys.GOOGLE_MAPS_APIKEY}
                strokeWidth={7}
                strokeColor={Colors.BLACK}
              />
              <Marker
                ref={markerTrackRef}
                coordinate={{
                  latitude: currentLat,
                  longitude: currentLong,
                }}
                identifier="marker33">
                <MyPinn />
              </Marker>
              <Marker
                coordinate={{
                  latitude: parseFloat(destLat),
                  longitude: parseFloat(destLong),
                }}
                identifier="marker44">
                <Pin />
              </Marker>
            </>
          ) : null}

          {props.showInfo ? (
            <>
              <MapViewDirections
                origin={{
                  latitude: currentLat,
                  longitude: currentLong,
                }}
                destination={{
                  latitude: parseFloat(workerLat),
                  longitude: parseFloat(workerLong),
                }}
                apikey={Keys.GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor={Colors.GREEN}
              />
              {/* <Polyline
                coordinates={directionsCoords}
                strokeWidth={5}
                strokeColor={Colors.GREEN}
              /> */}

              <Marker
                coordinate={{
                  latitude: props.latitude,
                  longitude: props.longitude,
                }}
                identifier="marker1">
                <MyPinn />
              </Marker>

              <Marker
                coordinate={{
                  latitude: workerLat,
                  longitude: workerLong,
                }}
                identifier="marker2">
                <Pin />
                <Callout>
                  <Text>{workerName}</Text>
                </Callout>
              </Marker>
            </>
          ) : (
            <>
              {props.data ? (
                <>
                  {props.data.map(item => {
                    if (item.workerType === operatorType) {
                      return (
                        <>
                          <Marker
                            coordinate={{
                              latitude: props.latitude,
                              longitude: props.longitude,
                            }}>
                            <MyPin />
                          </Marker>

                          <Marker
                            key={item.key}
                            coordinate={{
                              latitude: item.Latitude,
                              longitude: item.Longitude,
                            }}>
                            <Pin />
                            <Callout>
                              <Text>{item.workerName}</Text>
                            </Callout>
                          </Marker>
                        </>
                      );
                    }
                  })}
                </>
              ) : null}
            </>
          )}
        </>
        {props.showVirtualTravelGuardMap ? (
          <Marker
            coordinate={{
              latitude: currentLat,
              longitude: currentLong,
            }}>
            <MyPin />
          </Marker>
        ) : null}
      </MapView>
    </>
  );
};

export default Maps;

const styles = StyleSheet.create({
  mapStyle: {flex: 1},
});
