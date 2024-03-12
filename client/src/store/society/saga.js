import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  CREATE_SOCIETY,
  CREATE_FAMILY,
  UPDATE_FAMILY,
  GET_ALL_FAMILIES,
  GET_ALL_USER_EMAILS,
  GET_ONE_FAMILY,
  GET_ALL_FAMILY_ACTIVITIES,
  GET_ALL_SOCIETY_ACTIVITIES,
  CREATE_ACTIVITY,
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
  getAllFamilyActivitiesInit,
  getAllFamilyActivitiesSuccess,
  getAllFamilyActivitiesFailure,
  getAllSocietyActivitiesInit,
  getAllSocietyActivitiesSuccess,
  getAllSocietyActivitiesFailure,
  createActivitySuccess,
  createActivityFailure,
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

function* getAllFamilyActivitiesFun(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    yield put(getAllFamilyActivitiesInit());
    const response = yield call(
      fetchData,
      `getAllActivitiesOfFamily/${payload.familyId}`,
      payload
    );
    console.log(response);
    if (response !== undefined) {
      yield put(getAllFamilyActivitiesSuccess(response));
    } else {
      yield put(getAllFamilyActivitiesFailure(response));
    }
  } catch (err) {
    yield put(getAllFamilyActivitiesFailure(err));
  }
}

// Saga for getting all society activities
function* getAllSocietyActivitiesFun(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    yield put(getAllSocietyActivitiesInit());
    const response = yield call(
      fetchData,
      `getAllActivitiesOfSociety/${payload.id}`,
      payload
    );
    console.log(response);
    if (response !== undefined) {
      yield put(getAllSocietyActivitiesSuccess(response));
    } else {
      yield put(getAllSocietyActivitiesFailure(response));
    }
  } catch (err) {
    yield put(getAllSocietyActivitiesFailure(err));
  }
}
function* createActivityFun(action) {
  const payload = action.payload;
  console.log(payload);
  try {
    const response = yield call(postData, "createActivity", payload);
    console.log(response);
    if (response !== undefined) {
      yield put(createActivitySuccess(response));
    } else {
      yield put(createActivityFailure(response));
    }
  } catch (err) {
    yield put(createActivityFailure(err));
  }
}

export function* watchCreateSociety() {
  yield takeEvery(CREATE_SOCIETY, createSocietyFun);
}
export function* watchCreateFamily() {
  yield takeEvery(CREATE_FAMILY, createFamilyFun);
}
export function* watchCreateActivity() {
  yield takeEvery(CREATE_ACTIVITY, createActivityFun);
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

export function* watchGetAllFamilyActivities() {
  yield takeEvery(GET_ALL_FAMILY_ACTIVITIES, getAllFamilyActivitiesFun);
}

export function* watchGetAllSocietyActivities() {
  yield takeEvery(GET_ALL_SOCIETY_ACTIVITIES, getAllSocietyActivitiesFun);
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
    fork(watchGetAllFamilyActivities),
    fork(watchGetAllSocietyActivities),
    fork(watchCreateActivity),
  ]);
}

export default societySaga;
