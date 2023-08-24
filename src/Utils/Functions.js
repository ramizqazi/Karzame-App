import database from '@react-native-firebase/database';
import {Platform, PermissionsAndroid, Alert, ToastAndroid} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Share from 'react-native-share';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Geolocation from 'react-native-geolocation-service';

import {
  addUserid,
  addUserObjectKey,
  logoutUser,
  addUserDeviceToken,
  addUserName,
  addEmergencyContactData,
  addUserData,
  addOperatorsTypeWorker,
  addOperatorVerification,
  addUsePhone,
  addUseMail,
  switchLIveLoc,
  addCountryName,
} from '../Redux/Action/actions';

import ImagePicker from 'react-native-image-crop-picker';
import DataPath from './DataPath';

export async function getWorkersWithinDistance(
  Path,
  latitude,
  longitude,
  distance,
) {
  const workersRef = database().ref(Path);
  const snapshot = await workersRef.once('value');
  const workers = snapshot.val();
  if (workers === null) {
    return [];
  }
  const filteredWorkers = Object.values(workers)
    .filter(worker => {
      const workerDistance = calculateDistance(
        latitude,
        longitude,
        worker.Latitude,
        worker.Longitude,
      );

      return workerDistance <= distance;
    })
    .map(worker => ({
      ...worker,
      distance: calculateDistance(
        latitude,
        longitude,
        worker.Latitude,
        worker.Longitude,
      ),
    }));

  return filteredWorkers;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const requestPermission = async setLocation => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation(setLocation);
      } else {
        alert('Permission to access location was denied');
      }
    } catch (error) {
      // console.log('Error requesting location permission:', error);
    }
  } else {
    getLocation(setLocation);
  }
};

const getLocation = setLocation => {
  Geolocation.getCurrentPosition(
    position => {
      const cords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        heading: position?.coords?.heading,
      };

      setLocation(cords);
    },
    error => {
      alert(`Error getting location: ${error.message}`);
    },
  );
};

