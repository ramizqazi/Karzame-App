import {View, Text, Animated, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DownArrow from '../assets/VirtualTravelGuard/DownArrow.svg';
import Colors from '../Constraints/Colors';
import Fonts from '../Constraints/Fonts';

const PickerBtn = props => {
  const [rotateAnimation] = useState(new Animated.Value(0));

  const toggleExpandCategory = () => {
    props.setExpandedCategory(prev => !prev);
    Animated.timing(rotateAnimation, {
      toValue: props.expandedCataegory ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const arrowRotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const listCategories = () => {
    return (
      <Animated.View style={[styles.categoriesConatiner, {}]}>
        {props.dynamicBtn.map(item => {
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => {
                props.setExpandedCategory(prev => !prev);
                props.setCategory(item.title);
                props.setErrorMessage(false);
                rotateAnimation.setValue(0);
              }}>
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: Fonts.FIGTREE,
                  color: Colors.BLACK,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggleExpandCategory}
        style={[
          styles.picker,
          {
            borderBottomWidth: props.expandedCataegory ? 0 : 1,
            borderBottomLeftRadius: props.expandedCataegory ? 1 : 10,
            borderBottomRightRadius: props.expandedCataegory ? 1 : 10,
          },
        ]}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          {props.category ? (
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: Colors.BLACK,
                fontFamily: Fonts.FIGTREE,
              }}>
              {props.category}
            </Text>
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
        </View>
        <Animated.View style={{transform: [{rotate: arrowRotation}]}}>
          <DownArrow />
        </Animated.View>
      </TouchableOpacity>
      {props.expandedCataegory ? listCategories() : null}
    </View>
  );
};

export default PickerBtn;
const styles = StyleSheet.create({
  inputStyle: {
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
  },
  inputContainer: {
    paddingHorizontal: '5%',
    width: '90%',
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
  },
  picker: {
    marginTop: '4%',
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
    borderStartWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  categoriesConatiner: {
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: Colors.GREY,
    borderWidth: 1,
  },
});
