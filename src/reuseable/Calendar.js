import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Constraints/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Calendarr from '../assets/SignUp/Calendarr.svg';
import Constraints from '../Constraints/Constraints';

const Calendar = props => {
  const handlePress = () => {
    props.setShowPicker(prevShowPicker => !prevShowPicker);
  };

  const handleChange = (event, date) => {
    props.setSelectedDate(prevDate => date);
    props.setShowPicker(false);
    props.setErrorMessage(false);
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handlePress();
        }}
        style={{...styles.picker, ...props.styl}}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <>
            {props.selectedDate ? (
              <>
                {props.mode === 'date' ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: Colors.BLACK,
                      fontFamily: Fonts.FIGTREE,
                    }}>
                    {props.selectedDate.getDate() +
                      ' / ' +
                      (props.selectedDate.getMonth() + 1) +
                      ' / ' +
                      props.selectedDate.getFullYear()}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: Colors.BLACK,
                      fontFamily: Fonts.FIGTREE,
                    }}>
                    {props.selectedDate.toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                )}
              </>
            ) : (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.GREY,
                  fontFamily: Fonts.FIGTREE,
                }}>
                {props.txt}
              </Text>
            )}
          </>
        </View>
        {props.icon}
      </TouchableOpacity>
      {props.showPicker && (
        <DateTimePicker
          style={{marginTop: '4%', alignSelf: 'center'}}
          value={props.selectedDate || new Date()}
          mode={props.mode}
          display="spinner"
          onChange={handleChange}
          minimumDate={props.minimumDate}
        />
      )}
    </View>
  );
};

export default React.memo(Calendar);
const styles = StyleSheet.create({
  picker: {
    paddingHorizontal: '5%',
    width: '90%',
    height: 50,
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
    borderWidth: 1,
  },
});
