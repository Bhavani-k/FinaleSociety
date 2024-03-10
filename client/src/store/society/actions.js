import {
  CREATE_SOCIETY,
  CREATE_SOCIETY_INIT,
  CREATE_SOCIETY_SUCCESS,
  CREATE_SOCIETY_FAILURE,
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
