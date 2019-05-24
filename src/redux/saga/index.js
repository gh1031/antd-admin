import { call, put, all, fork } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import * as Api from '../../service/api';

export function * getDashboardData() {
  const data = yield call(Api.dashboardData);
  yield put({
    type: 'GET_DASHBOARD_DATA',
    payload: data.dashboard,
  })
}

export function* getUserList() {
  const data = yield call(Api.userList);
  yield put({
    type: 'GET_USER_LIST',
    payload: data,
  })
}


export default function * rootSaga() {
  yield all([fork(getDashboardData), fork(getUserList)])
}