import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { CREATE_SOCIETY } from "./actionTypes";

import { createSocietyFailure, createSocietySuccess } from "./actions";
import { postData } from "../../utils/Api";

// Saga for creating a society
function* createSocietyFun(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    const response = yield call(postData, "createSociety", payload);
    console.log(response);
    if (response !== undefined) {
      yield put(createSocietySuccess(response));
    } else {
      yield put(createSocietyFailure(response));
    }
  } catch (err) {
    yield put(createSocietyFailure(err));
  }
}

export function* watchCreateSociety() {
  yield takeEvery(CREATE_SOCIETY, createSocietyFun);
}

function* societySaga() {
  yield all([fork(watchCreateSociety)]);
}

export default societySaga;
