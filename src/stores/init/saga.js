import { put, takeLatest } from 'redux-saga/effects';
import { init, idle, complete } from './slice';
import { init as historyInit } from 'stores/history/slice';
import { SessionStorage } from 'libs/storage';

import { STACK_NAME } from 'libs/history/history';

function* history() {
  const stack = SessionStorage.get(STACK_NAME) || ['/'];
  SessionStorage.set(STACK_NAME, stack);
  yield put(historyInit(stack));
}

function* initTask() {
  yield history();
  yield put(complete());
  yield put(idle());
}

export default function* watch() {
  yield takeLatest(init, initTask);
}
