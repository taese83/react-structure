import { all, takeEvery } from 'redux-saga/effects';
import { save } from './slice';

import { STACK_NAME } from 'libs/history/history';
import { SessionStorage } from 'libs/storage';

function* saveStack(actions) {
  yield SessionStorage.set(STACK_NAME, actions.payload);
}

export default function* watch() {
  yield all([takeEvery(save, saveStack)]);
}
