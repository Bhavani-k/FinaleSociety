import { combineReducers } from "redux";

import authReducer from "./auth/reducers";
import societyReducer from "./society/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  society: societyReducer,
});

export default rootReducer;
