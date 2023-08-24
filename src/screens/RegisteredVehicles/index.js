// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Alert,
//   Linking,
//   ActivityIndicator,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
//   Pressable,
// } from 'react-native';
// import CusButton from '../../reuseable/cusButton';
// import database from '@react-native-firebase/database';
// import styles from './styles';
// import Colors from '../../Constraints/Colors';
// import Header from '../../reuseable/Header';
// import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
// import Constraints from '../../Constraints/Constraints';
// import {supportBtns} from '../../DataStore/genderBtns';
// import {
//   getRegisteredVehicles,
//   checkUserExists,
//   uploadPoliceAlert,
// } from '../../Utils/Functions';
// import LoadingModal from '../../reuseable/LoadingModal';
// import {useDispatch, useSelector} from 'react-redux';
// import FastImage from 'react-native-fast-image';
// import PickerBtn from '../../reuseable/PickerBtn';
// import {sosCat} from '../../DataStore/genderBtns';
// import {setLastPressedTime} from '../../Redux/Action/actions';
// import Heading from '../../reuseable/heading';
// import TextInp from '../../reuseable/textInput';
// import CarDetailsModal from '../../reuseable/CarDetailsModal';

// const RegisteredVehicles = ({navigation}) => {
//   const dispatch = useDispatch();
//   const [detail, setDetail] = useState('');
//   const [itemKey, setItemKey] = useState({});
//   const [UpdateModal, setUpdateModal] = useState(false);
//   const [regVehicles, setRegVehicles] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [expandedCataegory3, setExpandedCategory3] = useState(false);
//   const [sosCatgry, setSosCatgry] = useState('Stop a stolen vehicle');
//   const [userCatError, setUserCatError] = useState(false);
//   const [selectedCard, setSelectedCard] = useState('');

//   const {
//     userObjectKey,
//     userName,
//     userPhoneP,
//     lastPressedTimes,
//     token,
//     currentLat,
//     currentLong,
//   } = useSelector(reducers => reducers.allReducer);

//   useEffect(() => {
//     setTimeout(() => {
//       getRegisteredVehicles(setRegVehicles, setShowModal, userObjectKey);
//     }, 150);
//   }, []);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const hideUpdateModal = () => {
//     setUpdateModal(false);
//   };

//   const handlePress = async item => {
//     const currentTime = new Date().getTime();

//     const lastPressedTime = lastPressedTimes[item.vehicleNumber];

//     if (lastPressedTime && currentTime - lastPressedTime < 120000) {
//       // If the vehicle was pressed within the last 2 minutes
//       Alert.alert(
//         'Alert',
//         'You can only send an alert for this vehicle after 2 minutes.',
//       );
//     } else {
//       // Check the database for the last alert sent for the same vehicle
//       const vehicleRef = database()
//         .ref('users/' + userObjectKey + '/Police_Alerts')
//         .orderByChild('vehicleNumber')
//         .equalTo(item.vehicleNumber)
//         .limitToLast(1);

//       vehicleRef.once('value', snapshot => {
//         const alerts = snapshot.val();
//         if (alerts) {
//           const lastAlert = Object.values(alerts)[0];
//           const lastAlertTime = lastAlert.timestamp;

//           if (currentTime - lastAlertTime < 120000) {
//             // If the last alert was sent within the last 2 minutes
//             Alert.alert(
//               'Alert',
//               'You can only send an alert for this vehicle after 2 minutes.',
//             );
//             return;
//           }
//         }

//         Alert.alert(
//           'Are you sure?',
//           `you want to send a ${sosCatgry} emergency alert about your vehicle?`,
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//               onPress: () => {
//                 // console.log('Cancel Pressed');
//               },
//             },
//             {
//               text: 'Confirm',
//               onPress: () => {
//                 dispatch(setLastPressedTime(item.vehicleNumber, currentTime));
//                 uploadPoliceAlert(
//                   setShowModal,
//                   userObjectKey,
//                   navigation,
//                   item,
//                   userPhoneP,
//                   sosCatgry,
//                   currentLat,
//                   currentLong,
//                   detail,
//                   setDetail,
//                 );
//               },
//             },
//           ],
//           {cancelable: false},
//         );
//       });
//     }
//   };

//   const ImageLoader = ({source}) => {
//     const [isLoading, setIsLoading] = useState(true);

