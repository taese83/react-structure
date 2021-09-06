import { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { init, idle, initState } from 'stores/init/slice';

const useInit = () => {
  const [initialized, setInitialized] = useState(false);
  const { complete, fail } = useSelector(initState);
  const dispatch = useDispatch();

  const initialize = useCallback(async () => {
    dispatch(init()); //최초 진입시 초기화 로직 수행
    return () => {
      dispatch(idle());
    };
  }, []);

  useEffect(() => {
    if (complete || fail) {
      setInitialized(true);
    }
  }, [complete, fail]);

  useLayoutEffect(() => {
    initialize();
  }, []);

  return {
    initialized,
  };
};

export default useInit;
