import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Switch,
  ScrollView,
  Modal,
  Dimensions,
  StatusBar,
  Pressable,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import Cam from '../../assets/WellbeingCheckServices/Cam.svg';
import Timer from '../../assets/VirtualTravelGuard/Timer.svg';
import Calendar from '../../reuseable/Calendar';
import styles from './styles';
import DocScan from '../../assets/VirtualTravelGuard/DocScan.svg';
import TextInp from '../../reuseable/textInput';
import CusButton from '../../reuseable/cusButton';
import PickerBtn from '../../reuseable/PickerBtn';
import auth from '@react-native-firebase/auth';
import Heading from '../../reuseable/heading';
import {useDispatch, useSelector} from 'react-redux';
import {
  addUserid,
  switchLIveLoc,
  addCurrenLivetLocation,
} from '../../Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';
import {
  userFamilymember,
  userVehicleMaker,
  userVehicleModels,
  userTransport,
  trainStations,
} from '../../DataStore/genderBtns';
import Fonts from '../../Constraints/Fonts';

import Colors from '../../Constraints/Colors';
import {useNavigation} from '@react-navigation/native';
import {uploadWellBeiengDataToDB} from '../../Utils/Functions';
import DataPath from '../../Utils/DataPath';
import LoadingModal from '../LoadingModal';

import {takePhotoFromCamera, requestPermission} from './../../Utils/Functions';
import {locationPermission, getCurrentLatLng} from '../../Utils/LocationFun';
const {height, width} = Dimensions.get('window');

