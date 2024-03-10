import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import societySaga from "./society/saga";

export default function* rootSaga() {
  yield all([authSaga(), societySaga()]);
}
