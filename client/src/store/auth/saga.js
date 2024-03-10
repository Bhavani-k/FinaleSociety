import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { SIGN_IN, SIGN_UP, SIGN_OUT } from "./ActionTypes";

import { signUpFailure, signUpSuccess } from "./Actions";
import { postData } from "../../utils/Api";

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

export function* watchSignUp() {
  yield takeEvery(SIGN_UP, signUpFun);
}

function* authSaga() {
  yield all([fork(watchSignUp)]);
}

export default authSaga;
