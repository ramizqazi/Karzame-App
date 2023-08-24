import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Gallery from '../assets/Chat/Gallery.svg';
import Send from '../assets/Chat/Send.svg';
import Audio from '../assets/Chat/Audio.svg';

const ChatBottom = props => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {}}
        style={styles.bellIconContainer}>
        <Gallery />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          value={props.message}
          onChangeText={text => props.setMessage(text)}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.audioContainer}
          activeOpacity={0.6}
          onPress={() => {}}>
          <Audio />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          alert(props.message);
        }}
        style={styles.bellIconContainer}>
        <Send />
      </TouchableOpacity>
    </View>
  );
};

export default ChatBottom;
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: '4%',
    alignSelf: 'center',
    width: '100%',
    height: 76,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  backBtnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD6B22',
    width: 19,
    height: 19,
    marginRight: 8,
    borderRadius: 2,
  },
  bellIconContainer: {
    backgroundColor: '#FD6B22',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  audioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  inputContainer: {
    paddingHorizontal: '2%',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    height: 39,
    backgroundColor: '#EDEDED',
  },
  input: {
    width: '85%',
    borderRadius: 50,
    height: 39,
  },
});
