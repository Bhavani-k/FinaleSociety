import {
  CREATE_SOCIETY,
  CREATE_SOCIETY_INIT,
  CREATE_SOCIETY_SUCCESS,
  CREATE_SOCIETY_FAILURE,
  GET_ALL_USER_EMAILS,
  GET_ALL_USER_EMAILS_INIT,
  GET_ALL_USER_EMAILS_SUCCESS,
  GET_ALL_USER_EMAILS_FAILURE,
  CREATE_FAMILY,
  CREATE_FAMILY_INIT,
  CREATE_FAMILY_SUCCESS,
  CREATE_FAMILY_FAILURE,
  UPDATE_FAMILY,
  UPDATE_FAMILY_INIT,
  UPDATE_FAMILY_SUCCESS,
  UPDATE_FAMILY_FAILURE,
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_INIT,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
  UPDATE_ACTIVITY,
  UPDATE_ACTIVITY_INIT,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAILURE,
  GET_ALL_FAMILIES,
  GET_ALL_FAMILIES_INIT,
  GET_ALL_FAMILIES_SUCCESS,
  GET_ALL_FAMILIES_FAILURE,
  GET_ONE_FAMILY,
  GET_ONE_FAMILY_INIT,
  GET_ONE_FAMILY_SUCCESS,
  GET_ONE_FAMILY_FAILURE,
  GET_ALL_ACTIVITIES,
  GET_ALL_ACTIVITIES_INIT,
  GET_ALL_ACTIVITIES_SUCCESS,
  GET_ALL_ACTIVITIES_FAILURE,
  GET_ONE_ACTIVITY,
  GET_ONE_ACTIVITY_INIT,
  GET_ONE_ACTIVITY_SUCCESS,
  GET_ONE_ACTIVITY_FAILURE,
} from "./actionTypes";

export const createSociety = (data) => ({
  type: CREATE_SOCIETY,
  payload: data,
});

export const createSocietyInit = () => ({
  type: CREATE_SOCIETY_INIT,
});

export const createSocietySuccess = (data) => ({
  type: CREATE_SOCIETY_SUCCESS,
  payload: data,
});

export const createSocietyFailure = (error) => ({
  type: CREATE_SOCIETY_FAILURE,
  payload: error,
});

export const getAllUserEmails = (data) => ({
  type: GET_ALL_USER_EMAILS,
  payload: data,
});

export const getAllUserEmailsInit = () => ({
  type: GET_ALL_USER_EMAILS_INIT,
});

export const getAllUserEmailsSuccess = (data) => ({
  type: GET_ALL_USER_EMAILS_SUCCESS,
  payload: data,
});

export const getAllUserEmailsFailure = (error) => ({
  type: GET_ALL_USER_EMAILS_FAILURE,
  payload: error,
});

// Action creators for CREATE_FAMILY
export const createFamily = (data) => ({
  type: CREATE_FAMILY,
  payload: data,
});

export const createFamilyInit = (data) => ({
  type: CREATE_FAMILY_INIT,
  payload: data,
});

export const createFamilySuccess = (data) => ({
  type: CREATE_FAMILY_SUCCESS,
  payload: data,
});

export const createFamilyFailure = (data) => ({
  type: CREATE_FAMILY_FAILURE,
  payload: data,
});

// Action creators for UPDATE_FAMILY
export const updateFamily = (data) => ({
  type: UPDATE_FAMILY,
  payload: data,
});

export const updateFamilyInit = (data) => ({
  type: UPDATE_FAMILY_INIT,
  payload: data,
});

export const updateFamilySuccess = (data) => ({
  type: UPDATE_FAMILY_SUCCESS,
  payload: data,
});

export const updateFamilyFailure = (data) => ({
  type: UPDATE_FAMILY_FAILURE,
  payload: data,
});

// Action creators for CREATE_ACTIVITY
export const createActivity = (data) => ({
  type: CREATE_ACTIVITY,
  payload: data,
});

export const createActivityInit = (data) => ({
  type: CREATE_ACTIVITY_INIT,
  payload: data,
});

export const createActivitySuccess = (data) => ({
  type: CREATE_ACTIVITY_SUCCESS,
  payload: data,
});

export const createActivityFailure = (data) => ({
  type: CREATE_ACTIVITY_FAILURE,
  payload: data,
});

// Action creators for UPDATE_ACTIVITY
export const updateActivity = (data) => ({
  type: UPDATE_ACTIVITY,
  payload: data,
});

export const updateActivityInit = (data) => ({
  type: UPDATE_ACTIVITY_INIT,
  payload: data,
});

export const updateActivitySuccess = (data) => ({
  type: UPDATE_ACTIVITY_SUCCESS,
  payload: data,
});

export const updateActivityFailure = (data) => ({
  type: UPDATE_ACTIVITY_FAILURE,
  payload: data,
});

// Action creators for GET_ALL_FAMILIES
export const getAllFamilies = (data) => ({
  type: GET_ALL_FAMILIES,
  payload: data,
});

export const getAllFamiliesInit = (data) => ({
  type: GET_ALL_FAMILIES_INIT,
  payload: data,
});

export const getAllFamiliesSuccess = (data) => ({
  type: GET_ALL_FAMILIES_SUCCESS,
  payload: data,
});

export const getAllFamiliesFailure = (data) => ({
  type: GET_ALL_FAMILIES_FAILURE,
  payload: data,
});

// Action creators for GET_ONE_FAMILY
export const getOneFamily = (data) => ({
  type: GET_ONE_FAMILY,
  payload: data,
});

export const getOneFamilyInit = (data) => ({
  type: GET_ONE_FAMILY_INIT,
  payload: data,
});

export const getOneFamilySuccess = (data) => ({
  type: GET_ONE_FAMILY_SUCCESS,
  payload: data,
});

export const getOneFamilyFailure = (data) => ({
  type: GET_ONE_FAMILY_FAILURE,
  payload: data,
});

// Action creators for GET_ALL_ACTIVITIES
export const getAllActivities = (data) => ({
  type: GET_ALL_ACTIVITIES,
  payload: data,
});

export const getAllActivitiesInit = (data) => ({
  type: GET_ALL_ACTIVITIES_INIT,
  payload: data,
});

export const getAllActivitiesSuccess = (data) => ({
  type: GET_ALL_ACTIVITIES_SUCCESS,
  payload: data,
});

export const getAllActivitiesFailure = (data) => ({
  type: GET_ALL_ACTIVITIES_FAILURE,
  payload: data,
});

// Action creators for GET_ONE_ACTIVITY
export const getOneActivity = (data) => ({
  type: GET_ONE_ACTIVITY,
  payload: data,
});

export const getOneActivityInit = (data) => ({
  type: GET_ONE_ACTIVITY_INIT,
  payload: data,
});

export const getOneActivitySuccess = (data) => ({
  type: GET_ONE_ACTIVITY_SUCCESS,
  payload: data,
});

export const getOneActivityFailure = (data) => ({
  type: GET_ONE_ACTIVITY_FAILURE,
  payload: data,
});
