import { combineReducers } from 'redux';
import isAuth from './isAuthReducer';
import userData from './userDataReducer';
import flightsData from './flightsReducer';

const rootReducer = combineReducers({
  isAuth,
  userData,
  flightsData,
});

export default rootReducer;
