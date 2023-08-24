import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox, SafeAreaView, View, Image, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/Store/store';
import MyStack from './src/Navigation/ScreenNavigator';
import PushNotification from 'react-native-push-notification';
import {
  setTopLevelNavigator,
  navigate,
  dispatchSomeAction,
  dispatchScreen,
  dispatchNotinData,
} from './src/Navigation/NavigationService';

const RootStack = createNativeStackNavigator();
LogBox.ignoreAllLogs(true);

function App() {
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        // console.log('REMOTE NOTIFICATION:', notification);

        if (!notification.userInteraction) {
          PushNotification.localNotification({
            title: notification.title,
            message: notification.message,
            channelId: 'sound_channel',
            data: notification.data,
          });
        } else {
          handleNotificationInteraction(notification);
        }
      },
      createChannel: Platform.OS === 'android',
      channelId: 'sound_channel',
      channelName: 'sound_channel',
    });

    if (Platform.OS === 'ios') {
      PushNotification.requestPermissions();
    }
  }, []);

  const handleNotificationInteraction = notification => {
    const {title, data} = notification;

    if (data.type === 'track') {
      Promise.all([
        dispatchScreen('MapTrack'),
        dispatchSomeAction(data),
        dispatchNotinData(data.workerPhoneNumber),
      ]).then(() => {
        setTimeout(() => {
          navigate('MapTrack');
        }, 100);
      });
    }
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigatorRef => {
              setTopLevelNavigator(navigatorRef);
            }}>
            <RootStack.Navigator
              headerMode="none"
              screenOptions={{
                headerShown: false,
              }}>
              <RootStack.Screen name="MyStack" component={MyStack} />
            </RootStack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
