import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from '../../Constraints/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
  },
  btnsContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '6%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
