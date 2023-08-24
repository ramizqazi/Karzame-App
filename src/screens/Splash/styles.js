import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from './../../Constraints/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BLACK,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