export const uploadImage = async (
  uploadUri,
  setProgress,
  setUploading,
  setVehicleImg,
  setImageError,
) => {
  try {
    const filename = generateUniqueFilename(uploadUri);
    const storageRef = storage().ref(`UserPics/${filename}`);
    const task = storageRef.putFile(uploadUri);

    setUploading(true);
    setProgress(0);

    // Set progress state during the upload
    task.on('state_changed', taskSnapshot => {
      const progress =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setProgress(progress);
    });

    await task;
    const url = await storageRef.getDownloadURL();

    setUploading(false);
    setProgress(0);
    setVehicleImg(url);
    setImageError(false);

    // console.log('Image uploaded!----> ' + url);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

const generateUniqueFilename = originalFilename => {
  const extension = originalFilename.split('.').pop();
  const name = originalFilename.split('.').slice(0, -1).join('.');
  const timestamp = Date.now();
  return `${name}_${timestamp}.${extension}`;
};

export const uploadWellBeingImage = async (
  wellBeingTripPicUri,
  setWellBeingTripPicUri,
  hideModal,
  setShowModalLoading,
) => {
  let filename = wellBeingTripPicUri.substring(
    wellBeingTripPicUri.lastIndexOf('/') + 1,
  );

  // Add timestamp to File Name
  const extension = filename.split('.').pop();
  const name = filename.split('.').slice(0, -1).join('.');
  filename = name + Date.now() + '.' + extension;
  setShowModalLoading(true);
  const storageRef = storage().ref(`UserPics/${filename}`);
  const task = storageRef.putFile(wellBeingTripPicUri);
  // Set transferred state
  task.on('state_changed', taskSnapshot => {
    // console.log(
    //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    // );
  });
  try {
    await task;
    const url = await storageRef.getDownloadURL();
    // console.log('url==' + url);
    setWellBeingTripPicUri(url);
    setShowModalLoading(false);
    // console.log('Image uploaded!');
    return url;
    console.log('url here' + url);
  } catch (e) {
    // console.log(e);
    return null;
  }
};

export const fetchUserData = async (user, dispatch, token) => {
  database()
    .ref('users')
    .orderByChild('userEmail')
    .equalTo(user.email)
    .once('value')
    .then(snapshot => {
      const userData = snapshot.val();
      const userObject = Object.values(userData)[0];
      dispatch(addUserid(userObject.uid));
      dispatch(addUserObjectKey(userObject.key, userObject.userImage));
      dispatch(addUserName(userObject.userName, userObject.userPhone));
      dispatch(addUsePhone(userObject.userPhone));
      dispatch(addUseMail(userObject.userEmail));
      updateTokenUser(userObject.key, token);
    })
    .catch(error => {
      // console.log('Error getting user data:', error);
    });
};

const updateTokenUser = async (key, token) => {
  database()
    .ref('users/' + key)
    .update({deviceToken: token})
    .then(() => {
      // console.log('token added to DB ');
    })
    .catch(error => {
      // console.log(error);
    });
};
const updateTokenOperator = async (key, token) => {
  database()
    .ref('Operators/' + key)
    .update({workerTokenToken: token})
    .then(() => {
      // console.log('token added to Operator DB ');
    })
    .catch(error => {
      // console.log(error);
    });
};

export const updateVehicleData = async (
  setShowModal,
  userObjectKey,
  vehicleNum,
  vehicleImg,
  setVehicleNum,
  setVehicleImg,
  setVehicleName,
  navigation,
  vehicleName,
  item,
  hideModal,
) => {
  setShowModal(true);
  database()
    .ref(`users/${userObjectKey}/Registered_Vehicles/${item}`)
    .update({
      imgVehicle: vehicleImg,
      vehicleName: vehicleName,
      vehicleNumber: vehicleNum,
    })
    .then(() => {
      alert('Vehicle info updated');
      setVehicleImg(null);
      setVehicleName(null);
      setVehicleNum(null);
      hideModal;
      setShowModal(false);
    })
    .catch(error => {
      setShowModal(false);
      alert(error);
    });
};

export const fetchOperatorData = async (user, dispatch, token) => {
  database()
    .ref('Operators')
    .orderByChild('workerMail')
    .equalTo(user.email)
    .once('value')
    .then(snapshot => {
      const userData = snapshot.val();
      const userObject = Object.values(userData)[0];
      dispatch(
        addOperatorsTypeWorker(userObject.workerType, userObject.workerRegDone),
      );
      dispatch(addOperatorVerification(userObject.verified));
      updateTokenOperator(userObject.key, token);
    })
    .catch(error => {
      // console.log('Error getting operator data:', error);
    });
};

const checkUserExistsSocial = async email => {
  return database()
    .ref('users')
    .orderByChild('userEmail')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      // If the snapshot exists and has children, user data exists in the Realtime Database
      return snapshot.exists() && snapshot.hasChildren();
    })
    .catch(error => {
      // Handle error
      console.error(error);
      throw error;
    });
};

export const onGoogleButtonPress = async (
  setShowModal,
  navigation,
  hideModal,
  dispatch,
  token,
) => {
  try {
    const tokenDevice = await messaging().getToken();
    dispatch(addUserDeviceToken(tokenDevice));
    // console.log('Token generated Social ----', tokenDevice);

    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    setShowModal(true);
    const currentUser = await auth().signInWithCredential(googleCredential);

    if (!currentUser.additionalUserInfo.isNewUser) {
      const userExists = await checkUserExistsSocial(currentUser.user.email);

      if (userExists) {
        // console.log('User exists:', currentUser.additionalUserInfo.isNewUser);

        await fetchUserDataSocial(currentUser, dispatch, token);
        await fetchOperatorDataSocial(
          currentUser,
          dispatch,
          navigation,
          setShowModal,
        );
      } else {
        await unlinkEmailProvider(currentUser);
        alert('Please sign up first');
        navigation.navigate('SignUp');
      }
    } else {
      navigation.navigate('SignUp');
      setShowModal(false);
      alert('Please sign up first');
      auth().signOut();
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      alert('You have canceled the Google Sign-In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('Play services not available or outdated');
    } else if (error.code === 'auth/email-already-in-use') {
      alert('That email address is already in use!');
    } else {
      console.error('Google Sign-In error:', error);
    }

    setShowModal(false);
  }
};

const unlinkEmailProvider = async currentUser => {
  try {
    await currentUser.unlink(auth.EmailAuthProvider.PROVIDER_ID);
  } catch (error) {
    console.error('Unlink error:', error);
    throw new Error('An error occurred while unlinking the account');
  }
};

export const onFacebookButtonPress = async (
  setShowModal,
  navigation,
  hideModal,
) => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(facebookCredential);
  setShowModal(true);
  user_sign_in
    .then(userInfoo2 => {
      setShowModal(false);
      // console.log(userInfoo2);
      if (userInfoo2.additionalUserInfo.isNewUser === false) {
        // console.log('==>' + token);
        fetchUserDataSocial(userInfoo2, dispatch, token)
          .then(() => {
            fetchOperatorDataSocial(userInfoo2, dispatch);
          })
          .then(() => {
            navigation.replace('MyDrawer');
          });
      } else {
        navigation.navigate('SignUp');
        alert('Please sign up first');
      }
    })
    .catch(error => {
      setShowModal(false);
      // console.log(error);
    });
};

