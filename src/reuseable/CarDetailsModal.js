import React, {useEffect, useState} from 'react';
import {
  Text,
  Modal,
  Dimensions,
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Photo from '../assets/Services/Photo.svg';
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import TextInp from './textInput';
import {updateVehicleData, uploadImage} from '../Utils/Functions';
import LoadingModal from './LoadingModal';
import VerifyIcon from '../assets/VerifyModal/VerifyIcon.svg';
import DocScan from '../assets/VirtualTravelGuard/DocScan.svg';
import Colors from '../Constraints/Colors';
import Constraints from '../Constraints/Constraints';
import FastImage from 'react-native-fast-image';
import Heading from './heading';

const {height, width} = Dimensions.get('window');

const CarDetailsModal = props => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ImageError, setImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNum, setVehicleNum] = useState('');
  const [vehicleImg, setVehicleImg] = useState('');

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {userId, catUser, userObjectKey} = useSelector(
    reducer => reducer.allReducer,
  );

  useEffect(() => {
    setVehicleName(props.itemKey.vehicleName);
    setVehicleNum(props.itemKey.vehicleNumber);
    setVehicleImg(props.itemKey.imgVehicle);
  }, [props.itemKey]);

  const handleSubmit = async () => {
    const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;
    if (vehicleImg === '') {
      alert('Vehicle image is required');
    } else if (vehicleName === '') {
      alert('Vehicle name is required');
    } else if (vehicleNum === '') {
      alert('Vehicle Number is required');
    } else if (!alphanumericRegex.test(vehicleNum)) {
      alert('Vehicle Number should only contain letters and numbers');
    } else if (!/\d/.test(vehicleNum) || !/[a-zA-Z]/.test(vehicleNum)) {
      alert('Vehicle Number should contain both letters and numbers');
    } else {
      updateVehicleData(
        setShowModal,
        userObjectKey,
        vehicleNum,
        vehicleImg,
        setVehicleNum,
        setVehicleImg,
        setVehicleName,
        navigation,
        vehicleName,
        props.itemKey.key,
        props.hideModal(),
      );
    }
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(img => {
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        uploadImage(
          imageUri,
          setProgress,
          setUploading,
          setVehicleImg,
          setImageError,
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  const ImageLoader = ({source}) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    return (
      <TouchableOpacity
        onPress={takePhotoFromCamera}
        style={styles.imgContainerLoad}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          priority={FastImage.priority.high}
          style={styles.imgVehicleStyle}
          source={{uri: vehicleImg}}
          onLoadStart={() => {
            setIsLoading(true);
          }}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
        />
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideModal();
      }}
      visible={props.showModal}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />

      <Pressable
        onPress={() => {
          props.hideModal();
          setTimeout(() => {
            props.hideModal();
          }, 400);
        }}
        style={styles.container}>
        <Animatable.View
          duration={600}
          useNativeDriver={true}
          animation={'zoomIn'}
          style={styles.earningView}>
          <View onPress={() => {}} style={styles.touchableView}>
            <Text style={styles.subTxt1}>{Constraints.CAR_DETAILS}</Text>

            <>
              {vehicleImg === '' ? (
                <TouchableOpacity
                  onPress={() => {
                    takePhotoFromCamera();
                  }}
                  style={styles.dashView}>
                  <View style={styles.imgCam}>
                    <Photo />
                  </View>
                </TouchableOpacity>
              ) : (
                <ImageLoader source={vehicleImg} />
              )}
            </>

            <TextInp
              inputContainer={styles.inputContainer}
              style={styles.inputStyle}
              placeholder={'Enter vehicle name'}
              placeholderTextColor={Colors.GREY}
              value={vehicleName}
              onChangeText={txt => setVehicleName(txt)}
              icon={<DocScan />}
            />
            <TextInp
              inputContainer={styles.inputContainer}
              style={styles.inputStyle}
              placeholder={'Enter vehicle number'}
              placeholderTextColor={Colors.GREY}
              value={vehicleNum}
              onChangeText={txt => setVehicleNum(txt)}
              icon={<DocScan />}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.btnStyle}>
              <Text style={styles.textStyle}>{Constraints.UPDATE}</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <LoadingModal showModal={showModal} navigation={navigation} />
      </Pressable>
    </Modal>
  );
};

export default CarDetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000B2',
  },
  subTxt1: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 20,
    marginBottom: 10,
  },
  earningView: {
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '75%',
    paddingVertical: 20,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    padding: 5,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GREY,
  },
  inputStyle: {
    backgroundColor: Colors.PRIMARY_WHITE,
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    padding: 10,
    textAlignVertical: 'top',
  },
  btnStyle: {
    height: 49,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.BTN_TXT_WHITE,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 19,
    fontFamily: Fonts.FIGTREE,
  },

  dashView: {
    borderColor: Colors.GREY,
    borderWidth: 1,
    borderRadius: 20,
    width: '50%',
    height: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  imgCam: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyl: {
    color: Colors.BLACK,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 26,
    fontStyle: 'normal',
    width: '90%',
    fontFamily: Fonts.FIGTREE,
    marginTop: '8%',
    alignSelf: 'center',
  },
  imgVehicleStyle: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainerLoad: {
    width: '50%',
    borderRadius: 20,
    height: 120,
    overflow: 'hidden',
    marginBottom: '2%',
    marginTop: '5%',
    backgroundColor: 'red',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
