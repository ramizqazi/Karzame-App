import React, {useEffect, useState} from 'react';
import {
  Text,
  Modal,
  ActivityIndicator,
  Dimensions,
  Pressable,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {uploadImage} from './../Utils/Functions';
import * as Animatable from 'react-native-animatable';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import TextInp from './textInput';
import Photo from '../assets/Services/Photo.svg';
import LoadingModal from './LoadingModal';
import VerifyIcon from '../assets/VerifyModal/VerifyIcon.svg';
import DocScan from '../assets/VirtualTravelGuard/DocScan.svg';
import Colors from '../Constraints/Colors';
import Constraints from '../Constraints/Constraints';
import ImagePicker from 'react-native-image-crop-picker';
const {height, width} = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const PoliceModal = props => {
  const navigation = useNavigation();
  const [kidnapInp, setKidnapInp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ImageError, setImageError] = useState(false);
  const [showBtns, setShowBtns] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [vehicleName, setVehicleName] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useDispatch();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Get the date part
  // Get hours, minutes, and seconds
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  // Convert to 12-hour clock format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm} - ${formattedDate}`;

  const {userId, catUser, userObjectKey, currentLat, currentLong} = useSelector(
    reducer => reducer.allReducer,
  );

  const takePhoto = option => {
    if (option === 'Gallery') {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
      })
        .then(img => {
          setShowBtns(false);
          const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
          uploadImage(
            imageUri,
            setProgress,
            setUploading,
            setImg,
            setImageError,
          );
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
      })
        .then(img => {
          setShowBtns(false);
          const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
          uploadImage(
            imageUri,
            setProgress,
            setUploading,
            setImg,
            setImageError,
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const ImageLoader = ({source}) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    return (
      <TouchableOpacity
        onPress={() => setShowBtns(true)}
        style={styles.imgContainerLoad}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          priority={FastImage.priority.high}
          style={styles.imgVehicleStyle}
          source={{uri: img}}
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

  const handleSubmit = () => {
    if (props.type === 'Stop and search') {
      // setShowModal(true);

      const whistleRef = database()
        .ref('users/' + userObjectKey + '/Whistle_Blow')
        .push();
      whistleRef
        .set({
          key: whistleRef.key,
          Date: formattedTime,
          Report: kidnapInp,
          Image: img,
          Type: props.type,
          currentLat: currentLat ? currentLat : 0,
          currentLong: currentLong ? currentLong : 0,
        })
        .then(() => {
          // console.log('Report saved to DB');
          setKidnapInp('');
          setImg('');
          setShowModal(false);
          props.hideModal();
          alert('Sent successfully');
        })
        .catch(error => {
          // console.log(error);
          setShowModal(false);
        });
    } else {
      setShowModal(true);

      const whistleRef = database()
        .ref('users/' + userObjectKey + '/Whistle_Blow')
        .push();
      whistleRef
        .set({
          key: whistleRef.key,
          Date: formattedTime,
          Report: kidnapInp,
          Image: img,
          Type: props.type,
          currentLat: currentLat ? currentLat : 0,
          currentLong: currentLong ? currentLong : 0,
        })
        .then(() => {
          // console.log('Report saved to DB');
          setKidnapInp('');
          setImg('');
          setShowModal(false);
          props.hideModal();
          alert('Sent successfully');
        })
        .catch(error => {
          // console.log(error);
          setShowModal(false);
        });
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideModal();
        setImg('');
      }}
      visible={props.showModal}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.BTN_TXT_WHITE}
      />

      <Pressable
        onPress={() => {
          props.hideModal();
          setImg('');
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
          {!uploading ? (
            <View onPress={() => {}} style={styles.touchableView}>
              <Text style={styles.subTxt1}>{props.type}</Text>
              <>
                {img === '' ? (
                  <TouchableOpacity
                    onPress={() => {
                      setShowBtns(true);
                    }}
                    style={styles.dashView}>
                    <View style={styles.imgCam}>
                      <Photo />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <ImageLoader source={img} />
                )}
              </>

              {showBtns ? (
                <View style={styles.btsContainer}>
                  <TouchableOpacity
                    onPress={() => takePhoto('Gallery')}
                    style={[
                      styles.btnStyle,
                      {marginTop: 0, backgroundColor: Colors.GREEN},
                    ]}>
                    <Text style={styles.textStyle}>{Constraints.GALLERY}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => takePhoto('Camera')}
                    style={[
                      styles.btnStyle,
                      {marginTop: 0, backgroundColor: Colors.GREEN},
                    ]}>
                    <Text style={styles.textStyle}>{Constraints.CAMERA}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={'Enter Detail here (optional)'}
                placeholderTextColor={Colors.GREY}
                value={kidnapInp}
                onChangeText={txt => setKidnapInp(txt)}
                icon={<DocScan />}
                multiline={true}
                numberOfLines={5}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.btnStyle, {width: '100%', height: 49}]}>
                <Text style={styles.textStyle}>
                  {Constraints.POST_TO_ADMIN}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.earningView}>
              <Progress.Bar
                animated={true}
                color={Colors.BLACK}
                progress={progress / 100}
                width={200}
              />

              <Text style={{marginTop: '2%'}}>
                {`${progress.toFixed(0)}% Uploaded`}
              </Text>
            </View>
          )}
        </Animatable.View>
        <LoadingModal showModal={showModal} navigation={navigation} />
      </Pressable>
    </Modal>
  );
};

export default PoliceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000B2',
  },
  subTxt1: {
    fontSize: responsiveFontSize(2.4),
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
    width: '85%',
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
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    width: '46%',
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
    width: '100%',
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
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