export const uploadGoogleInDataToDatabase = async (
  userInfoo,
  setShowModal,
  navigation,
  hideModal,
  dispatch,
) => {
  setShowModal(true);
  const newReference = database().ref('/users').push();
  newReference
    .set({
      key: newReference.key,
      userEmail: userInfoo.user.email,
      uid: userInfoo.user.uid,
    })
    .then(() => {
      setShowModal(false);
      navigation.navigate('Subscription');
      dispatch(addUserid(userInfoo.user.uid));
      dispatch(addUserObjectKey(newReference.key));
    })
    .catch(error => {
      alert('Something went wrong' + error);
      setShowModal(false);
    });
};

export const getNotificationData = async (
  setShowLoader,
  setNotifications,
  userObjectKey,
) => {
  setShowLoader(true);
  database()
    .ref('users/' + userObjectKey + '/notifiy')
    .on('value', snapshot => {
      var li = [];
      snapshot.forEach(child => {
        // console.log('Notifications----' + child.val());
        li.push({
          message: child.val().message,
        });
      });
      setShowLoader(false);
      setNotifications(li);
    });
};

export const handleSignOut = async (
  navigation,
  dispatch,
  setShowModal,
  userObjectKey,
) => {
  // setShowModal(true);
  try {
    await auth().signOut();
    const nodeRef = database().ref(`users/${userObjectKey}/deviceToken`);
    nodeRef
      .remove()
      .then(() => {
        // console.log('token  deleted successfully');
      })
      .then(() => {
        dispatch(addUserObjectKey(null, null));
        // console.log('object id   deleted successfully');
      })
      .catch(error => {
        // console.log(`Error deleting node: ${error.message}`);
      });

    // const isGoogleSignIn = await GoogleSignin.isSignedIn();
    // if (isGoogleSignIn) {
    //   await GoogleSignin.revokeAccess();
    //   await GoogleSignin.signOut();
    // }
    dispatch(logoutUser(null));
    dispatch(addOperatorsTypeWorker(null, false));
    setShowModal(false);
    navigation.replace('UserAuth');
  } catch (error) {
    alert(error);
    setShowModal(false);
    alert('Error signing out. Please try again.');
  }
};

export const uploadToDatabase = async (
  user,
  setShowModalLoading,
  setAllDisableLoader,
  selectedDateUser,
  navigation,
  DataPath,
  userImage,
  userSignData,
  categoryUserGender,
  userPhone,
  PhoneIMEIUser,
  categoryGSMUser,
  dispatch,
  currentLat,
  currentLong,
  token,
) => {
  setShowModalLoading(true);
  setAllDisableLoader(true);
  const newReference = database().ref(DataPath).push();
  newReference
    .set({
      key: newReference.key,
      userImage: userImage,
      userName: userSignData.name,
      userPhone: userPhone,
      isActive: true,
      userEmail: userSignData.email,
      userGender: categoryUserGender,
      userDOB:
        selectedDateUser.getDate() +
        ' / ' +
        (selectedDateUser.getMonth() + 1) +
        ' / ' +
        selectedDateUser.getFullYear(),
      userIMEI: PhoneIMEIUser,
      userGSM: categoryGSMUser,
      userPassword: userSignData.password,
      uid: user.user.uid,
      Latitude: currentLat,
      Longitude: currentLong,
      userVehicle: '',
      userSelfie: '',
      deviceToken: token,
    })
    .then(() => {
      setShowModalLoading(false);
      setAllDisableLoader(false);
      dispatch(addUserid(user.user.uid));
      dispatch(addUserName(userSignData.name));
      dispatch(addUserObjectKey(newReference.key, userImage));
      dispatch(addUserData(token, userPhone, userSignData.email));
      dispatch(addUsePhone(userPhone));
      dispatch(addUseMail(userSignData.email));
      dispatch(addOperatorVerification(false));
    })
    .catch(error => {
      alert('Something went wrong' + error);
      navigation.replace('SignUp');
      setShowModalLoading(false);
      setAllDisableLoader(false);
    });
};

