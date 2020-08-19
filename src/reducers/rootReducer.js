import { combineReducers } from 'redux';
import isAuth from './isAuthReducer';
import userDataReducer from './userDataReducer';

const rootReducer = combineReducers({
  isAuth,
  userDataReducer,
});

export default rootReducer;
