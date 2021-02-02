import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions";

export function* fetchPrivateDataSaga(action) {
    yield put(actions.fetchPrivateDataStart());
    const queryParams ="?auth=" + action.token ;
    try {
      const response = yield axios.get(`/privateData/${action.userId}.json/` + queryParams);
      const fetchedPrivateData = [];
      for (let key in response.data) {
        fetchedPrivateData.push({
          ...response.data[key],
          id: key
        });
      }
      yield put(actions.fetchPrivateDataSuccess(fetchedPrivateData));
    } catch (error) {
      yield put(actions.fetchPrivateDataFail(error));
    }
  }