export const uploadWellBeiengDataToDB = async (
  userId,
  userObjectKey,
  DataPath,
  hideModal,
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
) => {
  setShowModalLoading(true);
  setAllDisableLoader(true);
  const date = new Date();
  const newReference = database()
    .ref(DataPath + userObjectKey + '/wellBeingServicesData')
    .push();
  if (color === 0) {
    newReference
      .set({
        key: newReference.key,
        ArrivalDate:
          selectedDate.getDate() +
          ' / ' +
          selectedDate.getMonth() +
          1 +
          ' / ' +
          selectedDate.getFullYear(),
        ArrivalTime: selectedTime.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric',
        }),
        PartenerType: familyMember,
        Name: name,
        PhoneNumber: phoneNum,
        VehicleNumber: vehicleNumber,
        // VehicleModel: vehicleModel,
        // VehicleMaker: vehicleMaker,
        DepartTime: departTime,
        WellBeingTripPic: wellBeingTripPicUri,
        sosSinalPic: sosSinalPic,
        TripDate:
          date.getDate() +
          ' / ' +
          date.getMonth() +
          1 +
          ' / ' +
          date.getFullYear(),
        TripTime: date.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric',
        }),
      })

      .then(() => {
        setShowModalLoading(false);
        setAllDisableLoader(false);
        navigation.navigate('StartTrio');
        hideModal();
      })
      .catch(error => {
        alert('Something went wrong' + error);
        setShowModalLoading(false);
        setAllDisableLoader(false);
      });
  } else if (color === 1) {
    newReference
      .set({
        key: newReference.key,
        ArrivalDate:
          selectedDate.getDate() +
          ' / ' +
          selectedDate.getMonth() +
          1 +
          ' / ' +
          selectedDate.getFullYear(),
        ArrivalTime: selectedTime.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric',
        }),
        PartenerType: familyMember,
        Name: name,
        PhoneNumber: phoneNum,
        TransportCompany: tranportCompany,
        TransportType: tranportCompanyName,
        VehicleReg: vehicleReg,
        DepartureTime: departTime.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric',
        }),
        sosSinalPic: sosSinalPic,
      })

      .then(() => {
        setShowModalLoading(false);
        setAllDisableLoader(false);
        navigation.navigate('StartTrio');
        hideModal();
      })
      .catch(error => {
        alert('Something went wrong' + error);
        setShowModalLoading(false);
        setAllDisableLoader(false);
      });
  } else {
    newReference
      .set({
        key: newReference.key,
        ArrivalDate:
          selectedDate.getDate() +
          ' / ' +
          selectedDate.getMonth() +
          1 +
          ' / ' +
          selectedDate.getFullYear(),
        ArrivalTime: selectedTime.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric',
        }),
        PartenerType: familyMember,
        Name: name,
        PhoneNumber: phoneNum,
        DepartStation: departStation,
        ArrivalStation: arrivalStation,
        sosSinalPic: sosSinalPic,
      })

      .then(() => {
        setShowModalLoading(false);
        setAllDisableLoader(false);
        navigation.navigate('StartTrio');
        hideModal();
      })
      .catch(error => {
        alert('Something went wrong' + error);
        setShowModalLoading(false);
        setAllDisableLoader(false);
      });
  }
};

export const takePhotoFromCamera = (
  setWellBeingTripPicUri,
  hideModal,
  setShowModalLoading,
) => {
  ImagePicker.openCamera({
    width: 300,
    height: 300,
    compressImageQuality: 0.7,
  })
    .then(img => {
      const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      uploadWellBeingImage(
        imageUri,
        setWellBeingTripPicUri,
        hideModal,
        setShowModalLoading,
      );
    })
    .catch(error => {
      // console.log(error);
    });
};

