// AuthReducer.js
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
} from "./actionTypes";

const initialState = {
  userDetails: null,
  signUpSuccess: false,
  signUpFailure: false,
  signUpError: null,
  signInSuccess: false,
  signInFailure: false,
  signInError: null,
  signOutSuccess: false,
  signOutFailure: false,
  signOutError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        userDetails: null,
        signUpSuccess: false,
        signUpFailure: false,
      };
    case SIGN_UP_SUCCESS:
      console.log(action.payload);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userDetails: action.payload,
        signUpSuccess: true,
        signUpFailure: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: action.payload,
        signUpSuccess: false,
        signUpFailure: true,
      };
    case SIGN_UP_INIT:
      return {
        ...state,
        signUpError: null,
        signUpSuccess: false,
        signUpFailure: false,
        userDetails: null,
      };

    case SIGN_IN:
      return {
        ...state,
        userDetails: null,
        signInSuccess: false,
        signInFailure: false,
      };
    case SIGN_IN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userDetails: action.payload,
        signInSuccess: true,
        signInFailure: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        signInError: action.payload,
        signInSuccess: false,
        signInFailure: true,
      };
    case SIGN_IN_INIT:
      return {
        ...state,
        signInError: null,
        signInSuccess: false,
        signInFailure: false,
        userDetails: null,
      };

    case SIGN_OUT:
      console.log(">>>>>>>>>>>>>");
      return {
        ...state,
        signOutSuccess: false,
        signOutFailure: false,
      };
    case SIGN_OUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        userDetails: null,
        signOutSuccess: true,
        signOutFailure: false,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        signOutError: action.payload,
        signOutSuccess: false,
        signOutFailure: true,
      };
    case SIGN_OUT_INIT:
      return {
        ...state,
        signOutError: null,
        signOutSuccess: false,
        signOutFailure: false,
      };

    default:
      return state;
  }
};

export default authReducer;
