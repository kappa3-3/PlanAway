import { combineReducers } from 'redux';
import isAuth from './isAuthReducer';

const rootReducer = combineReducers({
  isAuth,
});

export default rootReducer;
