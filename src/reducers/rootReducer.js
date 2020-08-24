import { combineReducers } from 'redux';
import isAuth from './isAuthReducer';
import userData from './userDataReducer';
import flightsData from './flightsReducer';
import tripsData from './tripsReducer';

const rootReducer = combineReducers({
  isAuth,
  userData,
  flightsData,
  tripsData,
});

export default rootReducer;
