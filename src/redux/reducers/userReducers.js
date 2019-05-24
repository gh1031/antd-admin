import * as types from '../actions';
const initializeState = {
  list: [],
  total: null,
  options: []
}

export default function userReducers (state = initializeState, action) {
  const { payload } = action;
  switch (action.type) {
    case types.GET_USER_LIST:
      return { ...state, list: payload.data, total: payload.total}
      break;
    case types.GET_ADDRESS_OPTIONS:
      return { ...state, options: payload }
    default:
      return state;
  }
}