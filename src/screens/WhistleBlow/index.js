import styles from './styles';
import Header from '../../reuseable/Header';
import Colors from '../../Constraints/Colors';
import Heading from '../../reuseable/heading';
import React, {useState, useEffect} from 'react';
import CusButton from '../../reuseable/cusButton';
import {useDispatch, useSelector} from 'react-redux';
import ReportModal from '../../reuseable/ReportModal';
import Constraints from '../../Constraints/Constraints';
import {View, StatusBar, SafeAreaView} from 'react-native';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import {WhistleBlowBtns} from '../../DataStore/genderBtns';

const WhistleBlow = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('');
  const {userObjectKey, token} = useSelector(reducers => reducers.allReducer);

  const handleBack = () => {
    navigation.goBack();
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = type => {
    setShowModal(true);
    setType(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.BLACK} />
      <Header
        navigation={navigation}
        txt={Constraints.WHISTLEBLOWER_SCREEN}
        onPress={handleBack}
        icon={<ArrowBack />}
      />

      <View style={styles.contentContainer}>
        <Heading styl={styles.heading} txt="Type of Whistle.." />

        {WhistleBlowBtns.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <CusButton
                onPress={() => handleSubmit(item.title)}
                btnStyle={styles.btnStyle}
                textStyle={styles.textStyle}
                btntxt={item.title}
              />
            </View>
          );
        })}
      </View>

      <ReportModal
        showModal={showModal}
        hideModal={hideModal}
        navigation={navigation}
        type={type}
      />
    </SafeAreaView>
  );
};

export default WhistleBlow;
