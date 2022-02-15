import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import global from 'stores/global';
import customMiddleware from './middlewares';
import { SessionStorage } from 'libs/storage';

let store;
const sagaMiddleware = createSagaMiddleware();

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...global.reducers,
    ...asyncReducers,
  });
}

function makePersisConfig(wl = []) {
  const savedWhitelist = SessionStorage.get('persist-whitelist') || [];
  const whitelist = new Set([...savedWhitelist, ...wl]);

  const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: [...whitelist],
  };

  SessionStorage.set('persist-whitelist', [...whitelist]);
  return persistConfig;
}

// Inject Reducer
function injectReducer(key, asyncReducer, persist) {
  if (!key || store.asyncReducers[key]) return;
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(
    persistReducer(
      makePersisConfig(persist && [key]),
      createReducer(store.asyncReducers),
    ),
  );
  return store;
}

// Inject Slice
async function injectSlice(key, slice, persist) {
  if (!key || !slice) return;

  let reducer = slice.reducer;
  if (slice.lazy) {
    const asyncSlice = await slice();
    reducer = asyncSlice?.default?.reducer;
  }
  reducer && store.injectReducer(key, reducer, persist);
}

// Inject Saga
function injectSaga(runSaga, rootSaga) {
  const injectedSagas = new Map();
  const isInjected = (key) => injectedSagas.has(key);
  const injector = async (key, saga) => {
    if (!key || !saga || isInjected(key)) return;

    let defaultSaga = saga;
    if (saga.lazy) {
      const asyncSaga = await saga();
      defaultSaga = asyncSaga?.default;
    }
    defaultSaga && injectedSagas.set(key, runSaga(defaultSaga));
  };
  injector('global', rootSaga);
  return injector;
}

const persistedReducer = persistReducer(makePersisConfig(), createReducer());

const config = {
  reducer: persistedReducer,
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
  store.injectSlice = injectSlice;
  return store;
};

const s = createStore();
export const persistor = persistStore(s);
export default s;
