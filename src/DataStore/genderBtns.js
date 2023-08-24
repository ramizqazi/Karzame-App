import Constraints from '../Constraints/Constraints';
import Forward_Icon from '../assets/WellbeingCheckServices/Forward_Icon';
import Shield from '../assets/WellbeingCheckServices/Shield.svg';
import Home_work from '../assets/WellbeingCheckServices/Home_work.svg';
import Camera from '../assets/SOSAlertSettingDaily/Camera.svg';
import Taxi from '../assets/SOSAlertSettingDaily/Taxi.svg';
import Mail from '../assets/Support/Mail.svg';
import Mobile from '../assets/Support/Mobile.svg';
import WhatsappIconl from '../assets/Support/WhatsappIconl.svg';

export const virtualHomeBtns = [
  {
    key: '0',
    title: Constraints.HOTEL,
    value: 'lodging',
  },
  {
    key: '1',
    title: Constraints.HOME,
    value: 'New',
  },
  {
    key: '2',
    title: Constraints.FRIENDS,
    value: 'New',
  },
  {
    key: '3',
    title: Constraints.PARTY,
    value: 'New',
  },
  {
    key: '4',
    title: Constraints.BRIRIAL_CERMNOY,
    value: 'lodging',
  },
];

export const trainStations = [
  {
    key: '0',
    title: Constraints.LAGOS,
  },
  {
    key: '1',
    title: Constraints.IBANADAN,
  },
  {
    key: '2',
    title: Constraints.KAFANCHAN,
  },
  {
    key: '3',
    title: Constraints.ENUGU,
  },
  {
    key: '4',
    title: Constraints.WARI_ITAKI,
  },
  {
    key: '5',
    title: Constraints.ABUJA,
  },
  {
    key: '6',
    title: Constraints.ZARIA,
  },
  {
    key: '7',
    title: Constraints.BAUCHI,
  },
  {
    key: '8',
    title: Constraints.OGAN,
  },
  {
    key: '9',
    title: Constraints.KADUNA,
  },
];

export const userTransport = [
  {
    key: '0',
    title: Constraints.BUS,
  },
  {
    key: '1',
    title: Constraints.CAR,
  },
];

export const WhistleBlowBtns = [
  {
    key: '0',
    title: Constraints.KIDNAP,
  },
  {
    key: '1',
    title: Constraints.SEARCH_A_HOUSE,
  },
  {
    key: '2',
    title: Constraints.STOP_KILLING,
  },
  {
    key: '3',
    title: Constraints.REPORT_CRIMINAL,
  },
  {
    key: '4',
    title: Constraints.OTHERR,
  },
];
export const userVehicleMaker = [
  {
    key: '0',
    title: Constraints.BUS,
  },
  {
    key: '1',
    title: Constraints.CAR,
  },
];
export const supportBtns = [
  {
    key: '0',
    title: Constraints.WHATSAPP_CONTACT,
    icon: <WhatsappIconl />,
  },
  {
    key: '1',
    title: Constraints.PHONE_NUMBER,
    icon: <Mobile />,
  },
  {
    key: '2',
    title: Constraints.EMAIL,
    icon: <Mail />,
  },
];

export const userVehicleModels = [
  {
    key: '0',
    title: Constraints.BUS,
  },
  {
    key: '1',
    title: Constraints.CAR,
  },
];

export const userFamilymember = [
  {
    key: '0',
    title: Constraints.FAMILY_MEMBER,
  },
  {
    key: '1',
    title: Constraints.BUNINESS,
  },
  {
    key: '2',
    title: Constraints.PARTNER_CLIENT,
  },
  {
    key: '3',
    title: Constraints.FRIEND,
  },
  {
    key: '4',
    title: Constraints.ALONE,
  },
];
export const userGender = [
  {
    key: '0',
    title: Constraints.MALE,
  },
  {
    key: '1',
    title: Constraints.FEMALE,
  },
];

export const SOS_SCREEN_BTNS = [
  {
    key: '0',
    title: Constraints.TAKE_SELFIE,
    subTitile: Constraints.TAKE_PHOTO_IDENTIFICATION,
    icon: <Camera />,
    icon2: <Forward_Icon />,
    uploadType: 'userSelfie',
  },
  {
    key: '1',
    title: Constraints.UPLOAD_VEHICLE,
    subTitile: Constraints.UPLOAD_VEHICLE_PHOTO,
    icon: <Taxi />,
    icon2: <Forward_Icon />,
    uploadType: 'userVehicle',
  },
];

