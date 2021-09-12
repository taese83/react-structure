import { storageMiddleware, preloadedState } from './storageMiddleware';

export default {
  middleware: [storageMiddleware],
  preload() {
    return preloadedState();
  },
};
