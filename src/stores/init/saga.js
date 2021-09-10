import { all, put, call, takeLatest } from 'redux-saga/effects';
import { init, idle, complete } from './slice';
import { init as stackInit, save } from '../history/slice';
import { SessionStorage } from 'libs/storage';

import { STACK_NAME } from 'libs/history/history';

function* historyInit() {
  yield put(stackInit(SessionStorage.get(STACK_NAME) || ['/']));
  yield put(save(SessionStorage.get(STACK_NAME) || ['/']));
}

function* initTask() {
  yield call(historyInit);
  yield put(complete());
  yield put(idle());
}

export default function* watch() {
  yield all([takeLatest(init, initTask)]);
}
