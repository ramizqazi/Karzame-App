export const addUserid = userId => {
  // console.log('user Id redux--' + userId);
  return {
    type: 'ADD_USER_ID',
    userId: userId,
  };
};

export const switchLIveLoc = switchBool => {
  // console.log('user Redux id switch live location-- ' + switchBool);
  return {
    type: 'LIVE_LOC',
    switchBool: switchBool,
  };
};

export const logoutUser = userId => {
  // console.log('user Redux id  sign Out ' + userId);
  return {
    type: 'LOGOUT_USER',
    userId: userId,
  };
};

export const addUserObjectKey = (userObjectKey, userImg) => {
  // console.log('userObjectKey redux--' + userObjectKey + userImg);
  return {
    type: 'ADD_USER_OBJECT_ID',
    userObjectKey: userObjectKey,
    userImg: userImg,
  };
};

export const addItemPropOfOperator = (
  workerName,
  workerDistance,
  workerPhoneNumber,
  workerLocation,
  workerImage,
  workerLat,
  workerLong,
) => {
  // console.log('ItemPropMainOperators redux--');
  return {
    type: 'ADD_ITEM_PROP',
    workerName: workerName,
    workerDistance: workerDistance,
    workerPhoneNumber: workerPhoneNumber,
    workerLocation: workerLocation,
    workerImage: workerImage,
    workerLat: workerLat,
    workerLong: workerLong,
  };
};

export const addCurrentLocation = (currentLat, currentLong) => {
  // console.log('addCurrentLocation redux-----' + currentLat, currentLong);
  return {
    type: 'ADD_CURRENT_LOCATION',
    currentLat: currentLat,
    currentLong: currentLong,
  };
};

export const addCurrenLivetLocation = (
  currentLiveLat,
  currentLiveLong,
  heading,
) => {
  // console.log('addCurrentlIVELocation redux-----' + currentLiveLat, heading);
  return {
    type: 'ADD_CURRENT_LIVE_LOCATION',
    currentLiveLat: currentLiveLat,
    currentLiveLong: currentLiveLong,
    heading: heading,
  };
};
export const addDestinationLocation = (destLat, destLong) => {
  // console.log('addDestinationLocation redux--' + destLat, destLong);
  return {
    type: 'ADD_DESTINATION_LOCATION',
    destLat: destLat,
    destLong: destLong,
  };
};
export const addCurrentLocTxt = currentLocTxt => {
  // console.log('addCurrentLocation redux--' + currentLocTxt, );
  return {
    type: 'ADD_CURRENT_LOCATION_TXT',
    currentLocTxt: currentLocTxt,
  };
};
export const addDestLocTxt = destLocTxt => {
  // console.log('addDestinationLocation redux--' + destLocTxt);
  return {
    type: 'ADD_DESTINATION_LOCATION_TXT',
    destLocTxt: destLocTxt,
  };
};

export const doStopTrp = (tripStop, tripResume) => {
  // console.log('stopTripUser redux--' + tripStop, tripResume);
  return {
    type: 'STOP_TRIP',
    tripStop: tripStop,
    tripResume: tripResume,
  };
};

export const doResumeTrip = (tripStop, tripResume) => {
  // console.log('resumeTripUser redux--' + tripStop, tripResume);
  return {
    type: 'RESUME_TRIP',
    tripStop: tripStop,
    tripResume: tripResume,
  };
};

export const addOperatorsType = operatorType => {
  // console.log('operator type redux--' + operatorType);
  return {
    type: 'OPERATOR_TYPE',
    operatorType: operatorType,
  };
};

export const addOperatorsTypeWorker = (operatorTypeWorker, regDone) => {
  // console.log('operator type worker redux------>' + operatorTypeWorker);
  return {
    type: 'OPERATOR_TYPE_WORKER',
    operatorTypeWorker: operatorTypeWorker,
    regDone: regDone,
  };
};

export const addPickBtn = picBtn => {
  // console.log('picBtn redux--' + picBtn);
  return {
    type: 'PICK_BTN',
    picBtn: picBtn,
  };
};

