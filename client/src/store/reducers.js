import { combineReducers } from "redux";

import authReducer from "./auth/Reducers";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
