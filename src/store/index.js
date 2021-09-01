import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import common from "./root";

let store;
const sagaMiddleware = createSagaMiddleware({
  context: {}, //history 추가
});

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...common.reducers,
    ...asyncReducers,
  });
}

// Code Splitting Inject Reducer
function injectReducer(key, asyncReducer) {
  if (!key) return;
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
}

// Code Splitting Inject Saga
function injectSaga(runSaga, rootSaga) {
  const injectedSagas = new Map();
  const isInjected = (key) => injectedSagas.has(key);
  const injector = (key, saga) => {
    if (!key || isInjected(key)) return;
    const task = runSaga(saga);
    injectedSagas.set(key, task);
  };
  injector("common", rootSaga);
  return injector;
}

const config = {
  reducer: createReducer(),
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    logger,
    sagaMiddleware,
  ],
};

const createStore = () => {
  store = configureStore(config);
  store.asyncReducers = {};
  store.injectSaga = injectSaga(sagaMiddleware.run, common.sagas);
  store.injectReducer = injectReducer;
  return store;
};

export default createStore();
