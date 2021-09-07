import { all, put, takeLatest } from 'redux-saga/effects';
import { init, idle, complete } from './slice';

function* initTask(actions) {
  yield put(complete());

  //초기화

  yield put(idle());
}

export default function* watch() {
  yield all([takeLatest(init, initTask)]);
}
