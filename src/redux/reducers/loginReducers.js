import * as types from '../actions';

const initializeState = {
  username: '',
}

export default function loginReducers  (state = initializeState, actions) {
  const { payload } = actions;
  switch (actions.type) {
    case types.LOG_IN:
      return { ...state, username: payload };
      break;
    case types.LOG_OUT:
      return { ...state, username: '' };
      break;
    default:
      return state;
      break;
  }
}