import { put, takeLatest } from 'redux-saga/effects';
import { init, complete, fail } from './slice';
import { init as i18nInit } from '../i18n/slice';

function* initTask() {
  try {
    /****초기화 로직 추가***/

    yield put(i18nInit());

    /**********************/
    yield put(complete());
  } catch (_) {
    yield put(fail());
  }
}

export default function* watch() {
  yield takeLatest(init, initTask);
}
