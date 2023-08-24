import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from './../../Constraints/Colors';
import Fonts from '../../Constraints/Fonts';
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
  },
  subTitile: {
    color: Colors.GREY,
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    fontFamily: Fonts.FIGTREE,
  },

  subContainer: {
    width: '70%',
    marginLeft: '5%',
    flexDirection: 'column',
    height: 53,
    justifyContent: 'space-between',
  },

  cardStyle: {
    paddingHorizontal: '2%',
    width: '90%',
    paddingVertical: '2%',
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
    marginBottom: '6%',
  },
  cardSubStyle: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    width: 62,
    height: 62,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