export const getRegisteredVehicles = async (
  setRegVehicles,
  setShowModal,
  userObjectKey,
) => {
  setShowModal(true);
  const dbRef = database().ref(`users/${userObjectKey}/Registered_Vehicles`);
  dbRef.on('value', snapshot => {
    const vehicles = snapshot.val();
    setRegVehicles(vehicles);
    setShowModal(false);
  });

  return () => dbRef.off();
};

export const getEmergencyContacts = async (
  setEmergencyContacts,
  setShowModal,
  userObjectKey,
) => {
  setShowModal(true);
  const dbRef = database().ref(`users/${userObjectKey}/EmergencyContacts`);
  dbRef.on('value', snapshot => {
    const contacts = snapshot.val();
    if (contacts) {
      const contactsArray = Object.values(contacts);
      setEmergencyContacts(contactsArray);
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  });

  return () => dbRef.off();
};

export const checkUserExists = async (item, setShowModal) => {
  setShowModal(true);
  const usersRef = database().ref('users');
  const snapshot = await usersRef
    .orderByChild('userPhone')
    .equalTo(item.phoneNumber)
    .once('value');
  if (snapshot.exists()) {
    const userObject = snapshot.val();
    let deviceToken = null;
    snapshot.forEach(childSnapshot => {
      deviceToken = childSnapshot.val().deviceToken;
    });
    setShowModal(false);

    return {...userObject, deviceToken};
  } else {
    setShowModal(false);
    return null;
  }
};

export const uploadOperatorServiceToDB = async (
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
) => {
  setShowModal(true);
  const operatorsRef = database().ref('Operators');
  const newOperatorKey = userObjectKey;
  const newOperatorRef = operatorsRef.child(newOperatorKey);
  newOperatorRef
    .set({
      key: newOperatorRef.key,
      vehicleMaker: vehicleMaker,
      vehicleModel: vehicleModel,
      vehicleImg: imgVehicle,
      Latitude: currentLat,
      Longitude: currentLong,
      workerImage: userImg,
      workerLocation: '',
      workerMail: userMailP,
      workerName: userName,
      workerPhoneNumber: userPhoneP,
      workerType: operatorType,
      workerTokenToken: providerToken,
      verified: false,
      clinicName: clinicName,
      area: area,
      vehicleRegNum: vehicleRegNum,
      workerRegDone: true,
    })
    .then(() => {
      setShowModal(false);
      // navigation.replace('Operator');
      handleSignOut(navigation, dispatch, setShowModal, userObjectKey);
      dispatch(addOperatorsTypeWorker(operatorType, true));
      Alert.alert(
        'Successfully registered',
        'Now login again to proceed further',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    })
    .catch(error => {
      alert('Something went wrong' + error);
      navigation.replace('SignUp');
      setShowModal(false);
    });
};

export const phoneNumberExists = async (FinalPhoneNum, email) => {
  const phoneSnapshot = await database()
    .ref()
    .child('users')
    .orderByChild('userPhone')
    .equalTo(FinalPhoneNum)
    .once('value');

  const emailSnapshot = await database()
    .ref()
    .child('users')
    .orderByChild('userEmail')
    .equalTo(email)
    .once('value');

  const result = {
    phoneExists: phoneSnapshot.exists(),
    emailExists: emailSnapshot.exists(),
  };

  return result;
};

export const getCountry = (
  currentLat,
  currentLong,
  Keys,
  setCountry,
  setLoader,
) => {
  setLoader(true);
  try {
    // Use latitude and longitude to get country
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLat},${currentLong}&key=${Keys.GOOGLE_MAPS_APIKEY}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log('API RESPONSE ' + JSON.stringify(responseJson));
        // Check if there are any results in the response
        if (responseJson.results && responseJson.results.length > 0) {
          const countryy = responseJson.results[0].address_components.find(
            component => component.types.includes('country'),
          ).short_name;
          // console.log('Country:', countryy);
          setCountry(countryy);
        } else {
          console.error('No results found.');
          setCountry('Unknown'); // Set a default value for the country when no results are found.
        }
        setLoader(false);
      })
      .catch(error => {
        // console.error(error);
        setLoader(false);
      });
  } catch (errorr) {
    // console.error(errorr.message);
    setLoader(false);
  }
};

