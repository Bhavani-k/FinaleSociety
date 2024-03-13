import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { SIGN_IN, SIGN_UP, SIGN_OUT } from "./actionTypes";

import {
  signUpFailure,
  signUpSuccess,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
} from "./actions";
import { fetchData, postData } from "../../utils/Api";

function* signUpFun(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    const response = yield call(postData, "signup", payload);
    console.log(response);
    if (response != undefined) {
      yield put(signUpSuccess(response));
    } else {
      yield put(signUpFailure(response));
    }
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

function* signInFun(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    const response = yield call(postData, "login", payload);
    console.log(response);
    if (response != undefined) {
      yield put(signInSuccess(response));
    } else {
      yield put(signInFailure(response));
    }
  } catch (err) {
    yield put(signInFailure(err));
  }
}

function* signOutFun(action) {
  const payload = action.payload;
  console.log(payload);
  console.log(">>>>>>>>.");
  try {
    const response = yield call(fetchData, "logout", payload);
    console.log(response);
    if (response != undefined) {
      yield put(signOutSuccess(response));
    } else {
      yield put(signOutFailure(response));
    }
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

export function* watchSignUp() {
  yield takeEvery(SIGN_UP, signUpFun);
}

export function* watchSignIn() {
  yield takeEvery(SIGN_IN, signInFun);
}
export function* watchSignOut() {
  yield takeEvery(SIGN_OUT, signOutFun);
}

function* authSaga() {
  yield all([fork(watchSignUp), fork(watchSignIn), fork(watchSignOut)]);
}

export default authSaga;
