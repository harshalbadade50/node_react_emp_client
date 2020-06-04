import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer.js';
import loginReducer from './loginReducer.js';
import reviewListReducer from './reviewListReducer.js';

export default combineReducers({
    employeeReducer,
    loginReducer,
    reviewListReducer
});