//     const handleImageLoad = () => {
//       setIsLoading(false);
//     };

//     if (!source) {
//       return (
//         <View style={styles.txtSty}>
//           <Text style={[styles.name, {fontWeight: '700', color: Colors.GREY}]}>
//             Image is not available
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <View
//         style={[
//           styles.pic,
//           {
//             backgroundColor: Colors.PRIMARY_WHITE,
//           },
//         ]}>
//         <FastImage
//           resizeMode={FastImage.resizeMode.cover}
//           priority={FastImage.priority.high}
//           style={styles.imgSiz}
//           source={{
//             uri: source,
//             cache: FastImage.cacheControl.immutable,
//           }}
//           onLoad={handleImageLoad}
//         />
//         {isLoading && (
//           <View style={styles.loader}>
//             <ActivityIndicator size="large" color="black" />
//           </View>
//         )}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
//       <ScrollView
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           flexGrow: 1,
//           paddingBottom: '30%',
//         }}>
//         <Header
//           navigation={navigation}
//           icon={<ArrowBack />}
//           txt={Constraints.REGISTERED_VEHICLES}
//           onPress={handleBack}
//         />

//         <Heading styl={styles.heading} txt="Blow a Whistle to Stop Crime" />
//         <PickerBtn
//           dynamicBtn={sosCat}
//           expandedCataegory={expandedCataegory3}
//           setExpandedCategory={setExpandedCategory3}
//           txt={sosCatgry}
//           category={sosCatgry}
//           setCategory={setSosCatgry}
//           setErrorMessage={setUserCatError}
//         />

//         <Heading
//           styl={[styles.heading, {marginBottom: 0}]}
//           txt="Select your vehicle.."
//         />
//         {regVehicles !== null ? (
//           <>
//             {Object.values(regVehicles).map(item => {
//               return (
//                 <View key={item.key}>
//                   <Pressable
//                     onPress={() => {
//                       setSelectedCard(item);
//                     }}
//                     style={[
//                       styles.servicesContain,
//                       {
//                         height: selectedCard === item ? 490 : 390,
//                         shadowColor: '#000',
//                         shadowOffset: {
//                           width: selectedCard === item ? 0 : 3,
//                           height: selectedCard === item ? 0 : 12,
//                         },
//                         shadowOpacity: selectedCard === item ? 0 : 0.1,
//                         shadowRadius: selectedCard === item ? 0 : 3.84,
//                         elevation: selectedCard === item ? 0 : 3,
//                         borderColor: selectedCard === item ? 'Black' : null,
//                         borderWidth: selectedCard === item ? 0.6 : 0,
//                       },
//                     ]}>
//                     <ImageLoader source={item.imgVehicle} />

//                     <Text
//                       style={[
//                         styles.name,
//                         {
//                           alignSelf: 'center',
//                           marginBottom: 5,
//                           width: '90%',
//                           fontSize: 18,
//                           fontWeight: '700',
//                           color: Colors.BLACK,
//                         },
//                       ]}>
//                       {item.vehicleName}
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         width: '90%',
//                       }}>
//                       <View style={{alignItems: 'flex-start'}}>
//                         <Text
//                           style={[
//                             styles.name,
//                             {
//                               marginBottom: 5,
//                               fontWeight: '600',
//                               color: Colors.GREY,
//                             },
//                           ]}>
//                           Number
//                         </Text>
//                         {/* <Text
//                           style={[
//                             styles.name,
//                             {
//                               fontWeight: '600',
//                               marginBottom: 5,
//                               color: Colors.GREY,
//                             },
//                           ]}>
//                           Model
//                         </Text> */}
//                         <Text
//                           style={[
//                             styles.name,
//                             {
//                               marginBottom: 5,
//                               fontWeight: '600',
//                               color: Colors.GREY,
//                             },
//                           ]}>
//                           Pin#
//                         </Text>
//                       </View>

//                       <View style={{alignItems: 'flex-end'}}>
//                         <Text style={[styles.name, {marginBottom: 5}]}>
//                           {item.vehicleNumber}
//                         </Text>

//                         {/* <Text style={[styles.name, {marginBottom: 5}]}>
//                           {item.vehicleModel}
//                         </Text> */}

//                         <Text style={[styles.name, {marginBottom: 5}]}>
//                           {item.Pin}
//                         </Text>
//                       </View>
//                     </View>

