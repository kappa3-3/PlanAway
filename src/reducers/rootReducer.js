import { combineReducers } from 'redux';
import isAuthReducer from './isAuthReducer';

const rootReducer = combineReducers({
  isAuthReducer,
});

export default rootReducer;
