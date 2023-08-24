import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../Constraints/Colors';
import Fonts from '../Constraints/Fonts';

const Header = props => {
  return (
    <View style={[styles.Container, {...props.style}]}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={props.onPress}>
          {props.icon}
        </TouchableOpacity>

        <Text style={[styles.txt, {...props.txtStyle}]}>{props.txt}</Text>
      </View>
    </View>
  );
};

export default Header;
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
  txt: {
    marginLeft: '4%',
    fontFamily: Fonts.FIGTREE,
    color: Colors.PRIMARY_WHITE,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
  },
});