export const WELL_BEING_BTNS = [
  {
    key: '0',
    title: Constraints.VIRTUAL_TRAVEL_GUARD,
    subTitile: Constraints.VTG,
    icon: <Shield />,
    icon2: <Forward_Icon />,
  },
  {
    key: '1',
    title: Constraints.VIRTUAL_HOME_CHECK,
    subTitile: Constraints.VHC,
    icon: <Home_work />,
    icon2: <Forward_Icon />,
  },
];
export const GSMNetworks = [
  {
    key: '0',
    title: Constraints.MTN,
  },
  {
    key: '1',
    title: Constraints.AIRTEL,
  },
  {
    key: '2',
    title: Constraints._9MOBILE,
  },
  {
    key: '3',
    title: Constraints.GLO,
  },
];

export const sosCat = [
  {
    key: '0',
    title: 'Suspected kidnap',
  },
  {
    key: '1',
    title: 'Robbery',
  },
  {
    key: '2',
    title: 'Vandalism',
  },
  {
    key: '3',
    title: 'Snatched Car',
  },
  {
    key: '4',
    title: 'Armed Robbers in my compound',
  },
];

export const sosCatProfile = [
  {
    key: '0',
    title: 'Stop my stolen vehicle',
  },

  {
    key: '2',
    title: 'Stop and search',
  },
];

export const userCat = [
  {
    key: '0',
    title: 'Standard User',
  },
  {
    key: '1',
    title: 'Service Provider',
  },
  {
    key: '2',
    title: 'NYSC Member',
  },
];

export const genderBtns = [
  {
    key: '0',
    title: Constraints.BIOMETRIC,
  },
  {
    key: '1',
    title: Constraints.ENTER_PIN,
  },
];

export const ActiveOrArchivedBtns = [
  {
    key: '0',
    title: Constraints.ACTIVE,
  },
  {
    key: '1',
    title: Constraints.ARCHIVED,
  },
];
export const jobsList = [
  {
    key: '0',
    title: 'I am looking for a piano and music teacher at home for my kids',
    postedTime: 'posted about 5 hours ago',
    location: 'Oran - Bir el djir',
    lengthTitle: '3',
  },
  {
    key: '1',
    title: 'I am looking for a computer teacher at home for my kids',
    postedTime: 'posted about 3 hours ago',
    location: 'Oran - Bir el djir',
    lengthTitle: '5',
  },
];
export const providerInfoList = [
  {
    key: '0',
    title: 'I am looking for a piano and music teacher at home for my kids',
    postedTime: 'posted about 5 hours ago',
    location: 'Oran - Bir el djir',
    lengthTitle: '3',
  },
  {
    key: '1',
    title: 'I am looking for a computer teacher at home for my kids',
    postedTime: 'posted about 3 hours ago',
    location: 'Oran - Bir el djir',
    lengthTitle: '5',
  },
];
export const messageList = [
  {
    key: '0',
    category: 'Plumber',
    ProviderName: 'Abdelhamid',
    msg: 'hello bother so when are you free ?',
  },
  {
    key: '1',
    ProviderName: 'John',
    category: 'Electrition',
    msg: 'hello bother so when are you free ?',
  },
];
export const providerServicesList = [
  {
    key: '0',
    service: 'sink fixing ',
  },
  {
    key: '1',
    service: 'sink fixing',
  },
  {
    key: '2',
    service: 'long service name',
  },
  {
    key: '3',
    service: 'long service name',
  },
  {
    key: '4',
    service: 'sink fixing',
  },
  {
    key: '5',
    service: 'sink fixing',
  },
];
export const PrividerProfileBtns = [
  {
    key: '0',
    title: Constraints.MY_WORK,
  },
  {
    key: '1',
    title: Constraints.MY_REVIEWS,
  },
  {
    key: '2',
    title: Constraints.ABOUT_US,
  },
];

export const dataNotifi = [
  {
    key: '0',
    title: 'Your SOS request has been received',
  },
  {
    key: '1',
    title: 'Your SOS request has been received',
  },
  {
    key: '2',
    title: 'Your SOS request has been received',
  },
];

export const messages = [
  {
    key: '0',
    userId: '0',
    title: 'thank you for accepting my offer',
    time: '09:34',
  },
  {
    key: '1',
    userId: '1',
    title:
      'I have a problem with my sink and i need it to be repared asap since i will be having a party next week',
    time: '09:35',
  },
  {
    key: '2',
    userId: '0',
    title: 'alright, its up to you when should we do it ?',
    time: '09:35',
  },
  {
    key: '3',
    userId: '1',
    title: 'hello bother so when are you free ?',
    time: '09:45',
  },
];
