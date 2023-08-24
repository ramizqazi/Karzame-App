import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Fonts from '../Constraints/Fonts';
import Colors from '../Constraints/Colors';
const TextInp = ({
  lebel,
  editable,
  placeholder,
  onChangeText,
  value,
  style,
  onBlur,
  keyboardType,
  eyeChange,
  secureTextEntry,
  maxLength,
  placeholderTextColor,
  lebelStyl,
  inputContainer,
  icon,
  iconEye,
  iconEyeClosed,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  mode,
  multiline,
  numberOfLines,
}) => {
  return (
    <View style={{...inputContainer}}>
      <TextInput
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        style={{...style, color: Colors.BLACK}}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />

      <TouchableOpacity
        onPress={() => {
          if (mode === 'password') {
            togglePasswordVisibility('password');
          } else {
            togglePasswordVisibility('confirmPassword');
          }
        }}
        style={{marginLeft: '4%'}}>
        {mode === 'password'
          ? showPassword
            ? iconEye
            : iconEyeClosed
          : showConfirmPassword
          ? iconEye
          : iconEyeClosed}
      </TouchableOpacity>
    </View>
  );
};

export default TextInp;
const styles = StyleSheet.create({});
