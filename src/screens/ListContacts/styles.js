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
  bottomBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: Colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    elevation: 5,
  },
  bottomBtnTxt: {
    marginLeft: '4%',
    fontFamily: Fonts.FIGTREE,
    color: Colors.PRIMARY_WHITE,
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 29,
  },
  servicesContain: {alignSelf: 'center'},
  card: {
    width: '99%',
    marginTop: 34,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSub: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  cardSubContainer: {
    borderRadius: 20,
    width: '60%',
    height: 90,
    flexDirection: 'column',
    paddingHorizontal: '3%',
    backgroundColor: 'rgb(135,355,100)',
    elevation: 0.9,
    justifyContent: 'center',
  },
  picContainer: {
    width: 90,
    height: 90,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255)',
    justifyContent: 'center',
    elevation: 1,
  },
  nameInitials: {
    color: 'white',

    fontSize: 17,
    fontFamily: Fonts.FIGTREE,
  },
  name: {
    fontFamily: Fonts.FIGTREE,
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
});
export default styles;
