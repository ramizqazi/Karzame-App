import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import Header from '../../reuseable/Header';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import Constraints from '../../Constraints/Constraints';
import Heading from '../../reuseable/heading';
import {getNotificationData} from '../../Utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

const Notifications = ({navigation}) => {
  const [notifications, setNotifications] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const {userObjectKey} = useSelector(reducers => reducers.allReducer);

  useEffect(() => {
    getNotificationData(setShowLoader, setNotifications, userObjectKey);
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      {!showLoader ? (
        <>
          <Header
            navigation={navigation}
            icon={<ArrowBack />}
            txt={Constraints.NOTIFICATIONS}
            onPress={handleBack}
          />

          {notifications.reverse().map((item, index) => {
            return (
              <View style={styles.card} key={index}>
                <Heading
                  styl={{
                    fontFamily: Fonts.FIGTREE,
                    color: Colors.PRIMARY_WHITE,
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  txt={item.message}
                />
              </View>
            );
          })}
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notifications;
