import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../Constraints/Colors';
import Fonts from '../Constraints/Fonts';

const HeaderTwo = props => {
  return (
    <View style={styles.Container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={props.onPress}>
          {props.icon}
        </TouchableOpacity>

        <Text
          style={{
            marginLeft: '4%',
            fontFamily: Fonts.FIGTREE,
            color: Colors.PRIMARY_WHITE,
            fontSize: 24,
            fontWeight: '600',
            lineHeight: 29,
          }}>
          {props.txt}
        </Text>
      </View>
      <View style={styles.subContainer}>
        {props.icon2}

        <Text
          style={{
            marginLeft: '4%',
            fontFamily: Fonts.FIGTREE,
            color: Colors.GREY,
            fontSize: 14,
            fontWeight: '600',
            lineHeight: 16,
          }}>
          {props.txt2}
        </Text>
      </View>
    </View>
  );
};

export default HeaderTwo;
const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.BLACK,
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
