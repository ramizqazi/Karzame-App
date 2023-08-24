import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constraints/Colors';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mapConatiner: {
    flex: 1,
  },
  head: {},
  heading: {
    alignSelf: 'center',
    width: '60%',
  },
  row: {
    position: 'absolute',
    top: 20,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  mainHead: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },

  searchContainer: {
    alignItems: 'center',
    borderRadius: 8,
    height: 53,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginLeft: '2%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  NoWorkerStyle: {
    width: '90%',
    height: 110,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#1E1E1E',
    fontSize: 14,
    width: '62%',
    fontWeight: '400',
    lineHeight: 21,
  },
  loaderContainerMap: {
    marginTop: '6%',
    width: '90%',
    height: 136,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerStyle: {
    width: '100%',
  },
  cardStyle: {
    borderColor: Colors.GREY,
    borderWidth: 0.5,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '90%',
    height: 78,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: '5%',
  },
  cardStyleInfo: {
    backgroundColor: Colors.GREEN,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle2: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
});
export default styles;
