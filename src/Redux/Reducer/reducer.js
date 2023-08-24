const initialState = {
  userId: '',
  userObjectKey: '',
  workerName: '',
  workerDistance: '',
  workerPhoneNumber: '',
  workerLocation: '',
  workerImage: '',
  workerLat: '',
  workerLong: '',
  currentLat: '',
  countryName: '',
  currentLong: '',
  destLat: '',
  notiPhone: '',
  destLong: '',
  currentLatTxt: '',
  destLocTxt: '',
  switchBool: false,
  currentLiveLat: '',
  currentLiveLong: '',
  tripStop: true,
  tripResume: false,
  operatorType: '',
  operatorTypeWorker: '',
  userImg: '',
  picBtn: 0,
  token: '',
  userName: '',
  userPhone: '',
  catUser: '',
  providerToken: '',
  providerPhone: '',
  providerEmail: '',
  regDone: false,
  verifyOp: false,
  screen: '',
  currentLiveLatVirtual: '',
  currentLiveLogVirtual: '',
  virtualLocTxt: '',
  userSelfie: '',
  userPhoneP: '',
  userVehicle: '',
  userMailP: '',
  lastPressedTimes: {},
  modalOpen: false,
  userHour: '',
  enteredTimeUser: '',
  modalOpenRate: false,
  appFirstOpenDate: '',
  heading: 0,
};
export const allReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_ID':
      return {
        ...state,
        userId: action.userId,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        userId: null,
      };
    case 'LIVE_LOC':
      return {
        ...state,
        switchBool: action.switchBool,
      };
    case 'ADD_USER_OBJECT_ID':
      return {
        ...state,
        userObjectKey: action.userObjectKey,
        userImg: action.userImg,
      };
    case 'ADD_CURRENT_LIVE_LOCATION':
      return {
        ...state,
        currentLiveLat: action.currentLiveLat,
        currentLiveLong: action.currentLiveLong,
        heading: action.heading,
      };
    case 'ADD_ITEM_PROP':
      return {
        ...state,
        workerName: action.workerName,
        workerDistance: action.workerDistance,
        workerPhoneNumber: action.workerPhoneNumber,
        workerLocation: action.workerLocation,
        workerImage: action.workerImage,
        workerLat: action.workerLat,
        workerLong: action.workerLong,
      };
    case 'ADD_CURRENT_LOCATION':
      return {
        ...state,
        currentLat: action.currentLat,
        currentLong: action.currentLong,
      };
    case 'ADD_DESTINATION_LOCATION':
      return {
        ...state,
        destLat: action.destLat,
        destLong: action.destLong,
      };
    case 'ADD_CURRENT_LOCATION_TXT':
      return {
        ...state,
        currentLocTxt: action.currentLocTxt,
      };
    case 'ADD_DESTINATION_LOCATION_TXT':
      return {
        ...state,
        destLocTxt: action.destLocTxt,
      };
    case 'STOP_TRIP':
      return {
        ...state,
        tripStop: action.tripStop,
        tripResume: action.tripResume,
      };
    case 'RESUME_TRIP':
      return {
        ...state,
        tripStop: action.tripStop,
        tripResume: action.tripResume,
      };
    case 'OPERATOR_TYPE':
      return {
        ...state,
        operatorType: action.operatorType,
      };
    case 'PICK_BTN':
      return {
        ...state,
        picBtn: action.picBtn,
      };
    case 'ADD_DEVICE_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'ADD_USER_NAME':
      return {
        ...state,
        userName: action.userName,
        userPhone: action.userPhone,
      };
    case 'ADD_USER_CATEGORY':
      return {
        ...state,
        catUser: action.catUser,
      };
    case 'ADD_USER_DATA':
      return {
        ...state,
        providerToken: action.providerToken,
        providerPhone: action.providerPhone,
        providerEmail: action.providerEmail,
      };
    case 'OPERATOR_TYPE_WORKER':
      return {
        ...state,
        operatorTypeWorker: action.operatorTypeWorker,
        regDone: action.regDone,
      };
    case 'ADD_VERIFY_OPERATOR':
      return {
        ...state,
        verifyOp: action.verifyOp,
      };
    case 'ADD_SCREEN_NAME':
      return {
        ...state,
        screen: action.screen,
      };
    case 'ADD_VIRTUAL_LIVE_LOCATION':
      return {
        ...state,
        currentLiveLatVirtual: action.currentLiveLatVirtual,
        currentLiveLogVirtual: action.currentLiveLogVirtual,
      };
    case 'ADD_Virtual_LOCATION_TXT':
      return {
        ...state,
        virtualLocTxt: action.virtualLocTxt,
      };

    case 'USER_SOS_PIC1':
      return {
        ...state,
        userSelfie: action.userSelfie,
      };
    case 'USER_SOS_PIC2':
      return {
        ...state,
        userVehicle: action.userVehicle,
      };
    case 'ADD_USER_PHONE':
      return {
        ...state,
        userPhoneP: action.userPhoneP,
      };
    case 'ADD_USER_MAIL':
      return {
        ...state,
        userMailP: action.userMailP,
      };

    case 'SET_LAST_PRESSED_TIME':
      return {
        ...state,
        lastPressedTimes: {
          ...state.lastPressedTimes,
          [action.vehicleNumber]: action.currentTime,
        },
      };
    case 'IS_OPEN_MODAL':
      return {
        ...state,
        modalOpen: action.modalOpen,
      };

    case 'COUNTRY_NAME':
      return {
        ...state,
        countryName: action.countryName,
      };
    case 'USER_HOUR':
      return {
        ...state,
        userHour: action.userHour,
        enteredTimeUser: action.enteredTimeUser,
      };
    case 'IS_OPEN_MODAL_RATE':
      return {
        ...state,
        modalOpenRate: action.modalOpenRate,
      };
    case 'IS_OPEN_MODAL_RATE':
      return {
        ...state,
        appFirstOpenDate: action.appFirstOpenDate,
      };
    case 'ADD_NOTI_DATA':
      return {
        ...state,
        notiPhone: action.notiPhone,
      };
  }
  return state;
};
export default allReducer;
