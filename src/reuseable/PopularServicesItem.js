import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CheckServices from '../assets/PopularServices/CheckServices.svg';
import RightArrow from '../assets/PopularServices/RightArrow.svg';
import Fonts from '../Constraints/Fonts';

const PopularServicesItem = props => {
  return (
    <TouchableOpacity onPress={() => props.onpress()}>
      <View style={{...props.containerStyle}}>
        {props.SvgIcon}
        <View>
          <Text style={{...props.headStyle, fontFamily: Fonts.FIGTREE}}>
            {props.serviceHead}
          </Text>
          <Text
            style={{
              ...props.detailStyle,
              fontSize: 11,
              fontFamily: Fonts.FIGTREE,
              marginTop: 5,
            }}>
            {props.HeadDetail}
          </Text>
        </View>
        <View style={{marginLeft: 'auto'}}>
          <RightArrow style={{marginEnd: 20}} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularServicesItem;
