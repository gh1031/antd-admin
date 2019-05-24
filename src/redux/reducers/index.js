import { combineReducers } from 'redux';
import dashboardReducers from './dashboardReducers';
import userReducers from './userReducers';
import loginReducers from './loginReducers';

export default combineReducers({
  dashboard: dashboardReducers,
  login: loginReducers,
  user: userReducers,
});