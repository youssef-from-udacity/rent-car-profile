import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions";

export function* initDefaultDataSaga(action) {
  try {
    const response = yield axios.get(
      "/defaultData.json"
    );
    yield put(actions.setDefaultData(response.data));
  } catch (error) {
    yield put(actions.fetchDefaultDataFailed());
  }
}

export function* postDefaultDataSaga(action) {
  yield put(actions.postDefaultDataStart());
  try {
    yield axios.post(`/privateData/${action.userId}.json?auth=` + action.token, action.privateData);
    yield put(actions.fetchPrivateData(action.token, action.userId))
    yield put(actions.postDefaultDataSuccess());

  } catch (error) {
    yield put(actions.postDefaultDataFailed(error));
  }
}