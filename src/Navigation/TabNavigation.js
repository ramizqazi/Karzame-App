import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PopularServices from '../screens/PopularServices';
import Notifications from '../screens/Notifications';
import Payment from '../screens/Payment';
import Support from '../screens/Support';
import {View, Dimensions, Image} from 'react-native';
import Images from '../Constraints/Images';
import Colors from '../Constraints/Colors';
import Fonts from '../Constraints/Fonts';
import Agent from '../assets/PopularServices/modalAssets/Agent.svg';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const tabWidth = Dimensions.get('window').width;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        labelStyle: {
          fontSize: 12,
          fontWeight: '400',
        },
        activeTintColor: Colors.RED,
        inactiveTintColor: Colors.GREEN,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: (Dimensions.get('window').width - tabWidth) / 2,
          width: tabWidth,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          backgroundColor: Colors.PRIMARY_WHITE,
          paddingTop: 10,
          paddingBottom: 5,
          height: 65,
          shadowColor: Colors.BLACK,
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 6,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={PopularServices}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.BLACK,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, size}) => (
            <Image
              source={Images.HOME}
              style={{
                tintColor: focused ? Colors.BLACK : Colors.GREY,
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notification',
          tabBarActiveTintColor: Colors.BLACK,
          headerShown: false,
          tabBarIcon: ({focused, size}) => (
            <Image
              source={Images.BELL}
              style={{
                tintColor: focused ? Colors.BLACK : Colors.GREY,
                width: 22,
                height: 22,
              }}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.BLACK,
          tabBarLabel: 'Support',
          tabBarIcon: ({focused, size}) => (
            <Image
              source={Images.AGENT}
              style={{
                tintColor: focused ? Colors.BLACK : Colors.GREY,
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
