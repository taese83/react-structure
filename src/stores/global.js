import { all, fork } from 'redux-saga/effects';
import initSlice from './init/slice';
import initSaga from './init/saga';

import historySlice from './history/slice';

function* sagas() {
  yield all([fork(initSaga)]);
}

const reducers = {
  [initSlice.name]: initSlice.reducer,
  [historySlice.name]: historySlice.reducer,
};

export default {
  sagas,
  reducers,
};
