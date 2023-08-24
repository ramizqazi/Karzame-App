import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {
  userVehicleModels,
  userVehicleMaker,
} from '../../../DataStore/genderBtns';
import CusButton from '../../../reuseable/cusButton';
import PickerBtn from '../../../reuseable/PickerBtn';
import Heading from '../../../reuseable/heading';
import {useDispatch, useSelector} from 'react-redux';
import DocScan from '../../../assets/VirtualTravelGuard/DocScan.svg';
import TextInp from '../../../reuseable/textInput';
import Constraints from './../../../Constraints/Constraints';
import Colors from '../../../Constraints/Colors';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import {uploadImage, uploadOperatorServiceToDB} from '../../../Utils/Functions';
import FastImage from 'react-native-fast-image';
import LoadingModal from '../../../reuseable/LoadingModal';
import Photo from '../../../assets/Services/Photo.svg';
import Header from '../../../reuseable/Header';
import ArrowBack from '../../../assets/WellbeingCheckServices/ArrowBack.svg';
import {useNavigation} from '@react-navigation/native';

const RegisterService = ({props}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [ImageError, setImageError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imgVehicle, setVehicleImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMaker, setVehicleMaker] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [area, setArea] = useState('');
  const [vehicleRegNum, setVehicleRegNum] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [expandedCataegory1, setExpandedCategory1] = useState(false);
  const [expandedCataegory2, setExpandedCategory2] = useState(false);
  const [expandedCataegory3, setExpandedCategory3] = useState(false);
  const {
    userId,
    userObjectKey,
    currentLat,
    currentLong,
    providerToken,
    providerPhone,
    providerEmail,
    userName,
    userImg,
    operatorType,
    userPhoneP,
    userMailP,
  } = useSelector(reducer => reducer.allReducer);

  const takePhotoFromCamera = () => {
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
        );
      })
      .catch(error => {
        // console.log(error);
      });
  };

  const handleSubmit = async () => {
    const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;
    if (operatorType === 'Towing Services') {
      if (vehicleNumber === '') {
        alert('Vehicle Number is required');
      } else if (!alphanumericRegex.test(vehicleNumber)) {
        alert('Vehicle Number should only contain letters and numbers');
      } else if (!/\d/.test(vehicleNumber) || !/[a-zA-Z]/.test(vehicleNumber)) {
        alert('Vehicle Number should contain both letters and numbers');
      } else if (imgVehicle === '') {
        alert('vehicle Image is required');
      } else {
        uploadOperatorServiceToDB(
          setShowModal,
          vehicleMaker,
          vehicleModel,
          imgVehicle,
          userObjectKey,
          navigation,
          currentLat,
          currentLong,
          providerToken,
          providerPhone,
          providerEmail,
          userName,
          userImg,
          operatorType,
          dispatch,
          clinicName,
          area,
          vehicleRegNum,
          userPhoneP,
          userMailP,
        );
      }
    } else if (operatorType === 'Ambulance Services') {
      if (clinicName === '') {
        alert('Clinic Name is required');
      } else if (area === '') {
        alert('Area is required');
        // } else if (vehicleRegNum === '') {
        //   alert('Vehicle Registration number is required');
      } else if (vehicleRegNum === '') {
        alert('Vehicle Number is required');
      } else if (!alphanumericRegex.test(vehicleRegNum)) {
        alert('Vehicle Number should only contain letters and numbers');
      } else if (!/\d/.test(vehicleRegNum) || !/[a-zA-Z]/.test(vehicleRegNum)) {
        alert('Vehicle Number should contain both letters and numbers');
      } else if (imgVehicle === '') {
        alert('vehicle Image is required');
      } else {
        uploadOperatorServiceToDB(
          setShowModal,
          vehicleMaker,
          vehicleModel,
          imgVehicle,
          userObjectKey,
          navigation,
          currentLat,
          currentLong,
          providerToken,
          providerPhone,
          providerEmail,
          userName,
          userImg,
          operatorType,
          dispatch,
          clinicName,
          area,
          vehicleRegNum,
          userPhoneP,
          userMailP,
        );
      }
    } else if (operatorType === 'Fire Service') {
      if (clinicName === '') {
        alert('Clinic Name is required');
      } else if (area === '') {
        alert('Area is required');
      } else if (vehicleRegNum === '') {
        alert('Vehicle Number is required');
      } else if (!alphanumericRegex.test(vehicleRegNum)) {
        alert('Vehicle Number should only contain letters and numbers');
      } else if (!/\d/.test(vehicleRegNum) || !/[a-zA-Z]/.test(vehicleRegNum)) {
        alert('Vehicle Number should contain both letters and numbers');
      } else {
        uploadOperatorServiceToDB(
          setShowModal,
          vehicleMaker,
          vehicleModel,
          imgVehicle,
          userObjectKey,
          navigation,
          currentLat,
          currentLong,
          providerToken,
          providerPhone,
          providerEmail,
          userName,
          userImg,
          operatorType,
          dispatch,
          clinicName,
          area,
          vehicleRegNum,
          userPhoneP,
          userMailP,
        );
      }
    } else {
      if (vehicleNumber === '') {
        alert('Vehicle Number is required');
      } else if (!alphanumericRegex.test(vehicleNumber)) {
        alert('Vehicle Number should only contain letters and numbers');
      } else if (!/\d/.test(vehicleNumber) || !/[a-zA-Z]/.test(vehicleNumber)) {
        alert('Vehicle Number should contain both letters and numbers');
      } else if (imgVehicle === '') {
        alert('vehicle Image is required');
      } else {
        uploadOperatorServiceToDB(
          setShowModal,
          vehicleMaker,
          vehicleModel,
          imgVehicle,
          userObjectKey,
          navigation,
          currentLat,
          currentLong,
          providerToken,
          providerPhone,
          providerEmail,
          userName,
          userImg,
          operatorType,
          dispatch,
          clinicName,
          area,
          vehicleRegNum,
          userPhoneP,
          userMailP,
        );
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.BLACK} />

      {!uploading ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: '5%',
          }}>
          <Header
            navigation={navigation}
            icon={<ArrowBack />}
            txt={operatorType}
            onPress={handleBack}
          />
          {operatorType === 'Towing Services' ? (
            <View>
              <TextInp
                inputContainer={styles.inputContainer}
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

              {/* <PickerBtn
                dynamicBtn={userVehicleMaker}
                txt={Constraints.VEHICLE_MAKER}
                category={vehicleMaker}
                setCategory={setVehicleMaker}
                setErrorMessage={setErrorMsg}
                expandedCataegory={expandedCataegory2}
                setExpandedCategory={setExpandedCategory2}
              /> */}
            </View>
          ) : operatorType === 'Ambulance Services' ? (
            <View>
              <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={Constraints.CLINIC_NAME}
                placeholderTextColor={Colors.GREY}
                value={clinicName}
                onChangeText={txt => setClinicName(txt)}
                icon={<DocScan />}
              />
              <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={Constraints.AREA}
                placeholderTextColor={Colors.GREY}
                value={area}
                onChangeText={txt => setArea(txt)}
              />
              {/* <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                keyboardType="number-pad"
                placeholder={Constraints.VEHICLE_REG_NUM}
                placeholderTextColor={Colors.GREY}
                value={vehicleRegNum}
                onChangeText={txt => setVehicleRegNum(txt)}
              /> */}
              {/* <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={Constraints.VEHICLE_NUMBER}
                placeholderTextColor={Colors.GREY}
                value={vehicleNumber}
                onChangeText={txt => setVehicleNumber(txt)}
                icon={<DocScan />}
              /> */}

              <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={Constraints.VEHICLE_NUMBER}
                placeholderTextColor={Colors.GREY}
                value={vehicleRegNum}
                onChangeText={txt => setVehicleRegNum(txt)}
                icon={<DocScan />}
              />
            </View>
          ) : operatorType === 'Fire Service' ? (
            <View>
              <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={Constraints.CLINIC_NAME}
                placeholderTextColor={Colors.GREY}
                value={clinicName}
                onChangeText={txt => setClinicName(txt)}
                icon={<DocScan />}
              />
              <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={Constraints.AREA}
                placeholderTextColor={Colors.GREY}
                value={area}
                onChangeText={txt => setArea(txt)}
              />
              <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                placeholder={Constraints.VEHICLE_REG_NUM}
                placeholderTextColor={Colors.GREY}
                value={vehicleRegNum}
                onChangeText={txt => setVehicleRegNum(txt)}
              />
              {/* <TextInp
                inputContainer={styles.inputContainer}
                style={styles.inputStyle}
                keyboardType="number-pad"
                placeholder={Constraints.VEHICLE_NUMBER}
                placeholderTextColor={Colors.GREY}
                value={vehicleNumber}
                onChangeText={txt => setVehicleNumber(txt)}
                icon={<DocScan />}
              /> */}
              {/* <PickerBtn
                dynamicBtn={userVehicleMaker}
                txt={Constraints.VEHICLE_MAKER}
                category={vehicleMaker}
                setCategory={setVehicleMaker}
                setErrorMessage={setErrorMsg}
                expandedCataegory={expandedCataegory2}
                setExpandedCategory={setExpandedCategory2}
              /> */}
              {/* <PickerBtn
                dynamicBtn={userVehicleModels}
                txt={Constraints.VEHICLE_MODEL}
                category={vehicleModel}
                setCategory={setVehicleModel}
                setErrorMessage={setErrorMsg}
                expandedCataegory={expandedCataegory1}
                setExpandedCategory={setExpandedCategory1}
              /> */}
            </View>
          ) : (
            <View>
              <TextInp
                inputContainer={styles.inputContainer}
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

              {/* <PickerBtn
                dynamicBtn={userVehicleMaker}
                txt={Constraints.VEHICLE_MAKER}
                category={vehicleMaker}
                setCategory={setVehicleMaker}
                setErrorMessage={setErrorMsg}
                expandedCataegory={expandedCataegory2}
                setExpandedCategory={setExpandedCategory2}
              /> */}
            </View>
          )}

          {operatorType === 'Fire Service' ? null : (
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
          )}

          <CusButton
            allDisableloader={allDisableloader}
            loader={loader}
            onPress={handleSubmit}
            btnStyle={styles.btnStylee}
            textStyle={styles.btntxt}
            btntxt={Constraints.SUBMIT}
          />
        </ScrollView>
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

export default RegisterService;
