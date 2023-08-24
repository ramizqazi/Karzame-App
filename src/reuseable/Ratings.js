import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Pressable,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import Constraints from '../Constraints/Constraints';
import {useDispatch, useSelector} from 'react-redux';
import TextInp from './textInput';
import RateIPic from '../assets/Support/RateIPic.svg';
import Colors from '../Constraints/Colors';

const Rating = props => {
  const [rating, setRating] = useState(4);
  const [rate, setRate] = useState('');
  const {userId, userObjectKey} = useSelector(reducer => reducer.allReducer);

  const handleSubmit = () => {
    if (rate.length > 0) {
      const whistleRef = database()
        .ref('users/' + userObjectKey + '/Rating')
        .push();

      whistleRef
        .set({
          key: whistleRef.key,
          RatingTxt: rate,
          rating: rating,
        })
        .then(() => {
          // console.log('Report saved to DB');
          setRate('');
          props.onClose();
        })
        .catch(error => {
          // console.log(error);
          setShowModal(false);
        });
    } else {
      alert('Field should not be empty');
    }
  };

  const handleStarPress = value => {
    setRating(value);
  };

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={() => {}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />

      <View style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          <RateIPic />
          <View style={styles.containerStar}>
            <Text style={styles.subTxt}>{Constraints.RATING}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {[1, 2, 3, 4, 5].map((value, index) => {
                const active = index < rating;
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={value}
                    onPress={() => handleStarPress(value)}>
                    <AntDesign
                      name={active ? 'star' : 'staro'}
                      color={active ? Colors.YELLOW : Colors.GREY}
                      size={20}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TextInp
            inputContainer={styles.inputContainer}
            style={styles.inputStyle}
            placeholder={'Your Feedback is important for us!'}
            placeholderTextColor={Colors.GREY}
            value={rate}
            onChangeText={txt => setRate(txt)}
            // icon={<DocScan />}
            multiline={true}
            numberOfLines={5}
          />
          <Pressable
            style={styles.verifyButton}
            onPress={() => {
              handleSubmit();
            }}>
            <Text style={styles.verifyButtonText}>{Constraints.RATE_US}</Text>
          </Pressable>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000B2',
  },
  earningView: {
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '75%',
    paddingVertical: 40,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTxt: {
    color: Colors.GREY1,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 5,
  },
  verifyButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.BLACK,
  },
  verifyButtonText: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    padding: 5,
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GREY,
    backgroundColor: '#EBEBEB',
  },
  inputStyle: {
    backgroundColor: '#EBEBEB',
    width: '100%',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    padding: 10,
    color: '#000000',
    textAlignVertical: 'top',
  },
  containerStar: {
    marginTop: '4%',
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
});

export default Rating;
