import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {messages} from '../DataStore/genderBtns';

const ChatMessages = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: '4%',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 270, marginTop: '3%'}}>
        {messages.map(item => {
          return (
            <View
              style={{
                margin: 5,
              }}
              key={item.key}>
              <View
                style={[
                  styles.chatMessageContainer,
                  {
                    borderTopLeftRadius: item.userId === '0' ? null : 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: item.userId === '0' ? 10 : null,
                    backgroundColor:
                      item.userId === '0' ? '#FFFFFF' : '#FD6B22',
                    alignSelf: item.userId === '0' ? 'flex-start' : 'flex-end',
                  },
                ]}>
                <Text
                  style={[
                    styles.msgTxt,
                    {
                      color: item.userId === '0' ? '#5B5B5B' : '#FFFFFF',
                    },
                  ]}>
                  {item.title}
                </Text>
              </View>
              <View
                style={[
                  styles.timeConatiner,
                  {alignSelf: item.userId === '0' ? 'flex-start' : 'flex-end'},
                ]}>
                <Text style={styles.timeTxt}>{item.time} pm</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ChatMessages;
const styles = StyleSheet.create({
  chatMessageContainer: {
    padding: '4%',
    width: '75%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  msgTxt: {
    color: '#5B5B5B',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
  },
  timeConatiner: {
    left: 14,
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTxt: {
    marginTop: 5,
    color: '#C4C4C4',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
  },
});
