import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import { initDefaultDataSaga, postDefaultDataSaga } from "./defaultData";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";

import { fetchPrivateDataSaga } from "./privateData";


export function* watchDefaultData() {
  yield takeEvery(actionTypes.INIT_DEFAULT_DATA, initDefaultDataSaga);
  yield takeEvery(actionTypes.POST_DEFAULT_DATA, postDefaultDataSaga);
}


export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}


export function* watchPrivateData() {
  yield takeEvery(actionTypes.FETCH_PRIVATE_DATA, fetchPrivateDataSaga);
}
