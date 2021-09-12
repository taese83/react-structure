import { SessionStorage } from 'libs/storage';
export const storageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    SessionStorage.set('states', getState());
    return result;
  };
};

export const preloadedState = () => {
  if (SessionStorage.get('states') !== null) {
    return SessionStorage.get('states'); // re-hydrate the store
  }
};
