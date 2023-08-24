import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from '../../Constraints/Colors';
import Fonts from '../../Constraints/Fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
  },
  btnstyle: {
    height: 46,
    borderRadius: 8,
    width: '90%',
    backgroundColor: Colors.BLACK,
    borderColor: Colors.BLACK,
    marginTop: '25%',
  },
  btnTxt: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },
});
export default styles;
