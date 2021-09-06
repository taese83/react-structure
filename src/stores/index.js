import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { history } from 'libs/history';
import global from 'stores/global';

let store;
const sagaMiddleware = createSagaMiddleware({
  context: { history }, //history 추가
});

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...global.reducers,
    ...asyncReducers,
  });
}

// Inject Reducer
function injectReducer(key, asyncReducer) {
  if (!key) return;
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
}

// Inject Saga
function injectSaga(runSaga, rootSaga) {
  const injectedSagas = new Map();
  const isInjected = (key) => injectedSagas.has(key);
  const injector = (key, saga) => {
    if (!key || isInjected(key)) return;
    injectedSagas.set(key, runSaga(saga));
  };
  injector('global', rootSaga);
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
  store.injectSaga = injectSaga(sagaMiddleware.run, global.sagas);
  store.injectReducer = injectReducer;
  return store;
};

export default createStore();
