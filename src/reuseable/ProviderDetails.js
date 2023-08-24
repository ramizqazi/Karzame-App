import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Constraints from './../Constraints/Constraints';
import Ratings from './Ratings';

const ProviderDetails = ({styl, txt}) => {
  return (
    <View style={[styles.providerDetailContainer, {}]}>
      <View style={styles.detailsContainer}>
        <Text style={styles.txt}>{Constraints.NOTE}</Text>

        <Ratings numOfCircles={5} />
      </View>
      <View style={styles.gapView} />
      <View style={styles.detailsContainer}>
        <Text style={styles.txt}>{Constraints.PROJECTS}</Text>
        <Text style={styles.subTxt}>13 projects</Text>
      </View>
      <View style={styles.gapView} />
      <View style={styles.detailsContainer}>
        <Text style={styles.txt}>{Constraints.STATUS}</Text>
        <Text style={styles.subTxt}>verified</Text>
      </View>
    </View>
  );
};

export default ProviderDetails;
const styles = StyleSheet.create({
  providerDetailContainer: {
    width: '100%',
    alignSelf: 'center',
    height: 28,
    marginBottom: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },
  detailsContainer: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gapView: {
    height: 28,
    width: 2.5,
    backgroundColor: '#E7E7E7',
  },
  subTxt: {
    color: '#F14300',
    fontSize: 9,
    fontStyle: 'normal',
    lineHeight: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  txt: {
    color: '#000000',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 18,
    fontWeight: '500',
  },
  txt2: {
    color: '#C4C4C4',
    fontSize: 8,
    fontStyle: 'normal',
    lineHeight: 10,
    fontWeight: '700',
  },
});
