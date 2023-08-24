import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const InpWithIcon = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onpress()}
        style={{...styles.cardStyle, ...props.mainContainer}}>
        <View style={styles.imgView}>{props.icon}</View>
        <View style={{...styles.subContainer, ...props.subContainer}}>
          <Text style={{...styles.title, ...props.TitleColor}}>
            {props.title}
          </Text>
          <Text style={{...styles.subTitile, ...props.subTitleColor}}>
            {props.subTitle}
          </Text>
        </View>

        <View style={{marginRight: 13}}>{props.icon2}</View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
  },
  title: {
    color: Colors.BLACK,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
    marginStart: 7,
  },
  subTitile: {
    marginStart: 7,
    color: Colors.GREY,
    fontWeight: '400',
    fontSize: 11,
    fontFamily: Fonts.FIGTREE,
    marginTop: 4,
  },

  subContainer: {
    marginLeft: '2%',
    flexDirection: 'column',
    width: '71%',
  },

  cardStyle: {
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    width: '90%',
    borderColor: Colors.GREY,
    borderWidth: 0.5,
    backgroundColor: Colors.PRIMARY_WHITE,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 6,
    marginBottom: '5%',
  },
  cardSubStyle: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    borderRadius: 10,
    justifyContent: 'center',
  },
});

export default InpWithIcon;
