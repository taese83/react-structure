import { all, fork } from "redux-saga/effects";
import commonSlice from "./slice";
import commonSaga from "./saga";

function* sagas() {
  yield all([fork(commonSaga)]);
}

const reducers = {
  [commonSlice.name]: commonSlice.reducer,
};

export default {
  sagas,
  reducers,
};
