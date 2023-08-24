import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {View, LogBox} from 'react-native';
import Login from './../screens/Login';
import SignUp from './../screens/SignUp';
import Splash from './../screens/Splash';
import Otp from './../screens/Otp';
import Subscription from './../screens/Subscription';
import MapService from './../screens/MapService';
import WellbeingCheckServices from './../screens/WellbeingCheckServices';
import VirtualTravelGuard from './../screens/VirtualTravelGuard';
import StartTrio from './../screens/StartTrio';
import ForgotPassword from './../screens/ForgotPassword';
import ListContacts from './../screens/ListContacts';
import Payment from './../screens/Payment';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './../Redux/Store/store';
import PopularServices from '../screens/PopularServices';
import Operator from '../Provider/screens/Operator';
import RegisterService from '../Provider/screens/RegisterService';
import ChooseServices from '../Provider/screens/ChooseServices';
import SOSAlertSettingDaily from '../screens/SOSAlertSettingDaily';
import VirtualHomeCheck from '../screens/VirtualHomeCheck';
import Profile_police_alerts from '../screens/Profile_police_alerts';
import AddVehicle from '../screens/AddVehicle';
import RegisteredVehicles from '../screens/RegisteredVehicles';
import MapTrack from '../screens/MapTrack';
import WhistleBlow from '../screens/WhistleBlow';
import Support from '../screens/Support';
import MyDrawer from './Drawer/Drawer';
import MyTabs from '../Navigation/TabNavigation';
import Emergency from '../screens/Emergency';
import VirtuaHomeModal from '../reuseable/VirtuaHomeModal';

const Stack = createNativeStackNavigator();

function UserAuth({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="UserAuth"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{header: () => null}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen options={{header: () => null}} name="Otp" component={Otp} />
      <Stack.Screen
        options={{header: () => null}}
        name="ForgotPassword"
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}

function OperatorMode({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="ChooseServices"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{header: () => null}}
        name="ChooseServices"
        component={ChooseServices}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="RegisterService"
        component={RegisterService}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Operator"
        component={Operator}
      />
      {/* <Stack.Screen
        options={{ header: () => null }}
        name="Support"
        component={Support}
      /> */}
    </Stack.Navigator>
  );
}

function MyStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserAuth"
        component={UserAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PopularServices"
        component={PopularServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MapService"
        component={MapService}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WellbeingCheckServices"
        component={WellbeingCheckServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtuaHomeModal"
        component={VirtuaHomeModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualTravelGuard"
        component={VirtualTravelGuard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StartTrio"
        component={StartTrio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SOSAlertSettingDaily"
        component={SOSAlertSettingDaily}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualHomeCheck"
        component={VirtualHomeCheck}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListContacts"
        component={ListContacts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Emergency"
        component={Emergency}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Support"
        component={Support}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisteredVehicles"
        component={RegisteredVehicles}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile_police_alerts"
        component={Profile_police_alerts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicle}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OperatorMode"
        component={OperatorMode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Operator"
        component={Operator}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="WhistleBlow"
        component={WhistleBlow}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="MapTrack"
        component={MapTrack}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
