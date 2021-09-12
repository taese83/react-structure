import { SessionStorage } from 'libs/storage';

export const storageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const state = getState();
    SessionStorage.set('store', {
      init: state.init,
      history: state.history,
      i18n: state.i18n,
    });
    return result;
  };
};

export const preloadedState = () => {
  if (SessionStorage.get('store') !== null) {
    return SessionStorage.get('store'); // re-hydrate the store
  }
};
