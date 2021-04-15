import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import { fetchDefaultDataSaga } from "./defaultData";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";

import { fetchUserDataSaga, postUserDataSaga,
  updateUserCardSaga, removeUserCardSaga } from "./user";


export function* watchDefaultData() {
  yield takeEvery(actionTypes.FETCH_DEFAULT_DATA, fetchDefaultDataSaga);
}


export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}


export function* watchUser() {
  yield takeEvery(actionTypes.POST_USER_DATA, postUserDataSaga);
  yield takeEvery(actionTypes.FETCH_USER_DATA, fetchUserDataSaga);
  yield takeEvery(actionTypes.UPDATE_USER_CARD, updateUserCardSaga);
  yield takeEvery(actionTypes.REMOVE_USER_CARD, removeUserCardSaga);
}
