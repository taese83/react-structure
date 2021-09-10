import { all, fork } from 'redux-saga/effects';
import initSlice from './init/slice';
import initSaga from './init/saga';

import historySlice from './history/slice';
import historySaga from './history/saga';

function* sagas() {
  yield all([fork(initSaga), fork(historySaga)]);
}

const reducers = {
  [initSlice.name]: initSlice.reducer,
  [historySlice.name]: historySlice.reducer,
};

export default {
  sagas,
  reducers,
};
