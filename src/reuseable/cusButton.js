import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const CusButton = ({
  allDisableloader,
  activeOpacity,
  disabled,
  loader,
  isValid,
  onPress,
  btnStyle = {},
  textStyle = {},
  btntxt,
  toggleCheck,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={loader || disabled || allDisableloader}
      onPress={onPress}
      style={{...styles.btnStyle, ...btnStyle}}>
      {loader ? (
        <ActivityIndicator
          size={'small'}
          color={toggleCheck === false ? 'black' : 'white'}
        />
      ) : (
        <Text style={{...styles.text, ...textStyle}}>{btntxt}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 65,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
  },
});
export default CusButton;
