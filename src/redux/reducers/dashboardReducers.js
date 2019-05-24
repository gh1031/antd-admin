import * as types from '../actions';

const initialState = {
  numbers: [],
  recentSales: [],
  sales: [],
  comments: [],
  completed: [],
  user: {},
  quote: {},
  browser: [],
  cpu: [],
}

export default function dashboardReducers (state = initialState, action) {
  const { payload } = action;
  switch(action.type) {
    case types.GET_DASHBOARD_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
}