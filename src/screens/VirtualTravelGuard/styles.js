import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from '../../Constraints/Colors';
import Fonts from '../../Constraints/Fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
  },
  title1: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
    marginLeft: '7%',
  },
  locationContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  locationSubContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  sub1: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  sub2: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
  },
  sub11: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dotLinesContainer: {
    flexDirection: 'column',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: 3.2,
    height: 9,
    borderRadius: 2,
    backgroundColor: '#C8C7CC',
  },
  LongBar: {
    width: '91%',
    height: 1,
    borderRadius: 2,
    backgroundColor: '#C8C7CC',
  },
  textInputContainer: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.FIGTREE,
  },
  listView: {
    width: '100%',
  },
  description: {
    fontSize: 16,
  },
  row: {
    padding: 10,
    height: 44,
    flexDirection: 'row',
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  mapConatiner: {
    flex: 1,
  },
  containerStyle: {
    width: '100%',
  },
  cardStyle: {
    borderColor: Colors.GREY,
    borderWidth: 0.5,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '90%',
    height: 78,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: '5%',
  },
  cardStyle2: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: Colors.GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locTxtSty: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: Fonts.FIGTREE,
  },
  locTxtSty2: {
    color: '#828282',
    fontWeight: '500',
    fontSize: 12,
    marginTop: 2,
    fontFamily: Fonts.FIGTREE,
  },
  subCon: {marginLeft: 11, flexDirection: 'column', justifyContent: 'center'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'column',
  },
});
export default styles;
