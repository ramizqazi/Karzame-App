import React, {useEffect, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './styles';
import Photo from '../../assets/Services/Photo.svg';
import {userVehicleModels, userVehicleMaker} from '../../DataStore/genderBtns';
import {
  uploadImage,
  uploadOperatorServiceToDB,
  uploadVehicleToDB,
} from '../../Utils/Functions';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import PickerBtn from '../../reuseable/PickerBtn';
import Colors from '../../Constraints/Colors';
import Header from '../../reuseable/Header';
import {Formik} from 'formik';
import DocScan from '../../assets/VirtualTravelGuard/DocScan.svg';
import * as Yup from 'yup';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import Constraints from '../../Constraints/Constraints';
import LoadingModal from '../../reuseable/LoadingModal';
import TextInp from '../../reuseable/textInput';
import CusButton from '../../reuseable/cusButton';
import Contacts from 'react-native-contacts';
import FastImage from 'react-native-fast-image';
import Heading from '../../reuseable/heading';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';

const AddVehicle = ({route, navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [ImageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imgVehicle, setVehicleImg] = useState('');
  const [WellBeingTripPic, setWellBeingTripPic] = useState('');
  const {userObjectKey, token} = useSelector(reducers => reducers.allReducer);
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [expandedCataegory1, setExpandedCategory1] = useState(false);

  const {camParam} = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;
    if (vehicleName === '') {
      alert('Vehicle name is required');
    } else if (vehicleNumber === '') {
      alert('Vehicle Number is required for Own transport mode');
    } else if (!alphanumericRegex.test(vehicleNumber)) {
      alert('Vehicle Number should only contain letters and numbers');
    } else if (!/\d/.test(vehicleNumber) || !/[a-zA-Z]/.test(vehicleNumber)) {
      alert('Vehicle Number should contain both letters and numbers');
    } else {
      uploadVehicleToDB(
        setShowModal,
        userObjectKey,
        vehicleNumber,
        imgVehicle,
        setVehicleNumber,
        setVehicleModel,
        setVehicleImg,
        navigation,
        vehicleName,
      );
    }
  };

  const takePhotoFromCamera = () => {
    if (camParam === 'Cam') {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
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
            setWellBeingTripPic,
          );
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      ImagePicker.openPicker({
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
            setWellBeingTripPic,
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />

      {!uploading ? (
        <>
          <Header
            navigation={navigation}
            txt={Constraints.ADD_VEHICLES}
            onPress={handleBack}
            icon={<ArrowBack />}
          />

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View>
              <TextInp
                inputContainer={styles.inputContainerPaas}
                style={styles.inputStyle}
                placeholder={Constraints.VEHICLE_NAME}
                placeholderTextColor={Colors.GREY}
                value={vehicleName}
                onChangeText={txt => setVehicleName(txt)}
                icon={<DocScan />}
              />
              <TextInp
                inputContainer={styles.inputContainerPaas}
                style={styles.inputStyle}
                placeholder={Constraints.VEHICLE_NUMBER}
                placeholderTextColor={Colors.GREY}
                value={vehicleNumber}
                onChangeText={txt => setVehicleNumber(txt)}
                icon={<DocScan />}
              />

              {/* <PickerBtn
                dynamicBtn={userVehicleModels}
                txt={Constraints.VEHICLE_MODEL}
                category={vehicleModel}
                setCategory={setVehicleModel}
                setErrorMessage={setErrorMsg}
                expandedCataegory={expandedCataegory1}
                setExpandedCategory={setExpandedCategory1}
              /> */}

              <>
                <Heading
                  styl={styles.headerStyl}
                  txt={Constraints.UPLOAD_VEHICLE}
                />
                {imgVehicle === '' ? (
                  <TouchableOpacity
                    onPress={() => {
                      takePhotoFromCamera();
                    }}
                    style={styles.dashView}>
                    <View style={styles.imgCam}>
                      <Photo />
                    </View>

                    <Heading
                      styl={[styles.headerStyl, {fontSize: 18, marginTop: 10}]}
                      txt={Constraints.UPLOAD_IMAGE}
                    />
                  </TouchableOpacity>
                ) : (
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    priority={FastImage.priority.high}
                    style={styles.imgVehicleStyle}
                    source={{uri: imgVehicle}}
                    onLoadStart={() => {
                      setIsLoading(true);
                    }}
                    onLoadEnd={() => {
                      setIsLoading(false);
                    }}
                  />
                )}
              </>
            </View>
            <CusButton
              allDisableloader={showModal}
              loader={showModal}
              onPress={handleSubmit}
              btnStyle={{
                height: 46,
                borderRadius: 8,
                marginTop: 20,
                width: '90%',
                backgroundColor: Colors.BLACK,
                borderColor: Colors.BLACK,
              }}
              textStyle={{
                color: Colors.BTN_TXT_WHITE,
                fontSize: 16,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 19,
                fontFamily: Fonts.FIGTREE,
              }}
              btntxt={Constraints.SAVE}
            />
          </ScrollView>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
      <LoadingModal showModal={showModal} navigate={navigation} />
    </SafeAreaView>
  );
};

export default AddVehicle;
