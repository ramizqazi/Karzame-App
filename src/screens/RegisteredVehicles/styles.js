// import {StyleSheet, Dimensions} from 'react-native';
// const {height, width} = Dimensions.get('window');
// import Colors from '../../Constraints/Colors';

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5F5F5',
//     flex: 1,
//   },
//   btnsContainer: {
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: '6%',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   bottomBtn: {
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 30,
//     backgroundColor: Colors.BLACK,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 70,
//     height: 70,
//     borderRadius: 70 / 2,
//     elevation: 5,
//   },
//   bottomBtnTxt: {
//     marginLeft: '4%',
//     fontFamily: Fonts.FIGTREE,
//     color: Colors.PRIMARY_WHITE,
//     fontSize: 25,
//     fontWeight: '600',
//     lineHeight: 29,
//   },
//   servicesContain: {
//     alignSelf: 'center',
//     width: '90%',
//     backgroundColor: Colors.PRIMARY_WHITE,
//     marginTop: 20,
//     alignItems: 'center',
//     height: 390,
//     justifyContent: 'space-evenly',
//     borderRadius: 8,
//     elevation: 3,
//   },
//   card: {
//     backgroundColor: 'red',
//   },

//   pic: {
//     borderRadius: 10,
//     width: '80%',
//     height: 150,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   imgSiz: {borderRadius: 10, width: '100%', height: 150, alignSelf: 'center'},

//   cardSub: {
//     justifyContent: 'space-evenly',
//     flexDirection: 'column',
//   },
//   cardSubContainer: {
//     borderRadius: 20,
//     width: '100%',
//     height: 100,
//     flexDirection: 'column',
//     paddingHorizontal: '3%',
//     backgroundColor: 'rgb(135,355,100)',
//     elevation: 0.9,
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
//   picContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 30,
//     alignItems: 'center',
//     backgroundColor: 'rgb(255,255,255)',
//     justifyContent: 'center',
//     elevation: 1,
//   },
//   nameInitials: {
//     color: 'white',
//     fontSize: 17,
//     fontFamily: Fonts.FIGTREE,
//   },
//   name: {
//     fontFamily: Fonts.FIGTREE,
//     color: 'black',
//     fontWeight: '700',
//     fontSize: 15,
//   },
//   heading: {
//     color: Colors.BLACK,
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: '4%',
//     marginBottom: '2%',
//     width: '90%',
//     alignSelf: 'center',
//   },
//   btnstyle: {
//     height: 46,
//     borderRadius: 8,
//     width: '50%',
//     backgroundColor: Colors.BLACK,
//     borderColor: Colors.BLACK,
//   },
//   btnTxt: {
//     color: Colors.BTN_TXT_WHITE,
//     fontSize: 16,
//     fontWeight: '500',
//     fontStyle: 'normal',
//     lineHeight: 19,
//     fontFamily: Fonts.FIGTREE,
//   },
//   imgContainerLoad: {
//     width: 100,
//     height: 100,
//     borderRadius: 100 / 2,
//     overflow: 'hidden',
//   },
//   loader: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputContainer: {
//     padding: 5,
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: Colors.GREY,
//   },
//   inputStyle: {
//     backgroundColor: Colors.PRIMARY_WHITE,
//     width: '100%',
//     fontSize: 16,
//     fontWeight: '400',
//     borderRadius: 10,
//     lineHeight: 24,
//     padding: 10,
//     textAlignVertical: 'top',
//   },
//   txtSty: {
//     borderRadius: 10,
//     width: '80%',
//     height: 150,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btnContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '90%',
//     alignSelf: 'center',
//     marginBottom: '4%',
//   },
// });
// export default styles;

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
  imgVehicleStyle: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainerLoad: {
    width: '50%',
    borderRadius: 20,
    height: 120,
    overflow: 'hidden',
    marginBottom: '2%',
    marginTop: '5%',
    backgroundColor: 'red',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
