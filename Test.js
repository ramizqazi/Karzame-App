import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const Test = () => {
  const [region, setRegion] = useState({
    latitude: 31.554637,
    longitude: 74.363646,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [angle, setAngle] = useState(0);
  const mapRef = useRef(null);

  const animateToCoordinate = (latitude, longitude, newAngle) => {
    setAngle(newAngle);

    mapRef.current.animateCamera(
      {
        center: {latitude, longitude},
        heading: newAngle,
        pitch: 0,
        zoom: 15,
      },
      {duration: 1000},
    );
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} region={region}>
        <Marker
          coordinate={region}
          anchor={{x: 0.5, y: 0.5}}
          rotation={angle}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Test;
