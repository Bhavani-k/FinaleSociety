import {
  CREATE_SOCIETY,
  CREATE_SOCIETY_INIT,
  CREATE_SOCIETY_SUCCESS,
  CREATE_SOCIETY_FAILURE,
} from "./actionTypes";

const initialState = {
  societyDetails: null,
  createSocietySuccess: false,
  createSocietyFailure: false,
  createSocietyError: null,
};

const societyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SOCIETY:
      console.log(action.payload);
      return {
        ...state,
        societyDetails: null,
        createSocietySuccess: false,
        createSocietyFailure: false,
      };
    case CREATE_SOCIETY_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        societyDetails: action.payload,
        createSocietySuccess: true,
        createSocietyFailure: false,
      };
    case CREATE_SOCIETY_FAILURE:
      return {
        ...state,
        createSocietyError: action.payload,
        createSocietySuccess: false,
        createSocietyFailure: true,
      };
    case CREATE_SOCIETY_INIT:
      return {
        ...state,
        createSocietyError: null,
        createSocietySuccess: false,
        createSocietyFailure: false,
        societyDetails: null,
      };
    default:
      return state;
  }
};

export default societyReducer;