export const uploadVirtualHomeData = async (
  userObjectKey,
  currentLiveLatVirtual,
  currentLiveLogVirtual,
  selectedValue,
  selectedDate,
  selectedTime,
  userSelfie,
  userVehicle,
  setShowModal,
  virtualLocTxt,
  onSelect,
  navigation,
  dispatch,
) => {
  setShowModal(true);
  const newReference = database()
    .ref(`users/${userObjectKey}/VirtualHomeCheck`)
    .push();
  newReference
    .set({
      key: newReference.key,
      Place: selectedValue,
      Place: virtualLocTxt,
      Date:
        selectedDate.getDate() +
        ' / ' +
        (selectedDate.getMonth() + 1) +
        ' / ' +
        selectedDate.getFullYear(),
      Time: selectedTime.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      userSelfie: userSelfie,
      userVehicle: userVehicle,
      Interval: onSelect,
    })
    .then(() => {
      setShowModal(false);
      // console.log('Uploaded virtual home check');
      alert('Virtual Home Check Done');
      dispatch(switchLIveLoc(true));
      // navigation.goBack();
    })
    .catch(error => {
      alert('Something went wrong' + error);
      setShowModal(false);
    });
};

export const uploadVehicleToDB = (
  setShowModal,
  userObjectKey,
  vehicleNumber,
  imgVehicle,
  setVehicleNumber,
  setVehicleModel,
  setVehicleImg,
  navigation,
  vehicleName,
) => {
  setShowModal(true);
  let counter = 0;
  const vehicleRef = database()
    .ref('users/' + userObjectKey + '/Registered_Vehicles')
    .push();
  const vehicleKey = (Date.now() + counter++).toString().slice(-6);
  vehicleRef
    .set({
      Pin: vehicleKey,
      vehicleNumber: vehicleNumber,
      key: vehicleRef.key,
      imgVehicle: imgVehicle,
      vehicleName: vehicleName,
    })
    .then(() => {
      // console.log('Vehicle saved to DB');
      setVehicleImg('');
      setVehicleModel('');
      setVehicleNumber('');
      setShowModal(false);
      navigation.goBack();
    })
    .catch(error => {
      // console.log(error);
      setShowModal(false);
    });
};

export const uploadPoliceAlert = (
  setShowModal,
  userObjectKey,
  navigation,
  item,
  userPhoneP,
  sosCatgry,
  currentLat,
  currentLong,
  detail,
  setDetail,
) => {
  setShowModal(true);
  // const currentTime = new Date().getTime(); // Get the current time
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

  database()
    .ref('users/' + userObjectKey + '/Police_Alerts')
    .push({
      vehicleName: item.vehicleName,
      vehicleNumber: item.vehicleNumber,
      // vehicleModel: item.vehicleModel,
      imgVehicle: item.imgVehicle,
      userContact: userPhoneP,
      alert: 'A vehicle has been stolen',
      Type: sosCatgry,
      Pin: item.Pin,
      Date: formattedTime,
      isRead: false,
      currentLat: currentLat,
      currentLong: currentLong,
      Detail: detail,
    })
    .then(() => {
      // console.log('Police alert saved  to DB');
      setShowModal(false);
      setDetail('');
    })
    .then(() => {
      Alert.alert(
        'Alert sent',
        'You will be notified when your vehicle is found!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Handle OK button press if needed
            },
          },
        ],
        {cancelable: false},
      );
    })
    .catch(error => {
      // console.log(error);
      setShowModal(false);
    });
};

export const fetchData = async (
  userObjectKey,
  todayDate,
  setSavedDate,
  setSOSInterval,
) => {
  const currentDate =
    todayDate.getDate() +
    ' / ' +
    (todayDate.getMonth() + 1) +
    ' / ' +
    todayDate.getFullYear();

  try {
    const snapshot = await database()
      .ref(`users/${userObjectKey}/VirtualHomeCheck`)
      .once('value');
    const virtualHomeCheckData = snapshot.val();

    let matchingEntry = null;

    Object.values(virtualHomeCheckData).forEach(entry => {
      if (entry.Date === currentDate) {
        matchingEntry = entry;
      }
    });

    if (matchingEntry) {
      const date = matchingEntry.Date;
      const Interval = matchingEntry.Interval;
      setSavedDate(date);
      setSOSInterval(Interval);
      // console.log('Date is ' + date);
      return matchingEntry;
    } else {
      // console.log('No entry found with the desired date');
    }
  } catch (error) {
    // console.log('Error retrieving data from database:', error);
  }
};

