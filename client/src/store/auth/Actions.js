import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_INIT,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_INIT,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_INIT,
} from "./ActionTypes";

export const signUp = (data) => ({
  type: SIGN_UP,
  payload: data,
});

export const signUpSuccess = (data) => ({
  type: SIGN_UP_SUCCESS,
  payload: data,
});
export const signUpFailure = (data) => ({
  type: SIGN_UP_FAILURE,
  payload: data,
});
export const signUpInit = (data) => ({
  type: SIGN_UP_INIT,
  payload: data,
});

export const signIn = (data) => ({
  type: SIGN_IN,
  payload: data,
});

export const signInSuccess = (data) => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
});

export const signInFailure = (data) => ({
  type: SIGN_IN_FAILURE,
  payload: data,
});

export const signInInit = (data) => ({
  type: SIGN_IN_INIT,
  payload: data,
});
export const signOut = (data) => ({
  type: SIGN_OUT,
  payload: data,
});

export const signOutSuccess = (data) => ({
  type: SIGN_OUT_SUCCESS,
  payload: data,
});

export const signOutFailure = (data) => ({
  type: SIGN_OUT_FAILURE,
  payload: data,
});

export const signOutInit = (data) => ({
  type: SIGN_OUT_INIT,
  payload: data,
});
