import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import * as actions from "../actions";

export function* fetchUserDataSaga(action) {
  yield put(actions.fetchUserDataStart());
  const queryParams = "?auth=" + action.token;
  try {
    const response = yield axios.get(`/user/${action.userId}.json/` + queryParams);
    const fetchedUserData = [];
    for (let key in response.data) {
      fetchedUserData.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.fetchUserDataSuccess(fetchedUserData));
  } catch (error) {
    yield put(actions.fetchUserDataFail(error));
  }
}

export function* postUserDataSaga(action) {
  yield put(actions.postUserDataStart());
  try {
    yield axios.post(`/user/${action.userId}.json?auth=` + action.token, action.userData);
    yield put(actions.fetchUserData(action.token, action.userId))
    yield put(actions.postUserDataSuccess());

  } catch (error) {
    yield put(actions.postUserDataFailed(error));
  }
}

export function* removeUserCardSaga(action) {
  yield put(actions.removeUserCardStart());
  try {
    yield axios.delete(`/user/${action.url}.json?auth=` + action.token, action.userData);
    yield put(actions.fetchUserData(action.token, action.userId))
    yield put(actions.removeUserCardSuccess());

  } catch (error) {
    yield put(actions.removeUserCardFailed(error));
  }
}

export function* updateUserCardSaga(action) {
  yield put(actions.updateUserCardStart());
  try {
    yield axios.patch(`/user/${action.url}.json?auth=` + action.token, action.dataItem);
    yield put(actions.fetchUserData(action.token, action.userId))
    yield put(actions.updateUserCardSuccess(action));

  } catch (error) {
    yield put(actions.updateUserCardFailed(error));
  }
}