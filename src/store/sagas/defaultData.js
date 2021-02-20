import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions";

export function* fetchDefaultDataSaga(action) {
  yield put(actions.fetchDefaultDataStart());

  try {
    const response = yield axios.get(
      "/defaultData.json"
    );
    yield put(actions.fetchDefaultDataSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchDefaultDataFail());
  }
}