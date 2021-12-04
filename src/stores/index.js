import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import global from 'stores/global';
import customMiddleware from './middlewares';

let store;
const sagaMiddleware = createSagaMiddleware();

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...global.reducers,
    ...asyncReducers,
  });
}

// Inject Reducer
function injectReducer(key, asyncReducer) {
  if (!key || store.asyncReducers[key]) return;
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
    ...customMiddleware.middleware,
  ],
  preloadedState: customMiddleware.preload(),
};

const createStore = () => {
  store = configureStore(config);
  store.asyncReducers = {};
  store.injectSaga = injectSaga(sagaMiddleware.run, global.sagas);
  store.injectReducer = injectReducer;
  return store;
};

export default createStore();
