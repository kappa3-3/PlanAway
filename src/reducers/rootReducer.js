import { combineReducers } from 'redux';
import isAuth from './isAuthReducer';
import userData from './userDataReducer';
import flights from './FlightsReducer';

const rootReducer = combineReducers({
  isAuth,
  userData,
  flights,
});

export default rootReducer;
