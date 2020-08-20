import { combineReducers } from 'redux';
import isAuth from './isAuthReducer';
import userData from './userDataReducer';

const rootReducer = combineReducers({
  isAuth,
  userData,
});

export default rootReducer;
