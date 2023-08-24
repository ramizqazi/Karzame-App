import React, {useState, useEffect} from 'react';
import {Modal, View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const TimeModal = ({visible, setOnSelect, onClose, hideIntervalModal}) => {
  const [selectedInterval, setSelectedInterval] = useState(30);

  const handleIncrement = () => {
    if (selectedInterval < 1470) {
      setSelectedInterval(prevInterval => prevInterval + 30);
    }
  };

  const handleDecrement = () => {
    if (selectedInterval > 30) {
      setSelectedInterval(prevInterval => prevInterval - 30);
    }
  };

  const handleSelect = () => {
    setOnSelect(selectedInterval);
    hideIntervalModal();
  };

  const formatInterval = interval => {
    if (interval < 1440) {
      if (interval < 60) {
        return `${interval} minutes`;
      } else {
        const hours = Math.floor(interval / 60);
        const minutes = interval % 60;
        if (minutes === 0) {
          return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
          return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`;
        }
      }
    } else {
      return '24 hours 30 minutes';
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={hideIntervalModal}>
      <View style={styles.modalContainer}>
        <View style={styles.earningView}>
          <View style={styles.intervalContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleDecrement}
              disabled={selectedInterval <= 30}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.selectedInterval}>
              {formatInterval(selectedInterval)}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleIncrement}
              disabled={selectedInterval >= 1470}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  earningView: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intervalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#333333',
  },
  selectedInterval: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  selectButton: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default TimeModal;