const WellBeingCheckForm = props => {
  const dispatch = useDispatch();
  const {userId, userObjectKey, switchBool} = useSelector(
    reducer => reducer.allReducer,
  );
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [allDisableloader, setAllDisableLoader] = useState(false);
  const [sosSinalPic, setSosSinalPic] = useState(null);
  const [wellBeingTripPicUri, setWellBeingTripPicUri] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [departTime, setDepartTime] = useState(null);
  const [familyMember, setFamilyMember] = useState(Constraints.FAMILY_MEMBER);
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMaker, setVehicleMaker] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [tranportCompany, setTranportCompany] = useState('');
  const [vehicleReg, setVehicleReg] = useState('');
  const [departStation, setDepartStation] = useState('');
  const [arrivalStation, setArrivalStation] = useState('');
  const [tranportCompanyName, setTransportCompanyName] = useState('');
  const [expandedCataegory1, setExpandedCategory1] = useState(false);
  const [expandedCataegory2, setExpandedCategory2] = useState(false);
  const [expandedCataegory3, setExpandedCategory3] = useState(false);
  const [expandedCataegory4, setExpandedCategory4] = useState(false);
  const [expandedCataegory5, setExpandedCategory5] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showDepartTime, setShowDepartTime] = useState(false);
  const [checked, setChecked] = useState(false);
  const [color, setColor] = useState(0);
  const [radioTxt, setRadio] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPicEnabled, setIsPicEnabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const minDate = new Date(); // set minimum date to today's date
  const [location, setLocation] = useState(null); // for setTimeout function

  React.useEffect(() => {
    const getLocationAsync = async () => {
      const locPer = await locationPermission();
      if (locPer) {
        const {latitude, longitude, heading} = await getCurrentLatLng();
        dispatch(addCurrenLivetLocation(latitude, longitude, heading));
        setLocation(latitude, longitude, heading);
      }
      // await requestPermission(location => {
      //   setLocation(location);
      //   dispatch(
      //     addCurrenLivetLocation(
      //       location.latitude,
      //       location.longitude,
      //       location.heading,
      //     ),
      //   );
      // });
    };

    const timer = setInterval(() => {
      getLocationAsync();
    }, 5000);

    return () => clearInterval(timer);
  }, [switchBool]);

  const changeColor = (id, txt) => {
    setColor(id);
    setRadio(txt);
  };

  // const toggleSwitch = () => {
  //   const newValue = !isEnabled;
  //   setIsEnabled(newValue);
  //   dispatch(switchLIveLoc(newValue));
  // };

  const toggleSwitch = async () => {
    const newValue = !isEnabled; // Toggle the current value
    console.log(newValue); // Print the new value for debugging

    if (newValue === true) {
      // If the switch is turning on, perform form validation
      const isFormValid = await checkData();

      if (!isFormValid) {
        // If form validation fails, show an alert and revert the switch state
        showMessage({
          message: 'Warning',
          description: 'We kindly request you to fill in the remaining data.',
          type: 'danger',
          backgroundColor: 'white', // background color
          color: '#606060', // text color
          floating: true,
        });
        setIsEnabled(false); // Revert the switch state
        dispatch(switchLIveLoc(false));
      } else {
        setIsEnabled(true); // Update the switch state if form is valid
        dispatch(switchLIveLoc(true));
      }
    } else {
      // If the switch is turning off, simply update the switch state
      setIsEnabled(false);
      dispatch(switchLIveLoc(false));
      // Dispatch your Redux action or perform other actions here
    }
  };

  // useEffect(() => {
  //   setIsEnabled(false); // Update the switch state if form is valid
  //   dispatch(switchLIveLoc(false));
  // }, []);

  const checkData = async () => {
    if (selectedDate === null || selectedTime === null) {
      return false;
    } else if (familyMember !== 'Alone' && phoneNum === '') {
      return false;
    } else if (
      color === 0 &&
      (vehicleNumber === '' || wellBeingTripPicUri === null)
    ) {
      return false;
    } else if (
      color === 1 &&
      (tranportCompany === '' ||
        tranportCompanyName === '' ||
        departTime === null ||
        vehicleReg === '')
    ) {
      return false;
    } else if (color === 2 && (departStation === '' || arrivalStation === '')) {
      return false;
    } else {
      return true;
    }
  };

  const signUpUser = async () => {
    const nigeriaRegex = /^([0])([7-9])(\d{9})$/;
    const usRegex = /^(\d{3})[-]?(\d{3})[-]?(\d{4})$/;
    const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;

    if (selectedDate === null) {
      alert('Date is required');
      setShowModalLoading(false);
    } else if (selectedTime === null) {
      alert('Time is required');
      setShowModalLoading(false);
    } else if (familyMember !== 'Alone' && phoneNum === '') {
      alert('Phone number is required');
      setShowModalLoading(false);
    } else if (
      familyMember !== 'Alone' &&
      !nigeriaRegex.test(phoneNum) &&
      !usRegex.test(phoneNum)
    ) {
      alert(
        'Please enter a valid phone number in the correct format (e.g. 08012345678 for Nigeria, 123-456-7890 for US)',
      );
      setShowModalLoading(false);
    } else if (color === 0) {
      // Own transport mode
      if (vehicleNumber === '') {
        alert('Vehicle Number is required for Own transport mode');
      } else if (!alphanumericRegex.test(vehicleNumber)) {
        alert('Vehicle Number should only contain letters and numbers');
      } else if (!/\d/.test(vehicleNumber) || !/[a-zA-Z]/.test(vehicleNumber)) {
        alert('Vehicle Number should contain both letters and numbers');
      } else if (wellBeingTripPicUri === null) {
        alert('Vehicle Picture is required for Own transport mode');
      } else {
        uploadWellBeiengDataToDB(
          userId,
          userObjectKey,
          DataPath.ALL_USERS2,
          props.hideModal,
          setShowModalLoading,
          setAllDisableLoader,
          navigation,
          selectedDate,
          selectedTime,
          familyMember,
          name,
          phoneNum,
          color,
          vehicleNumber,
          vehicleModel,
          vehicleMaker,
          tranportCompany,
          tranportCompanyName,
          vehicleReg,
          departTime,
          departStation,
          arrivalStation,
          wellBeingTripPicUri,
          setWellBeingTripPicUri,
          sosSinalPic,
          setSosSinalPic,
        );
      }
    } else if (color === 1) {
      // Public transport mode
      if (
        tranportCompany === '' ||
        tranportCompanyName === '' ||
        departTime === null
      ) {
        alert('Fields are required for Public transport mode');
      } else if (vehicleReg === '') {
        alert('Vehicle reg Number is required for Own transport mode');
      } else if (!alphanumericRegex.test(vehicleReg)) {
        alert('Vehicle reg number should only contain letters and numbers');
      } else if (!/\d/.test(vehicleReg) || !/[a-zA-Z]/.test(vehicleReg)) {
        alert('Vehicle reg Number should contain both letters and numbers');
      } else {
        uploadWellBeiengDataToDB(
          userId,
          userObjectKey,
          DataPath.ALL_USERS2,
          props.hideModal,
          setShowModalLoading,
          setAllDisableLoader,
          navigation,
          selectedDate,
          selectedTime,
          familyMember,
          name,
          phoneNum,
          color,
          vehicleNumber,
          vehicleModel,
          vehicleMaker,
          tranportCompany,
          tranportCompanyName,
          vehicleReg,
          departTime,
          departStation,
          arrivalStation,
          wellBeingTripPicUri,
          setWellBeingTripPicUri,
          sosSinalPic,
          setSosSinalPic,
        );
      }
    } else if (color === 2) {
      // Train transport mode
      if (departStation === '' || arrivalStation === '') {
        alert('Fields are required for Train transport mode');
      } else {
        uploadWellBeiengDataToDB(
          userId,
          userObjectKey,
          DataPath.ALL_USERS2,
          props.hideModal,
          setShowModalLoading,
          setAllDisableLoader,
          navigation,
          selectedDate,
          selectedTime,
          familyMember,
          name,
          phoneNum,
          color,
          vehicleNumber,
          vehicleModel,
          vehicleMaker,
          tranportCompany,
          tranportCompanyName,
          vehicleReg,
          departTime,
          departStation,
          arrivalStation,
          wellBeingTripPicUri,
          setWellBeingTripPicUri,
          sosSinalPic,
          setSosSinalPic,
        );
      }
    } else {
      // Invalid color value
      alert('Invalid color value');
      setShowModalLoading(false);
    }
  };

  const togglePicSwitch = () => {
    const newValue = !isPicEnabled;
    setIsPicEnabled(newValue);
  };

  return (
    <Modal
      transparent={true}
      visible={props.modalVisible}
      animationType="slide"
      onRequestClose={props.hideModal}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      <Pressable
        onPress={() => {
          Platform.OS === 'ios' ? props.hideModal : null;
        }}
        style={{flex: 1, backgroundColor: '#000000B2'}}>
        <View
          style={{
            backgroundColor: Colors.PRIMARY_WHITE,
            height: height / 1.23,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            position: 'absolute',
            bottom: 0,
          }}>
          <View
            style={{
              marginTop: '5%',
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
            }}>
            <View style={styles.smallBar} />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: '5%',
            }}>
            <View
              style={{
                width: '90%',
                marginTop: '5%',
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '2%',
              }}>
              <Heading
                txt={Constraints.Well_Being_check2}
                styl={{
                  color: Colors.BLACK,
                  fontSize: 22,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  lineHeight: 26,
                  fontFamily: Fonts.FIGTREE,
                }}
              />
              <Switch
                style={{}}
                trackColor={{false: Colors.GREY, true: Colors.GREEN}}
                thumbColor={
                  isEnabled ? Colors.PRIMARY_WHITE : Colors.PRIMARY_WHITE
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              showPicker={showCalendar}
              setShowPicker={setShowCalendar}
              txt={Constraints.ARRIVAL_DATE}
              mode={'date'}
              minimumDate={minDate}
              setErrorMessage={setErrorMsg}
            />
            <Calendar
              selectedDate={selectedTime}
              setSelectedDate={setSelectedTime}
              showPicker={showTime}
              setShowPicker={setShowTime}
              txt={Constraints.ARRIVAL_TIME}
              mode={'time'}
              minimumDate={minDate}
              setErrorMessage={setErrorMsg}
            />

            {/* <Heading txt={Constraints.START_DATE} styl={styles.title} />
            <Calendar
              selectedDate={selectedTime}
              setSelectedDate={setSelectedTime}
              showPicker={showTime}
              setShowPicker={setShowTime}
              txt={Constraints.ARRIVAL_TIME}
              mode={'time'}
              minimumDate={minDate}
            />
            <Heading txt={Constraints.END_DATE} styl={styles.title} />
            <Calendar
              selectedDate={selectedTime}
              setSelectedDate={setSelectedTime}
              showPicker={showTime}
              setShowPicker={setShowTime}
              txt={Constraints.ARRIVAL_TIME}
              mode={'time'}
              minimumDate={minDate}
            /> */}
            <Heading
              txt={Constraints.TRAVEL_PARTER_RELASHIONSHIP}
              styl={styles.title}
            />
            <PickerBtn
              dynamicBtn={userFamilymember}
              expandedCataegory={expandedCataegory1}
              setExpandedCategory={setExpandedCategory1}
              txt={Constraints.FAMILY_MEMBER}
              category={familyMember}
              setCategory={setFamilyMember}
              setErrorMessage={setErrorMsg}
            />
            {familyMember === 'Alone' ? null : (
              <>
                <TextInp
                  inputContainer={styles.inputContainerPaas}
                  style={styles.inputStyle}
                  value={name}
                  placeholderTextColor={Colors.GREY}
                  placeholder={Constraints.NAME}
                  onChangeText={txt => setName(txt)}
                />

                <TextInp
                  inputContainer={styles.inputContainerPaas}
                  style={styles.inputStyle}
                  placeholder={Constraints.MOBILE_NUMBER}
                  placeholderTextColor={Colors.GREY}
                  value={phoneNum}
                  onChangeText={txt => setPhoneNum(txt)}
                />
              </>
            )}

            <Heading txt={Constraints.MODE_OF_TRANSPORT} styl={styles.title} />
            <View style={styles.radioConatiner}>
              <Pressable
                activeOpacity={0.6}
                onPress={() => {
                  changeColor(0, Constraints.OWN_TRANSPORT);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View style={styles.outer}>
                  <View
                    style={color === 0 ? styles.btnColorBlack : styles.btnColor}
                  />
                </View>
                <Heading
                  txt={Constraints.OWN_TRANSPORT}
                  styl={[styles.remenberMe, {}]}
                />
              </Pressable>
              <Pressable
                activeOpacity={0.6}
                onPress={() => {
                  changeColor(1, Constraints.PUBLIC_TRANSPORT);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View style={styles.outer}>
                  <View
                    style={color === 1 ? styles.btnColorBlack : styles.btnColor}
                  />
                </View>
                <Heading
                  txt={Constraints.PUBLIC_TRANSPORT}
                  styl={[styles.remenberMe, {}]}
                />
              </Pressable>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 10,
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Pressable
                activeOpacity={0.6}
                onPress={() => {
                  changeColor(2, Constraints.TRAIN);
                }}
                style={{
                  flexDirection: 'row',
                }}>
                <View style={styles.outer}>
                  <View
                    style={color === 2 ? styles.btnColorBlack : styles.btnColor}
                  />
                </View>

                <Heading
                  txt={Constraints.TRAIN}
                  styl={[styles.remenberMe, {}]}
                />
              </Pressable>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Heading
                  txt={'Set SOS signal'}
                  styl={[styles.remenberMe, {marginRight: 11}]}
                />
                <Switch
                  style={{}}
                  trackColor={{false: Colors.GREY, true: Colors.GREEN}}
                  thumbColor={
                    isPicEnabled ? Colors.PRIMARY_WHITE : Colors.PRIMARY_WHITE
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={togglePicSwitch}
                  value={isPicEnabled}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 10,
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {isPicEnabled ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    takePhotoFromCamera(
                      setSosSinalPic,
                      props.hideModal,
                      setShowModalLoading,
                    );
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  {sosSinalPic ? (
                    <Image
                      style={{width: 25, height: 25, borderRadius: 5}}
                      source={{uri: sosSinalPic}}
                    />
                  ) : (
                    <Image
                      style={{width: 25, height: 25}}
                      source={require('../../assets/WellbeingCheckServices/Camm.png')}
                    />
                  )}

                  <Heading
                    txt={Constraints.CAM}
                    styl={[styles.remenberMe, {}]}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            {color === 0 ? (
              <View>
                <TextInp
                  inputContainer={styles.inputContainerPaas}
                  style={styles.inputStyle}
                  placeholder={Constraints.VEHICLE_NUMBER}
                  placeholderTextColor={Colors.GREY}
                  value={vehicleNumber}
                  onChangeText={txt => setVehicleNumber(txt)}
                  icon={<DocScan />}
                />
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      takePhotoFromCamera(
                        setWellBeingTripPicUri,
                        props.hideModal,
                        setShowModalLoading,
                      );
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    {wellBeingTripPicUri ? (
                      <Image
                        style={{width: 25, height: 25, borderRadius: 5}}
                        source={{uri: wellBeingTripPicUri}}
                      />
                    ) : (
                      <Image
                        style={{width: 25, height: 25}}
                        source={require('../../assets/WellbeingCheckServices/Camm.png')}
                      />
                    )}

                    <Heading
                      txt={Constraints.VEHICLE_PIC}
                      styl={[styles.remenberMe, {}]}
                    />
                  </TouchableOpacity>
                </View>
                {/* <PickerBtn
                  dynamicBtn={userVehicleModels}
                  expandedCataegory={expandedCataegory2}
                  setExpandedCategory={setExpandedCategory2}
                  txt={Constraints.VEHICLE_MODEL}
                  category={vehicleModel}
                  setCategory={setVehicleModel}
                  setErrorMessage={setErrorMsg}
                /> */}

                {/* <PickerBtn
                  dynamicBtn={userVehicleMaker}
                  expandedCataegory={expandedCataegory3}
                  setExpandedCategory={setExpandedCategory3}
                  txt={Constraints.VEHICLE_MAKER}
                  category={vehicleMaker}
                  setCategory={setVehicleMaker}
                  setErrorMessage={setErrorMsg}
                /> */}
              </View>
            ) : color === 1 ? (
              <View style={{}}>
                <TextInp
                  inputContainer={styles.inputContainerPaas}
                  style={styles.inputStyle}
                  placeholder={Constraints.ENTER_TRANSPORT_COMPANY}
                  placeholderTextColor={Colors.GREY}
                  value={tranportCompany}
                  onChangeText={txt => setTranportCompany(txt)}
                />

                <PickerBtn
                  dynamicBtn={userTransport}
                  expandedCataegory={expandedCataegory2}
                  setExpandedCategory={setExpandedCategory2}
                  txt={Constraints.TYPE_TRANSPORT}
                  category={tranportCompanyName}
                  setCategory={setTransportCompanyName}
                  setErrorMessage={setErrorMsg}
                />
                <TextInp
                  inputContainer={styles.inputContainerPaas}
                  style={styles.inputStyle}
                  placeholder={Constraints.VEHICLE_REG}
                  placeholderTextColor={Colors.GREY}
                  value={vehicleReg}
                  onChangeText={txt => setVehicleReg(txt)}
                />

                <Calendar
                  selectedDate={departTime}
                  setSelectedDate={setDepartTime}
                  showPicker={showDepartTime}
                  setShowPicker={setShowDepartTime}
                  txt={Constraints.TIME_OF_DEPART}
                  mode={'time'}
                  icon={<Timer />}
                />
              </View>
            ) : (
              <View style={{}}>
                {/* <TextInp
                  inputContainer={styles.inputContainer}
                  style={styles.inputStyle}
                  placeholder={Constraints.DEPART_STATION}
                  placeholderTextColor={Colors.GREY}
                  value={departStation}
                  onChangeText={txt => setDepartStation(txt)}
                /> */}

                <PickerBtn
                  dynamicBtn={trainStations}
                  expandedCataegory={expandedCataegory4}
                  setExpandedCategory={setExpandedCategory4}
                  txt={Constraints.DEPART_STATION}
                  category={departStation}
                  setCategory={setDepartStation}
                  setErrorMessage={setErrorMsg}
                />

                {/* <TextInp
                  inputContainer={styles.inputContainer}
                  style={styles.inputStyle}
                  placeholder={Constraints.ARRIVAL_STATION}
                  placeholderTextColor={Colors.GREY}
                  value={arrivalStation}
                  onChangeText={txt => setArrivalStation(txt)}
                /> */}

                <PickerBtn
                  dynamicBtn={trainStations}
                  expandedCataegory={expandedCataegory5}
                  setExpandedCategory={setExpandedCategory5}
                  txt={Constraints.ARRIVAL_STATION}
                  category={arrivalStation}
                  setCategory={setArrivalStation}
                  setErrorMessage={setErrorMsg}
                />
              </View>
            )}

            <CusButton
              allDisableloader={allDisableloader}
              loader={loader}
              onPress={signUpUser}
              btnStyle={{
                height: 46,
                borderRadius: 8,
                marginTop: 30,
                width: '90%',
                backgroundColor: Colors.BLACK,
                borderColor: Colors.BLACK,
              }}
              textStyle={styles.btnTxt}
              btntxt={Constraints.START_TRIP}
            />
          </ScrollView>
          <LoadingModal showModal={showModalLoading} navigate={navigation} />
        </View>
      </Pressable>
      <FlashMessage position="top" />
    </Modal>
  );
};

export default WellBeingCheckForm;
