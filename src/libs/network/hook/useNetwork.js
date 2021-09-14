import { useCallback, useEffect, useRef } from 'react';
import {
  atomFamily,
  selectorFamily,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil';

import { SessionStorage } from 'libs/storage';
import Status from 'libs/network/core/status';

export const apiStatus = atomFamily({
  key: 'apiStatus',
  default: Status.DEFAULT,
});

export const apiResponse = atomFamily({
  key: 'apiResponse',
  default: null,
  effects_UNSTABLE: [
    (key) =>
      ({ setSelf, onSet }) => {
        const savedValue = SessionStorage.get(key);
        if (savedValue != null) {
          setSelf(savedValue);
        }

        onSet((newValue) => {
          if (newValue === null) {
            SessionStorage.remove(key);
          } else {
            SessionStorage.set(key, newValue);
          }
        });
      },
  ],
});

export const apiError = atomFamily({
  key: 'apiError',
  default: null,
});

const apiSelector = selectorFamily({
  key: 'apiSelector',
  get:
    (key) =>
    ({ get }) => {
      const status = get(apiStatus(key));
      const data = get(apiResponse(key));
      const error = get(apiError(key));

      return {
        status,
        data,
        error,
      };
    },
});

const useNetwork = (
  key,
  promiseFn,
  { resolve = true, resolveConditions = [] } = {},
) => {
  if (!key || typeof key !== 'string') {
    throw new Error('invalid key');
  }

  let cancelFn = useRef();
  const [status, setStatus] = useRecoilState(apiStatus(key));
  const setRespnose = useSetRecoilState(apiResponse(key));
  const setError = useSetRecoilState(apiError(key));
  const cancel = useCallback(() => {
    if (status === Status.LOADING) {
      cancelFn?.current && cancelFn.current();
      setStatus(Status.CANCEL);
    }
    // eslint-disable-next-line
  }, [status]);

  const request = useCallback(
    (...args) => {
      if (!promiseFn || typeof promiseFn !== 'function') {
        throw new Error('First param should be function!');
      }

      setStatus(Status.LOADING);
      setError(null);

      const networkPromise = promiseFn(...args);
      networkPromise
        .then((response) => {
          setRespnose(response);
          setError(null);
          setStatus(Status.SUCCESS);
        })
        .catch((error) => {
          setRespnose(null);
          setError(error);
          setStatus(Status.ERROR);
        });

      cancelFn.current = networkPromise.cancel;
    },
    // eslint-disable-next-line
    [],
  );

  useEffect(() => {
    return () => {
      setError(null);
      setStatus(Status.DEFAULT);
    };
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  useEffect(resolve ? request : () => {}, resolveConditions);

  return { request, cancel, ...useRecoilValue(apiSelector(key)) };
};

const useNetworkSelector = (key) => useRecoilValue(apiSelector(key));
export { useNetwork, useNetworkSelector };
