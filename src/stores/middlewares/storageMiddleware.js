import { LocalStorage } from 'libs/storage';

export const storageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const state = getState();
    LocalStorage.set('store', {
      i18n: state.i18n,
    });
    return result;
  };
};

export const preloadedState = () => {
  if (LocalStorage.get('store') !== null) {
    return LocalStorage.get('store'); // re-hydrate the store
  }
};
