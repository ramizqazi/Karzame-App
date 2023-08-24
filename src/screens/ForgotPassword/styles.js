import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    height: 60,
    marginLeft: 28,
    marginTop: 20,
  },
  text: {
    marginTop: 50,
    marginLeft: 28,
    fontSize: 28,
    fontWeight: '600',
    color: '#3A3A3A',
  },
  inputSec: {
    backgroundColor: '#F3F5F7',
    marginTop: 35,
    height: 60,
    borderRadius: 6,
    width: '84.4%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  forgotText: {
    marginTop: 10,
    marginLeft: 29,
    fontSize: 14,
    color: '#3A3A3A',
  },
  errTxt: {
    width: '80%',
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: '2%',
  },
  topContainer: {
    width: '100%',

    marginBottom: '6%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyl: {
    color: Colors.BLACK,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 31,
    fontStyle: 'normal',
    fontFamily: Fonts.FIGTREE,
  },
  topBar: {
    width: 37,
    height: 5,
    backgroundColor: Colors.GREY,
    marginTop: '3%',
    borderRadius: 3,
  },
  inputStyle: {
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
  },
  inputContainer: {
    paddingHorizontal: 20,
    width: '90%',
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
  },
});
export default styles;
