import {store} from './../Redux/Store/store';
import {
  addDestinationLocation,
  addNotinData,
  addScreenName,
} from './../Redux/Action/actions';
import {
  useNavigation as useReactNavigation,
  StackActions,
} from '@react-navigation/native';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(routeName) {
  _navigator.dispatch(StackActions.replace(routeName));
}

export function useNavigation() {
  return useReactNavigation();
}

export function dispatchSomeAction(data) {
  const action = addDestinationLocation(data.lat, data.lng);
  store.dispatch(action);
}

export function dispatchScreen(data) {
  const action = addScreenName(data);
  store.dispatch(action);
}
export function dispatchNotinData(data) {
  const action = addNotinData(data);
  store.dispatch(action);
}
