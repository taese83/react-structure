import { all, fork } from 'redux-saga/effects';
import initSlice from './init/slice';
import initSaga from './init/saga';

import i18nSlice from './i18n/slice';
import i18nSaga from './i18n/saga';

function* sagas() {
  yield all([fork(i18nSaga), fork(initSaga)]);
}

const reducers = {
  [initSlice.name]: initSlice.reducer,
  [i18nSlice.name]: i18nSlice.reducer,
};

export default {
  sagas,
  reducers,
};
