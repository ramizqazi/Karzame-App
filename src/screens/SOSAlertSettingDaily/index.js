import React, {useEffect, useState} from 'react';
import {
  View,
  ProgressViewIOS,
  ProgressBarAndroid,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Colors from '../../Constraints/Colors';
import ArrowBack from '../../assets/WellbeingCheckServices/ArrowBack.svg';
import Header from '../../reuseable/Header';
import Constraints from '../../Constraints/Constraints';
import {SOS_SCREEN_BTNS} from '../../DataStore/genderBtns';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {
  addPickBtn,
  saveSOSPic1,
  saveSOSPic2,
} from './../../Redux/Action/actions';

const SOSAlertSettingDaily = ({navigation}) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [pickButton, setPickButn] = useState();
  const [imageUri, setImageUri] = useState('');
  const {userObjectKey, picBtn} = useSelector(reducers => reducers.allReducer);

  const onPress = () => {
    navigation.goBack();
  };

  const updateUserData = (uploadType, downloadUrl) => {
    const ref = database().ref(`users/${userObjectKey}`);
    ref.update({
      [uploadType]: downloadUrl,
    });
    if (uploadType === 'userSelfie') {
      dispatch(saveSOSPic1(downloadUrl));
    } else {
      dispatch(saveSOSPic2(downloadUrl));
    }
  };

  const onButtonPress = uploadType => {
    if (uploadType === 'userSelfie') {
      takePhotoFromCamera(uploadType);
    } else {
      takePhotoFromCamera(uploadType);
    }
  };

  const takePhotoFromCamera = uploadType => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageQuality: 0.7,
    })
      .then(img => {
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        uploadImage(imageUri, uploadType);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const uploadImage = async (uri, uploadType) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setProgress(0);
    const storageRef = storage().ref(`UserPics/${filename}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      // console.log(
      //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
      const progress =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setProgress(progress);
    });

    try {
      await task;
      const downloadUrl = await storageRef.getDownloadURL();
      setImageUri(downloadUrl);
      setUploading(false);
      // console.log('url==' + downloadUrl);
      // console.log('Image uploaded!');
      setProgress(0);
      updateUserData(uploadType, downloadUrl);
    } catch (e) {
      // console.error(e);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      {!uploading ? (
        <>
          <Header
            navigation={navigation}
            icon={<ArrowBack />}
            txt={Constraints.SOS_ALERT}
            onPress={onPress}
            style={{marginBottom: '10%'}}
          />

          {SOS_SCREEN_BTNS.map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  onButtonPress(item.uploadType);
                }}
                style={styles.cardStyle}>
                <View style={styles.cardSubStyle}>
                  <View style={styles.imgView}>{item.icon}</View>
                  <View
                    style={[
                      styles.subContainer,
                      {
                        height: item.key === '0' ? 44 : 53,
                      },
                    ]}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitile}>{item.subTitile}</Text>
                  </View>
                </View>
                <View style={{marginRight: 13}}>{item.icon2}</View>
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Progress.Bar
            animated={true}
            color={Colors.BLACK}
            progress={progress / 100}
            width={200}
          />
          {/* <Progress.Bar progress={progress / 100} width={200} /> */}
          <Text style={{marginTop: '2%'}}>
            {`${progress.toFixed(0)}% Uploaded`}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SOSAlertSettingDaily;