export const addUserDeviceToken = token => {
  // console.log('token redux-----------' + token);
  return {
    type: 'ADD_DEVICE_TOKEN',
    token: token,
  };
};
export const addUserName = (userName, userPhone) => {
  // console.log('user name redux--' + userName);
  return {
    type: 'ADD_USER_NAME',
    userName: userName,
    userPhone: userPhone,
  };
};

export const addUserCategory = catUser => {
  // console.log('user catUser redux--' + catUser);
  return {
    type: 'ADD_USER_CATEGORY',
    catUser: catUser,
  };
};

export const addUserData = (providerToken, providerPhone, providerEmail) => {
  // console.log('user user Data redux--' + providerEmail);
  return {
    type: 'ADD_USER_DATA',
    providerToken: providerToken,
    providerPhone: providerPhone,
    providerEmail: providerEmail,
  };
};

export const addOperatorVerification = verifyOp => {
  // console.log('verifyOp redux--' + verifyOp);
  return {
    type: 'ADD_VERIFY_OPERATOR',
    verifyOp: verifyOp,
  };
};

export const addScreenName = screen => {
  // console.log('screen redux--' + screen);
  return {
    type: 'ADD_SCREEN_NAME',
    screen: screen,
  };
};

export const addVirtualHomeLiveLoc = (
  currentLiveLatVirtual,
  currentLiveLogVirtual,
) => {
  // console.log(
  //   'addVirtualHomeLiveLoc redux-----' + currentLiveLatVirtual,
  //   currentLiveLogVirtual,
  // );
  return {
    type: 'ADD_VIRTUAL_LIVE_LOCATION',
    currentLiveLatVirtual: currentLiveLatVirtual,
    currentLiveLogVirtual: currentLiveLogVirtual,
  };
};
export const addVirtualLocTxt = virtualLocTxt => {
  // console.log('virtualLocTxt redux--' + virtualLocTxt, );
  return {
    type: 'ADD_Virtual_LOCATION_TXT',
    virtualLocTxt: virtualLocTxt,
  };
};
export const saveSOSPic1 = userSelfie => {
  // console.log('saveSOSPics redux--' + userSelfie, );
  return {
    type: 'USER_SOS_PIC1',
    userSelfie: userSelfie,
  };
};
export const saveSOSPic2 = userVehicle => {
  // console.log('saveSOSPics redux--' + userVehicle, );
  return {
    type: 'USER_SOS_PIC2',
    userVehicle: userVehicle,
  };
};

export const addUsePhone = userPhoneP => {
  // console.log('user user userPhoneP redux--' + userPhoneP);
  return {
    type: 'ADD_USER_PHONE',
    userPhoneP: userPhoneP,
  };
};

export const addUseMail = userMailP => {
  // console.log('user  userMailP redux--' + userMailP);
  return {
    type: 'ADD_USER_MAIL',
    userMailP: userMailP,
  };
};

export const setLastPressedTime = (vehicleNumber, currentTime) => {
  return {
    type: 'SET_LAST_PRESSED_TIME',
    vehicleNumber: vehicleNumber,
    currentTime: currentTime,
  };
};

export const isModalOpen = modalOpen => {
  return {
    type: 'IS_OPEN_MODAL',
    modalOpen: modalOpen,
  };
};

export const isModalOpenRate = modalOpenRate => {
  // console.log(modalOpenRate);
  return {
    type: 'IS_OPEN_MODAL_RATE',
    modalOpenRate: modalOpenRate,
  };
};

export const addCountryName = countryName => {
  return {
    type: 'COUNTRY_NAME',
    countryName: countryName,
  };
};
export const updateCurrentUserHour = (userHour, enteredTimeUser) => {
  return {
    type: 'USER_HOUR',
    userHour: userHour,
    enteredTimeUser: enteredTimeUser,
  };
};
export const addApppFirstDate = appFirstOpenDate => {
  return {
    type: 'APP_FIRST_DATE',
    appFirstOpenDate: appFirstOpenDate,
  };
};

export const addNotinData = notiPhone => {
  return {
    type: 'ADD_NOTI_DATA',
    notiPhone: notiPhone,
  };
};
