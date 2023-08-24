import React, {useEffect, useRef} from 'react';
import {
  Text,
  Modal,
  Dimensions,
  Pressable,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Constraints from '../Constraints/Constraints';
import Colors from '../Constraints/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

const ReminderPopUp = ({visible, onClose, onRegister}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userId, catUser, userObjectKey} = useSelector(
    reducer => reducer.allReducer,
  );

  const onNotYet = () => {
    // Implement your logic for the "Not Yet" button action here
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View onPress={onClose} style={styles.modalContainer}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTitle}>Vehicle Registration Reminder</Text>
          <Text style={styles.modalText}>
            You haven't registered your vehicle yet.
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.buttonContainer, {backgroundColor: Colors.BLACK}]}
            onPress={onRegister}>
            <Text style={[styles.buttonText, {color: Colors.PRIMARY_WHITE}]}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.buttonContainer,
              {backgroundColor: Colors.PRIMARY_WHITE},
            ]}
            onPress={onClose}>
            <Text style={[styles.buttonText, {color: Colors.BLACK}]}>
              Not Yet
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default ReminderPopUp;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  earningView: {
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '80%',
    height: '40%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  modalContent: {
    backgroundColor: Colors.PRIMARY_WHITE,
    borderRadius: 8,
    width: '90%',
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.BLACK,
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
