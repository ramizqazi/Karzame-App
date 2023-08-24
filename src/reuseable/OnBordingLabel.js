import React, {useState} from 'react';
import {Text, View, Dimensions, Animated, StyleSheet} from 'react-native';

const OnBordingLabel = props => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 140,
        width: '100%',
        justifyContent: 'center',
        opacity: props.opacity,
      }}>
      <Animated.Text style={[props.txtStyles, {}]}>{props.h1Txt}</Animated.Text>
      <Animated.Text style={[props.txtStyles1, {}]}>
        {props.h2Txt}
      </Animated.Text>
    </Animated.View>
  );
};
export default OnBordingLabel;

const styles = StyleSheet.create({});
