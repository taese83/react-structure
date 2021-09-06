import { all, fork } from 'redux-saga/effects';
import initSlice from './init/slice';
import initSaga from './init/saga';

function* sagas() {
  yield all([fork(initSaga)]);
}

const reducers = {
  [initSlice.name]: initSlice.reducer,
};

export default {
  sagas,
  reducers,
};
