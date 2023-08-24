import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from '../../Constraints/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
  },
  card: {
    marginTop: '5%',
    backgroundColor: '#6D9886',
    alignSelf: 'center',
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
export default styles;
