import {StyleSheet, StatusBar, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from '../../Constraints/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
  },
  mapConatiner: {
    flex: 1,
  },
  headerStyl: {
    color: Colors.BLACK,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 31,
    fontStyle: 'normal',
    fontFamily: Fonts.FIGTREE,
  },
  topContainer: {
    width: '80%',
    marginBottom: '6%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    height: 46,
    borderRadius: 8,
    width: '90%',
    backgroundColor: Colors.BLACK,
    borderColor: Colors.BLACK,
    position: 'absolute',
    bottom: 20,
  },
  btnTxtStyle: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
});
export default styles;
