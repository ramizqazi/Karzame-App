import {createDrawerNavigator} from '@react-navigation/drawer';
import {color} from 'react-native-reanimated';
import VirtualHomeCheck from '../../screens/VirtualHomeCheck';
import VirtualTravelGuard from '../../screens/VirtualTravelGuard';
import StartTrio from '../../screens/StartTrio';
import WellbeingCheckServices from '../../screens/WellbeingCheckServices';
import MapService from '../../screens/MapService';
import PopularServices from '../../screens/PopularServices';
import SOSAlertSettingDaily from '../../screens/SOSAlertSettingDaily';
import Support from '../../screens/Support';
import ListContacts from '../../screens/ListContacts';
import RegisteredVehicles from '../../screens/RegisteredVehicles';
import AddVehicle from '../../screens/AddVehicle';
import Emergency from '../../screens/Emergency';
import CustomDrawerContent from './DrawerContent';
import MyTabs from './../TabNavigation';
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      gestureEnabled={false} // disable swipe gesture
      screenOptions={{
        drawerStyle: {backgroundColor: '#fff', width: '80%'},
        headerShown: false,
      }}
      drawerType="slide"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="MyTabs" component={MyTabs} />
      <Drawer.Screen
        name="SOSAlertSettingDaily"
        component={SOSAlertSettingDaily}
      />

      {/* <Drawer.Screen
        name="WellbeingCheckServices"
        component={WellbeingCheckServices}
      />
      <Drawer.Screen
        options={{swipeEnabled: false}}
        name="StartTrio"
        component={StartTrio}
      /> */}
      <Drawer.Screen name="MapService" component={MapService} />
      {/* <Drawer.Screen name="VirtualHomeCheck" component={VirtualHomeCheck} /> */}
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Emergency" component={Emergency} />
      <Drawer.Screen name="ListContacts" component={ListContacts} />
      {/* <Drawer.Screen name="RegisteredVehicles" component={RegisteredVehicles} /> */}
      <Drawer.Screen name="AddVehicle" component={AddVehicle} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
