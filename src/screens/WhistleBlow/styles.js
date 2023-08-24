import {StyleSheet} from 'react-native';
import Colors from '../../Constraints/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_WHITE,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  btnStyle: {
    height: 55,
    width: '80%',
    borderRadius: 8,
    borderWidth: 0.7,
    marginBottom: 20,
    backgroundColor: Colors.PRIMARY_WHITE,
    borderColor: Colors.BLACK,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  textStyle: {
    color: Colors.BLACK,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 19,
    textAlign: 'center',
  },
});

export default styles;
