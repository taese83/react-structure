import { call, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { init, change } from './slice';
import i18n from 'libs/i18n';
import store from 'stores';

function* initTask() {
  yield call(i18n.init, store.getState()?.i18n?.lang);
}

function* changeTask(actions) {
  yield call(i18n.changeLanguage, actions.payload);
}

export default function* watch() {
  yield all([takeLatest(init, initTask), takeEvery(change, changeTask)]);
}
