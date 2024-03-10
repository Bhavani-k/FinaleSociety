import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  CREATE_SOCIETY,
  CREATE_FAMILY,
  UPDATE_FAMILY,
  GET_ALL_FAMILIES,
  GET_ALL_USER_EMAILS,
  GET_ONE_FAMILY,
} from "./actionTypes";

import {
  createSocietyFailure,
  createSocietySuccess,
  createFamilyFailure,
  createFamilySuccess,
  updateFamilyFailure,
  updateFamilySuccess,
  getAllFamiliesFailure,
  getAllFamiliesSuccess,
  getAllUserEmailsFailure,
  getAllUserEmailsSuccess,
  getOneFamilyFailure,
  getOneFamilySuccess,
} from "./actions";
import { postData, putData, fetchData } from "../../utils/Api";

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
function* createFamilyFun(action) {
  const payload = action.payload;
  try {
    const response = yield call(postData, "createFamily", payload);
    if (response !== undefined) {
      yield put(createFamilySuccess(response));
    } else {
      yield put(createFamilyFailure(response));
    }
  } catch (err) {
    yield put(createFamilyFailure(err));
  }
}
function* updateFamilyFun(action) {
  const payload = action.payload;
  try {
    const response = yield call(
      putData,
      `updateFamily/${payload.id}`,
      payload.data
    );
    if (response !== undefined) {
      yield put(updateFamilySuccess(response));
    } else {
      yield put(updateFamilyFailure(response));
    }
  } catch (err) {
    yield put(updateFamilyFailure(err));
  }
} // Saga for getting all families
function* getAllFamiliesFun(action) {
  const payload = action.payload;
  try {
    const response = yield call(
      fetchData,
      `getAllFamiliesOfSociety/${payload.id}`,
      payload
    );
    if (response !== undefined) {
      yield put(getAllFamiliesSuccess(response));
    } else {
      yield put(getAllFamiliesFailure(response));
    }
  } catch (err) {
    yield put(getAllFamiliesFailure(err));
  }
}
// Saga for getting all user emails
function* getAllUserEmailsFun(action) {
  const payload = action.payload;
  try {
    const response = yield call(fetchData, "getAllUserEmails", payload);
    if (response !== undefined) {
      yield put(getAllUserEmailsSuccess(response));
    } else {
      yield put(getAllUserEmailsFailure(response));
    }
  } catch (err) {
    yield put(getAllUserEmailsFailure(err));
  }
}
// Saga for getting one family
function* getOneFamilyFun(action) {
  const payload = action.payload;
  try {
    const response = yield call(
      fetchData,
      `getOneFamily/${payload.id}`,
      payload
    );
    if (response !== undefined) {
      yield put(getOneFamilySuccess(response));
    } else {
      yield put(getOneFamilyFailure(response));
    }
  } catch (err) {
    yield put(getOneFamilyFailure(err));
  }
}
export function* watchCreateSociety() {
  yield takeEvery(CREATE_SOCIETY, createSocietyFun);
}
export function* watchCreateFamily() {
  yield takeEvery(CREATE_FAMILY, createFamilyFun);
}

export function* watchUpdateFamily() {
  yield takeEvery(UPDATE_FAMILY, updateFamilyFun);
}

export function* watchGetAllFamilies() {
  yield takeEvery(GET_ALL_FAMILIES, getAllFamiliesFun);
}

export function* watchGetAllUserEmails() {
  yield takeEvery(GET_ALL_USER_EMAILS, getAllUserEmailsFun);
}

export function* watchGetOneFamily() {
  yield takeEvery(GET_ONE_FAMILY, getOneFamilyFun);
}

function* societySaga() {
  yield all([
    fork(watchCreateSociety),
    fork(watchCreateSociety),
    fork(watchCreateFamily),
    fork(watchUpdateFamily),
    fork(watchGetAllFamilies),
    fork(watchGetAllUserEmails),
    fork(watchGetOneFamily),
  ]);
}

export default societySaga;
