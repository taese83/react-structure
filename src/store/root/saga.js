import { all, takeLatest, takeEvery } from "redux-saga/effects";
import { init, webAction, complete } from "./slice";

function* initTask(actions) {
  yield put({ type: complete });
}
function* webActionTask(actions) {}

export default function* watch() {
  yield all([takeLatest(init, initTask), takeEvery(webAction, webActionTask)]);
}