export const sendSMS = async (
  recipient,
  message,
  item,
  setShowModal,
  currentLat,
  currentLong,
) => {
  setShowModal(true);
  const locationLink = `https://maps.google.com/maps?q=${currentLat},${currentLong}`;
  const fullMessage = `${message}\n\nTrack location: ${locationLink}`;

  const options = {
    method: 'POST',
    url: 'https://api.smslive247.com/api/v4/sms',
    headers: {
      accept: 'application/json',
      'content-type': 'application/*+json',
      Authorization: 'SA-04F0FD7D-3F2B-41C2-AEF7-AF3DC8ECE5EF',
    },
    data: {
      senderID: 'Debtorsbook',
      messageText: fullMessage,
      mobileNumber: recipient,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      setShowModal(false);
      alert(`Emergency SMS has been sent to: ${item.Name}`);
    })
    .catch(function (error) {
      setShowModal(false);
      alert('Failed to send SMS');
    });
};

export const fetchUserDataSocial = async (userInfor, dispatch, token) => {
  database()
    .ref('users')
    .orderByChild('userEmail')
    .equalTo(userInfor.user.email)
    .once('value')
    .then(snapshot => {
      const userData = snapshot.val();
      const userObject = Object.values(userData)[0];
      dispatch(addUserid(userObject.uid));
      dispatch(addUserObjectKey(userObject.key, userObject.userImage));
      dispatch(addUserName(userObject.userName, userObject.userPhone));
      dispatch(addUsePhone(userObject.userPhone));
      dispatch(addUseMail(userObject.userEmail));
      updateTokenUser(userObject.key, token);
    })
    .catch(error => {
      // console.log('Error getting user data:', error);
    });
};

export const fetchOperatorDataSocial = async (
  userInfor,
  dispatch,
  navigation,
  setShowModal,
) => {
  database()
    .ref('Operators')
    .orderByChild('workerMail')
    .equalTo(userInfor.user.email)
    .once('value')
    .then(snapshot => {
      const userData = snapshot.val();
      const userObject = Object.values(userData)[0];
      dispatch(
        addOperatorsTypeWorker(userObject.workerType, userObject.workerRegDone),
      );
      dispatch(addOperatorVerification(userObject.verified));
    })
    .finally(() => {
      navigation.replace('MyDrawer');
      setShowModal(false);
    })
    .catch(error => {
      // console.log('Error getting operator data:', error);
    });
};

export const sendNotification = async (
  item,
  userExists,
  setShowModal,
  userName,
  userPhone,
) => {
  setShowModal(true);
  const message = `${userName} is in emergency. Please contact him/her as soon as possible at ${userPhone}.`;

  const data = {
    to: userExists.deviceToken,
    notification: {
      title: 'New notification',
      body: message,
      sound: 'ring',
      channelId: 'sound_channel',
    },
    data: {},
  };

  var config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      Authorization:
        'key=AAAAgGAVv10:APA91bF44AjWwHlHbmCKV0gbCxx1f2pXxneCEaPQFAuAVqhLyo5mUuFJasdjC5edxCHUZ9Q130ewoN6IAUpwJTfzFDv2_wBT-Q1U8PtvH6Qluamirz43ZJco596OHuRb98-S3RjXuNzV',
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(response => {
      // console.log(JSON.stringify(response.data));
      setShowModal(false);
      alert(`Emergency notification sent to ${item.Name}`);
    })
    .catch(err => {
      setShowModal(false);
      console.log('Some error occured while sending notification' + err);
      // console.log(JSON.stringify(err));
    });
};

export const getAllUsers = async userObjectKey => {
  const usersRef = database().ref(`users/${userObjectKey}`);
  const snapshot = await usersRef.once('value');
  const users = snapshot.val();

  return users;
};

export const sendNotifyToAllExisting = async (
  users,
  userName,
  userPhone,
  setShowModal,
) => {
  for (const user of users) {
    const message = `${userName} is in emergency. Please contact him/her as soon as possible at ${userPhone}.`;
    const data = {
      to: user.deviceToken,
      notification: {
        title: 'New notification',
        body: message,
        sound: 'ring',
        channelId: 'sound_channel',
      },
      data: {},
    };
    await sendNotificationMethod(data, setShowModal);
  }
};

