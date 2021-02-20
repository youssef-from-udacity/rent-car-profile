import { delay } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";
import { updateObject } from "../../shared/utility";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrfLrtiaaBbeoYf4qM8LheYrU28msr09A';
  if (!action.isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrfLrtiaaBbeoYf4qM8LheYrU28msr09A';
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    if (action.isSignup) {
      //yield put(actions.fetchDefaultData());
      const dataToPost = action.defaultData.map((obj) => updateObject({ userId: response.data.localId }, obj));

        for (var item of dataToPost) {
          yield put(actions.postUserData(item, response.data.idToken, response.data.localId));
        }
    } else {
      yield put(actions.fetchUserData(response.data.idToken, response.data.localId))
    }
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    
    yield put(actions.checkAuthTimeout(response.data.expiresIn));


  } catch (error) {
    yield put(actions.authFail(error.message));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(actions.fetchUserData(token, userId))

      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
