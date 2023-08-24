import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Forward_Icon from '../assets/WellbeingCheckServices/Forward_Icon.svg';
import Colors from '../Constraints/Colors';

const CusPicker = ({
  countryName,
  navigation,
  data,
  onValueChange,
  setShowModalLoading,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const {userObjectKey, virtualLocTxt} = useSelector(
    reducer => reducer.allReducer,
  );

  const handleValueChange = item => {
    setSelectedValue(item);
    onValueChange(item);
    setIsVisible(false);
    navigation.navigate('VirtuaHomeModal', {
      countryName: countryName,
      selectedValue: selectedValue,
    });
    // console.log(item.value);
  };

  const renderPickerText = () => {
    if (virtualLocTxt !== '') {
      return <Text style={{color: Colors.BLACK}}>{virtualLocTxt}</Text>;
    } else {
      return <Text style={{color: Colors.BLACK}}>Select</Text>;
    }
  };

  // const renderItem = ({item}) => (
  //   <TouchableOpacity
  //     onPress={() => handleValueChange(item)}
  //     style={{
  //       padding: 15,
  //       borderBottomWidth: 1,
  //       borderBottomColor: 'gray',
  //       width: '100%',
  //       alignItems: 'center',
  //     }}>
  //     <Text style={{fontSize: 18}}>{item.title}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('VirtuaHomeModal', {
          countryName: countryName,
          selectedValue: selectedValue,
        });
      }}
      // onPress={() => setIsVisible(true)}
      style={{
        marginTop: '4%',
        paddingHorizontal: '5%',
        width: '90%',
        height: 50,
        marginTop: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: Colors.GREY,
        borderStartWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
      }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: Colors.BLACK,
          fontFamily: Fonts.FIGTREE,
        }}>
        {renderPickerText()}
      </Text>

      <View>
        <Forward_Icon />
      </View>

      {/* <Modal visible={isVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: Colors.PRIMARY_WHITE,
              width: '75%',
              paddingVertical: 40,
              alignSelf: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center',
              }}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key.toString()}
              />
            </View>
          </View>
        </View>
      </Modal> */}
    </TouchableOpacity>
  );
};

export default CusPicker;