export const sendNotificationMethod = async (data, setShowModal) => {
  var config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      Authorization:
        'key=AAAA_4Uj44k:APA91bHy5axJKPvZe1lR074cGDf9kNUyB5Q-kB8dh3NK9DApYqNm5rD2Pi6Rn1roBsPig78HK75NvIkyyOL5fagwQlqWtb5nEmsckIUwVIlLbZGwS8osYFQfuM5NirkQAcuKGB_AtteN',
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(response => {
      // console.log(JSON.stringify(response.data));
      setShowModal(false);
      // alert(`Emergency alert sent to ${item.Name}`);
    })
    .catch(err => {
      // console.log(JSON.stringify(err));
    });
};

export const sendSMSToAllExistingUser = async (
  users,
  userName,
  userPhone,
  setShowModal,
  currentLat,
  currentLong,
) => {
  for (const user of users) {
    const recipient = user.phoneNumber;
    const message = `${userName} is in emergency. Please contact him/her as soon as possible at ${userPhone}.`;
    await sendSMSMethod(
      recipient,
      message,
      setShowModal,
      currentLat,
      currentLong,
    );
  }
};

export const sendSMSMethod = async (
  recipient,
  message,
  setShowModal,
  currentLat,
  currentLong,
) => {
  setShowModal(true);
  const locationLink = `https://maps.google.com/maps?q=${currentLat},${currentLong}`;
  const fullMessage = `${message}\n\nTrack location: ${locationLink}`;

  const options = {
    method: 'POST',
    url: 'https://api.smslive247.com/api/v4/sms',
    headers: {
      accept: 'application/json',
      'content-type': 'application/*+json',
      Authorization: 'SA-04F0FD7D-3F2B-41C2-AEF7-AF3DC8ECE5EF',
    },
    data: {
      senderID: 'Debtorsbook',
      messageText: fullMessage,
      mobileNumber: recipient,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      setShowModal(false);
      // alert(`Emergency SMS has been sent to people`);
    })
    .catch(function (error) {
      alert('Failed to send SMS:', error);
    });
};

export const updateUserLatLong = (
  path,
  userObjectKey,
  currentLat,
  currentLong,
) => {
  database()
    .ref(path + userObjectKey)
    .update({Latitude: currentLat, Longitude: currentLong})
    .then(() => {
      // console.log('done--- user or operator  lat long updated');
    })
    .catch(error => {
      // console.log(error);
    });
};

export const updateProviderStatus = (userObjectKey, status) => {
  try {
    database().ref(`Operators/${userObjectKey}`).update({
      isOnline: status,
    });
  } catch (error) {
    // console.error('Error updating driver status: ', error);
  }
};

export const fetchIsActive = (
  userObjectKey,
  setShowModal,
  navigation,
  dispatch,
) => {
  const isActiveRef = database().ref(`users/${userObjectKey}/isActive`);
  const isActiveListener = isActiveRef.on('value', snapshot => {
    try {
      setShowModal(true);
      const isActiveValue = snapshot.val();

      if (isActiveValue !== null) {
        if (isActiveValue) {
          console.log('Account is active');
        } else {
          console.log('Account is suspended');
          handleSignOut(
            navigation,
            dispatch,
            setShowModal,
            userObjectKey,
          ).finally(() => {
            Alert.alert(
              'Alert',
              'Your account has been suspended now, kindly contact the admin.',
              [{text: 'OK', onPress: () => {}}],
            );
          });
        }
      } else {
        console.log('Account status is null');
      }
    } catch (error) {
      console.error('Error during isActiveListener:', error);
    } finally {
      setShowModal(false);
    }
  });

  // Return a function to unsubscribe the listener
  return () => {
    isActiveRef.off('value', isActiveListener); // Unsubscribe the listener
  };
};

export const shareLoc = () => {
  async function getLocationCurr() {
    requestPermission(location => {
      const url = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

      const shareOptions = {
        url: url,
      };

      Share.open(shareOptions)
        .then(res => {
          alert('Location shared successfully');
        })
        .catch(err => {
          console.log('Error sharing location:', err.data);
        });
    });
  }
  getLocationCurr();
};
