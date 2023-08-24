import {StyleSheet, StatusBar, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Fonts from '../../Constraints/Fonts';
import Colors from '../../Constraints/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY_WHITE,
    flex: 1,
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
    marginLeft: -15,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  errTxt: {
    width: '88%',
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: 5,
    fontFamily: Fonts.FIGTREE,
  },
  headerStyl: {
    color: Colors.BLACK,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 31,
    fontStyle: 'normal',
    fontFamily: Fonts.FIGTREE,
  },
  headerStyl2: {
    color: '#FFFFFF',
    marginTop: 10,
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.FIGTREE,
  },
  phoneNum: {
    textAlign: 'center',
    marginLeft: 0,
    fontSize: 24,
    color: '#3A3A3A',
  },
  piTextContainerStyle: {
    height: '100%',
    backgroundColor: '#F4F4F6',
    marginLeft: 0,
    borderWidth: 0,
  },
  piTextInputStyle: {
    fontSize: 20,
    height: 46,
  },
  piContainerStyle: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    fontSize: 20,
    borderWidth: 0,
    borderColor: '#F4F4F6',
    marginTop: 20,
  },
  piCodeTextStyle: {
    marginLeft: -20,
    paddingLeft: 0,
    fontSize: 18,
    height: 20,
  },
  piFlagButtonStyle: {
    height: '100%',
    borderWidth: 0,
    backgroundColor: '#F4F4F6',
    borderRadius: 3,
  },
  bottomBottons: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  NextBtn: {
    width: '48%',
    height: 56,
    borderRadius: 10,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  NextTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    fontFamily: Fonts.FIGTREE,
  },
  NextTxt2: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    fontFamily: Fonts.FIGTREE,
  },
  btnGender1: {
    width: '48%',
    height: 46,
    borderRadius: 8,
    backgroundColor: Colors.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  btnGender2: {
    width: '48%',
    height: 46,
    borderRadius: 8,
    backgroundColor: Colors.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    width: 37,
    height: 5,
    backgroundColor: Colors.GREY,
    marginTop: '3%',
    borderRadius: 3,
  },
  topBarHide: {
    width: 66,
    height: 6,
    backgroundColor: '#FD6B22',
    marginTop: '5%',
    borderRadius: 100,
    left: '5%',
  },
  toBarContin: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelStyl: {
    fontSize: 12,
    fontWeight: '400',
    color: '#5B5B5B',
    lineHeight: 16,
  },
  socialBtnsConatiner: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  socialBtn: {
    backgroundColor: Colors.PRIMARY_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    height: 66,
    width: 66,
    borderWidth: 1,
    borderColor: Colors.GREY,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },
  orTxtContaiber: {
    marginTop: '5%',
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  orViewLine: {
    height: 2,
    width: 150,
    backgroundColor: Colors.GREY,
  },
  topContainer: {
    width: '100%',
    marginTop: StatusBar.currentHeight + 20,
    marginBottom: '6%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainerPaas: {
    marginTop: '4%',
    paddingHorizontal: '5%',
    width: '90%',
    height: 50,
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
    borderStartWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
  inputStyle: {
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
  },
  inputContainer: {
    width: '90%',
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
  },
  phoneInput: {
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '70%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.FIGTREE,
    marginLeft: '4%',
  },
  phoneInputContainer: {
    width: '72%',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.GREY,
  },
  forgotStyle: {
    width: '90%',
    marginTop: '3%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
  },
  dontHaveAccStyle: {
    marginTop: '8%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
  },
  center: {
    height: 20,
    width: 20,
    borderRadius: 4,
  },
  checked: {
    backgroundColor: Colors.BLACK,
  },
  outer: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY_WHITE,
  },
  remenberMe: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.BLACK,
    marginLeft: '4%',
  },
  checkBoxContiner: {
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '3%',
  },
  phoneInputView: {
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    height: 50,
    alignSelf: 'center',
  },
  pickerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 50,
    backgroundColor: Colors.PRIMARY_WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GREY,
    flexDirection: 'row',
  },
  camImg: {marginBottom: '4%', alignSelf: 'center'},
  profileImgStyle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  checkBoxContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  checkBox: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
  },
  checked: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  checkedIcon: {
    width: 15,
    height: 15,
  },
  rememberMe: {
    marginLeft: 10,
    color: Colors.BLACK,
  },
  imgContainerLoad: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
