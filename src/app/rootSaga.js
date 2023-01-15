import routerSaga from "../sagas/routerSaga";
import requstListSaga from "../sagas/requestListSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([routerSaga(), requstListSaga()]);
}
