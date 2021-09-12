import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import global from 'stores/global';
import { SessionStorage } from 'libs/storage';

let store;
const sagaMiddleware = createSagaMiddleware();

const storageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    SessionStorage.set('states', getState());
    return result;
  };
};

const preloadedState = () => {
  if (SessionStorage.get('states') !== null) {
    return SessionStorage.get('states'); // re-hydrate the store
  }
};

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
    storageMiddleware,
  ],
  preloadedState: preloadedState(),
};

const createStore = () => {
  store = configureStore(config);
  store.asyncReducers = {};
  store.injectSaga = injectSaga(sagaMiddleware.run, global.sagas);
  store.injectReducer = injectReducer;
  return store;
};

export default createStore();