//                     {selectedCard === item ? (
//                       <TextInp
//                         inputContainer={styles.inputContainer}
//                         style={styles.inputStyle}
//                         placeholder={'Enter details about incident'}
//                         placeholderTextColor={Colors.GREY}
//                         value={detail}
//                         onChangeText={txt => setDetail(txt)}
//                         multiline={true}
//                         // icon={<DocScan />}
//                       />
//                     ) : null}
//                     {selectedCard === item ? (
//                       <View style={styles.btnContainer}>
//                         <CusButton
//                           onPress={() => handlePress(item)}
//                           btnStyle={styles.btnstyle}
//                           textStyle={styles.btnTxt}
//                           btntxt={Constraints.POST_TO_ADMIN}
//                         />
//                         <CusButton
//                           onPress={() => {
//                             setItemKey(item);
//                             setUpdateModal(true);
//                           }}
//                           btnStyle={{...styles.btnstyle, width: '40%'}}
//                           textStyle={styles.btnTxt}
//                           btntxt={Constraints.EDIT}
//                         />
//                       </View>
//                     ) : null}
//                   </Pressable>
//                   {/* <View
//                     style={{
//                       backgroundColor: Colors.GREY,
//                       height: 0.8,
//                       width: '90%',
//                       alignSelf: 'center',
//                       marginTop: '5%',
//                     }}
//                   /> */}
//                 </View>
//               );
//             })}
//           </>
//         ) : (
//           <Text
//             style={{
//               marginTop: '40%',
//               fontFamily: Fonts.FIGTREE,
//               color: Colors.BLACK,
//               fontSize: 14,
//               fontWeight: '600',
//               alignSelf: 'center',
//               lineHeight: 29,
//             }}>
//             You Have No Registered Vehicles
//           </Text>
//         )}
//       </ScrollView>
//       <TouchableOpacity
//         style={styles.bottomBtn}
//         onPress={() => {
//           navigation.navigate('AddVehicle', {camParam: 'Gallery'});
//         }}>
//         <Text style={styles.bottomBtnTxt}>+</Text>
//       </TouchableOpacity>
//       <LoadingModal showModal={showModal} navigate={navigation} />
//       <CarDetailsModal
//         showModal={UpdateModal}
//         hideModal={hideUpdateModal}
//         navigation={navigation}
//         itemKey={itemKey}
//         setItemKey={setItemKey}
//       />
//     </SafeAreaView>
//   );
// };

// export default RegisteredVehicles;

import styles from './styles';
import Header from '../../reuseable/Header';
import Colors from '../../Constraints/Colors';
import Heading from '../../reuseable/heading';
import React, {useState, useEffect} from 'react';
import CusButton from '../../reuseable/cusButton';
import {useDispatch, useSelector} from 'react-redux';
import ReportModal from '../../reuseable/ReportModal';
import Constraints from '../../Constraints/Constraints';
import {View, StatusBar, SafeAreaView} from 'react-native';
import ArrowBack from '../../assets/VirtualTravelGuard/ArrowBack.svg';
import {WhistleBlowBtns, sosCat} from '../../DataStore/genderBtns';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImage} from '../../Utils/Functions';
import PoliceModal from '../../reuseable/PoliceModal';

const RegisteredVehicles = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ImageError, setImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [img, setImg] = useState('');
  const {userObjectKey, token} = useSelector(reducers => reducers.allReducer);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(img => {
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        uploadImage(imageUri, setProgress, setUploading, setImg, setImageError);
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

  const handleBack = () => {
    navigation.goBack();
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = type => {
    setShowModal(true);
    setType(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.BLACK} />
      <Header
        navigation={navigation}
        txt={Constraints.ROAD_SAFETY}
        onPress={handleBack}
        icon={<ArrowBack />}
      />

      <View style={styles.contentContainer}>
        <Heading styl={styles.heading} txt="Blow a Whistle to Stop Crime" />

        {sosCat.map(item => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <CusButton
                onPress={() => handleSubmit(item.title)}
                btnStyle={styles.btnStyle}
                textStyle={styles.textStyle}
                btntxt={item.title}
              />
            </View>
          );
        })}
      </View>

      <PoliceModal
        showModal={showModal}
        hideModal={hideModal}
        navigation={navigation}
        type={type}
      />
    </SafeAreaView>
  );
};

export default RegisteredVehicles;
